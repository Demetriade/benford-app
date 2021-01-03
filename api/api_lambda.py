from PIL import Image
import base64
import io
import json


def image_receiver(message, _):
    #message = json.loads(message)
    print(f"Received: {message}")
    body = message['body']
    print(f"Body: {body}")
    im = json.loads(body)
    print(f"Image: {im}")
    #if not message.get("body", {}).get("uploadedImage"):
    if not im['uploadedImage']:
        return {"statusCode": 400, "headers": {"Content-Type": "application/json"}, "body": json.dumps({"Error": "Invalid request content"})}

    print(f"encoded image: {im['uploadedImage']}")
    percents = get_percents(im['uploadedImage'])
    print(f"Results: {percents}")
    return {"statusCode": 200, "headers": {"Content-Type": "application/json"}, "body": json.dumps({"text": "ok bien recu!", "percents": percents})}


def get_percents(base64_string):
  print("begin percents")
  msg = base64.b64decode(base64_string)
  print("message decoded")
  buf = io.BytesIO(msg)
  print("bytesIO")
  im = Image.open(buf)
  print("open image")
  digits = [0, 0, 0, 0, 0, 0, 0, 0, 0]
  pix_val = list(im.getdata())
  print(f"getData: {pix_val}")
  for rgb in pix_val:
      digits[int(str(rgb[0])[:1])-1] += 1
      digits[int(str(rgb[1])[:1])-1] += 1
      digits[int(str(rgb[2])[:1])-1] += 1
  total = sum(digits)
  print(f"total: {total}")
  percents = [val*100/total for val in digits]
  print(f"Percents: {percents}")
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
  print(f"Confidence : {confidence}")
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


if __name__ == "__main__":
  import sys
  image_receiver({"body": json.dumps({"uploadedImage": sys.argv[1]})}, None)