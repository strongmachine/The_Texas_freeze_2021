// Use this link to get the GeoJSON data.
// var txBoundariesUrl = "https://data.texas.gov/dataset/TX-Counties/vazh-2ajc";
var txCounties = "static/data/Texas_County_Boundaries_Detailed.geojson";

var txBounds = L.layerGroup()

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);

var baseMaps = {
    "Texas": texas
};

var overlayMaps = {
    "Counties": txBounds
};

var myMap = L.map("map", {
    center: [
        37.09, -95.71
    ],
    zoom: 5,
    layers: [texas, txBounds]
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
            timelineData[e["RecordDateTime"]["$date"]][e["CountyName"][e["UtilityName"]] = {"OutageCountMAX":e['OutageCountMAX'], "TrackedCount":e['TrackedCount']}            
        ]});
        
    });
    return timelineData;

}
d3.json(txCounties).then(function(data) {
    // Adding our geoJSON data, along with style information, to the tectonicplates layer.
    //var timelineData = get_full_data();
    //console.log("timelineData", timelineData);
    //console.log(data);
    L.geojson(data, {
         color: "#e64c4c",
         fillColor: "#cc0000",
         fillOpacity: 0.4
     }).addTo(txBoundaries);
     //
    txBoundaries.addTo(myMap);
});