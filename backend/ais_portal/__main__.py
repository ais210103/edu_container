#!/usr/bin/env python3
import os
import json
import math
from threading import (Event, Thread)
import time
from queue import Queue
from ais_portal import app
from flask import render_template, request, Flask, abort, make_response,jsonify, send_from_directory, redirect, url_for
from flask_cors import CORS
from ais_portal.controller.test_controller import test_controller

# controller 追加
app.register_blueprint(test_controller)



# loggerオブジェクトの宣言
from logging import getLogger, StreamHandler
logger = getLogger(__name__)
sh = StreamHandler()
logger.addHandler(sh)
thread = None

event = Event()
queue = Queue()

def write_thread():
    global thread
    logger.info("thread start")
    i=0
    while not event.wait(10):
        #書込み処理
        device_id=os.environ['TEST_DEVICE_ID']
        device_secret=os.environ['TEST_DEVICE_SECRET']
        device_iid=os.environ['TEST_DEVICE_IID']
        value= 100*math.sin(math.radians(i))
        write_measurement(device_id, device_secret,device_iid,value)
        i+=10
    event.clear()
    logger.info("thread stop")


@app.route("/")
def send_img():
    return json.dumps({"hello":"ワールド"},ensure_ascii=False)

@app.route("/api/test")
def nginx_test():
    return json.dumps({"hello":"nginx"},ensure_ascii=False)
    
def main():
    app.run(host='0.0.0.0',port=8080,debug=True,use_reloader=True)


if __name__ == '__main__':
    main()
