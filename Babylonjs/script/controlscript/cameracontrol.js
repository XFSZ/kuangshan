"use strict"
let activecam  ;
// 获取 镜头
function getactivecamera(){
activecam =  scene.activeCamera
}

//camera position  镜头位置
 function animateCameraToPosition  (cam, speed, frameCount, newPos)  {
    let ease = new BABYLON.CubicEase();
    ease.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
    BABYLON.Animation.CreateAndStartAnimation("cameraposition", cam, "position", speed, frameCount, cam.position, newPos, 0, ease);
  };

// camera lookup  镜头朝向
 function animateCameraTargetToPosition  (cam, speed, frameCount, newPos)  {
    let ease = new BABYLON.CubicEase();
    ease.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
    BABYLON.Animation.CreateAndStartAnimation("at5", cam, "target", speed, frameCount, cam.target, newPos, 0, ease);
  };




