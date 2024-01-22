import math
import database
from libSMTP import libSmtpClient, LibSmtpEmail
from libGSM import libGsmClient, LibGsmSms
from random import random
from time import time

smscNumber = "+33 6 89 00 40 00"

def sendOTP(accountId):
    randomSeed = math.floor(random() * 100)
    timeSeed = math.floor(time()) % 100
    otp = f'{randomSeed}{timeSeed}'

    account = database.fetchAccount(accountId)
    if account.preferSMS:
        smsContent = "Bonjour, \n"
        smsContent += f'Pour vous connecter sur le portail entrez le code : {otp}\n'
        smsContent += "Si vous n'êtes pas à l'origine de cette demande, contactez le support."
        sendSMS(smsContent, account.phoneNumber)
    else:
        email = "<p>Bonjour,</p>"
        email += f'<p>Pour vous connecter sur le portail entrez le code : {otp}</p>'
        email += "<p>Si vous n'êtes pas à l'origine de cette demande, contactez le support.</p>"
        sendEmail(email, account.email)

def sendSMS(smsContent, phoneNumber):
    libGsmClient.attachToSMSC(smscNumber)
    sms = LibGsmSms()
    sms.senderNum = "+33 7 12 34 56 78";
    sms.num = phoneNumber
    sms.payload = smsContent
    libGsmClient.routeSMS(sms)

def sendEmail(emailContent, address):
    libSmtpClient.connect()
    email = LibSmtpEmail()
    email.senderAddress = "noreply@auth.com"
    email.recipientAddress = address
    email.content = emailContent
    libSmtpClient.send(email)


