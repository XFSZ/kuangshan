"use strict"
// var idw = location.search;
// let paramsw = decodeURI(idw).replace(/[^\d]/g, "");
var id = localStorage.getItem("id")
var paramsw = id;
let nextModelAnim = paramsw - 1;      //目前是第几个model动画
let currenModelAnim = nextModelAnim;  //上一个动画
let nextColor = "";      //目前是第几个model动画
let currenColor = nextColor;  //上一个动画
var coloranim = [];               //颜色动画
var modelanim = [];               //模型动画
var displayanim = [];             //爆炸动画
let mouseEvenTimeOut = false     //按钮点击事件
let init = true // 是否为初始化
// 模型 事件 对照关系 
let animationArr = [
    {
        btnName: "modelbtn1", name: "XuanHuiPoSuiJi", exploitd: false,
        val: { exploit: "XuanHuiPoSuiJi_BaoZha", exploitout: "XuanHuiPoSuiJi_BaoZha_Inout", inout: "XuanHuiPoSuiJi_inout" },
        cameraAnimNormolPosition: [60, 60, new BABYLON.Vector3(0, 0, 2.5)],
        cameraAnimExploitPosition: [60, 60, new BABYLON.Vector3(0, 0, 2.865)],
        cameraAnimTargetNormolPosition: [60, 60, new BABYLON.Vector3(0, 0.5, 0)],
        cameraAnimTargetExploitPosition: [60, 60, new BABYLON.Vector3(0, 0.846, 0)]
    },
    {
        btnName: "modelbtn2", name: "YuanZhuiPoSuiJi", exploitd: false,
        val: { exploit: "YuanZhuiPoSuiJi_BaoZha", exploitout: "YuanZhuiPoSuiJi_BaoZha_Inout", inout: "YuanZhuiPoSuiJi_inout" },
        cameraAnimNormolPosition: [60, 60, new BABYLON.Vector3(0, 0, 2)],
        cameraAnimExploitPosition: [60, 60, new BABYLON.Vector3(0, 0, 1.8)],
        cameraAnimTargetNormolPosition: [60, 60, new BABYLON.Vector3(0, 0.5, 0)],
        cameraAnimTargetExploitPosition: [60, 60, new BABYLON.Vector3(0, 0.6, 0)]
    },
    {
        btnName: "modelbtn3", name: "ZhiShaJi", exploitd: false,
        val: { exploit: "ZhiShaJi_BaoZha", exploitout: "ZhiShaJi_BaoZha_Inout", inout: "ZhiShaJi_inout" },
        cameraAnimNormolPosition: [60, 60, new BABYLON.Vector3(0, 0, 2.5)],
        cameraAnimExploitPosition: [60, 60, new BABYLON.Vector3(0, 0, 2.865)],
        cameraAnimTargetNormolPosition: [60, 60, new BABYLON.Vector3(0, 0.3, 0)],
        cameraAnimTargetExploitPosition: [60, 60, new BABYLON.Vector3(0, 0.3, 0)]
    }
]

let colorArr = [
    { btnName: 'colorbtn1', name: 'blue', color: 'blue' },
    { btnName: 'colorbtn2', name: 'yellow', color: 'yellow' },
    { btnName: 'colorbtn3', name: 'grey', color: 'grey' }
]

