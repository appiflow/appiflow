
import logging
from enum import Enum
from types import DynamicClassAttribute
import sys
from logging.handlers import TimedRotatingFileHandler

APPIFLOW_LOGGER = "appiflow"

BASE_LOGGING_FORMAT = (
    "%(asctime)s - %(name)s - %(levelname)s - %(message)s"
)

LOG_FILE = "appiflow.log"

def get_console_handler():
    """Returns a console handler for logging

    Returns:
        _type_: Stream handler object
    """
    console_handler = logging.StreamHandler(sys.stdout)
    #console_handler.setFormatter(BASE_LOGGING_FORMAT)
    formatter = logging.Formatter(
        
        '%(asctime)s %(name)-12s %(levelname)-8s %(message)s')
    console_handler.setFormatter(formatter)
    return console_handler

def get_file_handler():
    """Returns a file handler for logging

    Returns:
        _type_: File handler object
    """
    file_handler = TimedRotatingFileHandler(LOG_FILE, when='midnight')
    formatter = logging.Formatter(
        '%(asctime)s %(name)-12s %(levelname)-8s %(message)s')
    file_handler.setFormatter(formatter)
    return file_handler


def get_logger(logger_name) -> logging:
    """Returns a configured logger object

    Args:
        logger_name (_type_): Module name for logging

    Returns:
        _type_: Logger object
    """
    logger = logging.getLogger(logger_name)
    logger.setLevel(logging.DEBUG) # Tune as required
    logger.addHandler(get_console_handler())
    logger.addHandler(get_file_handler())
    # with this pattern, it's rarely necessary to propagate the error up to parent
    logger.propagate = False
    return logger
