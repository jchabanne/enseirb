class __LibSmptClient__:

    def connect():
        pass
    
    def send(email):
        pass

libSmtpClient = __LibSmptClient__()

class LibSmtpEmail():
    def __init__(self):
        self.senderAddress = ""
        self.recipientAddress = ""
        self.content = ""