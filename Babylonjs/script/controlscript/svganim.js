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
/*
let animationArr = [
    {
        btnName: "modelbtn1", name: "XuanHuiPoSuiJi", exploitd: false,
        val: { exploit: "XuanHuiPoSuiJi_BaoZha", exploitout: "XuanHuiPoSuiJi_BaoZha_Inout", inout: "XuanHuiPoSuiJi_inout" },
        cameraAnimNormolPosition: [ new BABYLON.Vector3(4, 1, 3.5)],
        cameraAnimExploitPosition: [ new BABYLON.Vector3(8.5, 3.8, 0)],
        cameraAnimTargetNormolPosition: [ new BABYLON.Vector3(4, 0.5, 0)],
        cameraAnimTargetExploitPosition: [ new BABYLON.Vector3(4, 1.6, 0)]
    },
    {
        btnName: "modelbtn2", name: "YuanZhuiPoSuiJi", exploitd: false,
        val: { exploit: "YuanZhuiPoSuiJi_BaoZha", exploitout: "YuanZhuiPoSuiJi_BaoZha_Inout", inout: "YuanZhuiPoSuiJi_inout" },
        cameraAnimNormolPosition: [ new BABYLON.Vector3(0, 1, 3)],
        cameraAnimExploitPosition: [ new BABYLON.Vector3(5, 2, 0)],
        cameraAnimTargetNormolPosition: [ new BABYLON.Vector3(0, 0.5, 0)],
        cameraAnimTargetExploitPosition: [ new BABYLON.Vector3(0, 1.5, 0)]
    },
    {
        btnName: "modelbtn3", name: "ZhiShaJi", exploitd: false,
        val: { exploit: "ZhiShaJi_BaoZha", exploitout: "ZhiShaJi_BaoZha_Inout", inout: "ZhiShaJi_inout" },
        cameraAnimNormolPosition: [ new BABYLON.Vector3(-4, 1, 2)],
        cameraAnimExploitPosition: [ new BABYLON.Vector3(-4, 2.5, 6.3)],
        cameraAnimTargetNormolPosition: [ new BABYLON.Vector3(-4, 0.3, 0)],
        cameraAnimTargetExploitPosition: [ new BABYLON.Vector3(-4, 2, 0)]
    }
]
*/


let animationChangeArr = [
    //first
    [
        {
            cameraAnimNormolPosition: [Math.PI/2, Math.PI/2, 3],
            cameraAnimTargetNormolPosition: [new BABYLON.Vector3(4, 0.31, 0)],
        }, {

            cameraAnimNormolPosition: [1, 1.47, 2.64],
            cameraAnimTargetNormolPosition: [new BABYLON.Vector3(4, 0.31, 0)],
        }, {

            cameraAnimNormolPosition: [-Math.PI/2, 1.47, 2.64],
            cameraAnimTargetNormolPosition: [new BABYLON.Vector3(3.13, 0.249, 0)],
        },
        {
            btnName: "modelbtn1", name: "XuanHuiPoSuiJi", exploitd: false,
            val: { exploit: "XuanHuiPoSuiJi_BaoZha", exploitout: "XuanHuiPoSuiJi_BaoZha_Inout", inout: "XuanHuiPoSuiJi_inout" },
            cameraAnimExploitPosition: [0, 1.386, 6.953],
           cameraAnimNormolPosition: [-Math.PI/2, 1.47, 2.64],
            cameraAnimTargetExploitPosition: [new BABYLON.Vector3(2.86, 1.7929, 0)],
           cameraAnimTargetNormolPosition: [new BABYLON.Vector3(3.13, 0.249, 0)]
        },
    ],
    //second
    [
        {
            cameraAnimNormolPosition: [Math.PI/2, 1.357, 2.5],
            cameraAnimTargetNormolPosition: [new BABYLON.Vector3(0, 0.38, 0)],
        },
        {

            cameraAnimNormolPosition: [2.176, 1.15135, 2.301],
            cameraAnimTargetNormolPosition: [new BABYLON.Vector3(0, 0.38, 0)],
        },
        {

            cameraAnimNormolPosition: [-0.96351, 1.303, 2.75],
            cameraAnimTargetNormolPosition: [new BABYLON.Vector3(-0.6374, 0.1744, 0)],
        },
        {
            btnName: "modelbtn2", name: "YuanZhuiPoSuiJi", exploitd: false,
            val: { exploit: "YuanZhuiPoSuiJi_BaoZha", exploitout: "YuanZhuiPoSuiJi_BaoZha_Inout", inout: "YuanZhuiPoSuiJi_inout" },
           cameraAnimNormolPosition: [-0.96351, 1.303, 2.75],
            cameraAnimExploitPosition: [0, 1.3939, 5.6],
           cameraAnimTargetNormolPosition: [new BABYLON.Vector3(-0.6374, 0.1744, 0)],
            cameraAnimTargetExploitPosition: [new BABYLON.Vector3(0, 1.5, 0)]
        },
    ],
    //third
    [
        {

            cameraAnimNormolPosition: [Math.PI/2, 1.357, 1.935],
            cameraAnimTargetNormolPosition: [new BABYLON.Vector3(-4, 0.080, 0)],
        },
        {

            cameraAnimNormolPosition: [2.176, 1.15135, 1.935],
            cameraAnimTargetNormolPosition: [new BABYLON.Vector3(-4, 0.080, 0)],
        },
        {

            cameraAnimNormolPosition: [-Math.PI/2, 1.357, 1.935],
            cameraAnimTargetNormolPosition: [new BABYLON.Vector3(-4, 0.080, 0)],
        },
        {
            btnName: "modelbtn3", name: "ZhiShaJi", exploitd: false,
            val: { exploit: "ZhiShaJi_BaoZha", exploitout: "ZhiShaJi_BaoZha_Inout", inout: "ZhiShaJi_inout" },
           cameraAnimNormolPosition: [-Math.PI/2, 1.357, 1.935],
            cameraAnimExploitPosition: [Math.PI/2, 1.4, 5.845],
           cameraAnimTargetNormolPosition: [new BABYLON.Vector3(-4, 0.080, 0)],
            cameraAnimTargetExploitPosition: [new BABYLON.Vector3(-4, 1.727, 0)]
        }
    ]
]

