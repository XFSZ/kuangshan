"use strict"
let activecam;
// 获取 镜头
function getactivecamera() {
  activecam = scene.activeCamera
} 
// 带有 alpha, beta, radius  postion 的 相机动画
function cameraArcRotateAndPostionAnimate(activecam, movepostion, targetposition,alpha, beta, radius){
  let animations = []
    animations = [
     
      // move the camera target
      animLookAt(activecam, targetposition),
      
      ...animArcRotateCameraMove(activecam,alpha,beta,radius),
       // move the camera position
       animMove(activecam, movepostion),
    ];
 
  scene.beginDirectAnimation(activecam, animations, 0, 120, false, 0.8);
}
// 带有 alpha, beta, radius  的 相机动画
function cameraArcRotateAnimate(activecam, targetposition,alpha, beta, radius){
  console.log("this is ArcRotate : ",alpha,beta,radius)
  let animations = []
    animations = [
         // move the camera target
         animLookAt(activecam, targetposition),
      // move the camera position
      ...animArcRotateCameraMove(activecam,alpha,beta,radius),
   
    ];

  scene.beginDirectAnimation(activecam, animations, 0, 120, false, 0.8);
}
// 带有   postion 的 相机动画
function cameraPostionAnimate(activecam, movepostion, targetposition) {
  console.log("this is target : ",targetposition)
  // create two animations that should happen simultaneously
  let animations = []
  animations = [
    // move the camera target
    animLookAt(activecam, targetposition),
    // move the camera position
    animMove(activecam, movepostion),

  ];

  // start both animations
  scene.beginDirectAnimation(activecam, animations, 0, 120, false, 0.8);
}


//camera position  镜头位置
//  function animateCameraToPosition  (cam, speed, frameCount, newPos)  {
//     let ease = new BABYLON.CubicEase();
//     ease.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
//     BABYLON.Animation.CreateAndStartAnimation("cameraposition", cam, "position", speed, frameCount, cam.position, newPos, 0, ease);
//   };

// camera lookup  镜头朝向
//  function animateCameraTargetToPosition  (cam, speed, frameCount, newPos)  {
//     let ease = new BABYLON.CubicEase();
//     ease.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEINOUT);
//     BABYLON.Animation.CreateAndStartAnimation("at5", cam, "target", speed, frameCount, cam.target, newPos, 0, ease);
//   };


function animMove(camera, pos) {
  const anim = new BABYLON.Animation('movecam', 'position', 120, BABYLON.Animation.ANIMATIONTYPE_VECTOR3);
  anim.setKeys([
    { frame: 0, value: camera.position.clone() },
    { frame: 120, value: pos },
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
    { frame: 0, value: camera.target.clone() },
    { frame: 120, value: lookAt },
  ]);
  // easing 
  const easingFun = new BABYLON.CubicEase();
  easingFun.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEOUT);
  anim.setEasingFunction(easingFun);
  return anim;
}
/**
 * @description:ArcRotateCamera 的 alpha beta radius  动画
 * @param {*}
 * @return {*}
 */

function animArcRotateCameraMove(camera, alpha, beta, radius) {
  let alphaAnim = new BABYLON.Animation('movecam', 'alpha', 120, BABYLON.Animation.ANIMATIONTYPE_FLOAT);
  let betaAnim = new BABYLON.Animation('movecam', 'beta', 120, BABYLON.Animation.ANIMATIONTYPE_FLOAT);
  let radiusAnim = new BABYLON.Animation('movecam', 'radius', 120, BABYLON.Animation.ANIMATIONTYPE_FLOAT);
     // reseting the alpha and beta to a much simpler version
    //  alpha = alpha % (Math.PI * 2);
    //  beta = beta % (Math.PI * 2);
    //  if (alpha < 0) {
    //      alpha += Math.PI * 2;
    //  }
    //  if (beta < 0) {
    //      beta += Math.PI * 2;
    //  }
     
     // used to find the shortest curve IE. if angle == 3PI/2 => take the -1PI/2 instead
    //  let alpha = camera.alpha;
    //  if (Math.abs(this.alpha - alpha) > Math.PI) {
    //      alpha = camera.alpha + (Math.PI * 2);
    //  }

    //  let beta = camera.beta;
    //  if (Math.abs(this.beta - beta) > Math.PI) {
    //      beta = camera.beta + (Math.PI * 2);
    //  }
  alphaAnim.setKeys([
    { frame: 0, value: camera.alpha },
    { frame: 120, value: alpha },
  ]);
  betaAnim.setKeys([
    { frame: 0, value: camera.beta },
    { frame: 120, value: beta },
  ]);
  radiusAnim.setKeys([
    { frame: 0, value: camera.radius },
    { frame: 120, value: radius },
  ]);
  // easing
  const easingFun = new BABYLON.CubicEase();
  easingFun.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEOUT);
  alphaAnim.setEasingFunction(easingFun);
  betaAnim.setEasingFunction(easingFun);
  radiusAnim.setEasingFunction(easingFun);
  return [alphaAnim,betaAnim,radiusAnim];
}
