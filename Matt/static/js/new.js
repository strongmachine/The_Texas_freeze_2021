// Creating the map object
var myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 11
  });
  
  // Adding the tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);
  
  // Use this link to get the GeoJSON data.
  var txBoundariesUrl = "https://gis-txdot.opendata.arcgis.com/datasets/texas-county-boundaries-detailed/";
  
  // The function that will determine the color of a neighborhood based on the borough that it belongs to
  // function chooseColor(borough) {
  //   if (borough == "Brooklyn") return "yellow";
  //   else if (borough == "Bronx") return "red";
  //   else if (borough == "Manhattan") return "orange";
  //   else if (borough == "Queens") return "green";
  //   else if (borough == "Staten Island") return "purple";
  //   else return "black";
  // }
  
  // Getting our GeoJSON data
  d3.json(txBoundariesUrl).then(function(data) {
    // Creating a GeoJSON layer with the retrieved data
    L.geoJson(data, {
      style: function(feature) {
        return { 
          fillColor: "black",
          fillOpacity: 0.5,
          weight: 1.5
        };
      }
    }).addTo(myMap);
  });
  