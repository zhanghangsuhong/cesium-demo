/**
 *@description Cesium 广告牌
 */

var Cesium = require('cesium')
require("cesium/Build/Cesium/Widgets/widgets.css")


var viewer = new Cesium.Viewer('root',{})
var scene = viewer.scene

scene.primitives.add({
		position: Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883),
		billboard: {
			image: require('../../assets/images/logo.jpg'),
			width:50,
			height:50
		},
})
// viewer.entities.add({
// 	position: Cesium.Cartesian3.fromDegrees(-75.59777, 40.03883),
// 	billboard: {
// 		image: require('../../assets/images/logo.jpg'),
// 		width:50,
// 		height:50
// 	},
// })