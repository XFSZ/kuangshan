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
function hotSpot(modelname,picnum){
     name = "1"
    // let CoT = new BABYLON.TransformNode("root");
    let advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("GUI", true, scene);
    //let mesh = scene.getTransformNodeByID("root");
    let mesh = scene.getTransformNodeByID(`${modelname}4_${picnum}`);
    console.log(mesh)
   // let hotSpotButton = BABYLON.GUI.Button.CreateImageOnlyButton(`HS_${name}`,`model/pic/btn${name}.jpg`)
    let hotSpotButton = BABYLON.GUI.Button.CreateImageOnlyButton(`HS_${modelname}_${picnum}`,`model/pic/${modelname}4_${picnum}.png`)
    hotSpotButton.width = "112px";
    hotSpotButton.height = "27px";
    hotSpotButton.thickness = 0;
    advancedTexture.addControl(hotSpotButton);
    hotSpotButton.linkWithMesh(mesh);
    // hotSpotButton.onPointerClickObservable.add(() => {
    //  // console.log("fuck me!!!")
    // });
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
let modelHotSpotArr=['A','B','C'];
function initHotSpot(){
  for(let i =0;i<modelHotSpotArr.length;i++){
    if(modelHotSpotArr[i]=='C')
    {    
       for(let j=0;j<6;j++){
      hotSpot(modelHotSpotArr[i],j+1)
    }
    hotSpot(modelHotSpotArr[i],'1_b')
    hotSpot(modelHotSpotArr[i],'2_b')
    }else{
      for(let j=0;j<6;j++){
        hotSpot(modelHotSpotArr[i],j+1)
      }
    }

  }
}



