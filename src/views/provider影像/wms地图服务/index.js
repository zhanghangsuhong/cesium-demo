/**
 *@description wms地图服务 WebMapServiceImageryProvider
 */
var Cesium = require('cesium')
require("cesium/Build/Cesium/Widgets/widgets.css")


var viewer = new Cesium.Viewer("root");

var imageryLayers = viewer.imageryLayers;

var wmsLayer = new Cesium.WebMapServiceImageryProvider({
	url: "https://basemap.nationalmap.gov/arcgis/services/USGSHydroCached/MapServer/WMSServer",
	enablePickFeatures: false,
	layers: "0",
	parameters: {
		service: "WMS",
		format: "image/png",
		transparent: true,
	},
});

imageryLayers.addImageryProvider(wmsLayer);