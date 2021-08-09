# E-ink Dashboard  [![Build Display](https://github.com/stephenyu/eink-dashboard/actions/workflows/build_display.yml/badge.svg)](https://github.com/stephenyu/eink-dashboard/actions/workflows/build_display.yml)

React-based framework to create an eink dashboard for my Pimoroni Inky wHAT.

## Demos

### Image Artifact Generated
![Build Display](https://raw.githubusercontent.com/stephenyu/eink-dashboard/master/build/image.png)

### Actual EInk Dashboard
![Actual Eink Dashboard](https://raw.githubusercontent.com/stephenyu/eink-dashboard/master/readme_imgs/eink_dashboard.jpg)

## How does it work?

Design and implement the HTML version of your dashboard using React, Typescript and StyledComponents.

Uses `ReactDOMServer.renderToString` to statically generate the HTML which is then passed into [Puppeteer](https://github.com/puppeteer/puppeteer) so it can take a screenshot of the HTML at the same width and height as the _Pimoroni Inky wHAT_.

Set up [Github Action](https://github.com/features/actions) to run hourly, about 20 mins to the hour i.e. 1340, 1440, 1540.  This action will generate the image from the previous set and commits it into the repository.

Set up the Raspberry Pi to run on the hour to:
 1. `git pull` the checked-out repository (thus download the image artifact from the Github Action Commit).
 2. Load the image on the display using the python script `/pi/display_image.py`.

## Usage

> `yarn dev`

To run the create-image process using the Puppeteer's Chrome.

> `yarn dev-web`

To run the React SSR process within a web-server.  Useful when developing the React Interface and CSS Debugging.

> `yarn start`

To run the production create-image process.  This won't work locally unless you are running the same Docker Image as the Github Action.