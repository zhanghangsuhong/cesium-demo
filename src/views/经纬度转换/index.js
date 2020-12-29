/**
 * @description 经纬度转换
 * Cesium4种获取鼠标点击位置 https://blog.csdn.net/weitaming1/article/details/95067688
 * Cesium中的几种坐标和相互转换 https://blog.csdn.net/sinat_38818576/article/details/83650014
 * https://www.cnblogs.com/aizai846/p/11846929.html
 * https://www.cnblogs.com/telwanggs/p/11289954.html
 * WGS84经纬度坐标系（没有实际的对象）、WGS84弧度坐标系（Cartographic）、笛卡尔空间直角坐标系（Cartesian3）、平面坐标系（Cartesian2），4D笛卡尔坐标系（Cartesian4）,但是在Cesium中没有实际的对象来描述WGS84坐标，都是以弧度的方式来进行运用的也就是Cartographic类
 * 经纬度和弧度的转换
 * 经纬度转弧度：var radians=Cesium.CesiumMath.toRadians（degrees）;
 * 弧度转经纬度：var degrees=Cesium.CesiumMath.toDegrees（radians）;
 * Cesium中源码的转换方法，其实就是：弧度= π/180×经纬度角度；经纬度角度=180/π×弧度。
 * 自定义 letflet风格 气泡窗口 https://blog.csdn.net/zlx312/article/details/79824940
 */

var Cesium = require('cesium')
require("cesium/Build/Cesium/Widgets/widgets.css")


var viewer = new Cesium.Viewer('root', {
	baseLayerPicker: true,//地图切换控件(底图以及地形图)是否显示,默认显示true
	fullscreenButton: false,//全屏按钮,默认显示true
	geocoder: false,//地名查找,默认true
	timeline: false,//时间线,默认true
	vrButton: false,//双屏模式,默认不显示false
	homeButton: false,//主页按钮，默认true
	infoBox: false,//点击要素之后显示的信息,默认true
	selectionIndicator: true,//选中元素显示,默认true
	navigationHelpButton: false,//导航帮助说明,默认true
	navigationInstructionsInitiallyVisible: false,
	automaticallyTrackDataSourceClocks: true,//自动追踪最近添加的数据源的时钟设置,默认true
	sceneModePicker: false
})
var coordinates = document.getElementById('coordinates')

var cartographic1 = proj4('EPSG:' + 3857, 'EPSG:4326', [12445986.749812808, 2460330.5958780753])
var cartographic2 = proj4('EPSG:' + 3857, 'EPSG:4326', [12450572.971510038, 2462313.1812992743])
var initExtent = new Cesium.Rectangle(cartographic1[0], cartographic1[1], cartographic2[0], cartographic2[1])

var mapPosition = Cesium.Cartesian3.fromDegrees(102.468086, 37.933179, 3500);
var position = Cesium.Cartesian3.fromDegrees(102.468086, 37.933179);

var models = [
	{
		id: "1_db",
		name: "测试3D模型1_db",
		type: "gltf",
		position: position,
		uri: "/cesium/3DModel/test/gltf/1_db.gltf"
	},
	{
		id: "1_deng",
		name: "测试3D模型1_deng",
		type: "gltf",
		position: position,
		uri: "/cesium/3DModel/test/gltf/1_deng.gltf"
	},
	{
		id: "1_men",
		name: "测试3D模型1_men",
		type: "gltf",
		position: position,
		uri: "/cesium/3DModel/test/gltf/1_men.gltf"
	},
	{
		id: "1_my",
		name: "测试3D模型1_my",
		type: "gltf",
		position: position,
		uri: "/cesium/3DModel/test/gltf/1_my.gltf"
	},
	{
		id: "1_pao",
		name: "测试3D模型1_pao",
		type: "gltf",
		position: position,
		uri: "/cesium/3DModel/test/gltf/1_pao.gltf"
	},
	{
		id: "1_w",
		name: "测试3D模型1_w",
		type: "gltf",
		position: position,
		uri: "/cesium/3DModel/test/gltf/1_w.gltf"
	},
	{
		id: "1_wd",
		name: "测试3D模型1_wd",
		type: "gltf",
		position: position,
		uri: "/cesium/3DModel/test/gltf/1_wd.gltf"
	},
	{
		id: "1_wl",
		name: "测试3D模型1_wl",
		type: "gltf",
		position: position,
		uri: "/cesium/3DModel/test/gltf/1_wl.gltf"
	},
	{
		id: "1_wq",
		name: "测试3D模型1_wq",
		type: "gltf",
		position: position,
		uri: "/cesium/3DModel/test/gltf/1_wq.gltf"
	}]

//定位到指定目标
// viewer.camera.flyTo({
// 	destination: Cesium.Rectangle.fromDegrees(initExtent.west, initExtent.south, initExtent.east, initExtent.north)
// });


