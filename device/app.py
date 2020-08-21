import os
from PIL import Image
import numpy

from inky import InkyWHAT

inky_display = InkyWHAT("black")
PATH = os.path.dirname(__file__)
inky_display.set_border(inky_display.BLACK)

img = Image.open(os.path.join(PATH, "../build/image.png"))

# Display the logo image
inky_display.set_image(img)
inky_display.show()


#img = Image.new("P", (display_width, display_height), (255, 255, 255))
#draw = ImageDraw.Draw(img)
#
#font = ImageFont.truetype("Inconsolata-Regular.ttf", 16)
#font15 = ImageFont.truetype("Inconsolata-Regular.ttf", 16)
#
#cal = calendar.TextCalendar(calendar.SUNDAY)
#
#sydney_tz = pytz.timezone('Australia/Sydney')
#sydney_datetime = datetime.datetime.now(sydney_tz)
#sydney_time = datetime.datetime.now(sydney_tz).strftime('%H:%M')
#
#calStr = cal.formatmonth(sydney_datetime.year, sydney_datetime.month)
#
#uk_tz = pytz.timezone('Europe/London')
#london_time = datetime.datetime.now(uk_tz).strftime('%H:%M')
#
#ottawa_tz = pytz.timezone('America/Toronto')
#ottawa_tz = datetime.datetime.now(ottawa_tz).strftime('%H:%M')
#
#draw.text((coord(227), coord(0)), calStr, font_black, font=font)
#
## draw.text((coord(display_width-140), coord(display_height-45)), "Sydney: " + sydney_time, font_black, font=font)
## draw.text((coord(display_width-140), coord(display_height-25)), "London: " + london_time, font_black, font=font)
#
#data = [
#    ["Sydney", sydney_time], ["Ottawa", ottawa_tz], ["London", london_time]
#]
#draw.text((coord(display_width-120), coord(display_width-228)), tt.to_string(data,
#    style=tt.styles.rounded,
#    padding=(0, 0),
#    alignment="ll"), font_black, font=font15)
#
#if args.prod:
#   inky_display.set_image(img)
#   inky_display.show()
#else:
#   img.save("output.bmp")