// 入场动画
function animDirection(anim, val) {
    anim.setDirection(val)
    anim.setSpeed(1.2)
    anim.play()
}
// 爆炸动画
function animationStart(animationName, keys,animCamera) {

    let ag = scene.getAnimationGroupByName(animationName);
    if (keys) {
        ag.start(false, 4, ag.from, ag.to)
        let activecam1 =  scene.getCameraByID("Camera") 
        cameraAnimate(activecam1,...animCamera.cameraAnimExploitPosition,...animCamera.cameraAnimTargetExploitPosition)
    }
    else {
        ag.start(false, 4, ag.to, ag.from)
        let activecam1 =  scene.getCameraByID("Camera") 
        cameraAnimate(activecam1,...animCamera.cameraAnimNormolPosition,...animCamera.cameraAnimTargetNormolPosition)
    }
    return ag.to * (1000 / 4) + 100
}
// 退场动画
function animationInOut(animationName, keys) {
    let ag = scene.getAnimationGroupByName(animationName);
    if (keys == "in") {
        ag.start(false, 4, ag.from, ag.to)
    }
    if (keys == "out") {
        ag.start(false, 4, ag.to, ag.from)
    }
    if (keys == "exploitd") {
        ag.start(false, 4, ag.from, ag.to)
    }
    return ag.to * (1000 / 4) + 100
}
// 退场逻辑   已爆炸的执行 爆炸退场  未爆炸的执行 普通退场
function modelChange(currenModelAnim, nextModelAnim) {
    // 退场
    let timeout = 1000;
    let animIn = animationArr.filter((value, index) => { if (value.btnName == nextModelAnim) { return value } })
    let animOut = animationArr.filter((value, index) => { if (value.btnName == currenModelAnim) { return value } })
    if (animOut[0].exploitd) {
        // 已爆炸
        timeout = animationInOut(animOut[0].val.exploitout, "exploitd")
        animOut[0].exploitd = false;
        resetExploitBtn();    // 重置 爆炸按钮 

    } else {
        //未爆炸
        timeout = animationInOut(animOut[0].val.inout, "out")
    }
    let activecam1 =  scene.getCameraByID("Camera") 
    cameraAnimate(activecam1,...animIn[0].cameraAnimNormolPosition,...animIn[0].cameraAnimTargetNormolPosition)
    let inTimeOut = 1000;
    inTimeOut = animationInOut(animIn[0].val.inout, "in")
    setTimeout(() => { mouseEvenTimeOut = false }, inTimeOut)


}

// 爆炸按钮复位
function resetExploitBtn() {
    let direction = -1;
    animDirection(displayanim[0].anim, direction);
    displayanim[0].mouse_event = true;

}
// 颜色复位
function resetColorBtn() {
    // let direction = -1;
    // animDirection(displayanim[0].anim, direction);
    // displayanim[0].mouse_event = true;
    animfunc('colorbtn2', coloranim)
}

// 爆炸动画逻辑  
function modelExploit(name) {
    let timeout = 1000;
    let animIndex = animationArr.filter((value, index) => { if (value.btnName == name) { return value } })
    animIndex[0].exploitd = !animIndex[0].exploitd;
    timeout = animationStart(animIndex[0].val.exploit, animIndex[0].exploitd,animIndex[0])
    setTimeout(() => { mouseEvenTimeOut = false }, timeout)

}
// 入场动画逻辑  入场的打开 其他都关闭
function animfunc(name, anims, type) {
    // if(name )
    for (let i = 0; i < anims.length; i++) {
        if (name == anims[i].name) {
            let direction = 1
            if (type == "display") {
                direction = anims[i].mouse_event ? 1 : -1;
            }
            animDirection(anims[i].anim, direction);
            anims[i].mouse_event = !anims[i].mouse_event;
        }
        else {
            let direction = -1;
            animDirection(anims[i].anim, direction);
            anims[i].mouse_event = true;
        }
    }
}

// 颜色按钮点击事件 
function onColorBtn(name) {
    if (name == 'colorbtn1') {
        materialYuanZhuiPoSuiJiBlue();
        materialXuanHuiPoSuiJiBlue();
        materialZhiShaJiBlue();
    }
    if (name == 'colorbtn2') {
        materialYuanZhuiPoSuiJiYellow();
        materialXuanHuiPoSuiJiYellow();
        materialZhiShaJiYellow();
    }
    if (name == 'colorbtn3') {
        materialYuanZhuiPoSuiJiBlack();
        materialXuanHuiPoSuiJiBlack();
        materialZhiShaJiBlack();
    }
}