!function () {
	setTimeout(() => {
		addArcGisServer()
		// add3DEntityModels(models)
		// flyToPosition(mapPosition)
		// romoveTerrainLayer()
	}, 2000)
}()


function romoveTerrainLayer() {
	if (viewer.terrainProvider) {
		viewer.terrainProvider = new Cesium.EllipsoidTerrainProvider()
	}
	//viewer.terrainProvider = new Cesium.EllipsoidTerrainProvider({});
}


//添加arcgis server地图服务
function addArcGisServer() {
	var arcgisServer = new Cesium.ArcGisMapServerImageryProvider({
		url: "http://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer",
	})

	var imageryLayers = viewer.imageryLayers
	imageryLayers.addImageryProvider(arcgisServer)
}

//添加3D模型
function add3DEntityModels(models) {
	// var heading = Cesium.Math.toRadians(45.0);
	// var pitch = Cesium.Math.toRadians(15.0);
	// var roll = Cesium.Math.toRadians(0.0);
	// var orientation = Cesium.Transforms.headingPitchRollQuaternion(
	// 	position, heading, pitch, roll);
	if (models && models.length > 0) {
		for (var i = 0; i < models.length; i++) {
			var type = null
			if (models[i].type) {
				type = models[i].type
			}
			var entity = viewer.entities.add({
				name: models[i].name,
				//id:models[i].id+Math.random().toString(36).substr(2),
				id: models[i].id,
				type: type,
				position: models[i].position,
				// orientation: orientation,
				model: {
					uri: models[i].uri,
					//distanceDisplayCondition : new Cesium.DistanceDisplayCondition(100, 5000),//设置模型可见范围，100米到5000米
					//maximumScale:12,
					//incrementallyLoadTextures:false,//确定在加载模型后,是否继续加载纹理
				}
			})
			//viewer.trackedEntity = entity;//建议不跟踪定位3D模型，不然锁定视角操作不灵活
		}
	}
}

//地图跳转-地图位置
function flyToPosition(position) {
	viewer.camera.flyTo({ //初始化跳转某个地方
		destination: position
	})
}



//获取手势
var handler3D = new Cesium.ScreenSpaceEventHandler(
	viewer.scene.canvas);

handler3D.setInputAction(function (movement) {
	//可以获取点击处地球表面的世界坐标，不包括模型、倾斜摄影表面。其中ray=viewer.camera.getPickRay(movement.position)。
	var pick = new Cesium.Cartesian2(movement.endPosition.x, movement.endPosition.y);
	if (pick) {
		//获取加载地形后对应的经纬度和高程：地标坐标
		var cartesian = viewer.scene.globe.pick(viewer.camera.getPickRay(pick), viewer.scene);
		if (cartesian) {
			//世界坐标转地理坐标（弧度）
			// 地理坐标系，坐标原点在椭球的质心。
			// 经度：参考椭球面上某点的大地子午面与本初子午面间的两面角。东正西负。
			// 纬度 ：参考椭球面上某点的法线与赤道平面的夹角。北正南负。
			// Cesuim中没有具体的经纬度对象，要得到经纬度首先需要计算为弧度，再进行转换。
			var cartographic = viewer.scene.globe.ellipsoid.cartesianToCartographic(cartesian);
			if (cartographic) {
				//海拔
				var height = viewer.scene.globe.getHeight(cartographic);
				//视角海拔高度
				var he = Math.sqrt(viewer.scene.camera.positionWC.x * viewer.scene.camera.positionWC.x + viewer.scene.camera.positionWC.y * viewer.scene.camera.positionWC.y + viewer.scene.camera.positionWC.z * viewer.scene.camera.positionWC.z);
				var he2 = Math.sqrt(cartesian.x * cartesian.x + cartesian.y * cartesian.y + cartesian.z * cartesian.z);
				//地理坐标（弧度）转经纬度坐标
				//var point=[ cartographic.longitude / Math.PI * 180, cartographic.latitude / Math.PI * 180];
				var point = [Cesium.Math.toDegrees(cartographic.longitude), Cesium.Math.toDegrees(cartographic.latitude)];
				if (!height) {
					height = 0;
				}
				if (!he) {
					he = 0;
				}
				if (!he2) {
					he2 = 0;
				}
				if (!point) {
					point = [0, 0];
				}
				coordinates.innerHTML = "<span id='cd_label' style='margin-left: 10px;font-size:13px;text-align:center;font-family:微软雅黑;color:#edffff;'>" + "视角海拔高度:" + (he - he2).toFixed(2) + "米" + "&nbsp;&nbsp;&nbsp;&nbsp;海拔:" + height.toFixed(2) + "米" + "&nbsp;&nbsp;&nbsp;&nbsp;经度：" + point[0].toFixed(6) + "&nbsp;&nbsp;纬度：" + point[1].toFixed(6) + "</span>";
			}
		}
	}
}, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

// this.cesium._cesiumWidget._creditContainer.style.display = "none";