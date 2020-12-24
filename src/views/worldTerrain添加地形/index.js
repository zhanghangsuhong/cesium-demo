/**
 *@description Terrain添加地形
 */
var Cesium = require('cesium')
require("cesium/Build/Cesium/Widgets/widgets.css")


var worldTerrain = Cesium.createWorldTerrain({
  requestWaterMask: true,
  requestVertexNormals: true,
});

var viewer = new Cesium.Viewer("root", {
  terrainProvider: worldTerrain,
});
viewer.scene.globe.enableLighting = true;

var target = new Cesium.Cartesian3(
  300770.50872389384,
  5634912.131394585,
  2978152.2865545116
);
var offset = new Cesium.Cartesian3(
  6344.974098678562,
  -793.3419798081741,
  2499.9508860763162
);
viewer.camera.lookAt(target, offset);
viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);


