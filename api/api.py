from PIL import Image
from flask import request, url_for
from flask_api import FlaskAPI, status, exceptions


app = FlaskAPI(__name__)


@app.route("/image", methods=['POST'])
def image_receiver():
    print(request.data)
    return {"text": "ok bien recu!"}, status.HTTP_201_CREATED


def get_percents():
    print("Hello World!")
    digits = [0, 0, 0, 0, 0, 0, 0, 0, 0]
    im = Image.open("images/chat.jpg", "r")
    pix_val = list(im.getdata())
    for rgb in pix_val:
        digits[int(str(rgb[0])[:1])-1] += 1
        digits[int(str(rgb[1])[:1])-1] += 1
        digits[int(str(rgb[2])[:1])-1] += 1
    print(digits)
    total = sum(digits)
    percents = [val*100/total for val in digits]
    print(percents)
    # req.files.uploadedImage.data


if __name__ == "__main__":
    app.run(debug=True)