let animationArr = [
    {
        btnName: "modelbtn1", name: "XuanHuiPoSuiJi", exploitd: false,
        val: { exploit: "XuanHuiPoSuiJi_BaoZha", exploitout: "XuanHuiPoSuiJi_BaoZha_Inout", inout: "XuanHuiPoSuiJi_inout" },
        cameraAnimNormolPosition: [1.5, 1.42, 3],
        cameraAnimExploitPosition: [1, 2, 3],
        cameraAnimTargetNormolPosition: [new BABYLON.Vector3(4, 0.5, 0)],
        cameraAnimTargetExploitPosition: [new BABYLON.Vector3(4, 1.6, 0)]
    },
    {
        btnName: "modelbtn2", name: "YuanZhuiPoSuiJi", exploitd: false,
        val: { exploit: "YuanZhuiPoSuiJi_BaoZha", exploitout: "YuanZhuiPoSuiJi_BaoZha_Inout", inout: "YuanZhuiPoSuiJi_inout" },
        cameraAnimNormolPosition: [1.5, 1.42, 3],
        cameraAnimExploitPosition: [1, 2, 3],
        cameraAnimTargetNormolPosition: [new BABYLON.Vector3(0, 0.5, 0)],
        cameraAnimTargetExploitPosition: [new BABYLON.Vector3(0, 1.5, 0)]
    },
    {
        btnName: "modelbtn3", name: "ZhiShaJi", exploitd: false,
        val: { exploit: "ZhiShaJi_BaoZha", exploitout: "ZhiShaJi_BaoZha_Inout", inout: "ZhiShaJi_inout" },
        cameraAnimNormolPosition: [1.5, 1.42, 3],
        cameraAnimExploitPosition: [1, 2, 3],
        cameraAnimTargetNormolPosition: [new BABYLON.Vector3(-4, 0.3, 0)],
        cameraAnimTargetExploitPosition: [new BABYLON.Vector3(-4, 2, 0)]
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
function animationStart(animationName, keys, animCamera) {

    let ag = scene.getAnimationGroupByName(animationName);
    if (keys) {
        ag.start(false, 2, ag.from, ag.to)
        let activecam1 = scene.getCameraByID("Camera")
        //console.log( "this is animCamera : ",animCamera)
        cameraArcRotateAnimate(activecam1, ...animCamera.cameraAnimTargetExploitPosition, ...animCamera.cameraAnimExploitPosition)
        // cameraPostionAnimate(activecam1,...animCamera.cameraAnimExploitPosition,...animCamera.cameraAnimTargetExploitPosition)
    }
    else {
        ag.start(false, 2, ag.to, ag.from)
        let activecam1 = scene.getCameraByID("Camera")
        //console.log( "this is animCamera2 : ",animCamera)
       cameraArcRotateAnimate(activecam1, ...animCamera.cameraAnimTargetNormolPosition, ...animCamera.cameraAnimNormolPosition)
        //  cameraPostionAnimate(activecam1,...animCamera.cameraAnimNormolPosition,...animCamera.cameraAnimTargetNormolPosition)
    }
    return ag.to * (1000 / 2) + 100
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

    let activecam1 = scene.getCameraByID("Camera")
    cameraArcRotateAnimate(activecam1, ...animIn[0].cameraAnimTargetNormolPosition, ...animIn[0].cameraAnimNormolPosition)
    // cameraPostionAnimate(activecam1,...animIn[0].cameraAnimNormolPosition,...animIn[0].cameraAnimTargetNormolPosition)
    let inTimeOut = 1000;
    inTimeOut = animationInOut(animIn[0].val.inout, "in")
    setTimeout(() => { mouseEvenTimeOut = false }, inTimeOut)
    // setTimeout(() => {
    //     // resetColorBtn();   // 重置 颜色按钮
    //     //入场
    //     let inTimeOut = 1000;
    //     inTimeOut = animationInOut(animIn[0].val.inout, "in")
    //     setTimeout(() => { mouseEvenTimeOut = false }, inTimeOut)

    // }, timeout)


}
// 退场逻辑   已爆炸的执行 爆炸退场  未爆炸的执行 普通退场
function modelChangeV2(cnum,nnum,currenModelAnim, nextModelAnim) {
    // 退场
    let timeout = 1000;
  //  console.log("num : ",animationChangeArr[num])
    let animIn = animationChangeArr[cnum][3]
    let animOut = animationChangeArr[nnum][3]
    console.log("animOut : ",animOut)
    console.log("animIn : ",animIn)
    if (animOut.exploitd) {
        // 已爆炸
        timeout = animationInOut(animOut.val.exploitout, "exploitd")
        animOut.exploitd = false;
      //  resetExploitBtn();    // 重置 爆炸按钮 

    } else {
        //未爆炸
        timeout = animationInOut(animOut.val.inout, "out")
   }

    let activecam1 = scene.getCameraByID("Camera")
    cameraArcRotateAnimate(activecam1, ...animIn.cameraAnimTargetNormolPosition, ...animIn.cameraAnimNormolPosition)
    // cameraPostionAnimate(activecam1,...animIn[0].cameraAnimNormolPosition,...animIn[0].cameraAnimTargetNormolPosition)
    let inTimeOut = 1000;
    inTimeOut = animationInOut(animIn.val.inout, "in")
    setTimeout(() => { mouseEvenTimeOut = false }, inTimeOut)
    // setTimeout(() => {
    //     // resetColorBtn();   // 重置 颜色按钮
    //     //入场
    //     let inTimeOut = 1000;
    //     inTimeOut = animationInOut(animIn[0].val.inout, "in")
    //     setTimeout(() => { mouseEvenTimeOut = false }, inTimeOut)

    // }, timeout)


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
    timeout = animationStart(animIndex[0].val.exploit, animIndex[0].exploitd, animIndex[0])
    setTimeout(() => { mouseEvenTimeOut = false }, timeout)

}

// 第二版爆炸逻辑 
function modelExploitV2(num,name, isExploit) {
    console.log("this is name : ",name);
    let timeout = 1000;
    let animIndex = animationChangeArr[num].filter((value, index) => { if (value.btnName == name) { return value } })
   // console.log("this is animIndex : ",animIndex)
    animIndex[0].exploitd = isExploit;
    timeout = animationStart(animIndex[0].val.exploit, animIndex[0].exploitd, animIndex[0])
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
           //     console.log("123")
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

//材质调整 XuanHuiPoSuiJi change aoTexture
function materialXuanHuiPoSuiJiChangeAoTexture(isExploitd) {
        //材质调整
        let M_XuanHuiPoSuiJi_Steel_Black = scene.getMaterialByID("M_XuanHuiPoSuiJi_Steel_Black");
        let M_XuanHuiPoSuiJi_Screw_Steel = scene.getMaterialByID("M_XuanHuiPoSuiJi_Screw_Steel");
        let M_XuanHuiPoSuiJi_Metal_Iron = scene.getMaterialByID("M_XuanHuiPoSuiJi_Metal_Iron");
        let M_XuanHuiPoSuiJi_Paint_Main = scene.getMaterialByID("M_XuanHuiPoSuiJi_Paint_Main");
        let M_XuanHuiPoSuiJi_Metal_Iron_Crimson = scene.getMaterialByID("M_XuanHuiPoSuiJi_Metal_Iron_Crimson");
        let M_XuanHuiPoSuiJi_Metal_Iron_Gray = scene.getMaterialByID("M_XuanHuiPoSuiJi_Metal_Iron_Gray");
        let M_XuanHuiPoSuiJi_Metal_Steel_Silver = scene.getMaterialByID("M_XuanHuiPoSuiJi_Metal_Steel_Silver");
        let M_XuanHuiPoSuiJi_Logo_Normal = scene.getMaterialByID("M_XuanHuiPoSuiJi_Logo_Normal");
        let M_XuanHuiPoSuiJi_Plastic_Black = scene.getMaterialByID("M_XuanHuiPoSuiJi_Plastic_Black");
        let XuanHuiPoSuiJi_aoTexture = null;
    //爆炸后
    if (isExploitd) {
        XuanHuiPoSuiJi_aoTexture = XuanHuiPoSuiJi_aoTexture2
       // XuanHuiPoSuiJi_aoTexture   = new BABYLON.Texture("model/SheBei/XuanHuiPoSuiJi_Ao.jpg", scene);
    }
    else {
        XuanHuiPoSuiJi_aoTexture = XuanHuiPoSuiJi_aoTexture1
      //   XuanHuiPoSuiJi_aoTexture = new BABYLON.Texture("model/SheBei/XuanHuiPoSuiJi_Ao2.jpg", scene);

    }

    XuanHuiPoSuiJi_aoTexture.vScale = -1;
    XuanHuiPoSuiJi_aoTexture.coordinatesIndex = 1;
    // 添加ao

    M_XuanHuiPoSuiJi_Paint_Main.ambientTexture = XuanHuiPoSuiJi_aoTexture;
    M_XuanHuiPoSuiJi_Metal_Iron.ambientTexture = XuanHuiPoSuiJi_aoTexture;
    M_XuanHuiPoSuiJi_Metal_Iron_Crimson.ambientTexture = XuanHuiPoSuiJi_aoTexture;
    M_XuanHuiPoSuiJi_Metal_Iron_Gray.ambientTexture = XuanHuiPoSuiJi_aoTexture;
    M_XuanHuiPoSuiJi_Metal_Steel_Silver.ambientTexture = XuanHuiPoSuiJi_aoTexture;
    M_XuanHuiPoSuiJi_Steel_Black.ambientTexture = XuanHuiPoSuiJi_aoTexture;
    M_XuanHuiPoSuiJi_Plastic_Black.ambientTexture = XuanHuiPoSuiJi_aoTexture;
    M_XuanHuiPoSuiJi_Screw_Steel.ambientTexture = XuanHuiPoSuiJi_aoTexture;

}

//材质调整 XuanHuiPoSuiJi change aoTexture
function materialZhiShaJiChangeAoTexture(isExploitd) {
    //材质
    let M_ZhiShaJi_Metal_Iron_Black = scene.getMaterialByID("M_ZhiShaJi_Metal_Iron_Black");
    let M_ZhiShaJi_Metal_Iron_Gray = scene.getMaterialByID("M_ZhiShaJi_Metal_Iron_Gray");
    let M_ZhiShaJi_Metal_Steel_Silver = scene.getMaterialByID("M_ZhiShaJi_Metal_Steel_Silver");
    let M_ZhiShaJi_Paint_Less = scene.getMaterialByID("M_ZhiShaJi_Paint_Less");
    let M_ZhiShaJi_Paint_Main = scene.getMaterialByID("M_ZhiShaJi_Paint_Main");
    let M_ZhiShaJi_Metal_Iron_Reseda = scene.getMaterialByID("M_ZhiShaJi_Metal_Iron_Reseda");
    let ZhiShaJi_aoTexture = null;
    //爆炸后
    if (isExploitd) {
        ZhiShaJi_aoTexture =ZhiShaJi_aoTexture2
        // ZhiShaJi_aoTexture = new BABYLON.Texture("model/SheBei/ZhiShaJi_Ao.jpg", scene);
    }
    else {
        ZhiShaJi_aoTexture =ZhiShaJi_aoTexture1
        // ZhiShaJi_aoTexture = new BABYLON.Texture("model/SheBei/ZhiShaJi_Ao2.jpg", scene);

    }
    ZhiShaJi_aoTexture.vScale = -1;
    ZhiShaJi_aoTexture.coordinatesIndex = 1;

    //材质调整
    M_ZhiShaJi_Metal_Iron_Black.ambientTexture = ZhiShaJi_aoTexture;
    M_ZhiShaJi_Metal_Iron_Gray.ambientTexture = ZhiShaJi_aoTexture;
    M_ZhiShaJi_Metal_Steel_Silver.ambientTexture = ZhiShaJi_aoTexture;
    M_ZhiShaJi_Paint_Less.ambientTexture = ZhiShaJi_aoTexture;
    M_ZhiShaJi_Paint_Main.ambientTexture = ZhiShaJi_aoTexture;
    M_ZhiShaJi_Metal_Iron_Reseda.ambientTexture = ZhiShaJi_aoTexture;
}

//材质调整 XuanHuiPoSuiJi change aoTexture
function materialYuanZhuiPoSuiJiChangeAoTexture(isExploitd) {
    //材质调整

    let M_YuanZhuiPoSuiJi_Paint_Main = scene.getMaterialByID("M_YuanZhuiPoSuiJi_Paint_Main");
    let M_YuanZhuiPoSuiJi_Paint_Less = scene.getMaterialByID("M_YuanZhuiPoSuiJi_Paint_Less");


    let M_YuanZhuiPoSuiJi_Screw_Steel = scene.getMaterialByID("M_YuanZhuiPoSuiJi_Screw_Steel");
    let M_YuanZhuiPoSuiJi_Metal_Iron = scene.getMaterialByID("M_YuanZhuiPoSuiJi_Metal_Iron");
    let M_YuanZhuiPoSuiJi_Metal_Brass = scene.getMaterialByID("M_YuanZhuiPoSuiJi_Metal_Brass");
    let M_YuanZhuiPoSuiJi_Metal_Iron_Black = scene.getMaterialByID("M_YuanZhuiPoSuiJi_Metal_Iron_Black");
    let M_YuanZhuiPoSuiJi_Metal_Iron_Crimson = scene.getMaterialByID("M_YuanZhuiPoSuiJi_Metal_Iron_Crimson");
    let M_YuanZhuiPoSuiJi_Metal_Iron_Gray = scene.getMaterialByID("M_YuanZhuiPoSuiJi_Metal_Iron_Gray");
    let M_YuanZhuiPoSuiJi_Metal_Steel_Silver = scene.getMaterialByID("M_YuanZhuiPoSuiJi_Metal_Steel_Silver");
    let M_YuanZhuiPoSuiJi_Plastic_Black = scene.getMaterialByID("M_YuanZhuiPoSuiJi_Plastic_Black");
    let YuanZhuiPoSuiJi_aoTexture = null;
    if (isExploitd) {
     //   YuanZhuiPoSuiJi_aoTexture=YuanZhuiPoSuiJi_aoTexture2
        YuanZhuiPoSuiJi_aoTexture2.vScale = -1;
        YuanZhuiPoSuiJi_aoTexture2.coordinatesIndex = 1;
        // 添加ao
        M_YuanZhuiPoSuiJi_Paint_Main.ambientTexture = YuanZhuiPoSuiJi_aoTexture2;
        M_YuanZhuiPoSuiJi_Paint_Less.ambientTexture = YuanZhuiPoSuiJi_aoTexture2;
        M_YuanZhuiPoSuiJi_Metal_Brass.ambientTexture = YuanZhuiPoSuiJi_aoTexture2;
        M_YuanZhuiPoSuiJi_Metal_Iron_Black.ambientTexture = YuanZhuiPoSuiJi_aoTexture2;
        M_YuanZhuiPoSuiJi_Metal_Iron_Gray.ambientTexture = YuanZhuiPoSuiJi_aoTexture2;
        M_YuanZhuiPoSuiJi_Metal_Steel_Silver.ambientTexture = YuanZhuiPoSuiJi_aoTexture2;
        M_YuanZhuiPoSuiJi_Plastic_Black.ambientTexture = YuanZhuiPoSuiJi_aoTexture2;
        M_YuanZhuiPoSuiJi_Screw_Steel.ambientTexture = YuanZhuiPoSuiJi_aoTexture2;
        M_YuanZhuiPoSuiJi_Metal_Iron.ambientTexture = YuanZhuiPoSuiJi_aoTexture2;
        M_YuanZhuiPoSuiJi_Metal_Iron_Crimson.ambientTexture = YuanZhuiPoSuiJi_aoTexture2;
       // YuanZhuiPoSuiJi_aoTexture = new BABYLON.Texture("model/SheBei/YuanZhuiPoSuiJi_Ao.jpg", scene);

    } else {
        YuanZhuiPoSuiJi_aoTexture1.vScale = -1;
        YuanZhuiPoSuiJi_aoTexture1.coordinatesIndex = 1;
        // 添加ao
        M_YuanZhuiPoSuiJi_Paint_Main.ambientTexture = YuanZhuiPoSuiJi_aoTexture1;
        M_YuanZhuiPoSuiJi_Paint_Less.ambientTexture = YuanZhuiPoSuiJi_aoTexture1;
        M_YuanZhuiPoSuiJi_Metal_Brass.ambientTexture = YuanZhuiPoSuiJi_aoTexture1;
        M_YuanZhuiPoSuiJi_Metal_Iron_Black.ambientTexture = YuanZhuiPoSuiJi_aoTexture1;
        M_YuanZhuiPoSuiJi_Metal_Iron_Gray.ambientTexture = YuanZhuiPoSuiJi_aoTexture1;
        M_YuanZhuiPoSuiJi_Metal_Steel_Silver.ambientTexture = YuanZhuiPoSuiJi_aoTexture1;
        M_YuanZhuiPoSuiJi_Plastic_Black.ambientTexture = YuanZhuiPoSuiJi_aoTexture1;
        M_YuanZhuiPoSuiJi_Screw_Steel.ambientTexture = YuanZhuiPoSuiJi_aoTexture1;
        M_YuanZhuiPoSuiJi_Metal_Iron.ambientTexture = YuanZhuiPoSuiJi_aoTexture1;
        M_YuanZhuiPoSuiJi_Metal_Iron_Crimson.ambientTexture = YuanZhuiPoSuiJi_aoTexture1;
       // YuanZhuiPoSuiJi_aoTexture=YuanZhuiPoSuiJi_aoTexture1
      //  YuanZhuiPoSuiJi_aoTexture = new BABYLON.Texture("model/SheBei/YuanZhuiPoSuiJi_Ao2.jpg", scene);
    }


   


}

//材质调整 XuanHuiPoSuiJi Black
function materialXuanHuiPoSuiJiBlack() {

    let M_XuanHuiPoSuiJi_Screw_Steel = scene.getMaterialByID("M_XuanHuiPoSuiJi_Screw_Steel");
    let M_XuanHuiPoSuiJi_Paint_Main = scene.getMaterialByID("M_XuanHuiPoSuiJi_Paint_Main");
    let M_XuanHuiPoSuiJi_Logo_Normal = scene.getMaterialByID("M_XuanHuiPoSuiJi_Logo_Normal")

    M_XuanHuiPoSuiJi_Paint_Main.albedoColor = new BABYLON.Color3(0, 0, 0);
    M_XuanHuiPoSuiJi_Paint_Main.metallic = 1;
    M_XuanHuiPoSuiJi_Paint_Main.roughness = 0.35;
    M_XuanHuiPoSuiJi_Paint_Main.bumpTexture.level = 0.5;
    M_XuanHuiPoSuiJi_Screw_Steel.albedoColor = new BABYLON.Color3(0.1411764705882353, 0.09411764705882353, 0);
    M_XuanHuiPoSuiJi_Screw_Steel.roughness = 0.24;

    M_XuanHuiPoSuiJi_Logo_Normal.albedoColor = M_XuanHuiPoSuiJi_Paint_Main.albedoColor;
    M_XuanHuiPoSuiJi_Logo_Normal.metallicTexture = M_XuanHuiPoSuiJi_Paint_Main.metallicTexture;
    M_XuanHuiPoSuiJi_Logo_Normal.metallic = M_XuanHuiPoSuiJi_Paint_Main.metallic;
    M_XuanHuiPoSuiJi_Logo_Normal.roughness = M_XuanHuiPoSuiJi_Paint_Main.roughness;
    M_XuanHuiPoSuiJi_Logo_Normal.metallicF0Factor = M_XuanHuiPoSuiJi_Paint_Main.metallicF0Factor;

}
//材质调整 XuanHuiPoSuiJi Blue
function materialXuanHuiPoSuiJiBlue() {
    let M_XuanHuiPoSuiJi_Screw_Steel = scene.getMaterialByID("M_XuanHuiPoSuiJi_Screw_Steel");
    let M_XuanHuiPoSuiJi_Paint_Main = scene.getMaterialByID("M_XuanHuiPoSuiJi_Paint_Main");
    let M_XuanHuiPoSuiJi_Logo_Normal = scene.getMaterialByID("M_XuanHuiPoSuiJi_Logo_Normal")

    M_XuanHuiPoSuiJi_Paint_Main.albedoColor = new BABYLON.Color3(0.00784313725490196, 0.047058823529411764, 0.11372549019607843);
    M_XuanHuiPoSuiJi_Paint_Main.bumpTexture.level = 0.5;
    M_XuanHuiPoSuiJi_Paint_Main.metallic = 1;
    M_XuanHuiPoSuiJi_Paint_Main.roughness = 0.35;

    M_XuanHuiPoSuiJi_Screw_Steel.albedoColor = new BABYLON.Color3(0.03, 0.03, 0.03);
    M_XuanHuiPoSuiJi_Screw_Steel.roughness = 0.24;

    M_XuanHuiPoSuiJi_Logo_Normal.albedoColor = M_XuanHuiPoSuiJi_Paint_Main.albedoColor;
    M_XuanHuiPoSuiJi_Logo_Normal.metallicTexture = M_XuanHuiPoSuiJi_Paint_Main.metallicTexture;
    M_XuanHuiPoSuiJi_Logo_Normal.metallic = M_XuanHuiPoSuiJi_Paint_Main.metallic;
    M_XuanHuiPoSuiJi_Logo_Normal.roughness = M_XuanHuiPoSuiJi_Paint_Main.roughness;
    M_XuanHuiPoSuiJi_Logo_Normal.metallicF0Factor = M_XuanHuiPoSuiJi_Paint_Main.metallicF0Factor;
}
//材质调整  XuanHuiPoSuiJi Yellow
function materialXuanHuiPoSuiJiYellow() {
    let M_XuanHuiPoSuiJi_Screw_Steel = scene.getMaterialByID("M_XuanHuiPoSuiJi_Screw_Steel");
    let M_XuanHuiPoSuiJi_Paint_Main = scene.getMaterialByID("M_XuanHuiPoSuiJi_Paint_Main");
    let M_XuanHuiPoSuiJi_Logo_Normal = scene.getMaterialByID("M_XuanHuiPoSuiJi_Logo_Normal")

    M_XuanHuiPoSuiJi_Paint_Main.albedoColor = new BABYLON.Color3(0.36470588235294116, 0.18823529411764706, 0);
    M_XuanHuiPoSuiJi_Paint_Main.bumpTexture.level = 0.45;
    M_XuanHuiPoSuiJi_Paint_Main.metallic = 1;
    M_XuanHuiPoSuiJi_Paint_Main.roughness = 0.3;

    M_XuanHuiPoSuiJi_Screw_Steel.albedoColor = new BABYLON.Color3(0.03, 0.03, 0.03);
    M_XuanHuiPoSuiJi_Screw_Steel.roughness = 0.24;

    M_XuanHuiPoSuiJi_Logo_Normal.albedoColor = M_XuanHuiPoSuiJi_Paint_Main.albedoColor;
    M_XuanHuiPoSuiJi_Logo_Normal.metallicTexture = M_XuanHuiPoSuiJi_Paint_Main.metallicTexture;
    M_XuanHuiPoSuiJi_Logo_Normal.metallic = M_XuanHuiPoSuiJi_Paint_Main.metallic;
    M_XuanHuiPoSuiJi_Logo_Normal.roughness = M_XuanHuiPoSuiJi_Paint_Main.roughness;
    M_XuanHuiPoSuiJi_Logo_Normal.metallicF0Factor = M_XuanHuiPoSuiJi_Paint_Main.metallicF0Factor;
}
//材质调整 ZhiShaJi Black
function materialZhiShaJiBlack() {

    let M_ZhiShaJi_Paint_Less = scene.getMaterialByID("M_ZhiShaJi_Paint_Less");
    let M_ZhiShaJi_Paint_Main = scene.getMaterialByID("M_ZhiShaJi_Paint_Main");
    let M_ZhiShaJi_Logo_Texture = scene.getMaterialByID("M_ZhiShaJi_Logo_Texture");

    M_ZhiShaJi_Paint_Main.albedoColor = new BABYLON.Color3(0, 0, 0);
    M_ZhiShaJi_Paint_Main.metallic = 1;
    M_ZhiShaJi_Paint_Main.roughness = 0.35;
    M_ZhiShaJi_Paint_Main.bumpTexture.level = 0.5;

    M_ZhiShaJi_Paint_Less.albedoColor = new BABYLON.Color3(0.34901960784313724, 0.34901960784313724, 0.34901960784313724);
    M_ZhiShaJi_Paint_Less.metallic = 0;
    M_ZhiShaJi_Paint_Less.roughness = 0.35;
    M_ZhiShaJi_Paint_Less.metallicF0Factor = 0.62;
    M_ZhiShaJi_Paint_Less.bumpTexture.level = 0.15;

    M_ZhiShaJi_Logo_Texture.albedoColor = new BABYLON.Color3(0.4392156862745098, 0.4392156862745098, 0.4392156862745098);
    M_ZhiShaJi_Logo_Texture.roughness = 0.14;
}
//材质调整 ZhiShaJi Blue
function materialZhiShaJiBlue() {
    let M_ZhiShaJi_Paint_Less = scene.getMaterialByID("M_ZhiShaJi_Paint_Less");
    let M_ZhiShaJi_Paint_Main = scene.getMaterialByID("M_ZhiShaJi_Paint_Main");
    let M_ZhiShaJi_Logo_Texture = scene.getMaterialByID("M_ZhiShaJi_Logo_Texture");

    M_ZhiShaJi_Paint_Main.albedoColor = new BABYLON.Color3(0.00784313725490196, 0.047058823529411764, 0.11372549019607843);
    M_ZhiShaJi_Paint_Main.bumpTexture.level = 0.5;
    M_ZhiShaJi_Paint_Main.metallic = 1;
    M_ZhiShaJi_Paint_Main.roughness = 0.35;


    M_ZhiShaJi_Paint_Less.albedoColor = new BABYLON.Color3(0.09803921568627451, 0, 0);
    M_ZhiShaJi_Paint_Less.metallic = 0;
    M_ZhiShaJi_Paint_Less.roughness = 0.35;
    M_ZhiShaJi_Paint_Less.metallicF0Factor = 0.62;
    M_ZhiShaJi_Paint_Less.bumpTexture.level = 0.15;

    M_ZhiShaJi_Logo_Texture.albedoColor = new BABYLON.Color3(0.4392156862745098, 0.4392156862745098, 0.4392156862745098);
    M_ZhiShaJi_Logo_Texture.roughness = 0.14;

}
//材质调整 ZhiShaJi Yellow
function materialZhiShaJiYellow() {
    let M_ZhiShaJi_Paint_Less = scene.getMaterialByID("M_ZhiShaJi_Paint_Less");
    let M_ZhiShaJi_Paint_Main = scene.getMaterialByID("M_ZhiShaJi_Paint_Main");
    let M_ZhiShaJi_Logo_Texture = scene.getMaterialByID("M_ZhiShaJi_Logo_Texture");

    M_ZhiShaJi_Paint_Main.albedoColor = new BABYLON.Color3(0.36470588235294116, 0.18823529411764706, 0);
    M_ZhiShaJi_Paint_Main.bumpTexture.level = 0.45;
    M_ZhiShaJi_Paint_Main.metallic = 1;
    M_ZhiShaJi_Paint_Main.roughness = 0.3;

    M_ZhiShaJi_Paint_Less.albedoColor = new BABYLON.Color3(0.23921568627450981, 0.23921568627450981, 0.23921568627450981);
    M_ZhiShaJi_Paint_Less.metallic = 1;
    M_ZhiShaJi_Paint_Less.roughness = 0.05;
    M_ZhiShaJi_Paint_Less.metallicF0Factor = 0.5;
    M_ZhiShaJi_Paint_Less.bumpTexture.level = 0.15;

    M_ZhiShaJi_Logo_Texture.albedoColor = new BABYLON.Color3(0.07058823529411765, 0.07058823529411765, 0.07058823529411765);
    M_ZhiShaJi_Logo_Texture.roughness = 0;
}


//材质调整 YuanZhuiPoSuiJi  Black
function materialYuanZhuiPoSuiJiBlack() {

    let M_YuanZhuiPoSuiJi_Paint_Main = scene.getMaterialByID("M_YuanZhuiPoSuiJi_Paint_Main");
    let M_YuanZhuiPoSuiJi_Logo_Texture = scene.getMaterialByID("M_YuanZhuiPoSuiJi_Logo_Texture");
    let M_YuanZhuiPoSuiJi_Metal_Steel_Silver = scene.getMaterialByID("M_YuanZhuiPoSuiJi_Metal_Steel_Silver");
    let M_YuanZhuiPoSuiJi_Paint_Less = scene.getMaterialByID("M_YuanZhuiPoSuiJi_Paint_Less");
    let M_YuanZhuiPoSuiJi_Logo_Normal = scene.getMaterialByID("M_YuanZhuiPoSuiJi_Logo_Normal");

    M_YuanZhuiPoSuiJi_Paint_Main.albedoColor = new BABYLON.Color3(0, 0, 0);
    M_YuanZhuiPoSuiJi_Paint_Main.metallic = 1;
    M_YuanZhuiPoSuiJi_Paint_Main.roughness = 0.35;
    M_YuanZhuiPoSuiJi_Paint_Main.bumpTexture.level = 0.5;

    M_YuanZhuiPoSuiJi_Metal_Steel_Silver.albedoColor = new BABYLON.Color3(0.41568627450980394, 0.28627450980392155, 0.00392156862745098);
    M_YuanZhuiPoSuiJi_Metal_Steel_Silver.roughness = 0.26;

    M_YuanZhuiPoSuiJi_Paint_Less.albedoColor = new BABYLON.Color3(0.16862745098039217, 0.16862745098039217, 0.16862745098039217);
    M_YuanZhuiPoSuiJi_Paint_Less.metallic = 1;
    M_YuanZhuiPoSuiJi_Paint_Less.roughness = 0.23;
    M_YuanZhuiPoSuiJi_Paint_Less.metallicF0Factor = 0.5;
    // M_YuanZhuiPoSuiJi_Paint_Less.bumpTexture.level = 0.15;

    M_YuanZhuiPoSuiJi_Metal_Steel_Silver.albedoColor = new BABYLON.Color3(0.2196078431372549, 0.16470588235294117, 0.0392156862745098);
    M_YuanZhuiPoSuiJi_Metal_Steel_Silver.metallic = 1;
    M_YuanZhuiPoSuiJi_Metal_Steel_Silver.roughness = 0.21;

    M_YuanZhuiPoSuiJi_Logo_Normal.albedoColor = M_YuanZhuiPoSuiJi_Paint_Main.albedoColor;
    M_YuanZhuiPoSuiJi_Logo_Normal.metallicTexture = M_YuanZhuiPoSuiJi_Paint_Main.metallicTexture;
    M_YuanZhuiPoSuiJi_Logo_Normal.metallic = M_YuanZhuiPoSuiJi_Paint_Main.metallic;
    M_YuanZhuiPoSuiJi_Logo_Normal.roughness = M_YuanZhuiPoSuiJi_Paint_Main.roughness;
    M_YuanZhuiPoSuiJi_Logo_Normal.metallicF0Factor = M_YuanZhuiPoSuiJi_Paint_Main.metallicF0Factor;
}
//材质调整 YuanZhuiPoSuiJi  Blue
function materialYuanZhuiPoSuiJiBlue() {

    let M_YuanZhuiPoSuiJi_Paint_Main = scene.getMaterialByID("M_YuanZhuiPoSuiJi_Paint_Main");
    let M_YuanZhuiPoSuiJi_Logo_Texture = scene.getMaterialByID("M_YuanZhuiPoSuiJi_Logo_Texture");
    let M_YuanZhuiPoSuiJi_Metal_Steel_Silver = scene.getMaterialByID("M_YuanZhuiPoSuiJi_Metal_Steel_Silver");
    let M_YuanZhuiPoSuiJi_Paint_Less = scene.getMaterialByID("M_YuanZhuiPoSuiJi_Paint_Less");
    let M_YuanZhuiPoSuiJi_Logo_Normal = scene.getMaterialByID("M_YuanZhuiPoSuiJi_Logo_Normal");

    M_YuanZhuiPoSuiJi_Paint_Main.albedoColor = new BABYLON.Color3(0.00784313725490196, 0.047058823529411764, 0.11372549019607843);
    M_YuanZhuiPoSuiJi_Paint_Main.bumpTexture.level = 0.5;
    M_YuanZhuiPoSuiJi_Paint_Main.metallic = 1;
    M_YuanZhuiPoSuiJi_Paint_Main.roughness = 0.35;

    M_YuanZhuiPoSuiJi_Metal_Steel_Silver.albedoColor = new BABYLON.Color3(0.2, 0.2, 0.2);
    M_YuanZhuiPoSuiJi_Metal_Steel_Silver.metallic = 1;
    M_YuanZhuiPoSuiJi_Metal_Steel_Silver.roughness = 0.21;

    M_YuanZhuiPoSuiJi_Paint_Less.albedoColor = new BABYLON.Color3(0.09803921568627451, 0, 0);
    M_YuanZhuiPoSuiJi_Paint_Less.metallic = 0;
    M_YuanZhuiPoSuiJi_Paint_Less.roughness = 0.35;
    M_YuanZhuiPoSuiJi_Paint_Less.metallicF0Factor = 0.62;
    // M_YuanZhuiPoSuiJi_Paint_Less.bumpTexture.level = 0.15;

    M_YuanZhuiPoSuiJi_Logo_Texture.albedoColor = new BABYLON.Color3(0.4392156862745098, 0.4392156862745098, 0.4392156862745098);
    M_YuanZhuiPoSuiJi_Logo_Texture.roughness = 0.14;


    M_YuanZhuiPoSuiJi_Logo_Normal.albedoColor = M_YuanZhuiPoSuiJi_Paint_Main.albedoColor;
    M_YuanZhuiPoSuiJi_Logo_Normal.metallicTexture = M_YuanZhuiPoSuiJi_Paint_Main.metallicTexture;
    M_YuanZhuiPoSuiJi_Logo_Normal.metallic = M_YuanZhuiPoSuiJi_Paint_Main.metallic;
    M_YuanZhuiPoSuiJi_Logo_Normal.roughness = M_YuanZhuiPoSuiJi_Paint_Main.roughness;
    M_YuanZhuiPoSuiJi_Logo_Normal.metallicF0Factor = M_YuanZhuiPoSuiJi_Paint_Main.metallicF0Factor;
}

//材质调整 YuanZhuiPoSuiJi  Yellow
function materialYuanZhuiPoSuiJiYellow() {

    let M_YuanZhuiPoSuiJi_Paint_Main = scene.getMaterialByID("M_YuanZhuiPoSuiJi_Paint_Main");
    let M_YuanZhuiPoSuiJi_Logo_Texture = scene.getMaterialByID("M_YuanZhuiPoSuiJi_Logo_Texture");
    let M_YuanZhuiPoSuiJi_Metal_Steel_Silver = scene.getMaterialByID("M_YuanZhuiPoSuiJi_Metal_Steel_Silver");
    let M_YuanZhuiPoSuiJi_Paint_Less = scene.getMaterialByID("M_YuanZhuiPoSuiJi_Paint_Less");
    let M_YuanZhuiPoSuiJi_Logo_Normal = scene.getMaterialByID("M_YuanZhuiPoSuiJi_Logo_Normal");

    M_YuanZhuiPoSuiJi_Paint_Main.albedoColor = new BABYLON.Color3(0.36470588235294116, 0.18823529411764706, 0);
    M_YuanZhuiPoSuiJi_Paint_Main.bumpTexture.level = 0.45;
    M_YuanZhuiPoSuiJi_Paint_Main.metallic = 1;
    M_YuanZhuiPoSuiJi_Paint_Main.roughness = 0.35;

    M_YuanZhuiPoSuiJi_Metal_Steel_Silver.albedoColor = new BABYLON.Color3(0.2, 0.2, 0.2);
    M_YuanZhuiPoSuiJi_Metal_Steel_Silver.metallic = 1;
    M_YuanZhuiPoSuiJi_Metal_Steel_Silver.roughness = 0.21;

    M_YuanZhuiPoSuiJi_Paint_Less.albedoColor = new BABYLON.Color3(0.16862745098039217, 0.16862745098039217, 0.16862745098039217);
    M_YuanZhuiPoSuiJi_Paint_Less.metallic = 1;
    M_YuanZhuiPoSuiJi_Paint_Less.roughness = 0.23;
    M_YuanZhuiPoSuiJi_Paint_Less.metallicF0Factor = 0.5;
    // M_YuanZhuiPoSuiJi_Paint_Less.bumpTexture.level = 0.15;

    M_YuanZhuiPoSuiJi_Logo_Texture.albedoColor = new BABYLON.Color3(0.07058823529411765, 0.07058823529411765, 0.07058823529411765);
    M_YuanZhuiPoSuiJi_Logo_Texture.roughness = 0.5;

    M_YuanZhuiPoSuiJi_Logo_Normal.albedoColor = M_YuanZhuiPoSuiJi_Paint_Main.albedoColor;
    M_YuanZhuiPoSuiJi_Logo_Normal.metallicTexture = M_YuanZhuiPoSuiJi_Paint_Main.metallicTexture;
    M_YuanZhuiPoSuiJi_Logo_Normal.metallic = M_YuanZhuiPoSuiJi_Paint_Main.metallic;
    M_YuanZhuiPoSuiJi_Logo_Normal.roughness = M_YuanZhuiPoSuiJi_Paint_Main.roughness;
    M_YuanZhuiPoSuiJi_Logo_Normal.metallicF0Factor = M_YuanZhuiPoSuiJi_Paint_Main.metallicF0Factor;
}

function initscene() {
    // btnrander('model', 'modelbtn1', './animation/datam1.json');
    //  btnrander('model', 'modelbtn2', './animation/datam2.json');
    //  btnrander('model', 'modelbtn3', './animation/datam3.json');
    btnrander('color', 'colorbtn1', './animation/datac1.json');
    btnrander('color', 'colorbtn2', './animation/datac2.json');
    btnrander('color', 'colorbtn3', './animation/datac3.json');
    btnrander('display', 'displaybtn1', './animation/dataplus2.json');
    id = localStorage.getItem("id")
    // id = "1"
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
    //  setTimeout( ()=> {
    initCamera();
    initAnim(nextModelAnim);
   //     loadPic();
    initHotSpot()
    //    hotSpot();
    // },1000)
    // setTimeout(()=>{mouseEvenTimeOut = false},2000)
}
function initCamera() {
    // let animName = "camera_in";
    //  getactivecamera()  //获取相机

    let animIn = animationArr.filter((value, index) => { if (value.btnName == nextModelAnim) { return value } })
    let activecam1 = scene.getCameraByID("Camera")
    cameraArcRotateAnimate(activecam1, ...animIn[0].cameraAnimTargetNormolPosition, ...animIn[0].cameraAnimNormolPosition)
    // cameraPostionAnimate(activecam1,...animIn[0].cameraAnimNormolPosition,...animIn[0].cameraAnimTargetNormolPosition)

    // setTimeout(function () {
    //     let ag = scene.getAnimationGroupByName(animName);
    //     ag.start(false, 1, ag.from, ag.to)
    // }, 2000);
}
function initAnim(nextModelAnim) {
    // let inTimeOut = 1000;
    let animIn = animationArr.filter((value, index) => { if (value.btnName == nextModelAnim) { return value } })
    animationInOut(animIn[0].val.inout, "in")
    // inTimeOut = animationInOut(animIn[0].val.inout, "in")
    // setTimeout(() => { mouseEvenTimeOut = false }, inTimeOut)
}
// window.onload = function () {
//     setTimeout(() => {
//         initscene()
//     }, 500)

// }



