"use strict"

function loadPic(){

     //create box 
     var faceColors = [];
     faceColors[0]=BABYLON.Color3.Blue();
     faceColors[1]=BABYLON.Color3.Red();
     faceColors[2]=BABYLON.Color3.Green();
     faceColors[3]=BABYLON.Color3.White();
     faceColors[4]=BABYLON.Color3.Yellow();
     faceColors[5] = BABYLON.Color3.Black();
 
     var options = {
         faceColors: faceColors
     };
 
     var box = BABYLON.MeshBuilder.CreateBox("Box", options, scene, true);
 
     //create a Center of Transformation
     var CoT = new BABYLON.TransformNode("root"); 
     CoT.position = new BABYLON.Vector3(1,2,1);
     box.parent = CoT;  //apply to Box
    // box.position.z = 1;

    const mySpriteManagerPic = new BABYLON.SpriteManager("testpic", "model/pic/bg.jpg", 2000, {width: 200, height: 180},scene );
    const tree = new BABYLON.Sprite("tree", mySpriteManagerPic);
    tree.position =new BABYLON.Vector3(1, 1, 1);
    console.log(tree)
}
const setCamHotspot = (cam, target, position, speed = defaulSpeed, frameCount = defaulFrameCount) => {
    animateCameraTargetToPosition(cam, speed, frameCount, target);
    animateCameraToPosition(cam, speed, frameCount, position);
  
    return frameCount / speed * 1000;
  };
function hotSpot(name){
     name = "1"
    // let CoT = new BABYLON.TransformNode("root");
    let advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("GUI", true, scene);
    let mesh = scene.getTransformNodeByID("root");
    console.log(mesh)
   // let hotSpotButton = BABYLON.GUI.Button.CreateImageOnlyButton(`HS_${name}`,`model/pic/btn${name}.jpg`)
    let hotSpotButton = BABYLON.GUI.Button.CreateImageOnlyButton(`HS_name`,`model/pic/bg.jpg`)
    // hotSpotButton.width = "36px";
    // hotSpotButton.height = "36px";
    hotSpotButton.thickness = 0;
    advancedTexture.addControl(hotSpotButton);
    hotSpotButton.linkWithMesh(mesh);
    hotSpotButton.onPointerClickObservable.add(() => {
      console.log("fuck me!!!")
    });
   // hotSpotButton.onPointerClickObservable.add(() => {
  //      let ct = setCamHotspot(scene.getCameraByID("Camera") , new BABYLON.Vector3(0, 1.517, 0.014), new BABYLON.Vector3(0.6814, 1.8248, 0.679));
  //      console.log("this is btn : ",ct)
        //currentAnimation = "BaShou";
      //  changeAllHotspot(false);
    //     setTimeout(() => {
    //       let at = playAnimation(currentAnimation, scene);
    //       setTimeout(() => {
    //         document.getElementById("hotspotInfo").style.display = "flex";
    //       }, at);
    //     }, ct);
    //     document.getElementById("menu").style.display = "none";
    //     setHotspotInfo(
    //       "Confortable handle with rubber protection\r",
    //       "The Ergonomic designed handle, make it comfortable for carrying.");
  //     });
}
// var id = location.search;
// let params = decodeURI(id).replace(/[^\d]/g, "");
// var id = localStorage.getItem("id")
// let params = id
// var animArr = [
//     { name: "XuanHuiPoSuiJi", val: { exploit: "XuanHuiPoSuiJi_BaoZha", exploitout: "XuanHuiPoSuiJi_BaoZha_Inout", inout: "XuanHuiPoSuiJi_inout" } },
//     { name: "YuanZhuiPoSuiJi", val: { exploit: "YuanZhuiPoSuiJi_BaoZha", exploitout: "YuanZhuiPoSuiJi_BaoZha_Inout", inout: "YuanZhuiPoSuiJi_inout" } },
//     { name: "ZhiShaJi", val: { exploit: "ZhiShaJi_BaoZha", exploitout: "ZhiShaJi_BaoZha_Inout", inout: "ZhiShaJi_inout" } }]


// function initAnimation(animationName) {
//     setTimeout(function () {
//         let ag = scene.getAnimationGroupByName(animationName);
//         ag.start(false, 2, ag.from, ag.to)
//         // setTimeout(()=>{mouseEvenTimeOut=false})
//     }, 1000);

// }
// // function startAnimation(animationName) {
// //     let ag = scene.getAnimationGroupByName(animationName);
// //     ag.start()
// // }
// window.onload = function () {
//     (function () {
//         if (params == '1') {
//             initAnimation('XuanHuiPoSuiJi_inout');
//         }
//         if (params == '2') {
//             initAnimation('YuanZhuiPoSuiJi_inout');
//         }
//         if (params == '3') {
//             initAnimation('ZhiShaJi_inout');
//         }
//     })()
// }
