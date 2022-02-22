require([
    "esri/config",
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/FeatureLayer",
    "esri/widgets/Search"
    ], function (esriConfig,Map, MapView, FeatureLayer, Search) {
  
        esriConfig.apiKey = "AAPK46f57464803c4f51ad1e192af78e31f82ceOIxvtHx2AdmAvfFMB5rMhnid1IlMzs_i3su5KhQVNLfG1_P84UEJ3h1YtpCu6";
  
        var map = new Map({
            basemap: "arcgis-terrain"
        });

        var view = new MapView({
            map: map,
            container: "viewDiv",
            zoom: 6,
            center: [-95,39]
        });
  
        var searchWidget = new Search({
            view: view
        });
        view.ui.add(searchWidget, {
            position: "top-right"
        });

        const popupNationalPark = {
            "title": "National Park",
            "content": "<b>Name:</b> {Name}<br><b>Area:</b> {SQMI} sq mi<br>"
        }
        const nationalParks = new FeatureLayer({
            url: "https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/USA_Parks/FeatureServer",
            outFields: ["Name","SQMI"],
            popupTemplate: popupNationalPark
        });
        nationalParks.definitionExpression = "Name LIKE '%National Park%'";
        map.add(nationalParks);
  
        const popupAirports = {
            "title": "Airport",
            "content": "<b>Name:</b> {NAME}<br><b>Passengers:</b> {PASSENGERS}<br>"
        }
        const airports = new FeatureLayer({
            url: "https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/USA_Airports_by_scale/FeatureServer",
            outFields: ["NAME","PASSENGERS"],
            popupTemplate: popupAirports
        });
        map.add(airports);
  
        const popupTrails = {
            "title": "Trail",
            "content": "<b>Name:</b> {TRLNAME}<br><b>Surface:</b> {TRLSURFACE}<br><b>Type:</b> {TRLTYPE}<br><b>Status:</b> {TRLSTATUS}<br><b>Use:</b> {TRLUSE}"
        }
        const trails = new FeatureLayer({
            url: "https://services2.arcgis.com/FiaPA4ga0iQKduv3/arcgis/rest/services/National_Park_Service_Trails/FeatureServer",
            outFields: ["TRLNAME", "TRLSURFACE", "TRLTYPE", "TRLSTATUS", "TRLUSE"],
            popupTemplate: popupTrails
        });
        map.add(trails);
  
});
