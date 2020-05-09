from PIL import Image, ImageDraw, ImageFont
from time import gmtime, strftime
from datetime import datetime
import pytz
import argparse

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

font = ImageFont.truetype("JetBrainsMono-Medium.ttf", 15)

sydney_tz = pytz.timezone('Australia/Sydney')
sydney_time = datetime.now(sydney_tz).strftime('%H:%M')

uk_tz = pytz.timezone('Europe/London')
london_time = datetime.now(uk_tz).strftime('%H:%M')

draw.text((coord(0), coord(0)), "Sydney: " + sydney_time, font_black, font=font)
draw.text((coord(0), coord(18)), "London: " + london_time, font_black, font=font)

if args.prod:
   inky_display.set_image(img)
   inky_display.show()
else:
   img.save("output.bmp")
