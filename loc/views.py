import json
from flask import render_template, request, jsonify, Response

from . import app
from .models import donations


BASE_URL = app.BASE_URL


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
    donation_type = js.get("type", None)
    amount = js.get("amount", None)
    if None in (lat, long, charity, donation_type):
        return "Request malformed!", 400
    if charity not in donations:
        donations[charity] = []
    try:
        donations[charity].append({
            "pos": {"lat": float(lat), 
                    "lng": float(long)},
            "amount": amount or "Unknown",
            "type": donation_type,
        })
    except Exception as e:
        print(e)
        return "lat and long should be floats", 400
    return "Donation added successfully!", 200


@app.route("/donation", methods=["GET"])
def get_donations():
    return Response(json.dumps(donations),  mimetype='application/json')


@app.route("/donation/<string:id_>", methods=["GET"])
def get_charity_donations(id_):
    try:
        ds = donations[id_]
    except KeyError:
        ds = []
    return Response(json.dumps(ds), mimetype="application/json")


@app.route("/view/<string:id_>", methods=["GET"])
def view_charity(id_):
    return render_template("view.html", charityId=id_)


@app.route("/redirect", methods=["POST"])
def get_redirect():
    url = request.form.get("url", None)
    print(url)
    id = request.form.get("id", None)
    if None in (url, id):
        return "", 400
    app.count += 1
    app.redirects[app.count] = render_template("redirect.html", id=id, url=url)
    return BASE_URL + "/r/" + str(app.count)


@app.route("/create", methods=["GET"])
def create():
    return render_template("qrgen.html")


@app.route("/r/<int:id_>", methods=["GET"])
def follow_redirect(id_):
    return app.redirects[id_]
