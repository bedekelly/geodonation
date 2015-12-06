from flask import Flask
app = Flask(__name__)
app.redirects = {}
app.count = 0
app.BASE_URL = "charity.bk.wtf"
from . import views
