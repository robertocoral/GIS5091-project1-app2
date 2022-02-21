require([
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/Layer",
    "esri/widgets/Search",
    ], function (Map, MapView, Layer, Search) {
        var map = new Map({
            basemap: "arcgis-terrain"
        });

        var view = new MapView({
            map: map,
            container: "viewDiv",
            zoom: 5,
            center: [-95,39]
        });
  
        var searchWidget = new Search({
            view: view
        });
  
        view.ui.add(searchWidget, {
            position: "top-right"
        });

        var nationalParks = Layer.fromPortalItem({
            portalItem: {
                id: "ccb7e9368789451a91269f6976b4dbd9"
            }
        }).then(addLayer)
          .catch(rejection);
  
        var airports = Layer.fromPortalItem({
            portalItem: {
                id: "6c917a24cbdb4ecf98f49f918a27b906"
            }
        }).then(addLayer)
          .catch(rejection);
  
        var trails = Layer.fromPortalItem({
            portalItem: {
                id: "0086120c2bda4f929a931147a4c6f542"
            }
        }).then(addLayer)
          .catch(rejection);

        function addLayer(trails) {
            map.add(trails);
        }
        function rejection(error) {
            console.log("Layer failed to load: ", error);
        }
});
