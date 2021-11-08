// Use this link to get the GeoJSON data.
// var txBoundariesUrl = "https://data.texas.gov/dataset/TX-Counties/vazh-2ajc";
var txBoundariesUrl = "static/data/Texas_County_Boundaries_Detailed.geojson";

var txBoundaries = L.layerGroup()

var world = Esri_NatGeoWorldMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC',
	maxZoom: 10
});

var baseMaps = {
    "World": world
};

var overlayMaps = {
    "Counties": txBoundaries
};

var myMap = L.map("map", {
    center: [
        37.09, -95.71
    ],
    zoom: 5,
    layers: [world, txBoundaries]
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
d3.json(txBoundariesUrl).then(function(data) {
    // Adding our geoJSON data, along with style information, to the tectonicplates layer.
    var timelineData = get_full_data();
    console.log("timelineData", timelineData);
    console.log(data);
    // L.json(data, {
    //     color: "#e64c4c",
    //     fillColor: "#cc0000",
    //     fillOpacity: 0.4
    // }).addTo(txBoundaries);
    // Then add the tectonicplates layer to the map.
    txBoundaries.addTo(myMap);
});