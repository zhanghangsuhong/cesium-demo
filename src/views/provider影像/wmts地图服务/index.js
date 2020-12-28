/**
 *@description wmts地图服务 WebMapTileServiceImageryProvider
 */
var Cesium = require('cesium')
require("cesium/Build/Cesium/Widgets/widgets.css")


var viewer = new Cesium.Viewer("root");

var imageryLayers = viewer.imageryLayers;

var wmtsLayer = new Cesium.WebMapTileServiceImageryProvider({
	url: 'http://basemap.nationalmap.gov/arcgis/rest/services/USGSShadedReliefOnly/MapServer/WMTS',
	layer: 'USGSShadedReliefOnly',
	style: 'default',
	format: 'image/jpeg',
	tileMatrixSetID: 'default028mm',
	maximumLevel: 19,
	credit: 'U. S. Geological Survey'
})
imageryLayers.addImageryProvider(wmtsLayer);