function mouseup(type, name) {
    let animdata = [];
    //执行 颜色 切换时执行的动作
    if (type == "color") {
        animdata = coloranim;
        currenColor = nextColor;
        nextColor = name;
        if (currenColor !== nextColor) {
            onColorBtn(nextColor)
        }
        animfunc(name, animdata, type)
    }
    //是否被点击
    if (!mouseEvenTimeOut) {
        //点击model切换按钮时执行的动作

        if (type == "model") {
            animdata = modelanim;
            currenModelAnim = nextModelAnim;
            nextModelAnim = name;
            if (currenModelAnim !== nextModelAnim) {
                modelChange(currenModelAnim, nextModelAnim);
                // getactivecamera()
                // animateCameraToPosition(activecam,10, 600,new BABYLON.Vector3(100, 100, 200))
                mouseEvenTimeOut = true
            }
            if (init) {
                mouseEvenTimeOut = true
                init = false
                setTimeout(() => { mouseEvenTimeOut = false }, 2000)
            }

        }
        // 点击爆炸按钮时执行的动作
        if (type == "display") {
            animdata = displayanim;
            modelExploit(nextModelAnim)
            mouseEvenTimeOut = true
        }
        animfunc(name, animdata, type)
    }



};
// svg按钮 渲染
function btnrander(type, name, path) {
    let animData = {
        wrapper: document.getElementById(name),
        animType: "svg",
        loop: false,
        prerender: true,
        autoplay: false,
        // speed:2,
        path: path
    };
    let anim = bodymovin.loadAnimation(animData);
    if (type == "color") {
        coloranim.push({ name: name, mouse_event: true, anim: anim })
    }
    if (type == "model") {
        modelanim.push({ name: name, mouse_event: true, anim: anim })
    }
    if (type == "display") {
        displayanim.push({ name: name, mouse_event: true, anim: anim })
    }

}
//材质调整 XuanHuiPoSuiJi Black
function materialXuanHuiPoSuiJiBlack() {

    let M_XuanHuiPoSuiJi_AN_Screw_Steel = scene.getMaterialByID("M_XuanHuiPoSuiJi_AN_Screw_Steel");
    let M_XuanHuiPoSuiJi_Screw_Steel = scene.getMaterialByID("M_XuanHuiPoSuiJi_Screw_Steel");
    let M_XuanHuiPoSuiJi_Paint_Main = scene.getMaterialByID("M_XuanHuiPoSuiJi_Paint_Main");

    M_XuanHuiPoSuiJi_Paint_Main.albedoColor = new BABYLON.Color3(0.07058823529411765, 0.07058823529411765, 0.07058823529411765);
    M_XuanHuiPoSuiJi_Paint_Main.metallic = 1;
    M_XuanHuiPoSuiJi_Paint_Main.roughness = 0.2;
    M_XuanHuiPoSuiJi_Paint_Main.bumpTexture.level = 0.02;

    M_XuanHuiPoSuiJi_AN_Screw_Steel.albedoColor = new BABYLON.Color3(0.1411764705882353, 0.09411764705882353, 0);
    M_XuanHuiPoSuiJi_AN_Screw_Steel.roughness = 0.24;

    M_XuanHuiPoSuiJi_Screw_Steel.albedoColor = new BABYLON.Color3(0.1411764705882353, 0.09411764705882353, 0);
    M_XuanHuiPoSuiJi_Screw_Steel.roughness = 0.24;
}
//材质调整 XuanHuiPoSuiJi Blue
function materialXuanHuiPoSuiJiBlue() {
    let M_XuanHuiPoSuiJi_AN_Screw_Steel = scene.getMaterialByID("M_XuanHuiPoSuiJi_AN_Screw_Steel");
    let M_XuanHuiPoSuiJi_Screw_Steel = scene.getMaterialByID("M_XuanHuiPoSuiJi_Screw_Steel");
    let M_XuanHuiPoSuiJi_Paint_Main = scene.getMaterialByID("M_XuanHuiPoSuiJi_Paint_Main");
    M_XuanHuiPoSuiJi_Paint_Main.albedoColor = new BABYLON.Color3(0.00784313725490196, 0.047058823529411764, 0.11372549019607843);
    M_XuanHuiPoSuiJi_Paint_Main.bumpTexture.level = 0.5;
    M_XuanHuiPoSuiJi_Paint_Main.metallic = 0.27;
    M_XuanHuiPoSuiJi_Paint_Main.roughness = 0.19;

    M_XuanHuiPoSuiJi_AN_Screw_Steel.albedoColor = new BABYLON.Color3(0.03, 0.03, 0.03);
    M_XuanHuiPoSuiJi_AN_Screw_Steel.roughness = 0.24;

    M_XuanHuiPoSuiJi_Screw_Steel.albedoColor = new BABYLON.Color3(0.03, 0.03, 0.03);
    M_XuanHuiPoSuiJi_Screw_Steel.roughness = 0.24;
}
//材质调整  XuanHuiPoSuiJi Yellow
function materialXuanHuiPoSuiJiYellow() {
    let M_XuanHuiPoSuiJi_AN_Screw_Steel = scene.getMaterialByID("M_XuanHuiPoSuiJi_AN_Screw_Steel");
    let M_XuanHuiPoSuiJi_Screw_Steel = scene.getMaterialByID("M_XuanHuiPoSuiJi_Screw_Steel");
    let M_XuanHuiPoSuiJi_Paint_Main = scene.getMaterialByID("M_XuanHuiPoSuiJi_Paint_Main");
    M_XuanHuiPoSuiJi_Paint_Main.albedoColor = new BABYLON.Color3(0.36470588235294116, 0.18823529411764706, 0);
    M_XuanHuiPoSuiJi_Paint_Main.bumpTexture.level = 0.45;
    M_XuanHuiPoSuiJi_Paint_Main.metallic = 0.2;
    M_XuanHuiPoSuiJi_Paint_Main.roughness = 0.14;

    M_XuanHuiPoSuiJi_AN_Screw_Steel.albedoColor = new BABYLON.Color3(0.03, 0.03, 0.03);
    M_XuanHuiPoSuiJi_AN_Screw_Steel.roughness = 0.24;

    M_XuanHuiPoSuiJi_Screw_Steel.albedoColor = new BABYLON.Color3(0.03, 0.03, 0.03);
    M_XuanHuiPoSuiJi_Screw_Steel.roughness = 0.24;
}
//材质调整 ZhiShaJi Black
function materialZhiShaJiBlack() {

    let M_Paint_Less = scene.getMaterialByID("M_Paint_Less");
    let M_Paint_Main = scene.getMaterialByID("M_Paint_Main");
    M_Paint_Main.albedoColor = new BABYLON.Color3(0.07058823529411765, 0.07058823529411765, 0.07058823529411765);
    M_Paint_Main.metallic = 1;
    M_Paint_Main.roughness = 0.2;
    M_Paint_Main.bumpTexture.level = 0.02;

    M_Paint_Less.albedoColor = new BABYLON.Color3(0.34901960784313724, 0.34901960784313724, 0.34901960784313724);
    M_Paint_Less.metallic = 0;
    M_Paint_Less.roughness = 0.35;
    M_Paint_Less.metallicF0Factor = 0.62;
    M_Paint_Less.bumpTexture.level = 0.15;
}
//材质调整 ZhiShaJi Blue
function materialZhiShaJiBlue() {
    let M_Paint_Less = scene.getMaterialByID("M_Paint_Less");
    let M_Paint_Main = scene.getMaterialByID("M_Paint_Main");
    M_Paint_Main.albedoColor = new BABYLON.Color3(0.00784313725490196, 0.047058823529411764, 0.11372549019607843);
    M_Paint_Main.bumpTexture.level = 0.5;
    M_Paint_Main.metallic = 0.27;
    M_Paint_Main.roughness = 0.19;


    M_Paint_Less.albedoColor = new BABYLON.Color3(0.09803921568627451, 0, 0);
    M_Paint_Less.metallic = 0;
    M_Paint_Less.roughness = 0.35;
    M_Paint_Less.metallicF0Factor = 0.62;
    M_Paint_Less.bumpTexture.level = 0.15;

}
//材质调整 ZhiShaJi Yellow
function materialZhiShaJiYellow() {
    let M_Paint_Less = scene.getMaterialByID("M_Paint_Less");
    let M_Paint_Main = scene.getMaterialByID("M_Paint_Main");
    M_Paint_Main.albedoColor = new BABYLON.Color3(0.36470588235294116, 0.18823529411764706, 0);
    M_Paint_Main.bumpTexture.level = 0.45;
    M_Paint_Main.metallic = 0.2;
    M_Paint_Main.roughness = 0.14;

    M_Paint_Less.albedoColor = new BABYLON.Color3(0.23921568627450981, 0.23921568627450981, 0.23921568627450981);
    M_Paint_Less.metallic = 1;
    M_Paint_Less.roughness = 0.05;
    M_Paint_Less.metallicF0Factor = 0.5;
    M_Paint_Less.bumpTexture.level = 0.15;
}


