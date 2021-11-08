from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, inspect
from flask import Flask, jsonify, render_template, request, redirect
import datetime as datetime


#################################################
# Flask Setup
#################################################
app = Flask(__name__)


# establish the conn to sql on heroku
# imprort alchemy
# link url postgresql:// from heroku
# create engine
# 



# create sql engine and connection
engine = create_engine('postgresql://riucforgxewyni:c0a77b774e9acb19eaeded8464531247539178ad429f9fa7a80f45f8ae594656@ec2-52-86-223-172.compute-1.amazonaws.com:5432/d565bqov8ibd3k')
connection = engine.connect()

# reflect an existing database into a new model
Base = automap_base()


# reflect the tables

Base.prepare(engine, reflect=True)

#################################################
# Flask Routes
#################################################

@app.route("/api/v1.0/news/<year>/<month>/<day>/<hour>/<minute>")
# example route /api/v1.0/news/2021/2/20/11/16
def justice_league(year,month,day,hour,minute):
    """Return the justice league data as json"""
    session = Session(engine)
    newsitems = Base.classes.news_items
    time2=datetime.datetime(int(year), int(month), int(day), int(hour), int(minute)) 
    time1=time2- datetime.timedelta(hours=5)
    news_for_hour=session.query(newsitems.timestamp, newsitems.newstext, newsitems.link).\
        filter(newsitems.timestamp > time1).filter(newsitems.timestamp < time2)
    dict_news=[]
    for news in news_for_hour:
        dict_news.append({"znewstext": news.newstext, "timestamp":news.timestamp.strftime("%b %d, %H:%M")})
    
    # Close Session
    session.close()
    return jsonify(dict_news)


# create route that renders index.html template
@app.route("/")
def home():
    
    
    

    return render_template("index.html")

# @app.route("/api/v1.0/freeze/<starttime>/<endtime>")
# def blah (starttime, endtime):
    # query 
# do session in here, remember to close the session out

if __name__ == "__main__":
    app.run(debug=True)
