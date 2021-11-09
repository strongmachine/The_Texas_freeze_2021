from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, inspect
from flask import Flask, jsonify, render_template, request, redirect
import datetime as datetime
import os


#################################################
# Flask Setup
#################################################



app = Flask(__name__, template_folder='./templates', static_folder="./assets")


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

@app.route("/api/v1.0/power/<year>/<month>/<day>/<hour>")
def power_outages(year,month,day,hour):
    """Return the justice league data as json"""
    session = Session(engine)
    outages = Base.classes.power_county
    time2=datetime.datetime(int(year), int(month), int(day), int(hour)) 
    time1=time2- datetime.timedelta(hours=1)
    outages_for_hour=session.query(outages.county_name, func.avg(outages.fips_id), func.sum(outages.outage_count_avg),  func.sum(outages.tracket_count)).\
        filter(outages.record_date_time == time2).group_by(outages.county_name).all()
    dict_outages=[]
    for outage in outages_for_hour:
        if str(outage[1]) != 'None':
            dict_outages.append({ "county_name": outage[0], "fips_id": int(float(str(outage[1]))), "out_percentage": outage[2]/outage[3]*100 })
            
    
    # Close Session
    session.close()
    return jsonify(dict_outages)


# create route that renders dashboard.html template
@app.route("/")
def home():
    
     return render_template("dashboard.html")


@app.route("/icons/")
def icons():
    
    return render_template("icons.html")



@app.route("/map/")
def map():
    
    return render_template("map.html")


@app.route("/tables/")
def tables():
    
    return render_template("tables.html")


@app.route("/user/")
def user():
    
    return render_template("user.html")




# @app.route("/api/v1.0/freeze/<starttime>/<endtime>")
# def blah (starttime, endtime):
    # query 
# do session in here, remember to close the session out

if __name__ == "__main__":
    app.run(debug=True)
