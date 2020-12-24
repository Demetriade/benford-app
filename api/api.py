from PIL import Image


def main():
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


if __name__ == "__main__":
    main()
