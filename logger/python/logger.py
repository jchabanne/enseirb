from datetime import datetime
import file_writer as file_writer

__LOG_FILE_NAME__ = "log.txt"

def info(message):
    file_writer.appendTo(__LOG_FILE_NAME__, f'{datetime.now()} : {message}\n')
