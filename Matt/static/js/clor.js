var data = [{
    type: "choroplethmapbox", location: ["TX"], z: [25, 25, 25],
    geojson: "https://raw.githubusercontent.com/python-visualization/folium/master/examples/data/us-states.json"
}];

var layout = {mapbox: {center: {lon: -100, lat: 31}, zoom: 3.5},
            width: 800, height: 800};

var config = {mapboxAccessToken: "pk.eyJ1IjoibWRlYm9uZSIsImEiOiJja3YzeTVpM28wNWdwMnlvOHFpZGhwNXN6In0.qr3nfqRBmbXuzWeHl2XoDw"};

Plotly.newPlot('myDiv', layout, config)