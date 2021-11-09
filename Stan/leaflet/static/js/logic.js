// Store our API endpoint as queryUrl.
var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
// read plate boundary data
d3.json("static/data/Texas_County_Boundaries_Detailed.geojson").then(function (boundarydata) {
  // Once we get a response, send the data.features object to the createFeatures function.
// Perform a GET request to the query URL/
console.log(boundarydata)

d3.json(queryUrl).then(function (data) {
  // Once we get a response, send the data.features object to the createFeatures function.
  createFeatures(data.features, boundarydata.features);
  
});
});


function createFeatures(earthquakeData,boundariesData) {

  // Define a function that we want to run once for each feature in the features array.
  // Give each feature a popup that describes the place and time of the earthquake.
  function onEachFeature(feature, layer) {
    layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p>`);
  
  }

  // Create a GeoJSON layer that contains the features array on the earthquakeData object.
  // Run the onEachFeature function once for each piece of data in the array.
  var earthquakes = L.geoJSON( earthquakeData, {
    onEachFeature: onEachFeature, 
// put circles on map with dynamic styles
pointToLayer: function (feature, latlng) {
  return L.circleMarker(latlng, {
    radius: feature.properties.mag*3, // radius depends on quake mag
    fillColor: getColor(feature.geometry.coordinates[2]),  // fill color depends on quake depth
    color: "#000",
    weight: 0.5,
    opacity: 1,
    fillOpacity: 0.8
  });
}
  });
// create a geojson layer with plate boundaries
  var plateboundaries =L.geoJSON(boundariesData, {style: { fillOpacity: 0.3 } });

  // Send our earthquakes layer to the createMap function/
  createMap(earthquakes, plateboundaries);
}

// function to color circles according to depth
function getColor(d) {
  return d < 2 ? '#fff7ec' :
         d < 5  ? '#fee8c8' :
         d < 10  ? '#fdd49e' :
         d < 20  ? '#fdbb84' :
         d < 30   ? '#fc8d59' :
         d < 40   ? '#ef6548' :
         d < 50   ? '#d7301f' :
         d < 60   ? '#b30000' :
                    '#7f0000';
}



function createMap(earthquakes, plateboundaries) {

  // Create the base layers.
  var street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });

  var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });

 var grayscale = L.tileLayer('https://cartodb-basemaps-b.global.ssl.fastly.net/light_nolabels/{z}/{x}/{y}.png', {
  attribution: 'Map data: '
 });

 var satellite = L.tileLayer('https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}', {
  attribution: 'Map data: '
 });
 
  // Create a baseMaps object.
  var baseMaps = {
    "Street Map": street,
    "Topographic Map": topo,
    "Grayscale Map": grayscale,
    "Satellite Map": satellite
  };

  // Create an overlay object to hold our overlay.
  var overlayMaps = {
    Earthquakes: earthquakes,
    Plateboundaries: plateboundaries
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load.
  var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [street, earthquakes, plateboundaries]
  });

  // Create a layer control.
  // Pass it our baseMaps and overlayMaps.
  // Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

var legend = L.control({position: 'bottomright'});

// add legend with colorscale
legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        depths = [0, 2, 5, 10, 20, 30, 40, 50, 60],
        labels = [];

    // loop through depth intervals and generate a label with a colored square for each interval
    for (var i = 0; i < depths.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(depths[i] + 1) + '"></i> ' +
            depths[i] + (depths[i + 1] ? '&ndash;' + depths[i + 1] + '<br>' : '+');
    }

    return div;
};



legend.addTo(myMap);

}


