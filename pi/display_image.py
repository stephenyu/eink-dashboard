#!/usr/bin/env python3

import os
from PIL import Image
from inky.auto import auto

# Get the current path
PATH = os.path.dirname(__file__)

# Set up the Inky display
try:
    inky_display = auto(ask_user=True, verbose=True)
except TypeError:
    raise TypeError("You need to update the Inky library to >= v1.1.0")

inky_display.set_border(inky_display.BLACK)
img = Image.open(os.path.join(PATH, "../build/image.png"))

# Create the palette
pal_img = Image.new("P", (1, 1))
pal_img.putpalette((255, 255, 255, 0, 0, 0, 255, 0, 0) + (0, 0, 0) * 252)

# Process the image using the palette
img = img.convert("RGB").quantize(palette=pal_img)

# Display the logo image

inky_display.set_image(img)
inky_display.show()
