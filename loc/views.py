import json
from flask import render_template, request, jsonify, Response

from . import app
from .models import donations


@app.route("/")
def index():
    return render_template("index.html")

    
@app.route("/static/js/<string:name>")
def static_js(name):
    return app.send_static_file("js/"+name)


@app.route("/donation", methods=["POST"])
def add_to_donations():
    js = request.get_json() or {}
    lat = js.get("lat", None)
    long = js.get("long", None)
    charity = js.get("charity", None)
    if None in (lat, long, charity):
        print(lat, long, charity)
        return "Request malformed!", 400
    print(charity, lat, long)
    donations.append({"charity": charity,
                      "latitude": lat, 
                      "longitude": long})
    return "Donation added successfully!", 200


@app.route("/donation", methods=["GET"])
def get_donations():
    return Response(json.dumps(donations),  mimetype='application/json')
