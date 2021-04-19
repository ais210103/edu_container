from flask import render_template, request, Flask, abort, make_response,jsonify, send_from_directory, redirect, url_for,Blueprint
from flask_cors import CORS
import json
from sqlalchemy import func
from ais_portal.helper.test_helper import test

test_controller = Blueprint('test_controller', __name__)

@test_controller.route("/test")
def test_route():
    res = test()
    return json.dumps({"test":res},ensure_ascii=False)