//材质调整 YuanZhuiPoSuiJi  Black
function materialYuanZhuiPoSuiJiBlack() {

    let M_YuanZhuiPoSuiJi_Paint_Main = scene.getMaterialByID("M_YuanZhuiPoSuiJi_Paint_Main");
    let M_YuanZhuiPoSuiJi_Logo_Texture = scene.getMaterialByID("M_YuanZhuiPoSuiJi_Logo_Texture");
    let M_YuanZhuiPoSuiJi_Metal_Steel_Silver = scene.getMaterialByID("M_YuanZhuiPoSuiJi_Metal_Steel_Silver");
    let M_YuanZhuiPoSuiJi_Paint_Less = scene.getMaterialByID("M_YuanZhuiPoSuiJi_Paint_Less");

    M_YuanZhuiPoSuiJi_Paint_Main.albedoColor = new BABYLON.Color3(0.07058823529411765, 0.07058823529411765, 0.07058823529411765);
    M_YuanZhuiPoSuiJi_Paint_Main.metallic = 1;
    M_YuanZhuiPoSuiJi_Paint_Main.roughness = 0.2;
    M_YuanZhuiPoSuiJi_Paint_Main.bumpTexture.level = 0.02;

    M_YuanZhuiPoSuiJi_Metal_Steel_Silver.albedoColor = new BABYLON.Color3(0.41568627450980394, 0.28627450980392155, 0.00392156862745098);
    M_YuanZhuiPoSuiJi_Metal_Steel_Silver.roughness = 0.26;

    M_YuanZhuiPoSuiJi_Paint_Less.albedoColor = new BABYLON.Color3(0.23921568627450981, 0.23921568627450981, 0.23921568627450981);
    M_YuanZhuiPoSuiJi_Paint_Less.metallic = 1;
    M_YuanZhuiPoSuiJi_Paint_Less.roughness = 0.05;
    M_YuanZhuiPoSuiJi_Paint_Less.metallicF0Factor = 0.5;
    M_YuanZhuiPoSuiJi_Paint_Less.bumpTexture.level = 0.15;

    M_YuanZhuiPoSuiJi_Logo_Texture.albedoColor = new BABYLON.Color3(0.4392156862745098, 0.4392156862745098, 0.4392156862745098);
    M_YuanZhuiPoSuiJi_Logo_Texture.roughness = 0.14;
}
//材质调整 YuanZhuiPoSuiJi  Blue
function materialYuanZhuiPoSuiJiBlue() {

    let M_YuanZhuiPoSuiJi_Paint_Main = scene.getMaterialByID("M_YuanZhuiPoSuiJi_Paint_Main");
    let M_YuanZhuiPoSuiJi_Logo_Texture = scene.getMaterialByID("M_YuanZhuiPoSuiJi_Logo_Texture");
    let M_YuanZhuiPoSuiJi_Metal_Steel_Silver = scene.getMaterialByID("M_YuanZhuiPoSuiJi_Metal_Steel_Silver");
    let M_YuanZhuiPoSuiJi_Paint_Less = scene.getMaterialByID("M_YuanZhuiPoSuiJi_Paint_Less");

    M_YuanZhuiPoSuiJi_Paint_Main.albedoColor = new BABYLON.Color3(0.00784313725490196, 0.047058823529411764, 0.11372549019607843);
    M_YuanZhuiPoSuiJi_Paint_Main.bumpTexture.level = 0.5;
    M_YuanZhuiPoSuiJi_Paint_Main.metallic = 0.27;
    M_YuanZhuiPoSuiJi_Paint_Main.roughness = 0.19;

    M_YuanZhuiPoSuiJi_Metal_Steel_Silver.albedoColor = new BABYLON.Color3(0.1803921568627451, 0.1803921568627451, 0.1803921568627451);
    M_YuanZhuiPoSuiJi_Metal_Steel_Silver.roughness = 0.18;

    M_YuanZhuiPoSuiJi_Paint_Less.albedoColor = new BABYLON.Color3(0.09803921568627451, 0, 0);
    M_YuanZhuiPoSuiJi_Paint_Less.metallic = 0;
    M_YuanZhuiPoSuiJi_Paint_Less.roughness = 0.35;
    M_YuanZhuiPoSuiJi_Paint_Less.metallicF0Factor = 0.62;
    M_YuanZhuiPoSuiJi_Paint_Less.bumpTexture.level = 0.15;

    M_YuanZhuiPoSuiJi_Logo_Texture.albedoColor = new BABYLON.Color3(0.4392156862745098, 0.4392156862745098, 0.4392156862745098);
    M_YuanZhuiPoSuiJi_Logo_Texture.roughness = 0.14;
}

