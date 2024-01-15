import unittest
from unittest.mock import patch
from datetime import datetime
import logger 
import file_writer as file_writer

class LoggerTest(unittest.TestCase):
    def test_info_is_written_in_log_file(self):
        with patch.object(file_writer, "appendTo") as appendTo:
            logger.info("ceci est une info")
        appendTo.assert_called_once_with(f'INFO - {datetime.now()} ceci est une info')
        
if __name__ == "__main__":
    unittest.main()