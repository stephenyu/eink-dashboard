import * as Parser from 'rss-parser';

export async function getGuardianHeadline(): Promise<string> {
  const parser = new Parser();
  const feed = await parser.parseURL("https://www.theguardian.com/australia-news/sydney/rss");

  return feed.items[0].title;
}

export async function getSMHHeadline(): Promise<string> {
  const parser = new Parser();
  const feed = await parser.parseURL("https://www.smh.com.au/rss/national/nsw.xml");

  return feed.items[0].title;
}
