def appendTo(fileName, content):
    with open(fileName, "a") as file:
        file.write(content)
    print("Content written")