from app import app
from flask import render_template, request

@app.route('/about')
def about():
    return render_template('about.html')
