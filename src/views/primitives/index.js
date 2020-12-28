/**
 *@description primitives
   (1)geometryInstances，它是Primitive最基本的要素之一，定义了绘制要素的几何形状；
   (2)appearance：几何要素显示出来的外观；
   (3)modelMatrix：几何形状的4元素变换矩阵。可提供绘制要素位置并对其进行旋转、平移、缩放等操作。
   (4)show：是否渲染。
 */
var Cesium = require('cesium')
require("cesium/Build/Cesium/Widgets/widgets.css")


var viewer = new Cesium.Viewer("root");
var scene = viewer.scene;


!function () {
  init()
}()


/**
 * @method init 初始化
 */
function init() {
  createBox()
  createBoxOutLine()
  createCircle()
  createCircleOutLine()
}

/**
 * @method createBox  绘制立方体
 */
function createBox() {
  //盒子的3D笛卡尔点（XYZ)
  var dimensions = new Cesium.Cartesian3(1000000.0, 1000000.0, 1000000.0);
  //GPS坐标转世界坐标
  var positionOnEllipsoid = Cesium.Cartesian3.fromDegrees(-90.0, 45.0);
  console.log("positionOnEllipsoid：", JSON.stringify(positionOnEllipsoid))

  //转成Matrix4
  var boxModelMatrix = Cesium.Matrix4.multiplyByTranslation(

    // 常用的有Cesium.Transforms.eastNorthUpToFixedFrame这个方法，这个方法支持通过传入一个中心点，然后获取到中心点的正东正北，和地表法线的方向：
    // x轴指向当前点的东方向。
    // y轴指向当前点的北方向。
    // z轴在椭圆体的方向轴指向表面法线穿过的位置。
    Cesium.Transforms.eastNorthUpToFixedFrame(positionOnEllipsoid),
    new Cesium.Cartesian3(0.0, 0.0, dimensions.z * 0.5),
    new Cesium.Matrix4()
  );

  console.log("boxModelMatrix", JSON.stringify(boxModelMatrix))

  var boxGeometry = Cesium.BoxGeometry.fromDimensions({
    vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,
    dimensions: dimensions,
  });
  var boxGeometryInstance = new Cesium.GeometryInstance({
    geometry: boxGeometry,
    modelMatrix: boxModelMatrix,
    attributes: {
      color: Cesium.ColorGeometryInstanceAttribute.fromColor(
        new Cesium.Color(1.0, 0.0, 0.0, 0.5)
      ),
    },
  });
  scene.primitives.add(
    new Cesium.Primitive({
      geometryInstances: boxGeometryInstance,
      appearance: new Cesium.PerInstanceColorAppearance({
        closed: true,
      }),
    })
  );

}

/**
 * @method createBoxOutLine  绘制只有轮廓的立方体
 */
function createBoxOutLine() {

  var dimensions = new Cesium.Cartesian3(400000.0, 400000.0, 400000.0);

  var positionOnEllipsoid = Cesium.Cartesian3.fromDegrees(-106.0, 45.0);
  var boxModelMatrix = Cesium.Matrix4.multiplyByTranslation(
    Cesium.Transforms.eastNorthUpToFixedFrame(positionOnEllipsoid),
    new Cesium.Cartesian3(0.0, 0.0, dimensions.z * 0.5),
    new Cesium.Matrix4()
  );

  var boxOutlineGeometry = Cesium.BoxOutlineGeometry.fromDimensions({
    dimensions: dimensions,
  });

  var boxOutlineInstance = new Cesium.GeometryInstance({
    geometry: boxOutlineGeometry,
    modelMatrix: boxModelMatrix,
    attributes: {
      color: Cesium.ColorGeometryInstanceAttribute.fromColor(
        Cesium.Color.WHITE
      ),
    },
  });

  scene.primitives.add(
    new Cesium.Primitive({
      geometryInstances: boxOutlineInstance,
      appearance: new Cesium.PerInstanceColorAppearance({
        flat: true,
        renderState: {
          lineWidth: Math.min(2.0, scene.maximumAliasedLineWidth),
        },
      }),
    })
  );

}

