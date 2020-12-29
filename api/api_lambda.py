from PIL import Image
import base64
import io


def image_receiver(message, _):
    print("Received")
    percents = get_percents(message["uploadedImage"])
    return {"text": "ok bien recu!", "percents": percents}


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
    total = sum(digits)
    percents = [val*100/total for val in digits]
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
    confidence = get_confidence(data[1::])
    return {"text": "ok bien recu!", "data": data, "options": options, "confidence": confidence}


def get_confidence(data):
  result = 0
  prev = None
  for arr in data:
    if prev and prev < arr[2]:
      result += (abs(arr[1] - arr[2])/(100 - arr[1])*100)**2
    else:
      result += abs(arr[1] - arr[2])/(100 - arr[1])*100
      prev = arr[2]
  result = max(0, 100 - result/9)
  color = ""
  if result > 80:
    color = "#63854a"
  elif result > 50:
    color = "#cc6a29"
  else:
    color = "#be5046"
  result = "{:.2f}".format(result)
  return {"factor": result, "color": color}
