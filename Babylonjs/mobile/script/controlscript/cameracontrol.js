"use strict"
let activecam  ;
// 获取 镜头
function getactivecamera(){
activecam =  scene.activeCamera
}

// 第二版 镜头动画
function cameraAnimate(activecam,movepostion,targetposition){
          // create two animations that should happen simultaneously
          const animations = [
            // move the camera position
            animMove(activecam, movepostion),
            // move the camera target
            animLookAt(activecam, targetposition),
        ];
      
        // start both animations
        scene.beginDirectAnimation(activecam, animations, 0, 120, false, 0.8);
}

function animMove(camera, pos) {
  const anim = new BABYLON.Animation('movecam', 'position', 120, BABYLON.Animation.ANIMATIONTYPE_VECTOR3);
  anim.setKeys([
      {frame: 0, value: camera.position.clone()},
      {frame: 120, value: pos},
  ]);
  // easing
  const easingFun = new BABYLON.CubicEase();
  easingFun.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEOUT);
  anim.setEasingFunction(easingFun);
  return anim;
}

function animLookAt(camera, lookAt) {
  const anim = new BABYLON.Animation('lookcam', 'target', 120, BABYLON.Animation.ANIMATIONTYPE_VECTOR3);
  anim.setKeys([
      {frame: 0, value: camera.target.clone()},
      {frame: 120, value: lookAt},
  ]);
  // easing 
  const easingFun = new BABYLON.CubicEase();
  easingFun.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEOUT);
  anim.setEasingFunction(easingFun);
  return anim;
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





