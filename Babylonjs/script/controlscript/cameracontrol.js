"use strict"
let activecam  ;
function getactivecamera(){
activecam =  scene.activeCamera
}

 function animateCameraToPosition  (cam, speed, frameCount, newPos)  {
    let ease = new BABYLON.CubicEase();
    ease.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
    BABYLON.Animation.CreateAndStartAnimation("cameraposition", cam, "position", speed, frameCount, cam.position, newPos, 0, ease);
  };
 function animateCameraTargetToPosition  (cam, speed, frameCount, newPos)  {
    let ease = new BABYLON.CubicEase();
    ease.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
    BABYLON.Animation.CreateAndStartAnimation("at5", cam, "target", speed, frameCount, cam.target, newPos, 0, ease);
  };