//材质调整 YuanZhuiPoSuiJi  Yellow
function materialYuanZhuiPoSuiJiYellow() {

    let M_YuanZhuiPoSuiJi_Paint_Main = scene.getMaterialByID("M_YuanZhuiPoSuiJi_Paint_Main");
    let M_YuanZhuiPoSuiJi_Logo_Texture = scene.getMaterialByID("M_YuanZhuiPoSuiJi_Logo_Texture");
    let M_YuanZhuiPoSuiJi_Metal_Steel_Silver = scene.getMaterialByID("M_YuanZhuiPoSuiJi_Metal_Steel_Silver");
    let M_YuanZhuiPoSuiJi_Paint_Less = scene.getMaterialByID("M_YuanZhuiPoSuiJi_Paint_Less");

    M_YuanZhuiPoSuiJi_Paint_Main.albedoColor = new BABYLON.Color3(0.36470588235294116, 0.18823529411764706, 0);
    M_YuanZhuiPoSuiJi_Paint_Main.bumpTexture.level = 0.45;
    M_YuanZhuiPoSuiJi_Paint_Main.metallic = 0.2;
    M_YuanZhuiPoSuiJi_Paint_Main.roughness = 0.14;

    M_YuanZhuiPoSuiJi_Metal_Steel_Silver.metallic = 1;
    M_YuanZhuiPoSuiJi_Metal_Steel_Silver.roughness = 0.05;

    M_YuanZhuiPoSuiJi_Paint_Less.albedoColor = new BABYLON.Color3(0.23921568627450981, 0.23921568627450981, 0.23921568627450981);
    M_YuanZhuiPoSuiJi_Paint_Less.metallic = 1;
    M_YuanZhuiPoSuiJi_Paint_Less.roughness = 0.05;
    M_YuanZhuiPoSuiJi_Paint_Less.metallicF0Factor = 0.5;
    M_YuanZhuiPoSuiJi_Paint_Less.bumpTexture.level = 0.15;

    M_YuanZhuiPoSuiJi_Logo_Texture.albedoColor = new BABYLON.Color3(0.07058823529411765, 0.07058823529411765, 0.07058823529411765);
    M_YuanZhuiPoSuiJi_Logo_Texture.roughness = 0.5;
}

