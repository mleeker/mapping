//CREATE MAP
var myMap = L.map("map", {
    center: [39.8283, -98.5795],
    zoom: 4.5
  });

//ADD LAYER TO MAP
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

//ADD IN DATA 
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", function(data) {  

  function styleInfo(feature) {
    return {
      //opacity: 1,
      //fillOpacity: 1,
      fillColor: radiusColor(feature.properties.mag),
      //color: "#000000",
      //radius: getRadius(feature.properties.mag),
      //stroke: true,
      //weight: 0.5
    };
  }

//function radiusColor(mag) {
  //switch (true) {
    //case mag > 5:
      //return "red";
    //case mag > 4:
      //return "orange";
    //case mag > 3:
      //return "yellow";
    //case mag > 2:
      //return "green";
    //case mag > 1:
     // return "blue";
  //}
//}

//function radius(mag) {
  //if (magnitude === 0) {
  //  return 1;
  //}

  //return mag * 6;
//}
L.geoJson(data, {

  pointLayer: function(feature, coordinates){
    return L.circleMarker(coordinates);
  },

  onEachFeature: function(feature, layer) {
    layer.bindPopup("Place:" + feature.properties.place);
  }
}).addTo(myMap)});