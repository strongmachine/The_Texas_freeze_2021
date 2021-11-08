// Use this link to get the GeoJSON data.
// var txBoundariesUrl = "https://data.texas.gov/dataset/TX-Counties/vazh-2ajc";
var txBoundariesData = "static/data/Texas_County_Boundaries_Detailed.geojson";

var txBoundaries = L.layerGroup()

var geography = Esri_NatGeoWorldMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC',
	maxZoom: 10
});

var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

var baseMaps = {
    "Geography": geography,
    "Street": street
};

var overlayMaps = {
    "Counties": txBoundaries
};

var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5,
    layers: [geography, txBoundaries]
});

L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
}).addTo(myMap);

function get_full_data(){
    timelineData = {}
    // d3.json("static/data/harris_test.json").then(function(data) {
    d3.json("static/data/fullPowerOutage.json").then(function(data) {
        // console.log("Date: ", data[0]["RecordDateTime"]["$date"]);
        // console.log("Full Data: ", data);
        data.forEach(e => {
            // console.log(e);
            // console.log(e["OutageCountMAX"]);
            if(timelineData[e["RecordDateTime"]["$date"]]===undefined) timelineData[e["RecordDateTime"]["$date"]] = {};
            // if(e['OutageCountMAX']>0) 
            timelineData[e["RecordDateTime"]["$date"]][e["CountyName"]] = {"OutageCountMAX":e['OutageCountMAX'], "TrackedCount":e['TrackedCount']}            
        });
        
    });
    return timelineData;

}

function get_county_data(){
    countyData = {}
    d3.json(texas_county_boundaries_line.geojson).then(function(data) {
        data.forEach(c => {
            countyData[c["geometry"]["MultiLineString"]["coordinates"]]
        })
    }).addTo(txBoundaries);
    txBoundaries.addTo(myMap);
};