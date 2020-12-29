from PIL import Image
import base64
import io
from flask import request, url_for
from flask_api import FlaskAPI, status, exceptions
from flask_cors import CORS


app = FlaskAPI(__name__)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})


@app.route("/api/image", methods=['POST'])
def image_receiver():
    #print(request.data["uploadedImage"])
    print("Received")
    percents = get_percents(request.data["uploadedImage"])
    return {"text": "ok bien recu!", "percents": percents}, status.HTTP_200_OK


def get_percents(base64String):
    msg = base64.b64decode(base64String)
    buf = io.BytesIO(msg)
    im = Image.open(buf)
    digits = [0, 0, 0, 0, 0, 0, 0, 0, 0]
    pix_val = list(im.getdata())
    for rgb in pix_val:
        digits[int(str(rgb[0])[:1])-1] += 1
        digits[int(str(rgb[1])[:1])-1] += 1
        digits[int(str(rgb[2])[:1])-1] += 1
    #print(digits)
    total = sum(digits)
    percents = [val*100/total for val in digits]
    #print(percents)
    # https://developers.google.com/chart/interactive/docs/gallery/barchart
    data = [
            ['Digits', "Benford's law", 'Your results'],
            ['1', 30, percents[0]],
            ['2', 17, percents[1]],
            ['3', 13.5, percents[2]],
            ['4', 9.75, percents[3]],
            ['5', 8, percents[4]],
            ['6', 6.9, percents[5]],
            ['7', 6, percents[6]],
            ['8', 5.1, percents[7]],
            ['9', 4.95, percents[8]]]
    options = {
            # Material design options
            "bar": {"groupWidth": "95%"},
            "legend": {"position": 'none'}, 
            "axes": {
              "x": {
                "digits": {"label": "Digits"},
              },
              "y": {
                "percents": {"label": "Percents"},
              },
            }}
    return {"text": "ok bien recu!", "data": data, "options": options}


if __name__ == "__main__":
    app.run(debug=True)
