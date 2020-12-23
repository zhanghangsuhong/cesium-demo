// 引入整库
var Cesium = require('cesium')
require("cesium/Build/Cesium/Widgets/widgets.css")



var viewer = new Cesium.CesiumWidget('root',{
	
})

var scene = viewer.scene;
var canvas = viewer.canvas;
canvas.setAttribute('tabindex', '0'); // needed to put focus on the canvas
canvas.onclick = function() {
    canvas.focus();
};
var ellipsoid = viewer.scene.globe.ellipsoid;

// disable the default event handlers

// //禁止鼠标的所有操作，对二、三维起作用
// // scene.screenSpaceCameraController.enableInputs = false
// // 禁止鼠标转动操作，对二、三维起作用
// scene.screenSpaceCameraController.enableRotate = false;
// //禁止鼠标倾斜操作，只对三维起作用
// scene.screenSpaceCameraController.enableTilt = false;
// //禁止鼠标平移操作，对二维和哥伦布模式起作用
// scene.screenSpaceCameraController.enableTranslate = false;
// //允许鼠标缩放旋转和平移操作，对三维和哥伦布模式起作用
// scene.screenSpaceCameraController.enableLook = false;
// //禁止鼠标缩放操作，对二、三维起作用
// scene.screenSpaceCameraController.enableZoom = false;

scene.screenSpaceCameraController.enableRotate = false;
scene.screenSpaceCameraController.enableTranslate = false;
scene.screenSpaceCameraController.enableZoom = false;
scene.screenSpaceCameraController.enableTilt = false;
scene.screenSpaceCameraController.enableLook = false;

var startMousePosition;
var mousePosition;
var flags = {
    looking : false,
    moveForward : false,
    moveBackward : false,
    moveUp : false,
    moveDown : false,
    moveLeft : false,
    moveRight : false
};

var handler = new Cesium.ScreenSpaceEventHandler(canvas);

handler.setInputAction(function(movement) {
    flags.looking = true;
    mousePosition = startMousePosition = Cesium.Cartesian3.clone(movement.position);
}, Cesium.ScreenSpaceEventType.LEFT_DOWN);

handler.setInputAction(function(movement) {
    mousePosition = movement.endPosition;
}, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

handler.setInputAction(function(position) {
    flags.looking = false;
}, Cesium.ScreenSpaceEventType.LEFT_UP);

function getFlagForKeyCode(keyCode) {
    switch (keyCode) {
    case 'W'.charCodeAt(0):
        return 'moveForward';
    case 'S'.charCodeAt(0):
        return 'moveBackward';
    case 'Q'.charCodeAt(0):
        return 'moveUp';
    case 'E'.charCodeAt(0):
        return 'moveDown';
    case 'D'.charCodeAt(0):
        return 'moveRight';
    case 'A'.charCodeAt(0):
        return 'moveLeft';
    default:
        return undefined;
    }
}

document.addEventListener('keydown', function(e) {
    var flagName = getFlagForKeyCode(e.keyCode);
    if (typeof flagName !== 'undefined') {
        flags[flagName] = true;
    }
}, false);

document.addEventListener('keyup', function(e) {
    var flagName = getFlagForKeyCode(e.keyCode);
    if (typeof flagName !== 'undefined') {
        flags[flagName] = false;
    }
}, false);

viewer.clock.onTick.addEventListener(function(clock) {
    var camera = viewer.camera;

    if (flags.looking) {
        var width = canvas.clientWidth;
        var height = canvas.clientHeight;

        // Coordinate (0.0, 0.0) will be where the mouse was clicked.
        var x = (mousePosition.x - startMousePosition.x) / width;
        var y = -(mousePosition.y - startMousePosition.y) / height;

        var lookFactor = 0.05;
        camera.lookRight(x * lookFactor);
        camera.lookUp(y * lookFactor);
    }
 
    var cameraHeight = ellipsoid.cartesianToCartographic(camera.position).height;
    var moveRate = cameraHeight / 100.0;

    if (flags.moveForward) {
        camera.moveForward(moveRate);
    }
    if (flags.moveBackward) {
        camera.moveBackward(moveRate);
    }
    if (flags.moveUp) {
        camera.moveUp(moveRate);
    }
    if (flags.moveDown) {
        camera.moveDown(moveRate);
    }
    if (flags.moveLeft) {
        camera.moveLeft(moveRate);
    }
    if (flags.moveRight) {
        camera.moveRight(moveRate);
    }
});
