from flask import render_template
from . import app


@app.route("/")
def index():
    return render_template("index.html")

@app.route("/static/js/<string:name>")
def static_js(name):
    return app.send_static_file("js/"+name)
