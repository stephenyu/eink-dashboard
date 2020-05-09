from __future__ import print_function
import datetime
import pickle
import os.path
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
from google.auth.transport.requests import Request
from PIL import Image, ImageDraw, ImageFont
from time import gmtime, strftime
import calendar
import pytz
import argparse

# If modifying these scopes, delete the file token.pickle.
SCOPES = ['https://www.googleapis.com/auth/calendar.readonly']

# def google():
#     """Shows basic usage of the Google Calendar API.
#     Prints the start and name of the next 10 events on the user's calendar.
#     """
#     creds = None
#     # The file token.pickle stores the user's access and refresh tokens, and is
#     # created automatically when the authorization flow completes for the first
#     # time.
#     if os.path.exists('token.pickle'):
#         with open('token.pickle', 'rb') as token:
#             creds = pickle.load(token)
#     # If there are no (valid) credentials available, let the user log in.
#     if not creds or not creds.valid:
#         if creds and creds.expired and creds.refresh_token:
#             creds.refresh(Request())
#         else:
#             flow = InstalledAppFlow.from_client_secrets_file(
#                 'credentials.json', SCOPES)
#             creds = flow.run_local_server(port=0)
#         # Save the credentials for the next run
#         with open('token.pickle', 'wb') as token:
#             pickle.dump(creds, token)

#     service = build('calendar', 'v3', credentials=creds)

#     # Call the Calendar API
#     now = datetime.datetime.utcnow().isoformat() + 'Z' # 'Z' indicates UTC time
#     print('Getting the upcoming 10 events')
#     events_result = service.events().list(calendarId='primary', timeMin=now,
#                                         maxResults=10, singleEvents=True,
#                                         orderBy='startTime').execute()
#     events = events_result.get('items', [])

#     if not events:
#         print('No upcoming events found.')
#     for event in events:
#         start = event['start'].get('dateTime', event['start'].get('date'))
#         print(start, event['summary'])

# google()

parser = argparse.ArgumentParser()
parser.add_argument('--prod', '-p', required=False, action='store_true', help="Run Locally i.e. not on the raspberry pi")
args = parser.parse_args()

if args.prod:
    from inky import InkyWHAT
    inky_display = InkyWHAT("black")
    display_width = inky_display.WIDTH
    display_height = inky_display.HEIGHT
    font_black = inky_display.BLACK
else:
    display_width = 400
    display_height = 300
    font_black = (0,0,0)

def coord(value):
    return 4 + value

img = Image.new("P", (display_width, display_height), (255, 255, 255))
draw = ImageDraw.Draw(img)

font = ImageFont.truetype("JetBrainsMono-Medium.ttf", 17)

cal = calendar.TextCalendar(calendar.SUNDAY)

sydney_tz = pytz.timezone('Australia/Sydney')
sydney_datetime = datetime.datetime.now(sydney_tz)
sydney_time = datetime.datetime.now(sydney_tz).strftime('%H:%M')

calStr = cal.formatmonth(sydney_datetime.year, sydney_datetime.month)

uk_tz = pytz.timezone('Europe/London')
london_time = datetime.datetime.now(uk_tz).strftime('%H:%M')

draw.text((coord(display_width-140), coord(display_height-45)), "Sydney: " + sydney_time, font_black, font=font)
draw.text((coord(display_width-140), coord(display_height-25)), "London: " + london_time, font_black, font=font)

draw.text((coord(188), coord(0)), calStr, font_black, font=font)


if args.prod:
   inky_display.set_image(img)
   inky_display.show()
else:
   img.save("output.bmp")
