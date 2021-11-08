# importing Flask and other modules
from flask import Flask, request, render_template
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, inspect
from flask import Flask, render_template, jsonify, request, redirect


import datetime as datetime

# Flask constructor
app = Flask(__name__)

# A decorator used to tell the application
# which URL is associated function

engine = create_engine('postgresql://riucforgxewyni:c0a77b774e9acb19eaeded8464531247539178ad429f9fa7a80f45f8ae594656@ec2-52-86-223-172.compute-1.amazonaws.com:5432/d565bqov8ibd3k')
connection = engine.connect()

# reflect an existing database into a new model
Base = automap_base()


# reflect the tables

Base.prepare(engine, reflect=True)


@app.route("/api/v1.0/news")
def news():
    # """Return the justice league data as json"""
    session = Session(engine)
    newsitems = Base.classes.news_items
    time1 = datetime.datetime(2021, 2, 20, 11, 16) - \
        datetime.timedelta(hours=10)
    time2 = datetime.datetime(2021, 2, 20, 11, 16)
    news_for_hour = session.query(newsitems.timestamp, newsitems.newstext, newsitems.link).\
        filter(newsitems.timestamp > time1).filter(newsitems.timestamp < time2)
    dict_news = {"timestamp": [], "newstext": [], "link": []}
    for news in news_for_hour:
        dict_news["timestamp"].append(news.timestamp.strftime("%b %d, %H:%M"))
        dict_news["newstext"].append(news.newstext)
        dict_news["link"].append(news.link)
    # Close Session
    session.close()
    return jsonify(dict_news)

    
@app.route("/")
def home():
    return render_template('dashboard.html')


if __name__ == '__main__':
    app.run()
