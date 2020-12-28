/**
 *@description arcgis 地图服务 ArcGisMapServerImageryProvider
 */
var Cesium = require('cesium')
require("cesium/Build/Cesium/Widgets/widgets.css")


var viewer = new Cesium.Viewer("root");

// Add an ArcGIS MapServer imagery layer
var imageryLayers = viewer.imageryLayers;
imageryLayers.addImageryProvider(
	new Cesium.ArcGisMapServerImageryProvider({
		url:
			"https://nationalmap.gov.au/proxy/http://services.ga.gov.au/site_3/rest/services/Electricity_Infrastructure/MapServer",
	})
);

// Start off looking at Australia.
viewer.camera.setView({
	destination: Cesium.Rectangle.fromDegrees(
		114.591,
		-45.837,
		148.97,
		-5.73
	),
}); 
