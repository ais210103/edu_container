from ais_portal import session
from sqlalchemy import func
import datetime

def test():
    date=session.query(func.now()).first()
    datestr = date[0].strftime("%Y-%m-%d %H:%M:%S")
    return datestr

    