function initscene() {
    btnrander('model', 'modelbtn1', './animation/datamm1.json');
    btnrander('model', 'modelbtn2', './animation/datamm2.json');
    btnrander('model', 'modelbtn3', './animation/datamm3.json');
    btnrander('color', 'colorbtn1', './animation/datac1.json');
    btnrander('color', 'colorbtn2', './animation/datac2.json');
    btnrander('color', 'colorbtn3', './animation/datac3.json');
    btnrander('display', 'displaybtn1', './animation/dataplus.json');
    id = localStorage.getItem("id")
    paramsw = id;
    console.log(paramsw);
    let modelname = "modelbtn" + paramsw;
    // let colorname ="colorbtn" + paramsw
    nextModelAnim = modelname;
    currenModelAnim = nextModelAnim;
    nextColor = 'colorbtn2';
    currenColor = nextColor;
    mouseup('model', modelname);
    mouseup('color', 'colorbtn2');
    initCamera();
    initAnim(nextModelAnim);
    // setTimeout(()=>{mouseEvenTimeOut = false},2000)
}
function initCamera() {
    let animIn = animationArr.filter((value, index) => { if (value.btnName == nextModelAnim) { return value } })
    let activecam1 =  scene.getCameraByID("Camera") 
    cameraAnimate(activecam1,...animIn[0].cameraAnimNormolPosition,...animIn[0].cameraAnimTargetNormolPosition)
}
function initAnim(nextModelAnim) {
    // let inTimeOut = 1000;
    let animIn = animationArr.filter((value, index) => { if (value.btnName == nextModelAnim) { return value } })
    animationInOut(animIn[0].val.inout, "in")
    // inTimeOut = animationInOut(animIn[0].val.inout, "in")
    // setTimeout(() => { mouseEvenTimeOut = false }, inTimeOut)
}