/**
 *  @method createCircle 绘制圆形
 */
function createCircle() {
  var circleGeometry = new Cesium.CircleGeometry({
    center: Cesium.Cartesian3.fromDegrees(-95.0, 43.0),
    radius: 250000.0,
    vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,
  });

  var redCircleInstance = new Cesium.GeometryInstance({
    geometry: circleGeometry,
    attributes: {
      color: Cesium.ColorGeometryInstanceAttribute.fromColor(
        new Cesium.Color(1.0, 0.0, 0.0, 0.5)
      ),
    },
  });

  scene.primitives.add(
    new Cesium.Primitive({
      geometryInstances: redCircleInstance,
      appearance: new Cesium.PerInstanceColorAppearance({
        closed: true,
      }),
    })
  );

  circleGeometry = new Cesium.CircleGeometry({
    center: Cesium.Cartesian3.fromDegrees(-90.0, 50.0),
    radius: 250000.0,
    extrudedHeight: 300000.0,
    vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,
  });

  var greenCircleInstance = new Cesium.GeometryInstance({
    geometry: circleGeometry,
    attributes: {
      color: Cesium.ColorGeometryInstanceAttribute.fromColor(
        new Cesium.Color(0.0, 1.0, 0.0, 0.5)
      ),
    },
  });

  scene.primitives.add(
    new Cesium.Primitive({
      geometryInstances: greenCircleInstance,
      appearance: new Cesium.PerInstanceColorAppearance({
        closed: true,
      }),
    })
  );
  circleGeometry = new Cesium.CircleGeometry({
    center: Cesium.Cartesian3.fromDegrees(-85.0, 40.0),
    radius: 400000.0,
    height: 150000.0,
    vertexFormat: Cesium.PerInstanceColorAppearance.VERTEX_FORMAT,
  });

  var blueCircleInstance = new Cesium.GeometryInstance({
    geometry: circleGeometry,
    attributes: {
      color: Cesium.ColorGeometryInstanceAttribute.fromColor(
        Cesium.Color.BLUE
      ),
    },
  });
  scene.primitives.add(
    new Cesium.Primitive({
      geometryInstances: blueCircleInstance,
      appearance: new Cesium.PerInstanceColorAppearance({
        closed: true,
        translucent: false,
      }),
    })
  );

}


/**
 * @method createCircleOutLine 绘制只有圆形的轮廓
 */
function createCircleOutLine() {
  var circleOutlineGeometry = new Cesium.CircleOutlineGeometry({
    center: Cesium.Cartesian3.fromDegrees(-100.0, 40.0),
    radius: 200000.0,
  });
  var circleOutlineInstance = new Cesium.GeometryInstance({
    geometry: circleOutlineGeometry,
    attributes: {
      color: Cesium.ColorGeometryInstanceAttribute.fromColor(
        Cesium.Color.WHITE
      ),
    },
  });
  scene.primitives.add(
    new Cesium.Primitive({
      geometryInstances: circleOutlineInstance,
      appearance: new Cesium.PerInstanceColorAppearance({
        flat: true,
        renderState: {
          lineWidth: Math.min(2.0, scene.maximumAliasedLineWidth),
        },
      }),
    })
  );

  circleOutlineGeometry = new Cesium.CircleOutlineGeometry({
    center: Cesium.Cartesian3.fromDegrees(-95.0, 40.0),
    radius: 100000.0,
    extrudedHeight: 200000.0,
    numberOfVerticalLines: 16,
  });
  circleOutlineInstance = new Cesium.GeometryInstance({
    geometry: circleOutlineGeometry,
    attributes: {
      color: Cesium.ColorGeometryInstanceAttribute.fromColor(
        Cesium.Color.WHITE
      ),
    },
  });
  scene.primitives.add(
    new Cesium.Primitive({
      geometryInstances: circleOutlineInstance,
      appearance: new Cesium.PerInstanceColorAppearance({
        flat: true,
        renderState: {
          lineWidth: Math.min(2.0, scene.maximumAliasedLineWidth),
        },
      }),
    })
  );

}







