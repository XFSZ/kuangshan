/// <reference path="babylon.d.ts" />


var canvas = document.getElementById("renderCanvas"); // Get the canvas element
var engine = new BABYLON.Engine(canvas, true, null, true);

//debug快捷键 shift+alt+d
function togglerDebugLayer() {
    var scene = engine.scenes[0];
    if (scene.debugLayer.isVisible()) {
        scene.debugLayer.hide();
    }
    else {
        scene.debugLayer.show({
            overlay: true,//覆盖模式打开
        });
    }
}

document.addEventListener("keydown", function (event) {
    if (event.altKey && event.shiftKey && event.keyCode === 68) {
        togglerDebugLayer();
    }
});


function MyLoadingScreen() {

}

MyLoadingScreen.prototype.displayLoadingUI = function () {
};

MyLoadingScreen.prototype.hideLoadingUI = function () {
    document.getElementById("loadingScreen_Container").style.opacity = "0";
    document.getElementById("loadingScreen_Container").style.visibility = "hidden";
};


var onFoucus;
/******* Add the create scene function ******/
var createScene = function () {
    var scene = new BABYLON.Scene(engine);

    scene.clearColor = new BABYLON.Color4(0, 0, 0, 0);

    // 在引擎里设置画面取代默认的加载画面
    var loadingScreen = new MyLoadingScreen();
    engine.loadingScreen = loadingScreen;

    scene.imageProcessingConfiguration.exposure = 3.4;
    scene.imageProcessingConfiguration.contrast = 1.9;
    scene.imageProcessingConfiguration.toneMappingEnabled = true;
    scene.imageProcessingConfiguration.toneMappingType = 1;


    scene.fogMode = 2;
    scene.fogColor = new BABYLON.Color3(0.1450980392156863, 0.2, 0.24313725490196078);
    scene.fogDensity = 0.065;

    //camera
    var camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, new BABYLON.Vector3(0, 0.53, 0), scene);
    camera.attachControl(canvas, true);
    camera.minZ = 0.1;
    camera.maxZ = 10000;

    // camera.upperBetaLimit = 1.5;
    camera.lowerRadiusLimit = 1;
    camera.upperRadiusLimit = 7;

    //相机惯性
    camera.angularSensibilityX = 2000;
    camera.angularSensibilityY = 2000;
    camera.panningSensibility = 2000;
    camera.wheelDeltaPercentage = 0.008;
    camera.pinchDeltaPercentage = 0.0005;

    //自动旋转相机
    // camera.useAutoRotationBehavior = true;

    // Environment Texture
    var hdrTexture = BABYLON.CubeTexture.CreateFromPrefilteredData("textures/environment_cube_specular.env", scene);
    scene.createDefaultSkybox(hdrTexture, true);
    scene.getMeshByID("hdrSkyBox").setEnabled(false);
    // hdrTexture.level = 2;


    // 后期效果
    // var defaultPipeline = new BABYLON.DefaultRenderingPipeline("defaultPipeline", true, scene, [camera]);
    // if (defaultPipeline.isSupported) {
    //     /* MSAA */
    //     defaultPipeline.samples = 8; // 1 by default

    //     defaultPipeline.imageProcessingEnabled = false;
    //     /* bloom */
    //     defaultPipeline.bloomEnabled = true; // false by default
    //     if (defaultPipeline.bloomEnabled) {
    //         defaultPipeline.bloomKernel = 128; // 64 by default
    //         defaultPipeline.bloomScale = 0.5; // 0.5 by default
    //         defaultPipeline.bloomThreshold = 1; // 0.9 by default
    //         defaultPipeline.bloomWeight = 0.65; // 0.15 by default
    //     }
    //     /* chromatic abberation */
    //     defaultPipeline.chromaticAberrationEnabled = false; // false by default
    //     if (defaultPipeline.chromaticAberrationEnabled) {
    //         defaultPipeline.chromaticAberration.aberrationAmount = 30; // 30 by default
    //         defaultPipeline.chromaticAberration.adaptScaleToCurrentViewport = false; // false by default
    //         defaultPipeline.chromaticAberration.alphaMode = 0; // 0 by default
    //         defaultPipeline.chromaticAberration.alwaysForcePOT = false; // false by default
    //         defaultPipeline.chromaticAberration.enablePixelPerfectMode = false; // false by default
    //         defaultPipeline.chromaticAberration.forceFullscreenViewport = true; // true by default
    //     }
    //     /* DOF */
    //     defaultPipeline.depthOfFieldEnabled = true; // false by default
    //     if (defaultPipeline.depthOfFieldEnabled && defaultPipeline.depthOfField.isSupported) {
    //         defaultPipeline.depthOfFieldBlurLevel = 0; // 0 by default
    //         defaultPipeline.depthOfField.fStop = 8.8; // 1.4 by default
    //         defaultPipeline.depthOfField.focalLength = 50; // 50 by default, mm
    //         defaultPipeline.depthOfField.focusDistance = 1000; // 2000 by default, mm
    //         defaultPipeline.depthOfField.lensSize = 28; // 50 by default
    //     }
    //     /* FXAA */
    //     defaultPipeline.fxaaEnabled = false; // false by default
    //     if (defaultPipeline.fxaaEnabled) {
    //         defaultPipeline.fxaa.samples = 1; // 1 by default
    //         defaultPipeline.fxaa.adaptScaleToCurrentViewport = false; // false by default
    //     }
    //     /* glowLayer */
    //     defaultPipeline.glowLayerEnabled = true;
    //     if (defaultPipeline.glowLayerEnabled) {
    //         defaultPipeline.glowLayer.blurKernelSize = 16; // 16 by default
    //         defaultPipeline.glowLayer.intensity = 2.7; // 1 by default
    //     }
    //     /* grain */
    //     defaultPipeline.grainEnabled = false;
    //     if (defaultPipeline.grainEnabled) {
    //         defaultPipeline.grain.adaptScaleToCurrentViewport = false; // false by default
    //         defaultPipeline.grain.animated = false; // false by default
    //         defaultPipeline.grain.intensity = 30; // 30 by default
    //     }
    //     /* sharpen */
    //     defaultPipeline.sharpenEnabled = false;
    //     if (defaultPipeline.sharpenEnabled) {
    //         defaultPipeline.sharpen.adaptScaleToCurrentViewport = false; // false by default
    //         defaultPipeline.sharpen.edgeAmount = 0.3; // 0.3 by default
    //         defaultPipeline.sharpen.colorAmount = 1; // 1 by default
    //     }
    // }

    // var light2 = new BABYLON.HemisphericLight("HemiLight", new BABYLON.Vector3(0, 1, 0), scene);

    // light1
    var light = new BABYLON.DirectionalLight("light", new BABYLON.Vector3(-1, -2, -1), scene);
    light.position = new BABYLON.Vector3(-0.5955874093676108, 1.463424720556741, 0.7257959743088755);
    light.direction = new BABYLON.Vector3(0.38741777155154383, -0.751732878412204, -0.533671387466237);
    light.diffuse = new BABYLON.Color3(1, 0.7607843137254902, 0.6);
    light.intensity = 0.7;
    light.shadowEnabled = true;
    light.shadowMinZ = 0.001;
    light.shadowMaxZ = 30;


    //透明阴影
    let ground = BABYLON.Mesh.CreatePlane('ground1', 1000, scene);
    ground.rotation.x = Math.PI / 2;
    ground.material = new BABYLON.ShadowOnlyMaterial('shadowGround', scene);
    ground.material.shadowColor = new BABYLON.Color3(1, 1, 1);
    ground.receiveShadows = true;

    let shadowGenerator = new BABYLON.ShadowGenerator(1024, light);
    shadowGenerator.useBlurExponentialShadowMap = true;
    shadowGenerator.blurScale = 2;
    shadowGenerator.blurBoxOffset = 1;
    shadowGenerator.setDarkness(0.2);
    shadowGenerator.usePoissonSampling = true;
    shadowGenerator.filter = 3;
    shadowGenerator.filteringQuality = 2;
    shadowGenerator.bias = 0;
    shadowGenerator.contactHardeningLightSizeUVRatio = 1;
    shadowGenerator.darkness = 0.74;
    shadowGenerator.normalBias = 0;
    scene.getMaterialByID("shadowGround").alphaMode = 4;



    BABYLON.SceneLoader.Append("model/SheBei/", "XuanHuiPoSuiJi.gltf", scene, function (meshes) {
        scene.getTransformNodeByID("XuanHuiPoSuiJi_G").position = new BABYLON.Vector3(-4, 0, 0);
    
        let aoTexture = new BABYLON.Texture("model/SheBei/XuanHuiPoSuiJi_Ao.jpg", scene);
        // aoTexture.coordinatesIndex = 1;
        aoTexture.vScale = -1;
    
        //材质调整
        let M_XuanHuiPoSuiJi_AN_Shelf_Steel_Black = scene.getMaterialByID("M_XuanHuiPoSuiJi_AN_Shelf_Steel_Black");
        let M_XuanHuiPoSuiJi_AN_Screw_Steel = scene.getMaterialByID("M_XuanHuiPoSuiJi_AN_Screw_Steel");
        let M_XuanHuiPoSuiJi_Screw_Steel = scene.getMaterialByID("M_XuanHuiPoSuiJi_Screw_Steel");
        let M_XuanHuiPoSuiJi_Metal_Iron = scene.getMaterialByID("M_XuanHuiPoSuiJi_Metal_Iron");
        let M_XuanHuiPoSuiJi_Paint_Main = scene.getMaterialByID("M_XuanHuiPoSuiJi_Paint_Main");
        let M_XuanHuiPoSuiJi_Metal_Iron_Black = scene.getMaterialByID("M_XuanHuiPoSuiJi_Metal_Iron_Black");
        let M_XuanHuiPoSuiJi_Iron_Crimson = scene.getMaterialByID("M_XuanHuiPoSuiJi_Metal_Iron_Crimson");
        let M_XuanHuiPoSuiJi_Metal_Iron_Gray = scene.getMaterialByID("M_XuanHuiPoSuiJi_Metal_Iron_Gray");
        let M_XuanHuiPoSuiJi_Metal_Steel_Silver = scene.getMaterialByID("M_XuanHuiPoSuiJi_Metal_Steel_Silver");
        let M_XuanHuiPoSuiJi_Logo_Texture = scene.getMaterialByID("M_XuanHuiPoSuiJi_Logo_Texture");
    
        // 添加ao
    
/*         M_XuanHuiPoSuiJi_Paint_Main.ambientTexture = aoTexture;
        M_XuanHuiPoSuiJi_Metal_Iron.ambientTexture = aoTexture;
        M_XuanHuiPoSuiJi_Metal_Iron_Black.ambientTexture = aoTexture;
        M_XuanHuiPoSuiJi_Iron_Crimson.ambientTexture = aoTexture;
        M_XuanHuiPoSuiJi_Metal_Iron_Gray.ambientTexture = aoTexture;
        M_XuanHuiPoSuiJi_Metal_Steel_Silver.ambientTexture = aoTexture;
        M_XuanHuiPoSuiJi_AN_Shelf_Steel_Black.ambientTexture = aoTexture; */
    
    
        M_XuanHuiPoSuiJi_Paint_Main.albedoColor = new BABYLON.Color3(0.36470588235294116, 0.18823529411764706, 0);
        M_XuanHuiPoSuiJi_Paint_Main.bumpTexture = new BABYLON.Texture("model/SheBei/Plastic_Polymer_256_normal.jpg", scene);
        M_XuanHuiPoSuiJi_Paint_Main.bumpTexture.level = 0.45;
        M_XuanHuiPoSuiJi_Paint_Main.bumpTexture.uScale = 30;
        M_XuanHuiPoSuiJi_Paint_Main.bumpTexture.vScale = 30;
        M_XuanHuiPoSuiJi_Paint_Main.metallic = 0.2;
        M_XuanHuiPoSuiJi_Paint_Main.roughness = 0.14;
    
        M_XuanHuiPoSuiJi_Metal_Iron.metallic = 1;
        M_XuanHuiPoSuiJi_Metal_Iron.roughness = 0.18;
        M_XuanHuiPoSuiJi_Metal_Iron.albedoColor = new BABYLON.Color3(0.18823529411764706, 0.18823529411764706, 0.18823529411764706);
    
        M_XuanHuiPoSuiJi_Metal_Iron_Black.metallic = 1;
        M_XuanHuiPoSuiJi_Metal_Iron_Black.roughness = 0.24;
    
        M_XuanHuiPoSuiJi_Metal_Iron_Gray.metallic = 1;
        M_XuanHuiPoSuiJi_Metal_Iron_Gray.roughness = 0.64;
    
        M_XuanHuiPoSuiJi_Iron_Crimson.metallic = 0;
        M_XuanHuiPoSuiJi_Iron_Crimson.roughness = 0.4;
    
        M_XuanHuiPoSuiJi_Metal_Steel_Silver.metallic = 1;
        M_XuanHuiPoSuiJi_Metal_Steel_Silver.roughness = 0.05;
    
        M_XuanHuiPoSuiJi_Logo_Texture.opacityTexture = new BABYLON.Texture("model/SheBei/ShenYangShunDa_alpha_ShenYangShunDa.png");
        M_XuanHuiPoSuiJi_Logo_Texture.opacityTexture.vScale = -1;
        M_XuanHuiPoSuiJi_Logo_Texture.transparencyMode = 3;
        M_XuanHuiPoSuiJi_Logo_Texture.roughness = 0.5;
        M_XuanHuiPoSuiJi_Logo_Texture.albedoColor = new BABYLON.Color3(0, 0, 0);
    
    
        M_XuanHuiPoSuiJi_Iron_Crimson.albedoColor = new BABYLON.Color3(0.1333333, 0.027450980, 0.0274509);
        M_XuanHuiPoSuiJi_Iron_Crimson.bumpTexture = new BABYLON.Texture("model/SheBei/Plastic_Polymer_256_normal.jpg", scene);
        M_XuanHuiPoSuiJi_Iron_Crimson.bumpTexture.uScale = 20;
        M_XuanHuiPoSuiJi_Iron_Crimson.bumpTexture.vScale = 20;
    
        M_XuanHuiPoSuiJi_AN_Shelf_Steel_Black.albedoColor = new BABYLON.Color3(0, 0, 0);
        M_XuanHuiPoSuiJi_AN_Shelf_Steel_Black.metallic = 1;
        M_XuanHuiPoSuiJi_AN_Shelf_Steel_Black.roughness = 0.24;
    
        M_XuanHuiPoSuiJi_AN_Screw_Steel.albedoColor = new BABYLON.Color3(0.03, 0.03, 0.03);
        M_XuanHuiPoSuiJi_AN_Screw_Steel.metallic = 1;
        M_XuanHuiPoSuiJi_AN_Screw_Steel.roughness = 0.24;

        M_XuanHuiPoSuiJi_Screw_Steel.albedoColor = new BABYLON.Color3(0.03, 0.03, 0.03);
        M_XuanHuiPoSuiJi_Screw_Steel.metallic = 1;
        M_XuanHuiPoSuiJi_Screw_Steel.roughness = 0.24;
        
        //创建只接受阴影的材质
        shadowGenerator.getShadowMap().renderList.push(scene.getMeshByID("XuanHuiPoSuiJi_primitive2"));
        shadowGenerator.getShadowMap().renderList.push(scene.getMeshByID("XuanHuiPoSuiJi_Module_2_primitive1"));
        shadowGenerator.getShadowMap().renderList.push(scene.getMeshByID("XuanHuiPoSuiJi_Module_2_primitive0"));
        shadowGenerator.getShadowMap().renderList.push(scene.getMeshByID("XuanHuiPoSuiJi_Module_3_primitive0"));
        shadowGenerator.getShadowMap().renderList.push(scene.getMeshByID("XuanHuiPoSuiJi_Module_3_primitive1"));
        shadowGenerator.getShadowMap().renderList.push(scene.getMeshByID("XuanHuiPoSuiJi_Module_4_primitive0"));
        shadowGenerator.getShadowMap().renderList.push(scene.getMeshByID("XuanHuiPoSuiJi_Module_5_primitive1"));
        shadowGenerator.getShadowMap().renderList.push(scene.getMeshByID("XuanHuiPoSuiJi_Module_5_primitive3"));
        let ag = scene.getAnimationGroupByName('XuanHuiPoSuiJi_BaoZha');
        ag.stop();
        // console.log(ag)
    
    });


    BABYLON.SceneLoader.Append("model/SheBei/", "ZhiShaJi.gltf", scene, function (meshes) {
        scene.getTransformNodeByID("ZhiShaJi_G").position = new BABYLON.Vector3(4, 0, 0);

        let aoTexture = new BABYLON.Texture("model/SheBei/ZhiShaJi_AO.jpg", scene);
        aoTexture.vScale = -1;

        //材质
        let M_Logo_Texture = scene.getMaterialByID("M_Logo_Texture");
        let M_Metal_Iron_Black = scene.getMaterialByID("M_Metal_Iron_Black");
        let M_Metal_Iron_Gray = scene.getMaterialByID("M_Metal_Iron_Gray");
        let M_Metal_Steel_Silver = scene.getMaterialByID("M_Metal_Steel_Silver");
        let M_Paint_Less = scene.getMaterialByID("M_Paint_Less");
        let M_Paint_Main = scene.getMaterialByID("M_Paint_Main");


        //材质调整
        M_Metal_Iron_Black.ambientTexture = aoTexture;
        M_Metal_Iron_Gray.ambientTexture = aoTexture;
        M_Metal_Steel_Silver.ambientTexture = aoTexture;
        M_Paint_Less.ambientTexture = aoTexture;
        M_Paint_Main.ambientTexture = aoTexture;


        M_Logo_Texture.albedoColor = new BABYLON.Color3(0.07058823529411765, 0.07058823529411765, 0.07058823529411765);
        M_Logo_Texture.opacityTexture = new BABYLON.Texture("model/SheBei/ShenYangShunDa_alpha_ShenYangShunDa.png");
        M_Logo_Texture.opacityTexture.vScale = -1;
        M_Logo_Texture.transparencyMode = 3;
        M_Logo_Texture.metallic = 1;
        M_Logo_Texture.roughness = 0;

        M_Paint_Main.albedoColor = new BABYLON.Color3(0.36470588235294116, 0.18823529411764706, 0);
        M_Paint_Main.bumpTexture = new BABYLON.Texture("model/SheBei/Plastic_Polymer_256_normal.jpg", scene);
        M_Paint_Main.bumpTexture.level = 0.1;
        M_Paint_Main.bumpTexture.uScale = 30;
        M_Paint_Main.bumpTexture.vScale = 30;
        M_Paint_Main.metallic = 0.2;
        M_Paint_Main.roughness = 0.14;


        M_Paint_Less.albedoColor = new BABYLON.Color3(0.1843137254901961, 0.058823529411764705, 0.058823529411764705);
        M_Paint_Less.emissiveColor = new BABYLON.Color3(0, 0, 0);
        M_Paint_Less.metallic = 0.47;
        M_Paint_Less.roughness = 0.11;
        M_Paint_Less.bumpTexture = new BABYLON.Texture("model/SheBei/Plastic_Polymer_256_normal.jpg", scene);
        M_Paint_Less.bumpTexture.level = 0.15;
        M_Paint_Less.bumpTexture.uScale = 30;
        M_Paint_Less.bumpTexture.vScale = 30;


        M_Metal_Iron_Black.albedoColor = new BABYLON.Color3(0.03137254901960784, 0.03137254901960784, 0.03137254901960784);
        M_Metal_Iron_Black.metallic = 1;
        M_Metal_Iron_Black.roughness = 0.38;

        M_Metal_Iron_Gray.albedoColor = new BABYLON.Color3(0.09019607843137255, 0.09019607843137255, 0.09019607843137255);
        M_Metal_Iron_Gray.metallic = 1;
        M_Metal_Iron_Gray.roughness = 0;

        M_Metal_Steel_Silver.metallic = 1;
        M_Metal_Steel_Silver.roughness = 0.05;


        //创建只接受阴影的材质
        shadowGenerator.getShadowMap().renderList.push(scene.getMeshByID("ShenYangShunDa1_primitive1"));
        shadowGenerator.getShadowMap().renderList.push(scene.getMeshByID("M_Metal_Iron_Crimson1"));
        shadowGenerator.getShadowMap().renderList.push(scene.getMeshByID("M_Metal_Steel_Silver1"));
        shadowGenerator.getShadowMap().renderList.push(scene.getMeshByID("M_Metal_Iron_Black1"));
        let ag = scene.getAnimationGroupByName('ZhiShaJi_BaoZha');
        ag.stop();

    });

    BABYLON.SceneLoader.Append("model/SheBei/", "YuanZhuiPoSuiJi.gltf", scene, function (meshes) {

        let aoTexture = new BABYLON.Texture("model/SheBei/YuanZhuiPoSuiJi_AO.jpg", scene);
        aoTexture.vScale = -1;
    
        //材质调整
        let M_YuanZhuiPoSuiJi_AN_Line_Rubber_Black = scene.getMaterialByID("M_YuanZhuiPoSuiJi_AN_Line_Rubber_Black");
        let M_YuanZhuiPoSuiJi_AN_Line_Steel = scene.getMaterialByID("M_YuanZhuiPoSuiJi_AN_Line_Steel");
        let M_YuanZhuiPoSuiJi_AN_Screw_Steel = scene.getMaterialByID("M_YuanZhuiPoSuiJi_AN_Screw_Steel");
        let M_YuanZhuiPoSuiJi_AN_Shelf_Steel_Black = scene.getMaterialByID("M_YuanZhuiPoSuiJi_AN_Shelf_Steel_Black");
    
        let M_YuanZhuiPoSuiJi_Paint_Main = scene.getMaterialByID("M_YuanZhuiPoSuiJi_Paint_Main");
        let M_YuanZhuiPoSuiJi_Paint_Less = scene.getMaterialByID("M_YuanZhuiPoSuiJi_Paint_Less");
    
        let M_YuanZhuiPoSuiJi_Logo_Texture = scene.getMaterialByID("M_YuanZhuiPoSuiJi_Logo_Texture");
        let M_YuanZhuiPoSuiJi_Metal_Brass = scene.getMaterialByID("M_YuanZhuiPoSuiJi_Metal_Brass");
        let M_YuanZhuiPoSuiJi_Metal_Iron_Black = scene.getMaterialByID("M_YuanZhuiPoSuiJi_Metal_Iron_Black");
        let M_YuanZhuiPoSuiJi_Metal_Iron_Crimson = scene.getMaterialByID("M_YuanZhuiPoSuiJi_Metal_Iron_Crimson");
        let M_YuanZhuiPoSuiJi_Metal_Iron_Gray = scene.getMaterialByID("M_YuanZhuiPoSuiJi_Metal_Iron_Gray");
        let M_YuanZhuiPoSuiJi_Metal_Steel_Silver = scene.getMaterialByID("M_YuanZhuiPoSuiJi_Metal_Steel_Silver");
        let M_YuanZhuiPoSuiJi_Plastic_Black = scene.getMaterialByID("M_YuanZhuiPoSuiJi_Plastic_Black");
    
        // 添加ao
        M_YuanZhuiPoSuiJi_AN_Line_Rubber_Black.ambientTexture = aoTexture;
        M_YuanZhuiPoSuiJi_AN_Line_Steel.ambientTexture = aoTexture;
        M_YuanZhuiPoSuiJi_AN_Screw_Steel.ambientTexture = aoTexture;
        M_YuanZhuiPoSuiJi_AN_Shelf_Steel_Black.ambientTexture = aoTexture;
        M_YuanZhuiPoSuiJi_Paint_Main.ambientTexture = aoTexture;
        M_YuanZhuiPoSuiJi_Paint_Less.ambientTexture = aoTexture;
        M_YuanZhuiPoSuiJi_Metal_Brass.ambientTexture = aoTexture;
        M_YuanZhuiPoSuiJi_Metal_Iron_Black.ambientTexture = aoTexture;
        M_YuanZhuiPoSuiJi_Metal_Iron_Gray.ambientTexture = aoTexture;
        M_YuanZhuiPoSuiJi_Metal_Steel_Silver.ambientTexture = aoTexture;
        M_YuanZhuiPoSuiJi_Plastic_Black.ambientTexture = aoTexture;
    
        //材质调整
        M_YuanZhuiPoSuiJi_Logo_Texture.albedoColor = new BABYLON.Color3(0.07058823529411765, 0.07058823529411765, 0.07058823529411765);
        M_YuanZhuiPoSuiJi_Logo_Texture.opacityTexture = new BABYLON.Texture("model/SheBei/ShenYangShunDa_alpha_ShenYangShunDa.png");
        M_YuanZhuiPoSuiJi_Logo_Texture.opacityTexture.vScale = -1;
        M_YuanZhuiPoSuiJi_Logo_Texture.transparencyMode = 3;
        M_YuanZhuiPoSuiJi_Logo_Texture.metallic = 1;
        M_YuanZhuiPoSuiJi_Logo_Texture.roughness = 0.5;

    
        M_YuanZhuiPoSuiJi_Paint_Main.albedoColor = new BABYLON.Color3(0.36470588235294116, 0.18823529411764706, 0);
        M_YuanZhuiPoSuiJi_Paint_Main.bumpTexture = new BABYLON.Texture("model/SheBei/Plastic_Polymer_256_normal.jpg", scene);
        M_YuanZhuiPoSuiJi_Paint_Main.bumpTexture.level = 0.45;
        M_YuanZhuiPoSuiJi_Paint_Main.bumpTexture.uScale = 25;
        M_YuanZhuiPoSuiJi_Paint_Main.bumpTexture.vScale = 25;
        M_YuanZhuiPoSuiJi_Paint_Main.metallic = 0.2;
        M_YuanZhuiPoSuiJi_Paint_Main.roughness = 0.14;
    
    
        M_YuanZhuiPoSuiJi_Paint_Less.albedoColor = new BABYLON.Color3(0.23921568627450981, 0.23921568627450981, 0.23921568627450981);
        M_YuanZhuiPoSuiJi_Paint_Less.emissiveColor = new BABYLON.Color3(0, 0, 0);
        M_YuanZhuiPoSuiJi_Paint_Less.metallic = 1;
        M_YuanZhuiPoSuiJi_Paint_Less.roughness = 0.05;
        M_YuanZhuiPoSuiJi_Paint_Less.bumpTexture = new BABYLON.Texture("model/SheBei/Plastic_Polymer_256_normal.jpg", scene);
        M_YuanZhuiPoSuiJi_Paint_Less.bumpTexture.level = 0.01;
        M_YuanZhuiPoSuiJi_Paint_Less.bumpTexture.uScale = 25;
        M_YuanZhuiPoSuiJi_Paint_Less.bumpTexture.vScale = 25;
    
        M_YuanZhuiPoSuiJi_Metal_Brass.albedoColor = new BABYLON.Color3(0.3411764705882353, 0.27058823529411763, 0.0784313725490196);
        M_YuanZhuiPoSuiJi_Metal_Brass.metallic = 1;
        M_YuanZhuiPoSuiJi_Metal_Brass.roughness = 0.08;
    
        M_YuanZhuiPoSuiJi_Metal_Iron_Black.albedoColor = new BABYLON.Color3(0.03137254901960784, 0.03137254901960784, 0.03137254901960784);
        M_YuanZhuiPoSuiJi_Metal_Iron_Black.metallic = 1;
        M_YuanZhuiPoSuiJi_Metal_Iron_Black.roughness = 0.38;
    
        M_YuanZhuiPoSuiJi_Metal_Iron_Gray.metallic = 1;
        M_YuanZhuiPoSuiJi_Metal_Iron_Gray.roughness = 0.64;
    
        M_YuanZhuiPoSuiJi_Metal_Iron_Crimson.albedoColor = new BABYLON.Color3(0.1333333, 0.027450980, 0.0274509);
        M_YuanZhuiPoSuiJi_Metal_Iron_Crimson.metallic = 0;
        M_YuanZhuiPoSuiJi_Metal_Iron_Crimson.roughness = 0.4;
        M_YuanZhuiPoSuiJi_Metal_Iron_Crimson.bumpTexture = new BABYLON.Texture("model/SheBei/Plastic_Polymer_256_normal.jpg", scene);
        M_YuanZhuiPoSuiJi_Metal_Iron_Crimson.bumpTexture.uScale = 20;
        M_YuanZhuiPoSuiJi_Metal_Iron_Crimson.bumpTexture.vScale = 20;
    
        M_YuanZhuiPoSuiJi_Metal_Steel_Silver.metallic = 1;
        M_YuanZhuiPoSuiJi_Metal_Steel_Silver.roughness = 0.05;
    
        M_YuanZhuiPoSuiJi_AN_Shelf_Steel_Black.albedoColor = new BABYLON.Color3(0, 0, 0);
        M_YuanZhuiPoSuiJi_AN_Shelf_Steel_Black.metallic = 1;
        M_YuanZhuiPoSuiJi_AN_Shelf_Steel_Black.roughness = 0.24;
        M_YuanZhuiPoSuiJi_AN_Shelf_Steel_Black.transparencyMode = 2;
    
        M_YuanZhuiPoSuiJi_AN_Line_Rubber_Black.roughness = 0.27;
        M_YuanZhuiPoSuiJi_AN_Line_Rubber_Black.transparencyMode = 2;
    
        M_YuanZhuiPoSuiJi_AN_Line_Steel.albedoColor = new BABYLON.Color3(0.18823529411764706, 0.18823529411764706, 0.18823529411764706);
        M_YuanZhuiPoSuiJi_AN_Line_Steel.metallic = 1;
        M_YuanZhuiPoSuiJi_AN_Line_Steel.roughness = 0.18;
    
        M_YuanZhuiPoSuiJi_AN_Screw_Steel.albedoColor = new BABYLON.Color3(0, 0, 0);
        M_YuanZhuiPoSuiJi_AN_Screw_Steel.metallic = 1;
        M_YuanZhuiPoSuiJi_AN_Screw_Steel.roughness = 0.18;
    
    
        //创建只接受阴影的材质
        shadowGenerator.getShadowMap().renderList.push(scene.getMeshByID("YuanZhuiPoSuiJi_Module_1_primitive3"));
        shadowGenerator.getShadowMap().renderList.push(scene.getMeshByID("YuanZhuiPoSuiJi_Module_2_primitive1"));
        shadowGenerator.getShadowMap().renderList.push(scene.getMeshByID("YuanZhuiPoSuiJi_Module_2_primitive2"));
        shadowGenerator.getShadowMap().renderList.push(scene.getMeshByID("YuanZhuiPoSuiJi_Module_2_primitive3"));
        shadowGenerator.getShadowMap().renderList.push(scene.getMeshByID("YuanZhuiPoSuiJi_Module_3_primitive1"));
        shadowGenerator.getShadowMap().renderList.push(scene.getMeshByID("YuanZhuiPoSuiJi_Module_4_primitive0"));
        shadowGenerator.getShadowMap().renderList.push(scene.getMeshByID("YuanZhuiPoSuiJi_Module_4_primitive1"));
        shadowGenerator.getShadowMap().renderList.push(scene.getMeshByID("YuanZhuiPoSuiJi_Module_4_primitive2"));
        shadowGenerator.getShadowMap().renderList.push(scene.getMeshByID("YuanZhuiPoSuiJi_Module_4_primitive3"));
        shadowGenerator.getShadowMap().renderList.push(scene.getMeshByID("YuanZhuiPoSuiJi_Module_5_primitive1"));
        shadowGenerator.getShadowMap().renderList.push(scene.getMeshByID("YuanZhuiPoSuiJi_Module_5_primitive2"));
        shadowGenerator.getShadowMap().renderList.push(scene.getMeshByID("YuanZhuiPoSuiJi_Shelf"));
       
        let ag = scene.getAnimationGroupByName('YuanZhuiPoSuiJi_BaoZha' );
        ag.stop();
    });

/*     //地面 
    var griddingMesh = BABYLON.MeshBuilder.CreatePlane("griddingMesh", { width: 20, height: 20 }, scene);
    griddingMesh.position = new BABYLON.Vector3(0, 0.001, 0);
    griddingMesh.rotation = new BABYLON.Vector3(Math.PI / 2, 0, 0);

    var M_gridding = new BABYLON.PBRMaterial("M_gridding", scene);
    M_gridding.albedoColor = new BABYLON.Color3(0.25098039215686274, 0.25098039215686274, 0.25098039215686274);
    M_gridding.metallic = 0;
    M_gridding.roughness = 0.23;
    M_gridding.microSurface = 1;
    M_gridding.opacityTexture = new BABYLON.Texture('../textures/gridding.png', scene);
    M_gridding.opacityTexture.uScale = 80;
    M_gridding.opacityTexture.vScale = 80;
    M_gridding.transparencyMode = 2;
    M_gridding.alpha = 0.11;
    M_gridding.alphaMode = 2;
    M_gridding.usePhysicalLightFalloff = true;

    griddingMesh.material = M_gridding; */

    //点点
    var spotMesh = BABYLON.MeshBuilder.CreatePlane("spotMesh", { width: 20, height: 20 }, scene);
    // spotMesh.position = new BABYLON.Vector3(2.2188390396137536, -0.023294874523774378, -0.000691376644813891);
    spotMesh.rotation = new BABYLON.Vector3(Math.PI / 2, 0, 0);

    var M_spot = new BABYLON.PBRMaterial("M_spot", scene);
    M_spot.albedoColor = new BABYLON.Color3(0.16862745098039217, 0.16862745098039217, 0.16862745098039217);
    M_spot.metallic = 1;
    M_spot.microSurface = 1;
    M_spot.opacityTexture = new BABYLON.Texture('model/Spot.png', scene);
    M_spot.opacityTexture.uScale = 200;
    M_spot.opacityTexture.vScale = 200;
    M_spot.transparencyMode = 2;
    M_spot.alphaMode = 2;
    M_spot.usePhysicalLightFalloff = true;

    spotMesh.material = M_spot;


    //动画
    // var zoomIn = new BABYLON.Animation("zoomIn", "radius", 30, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT);
    // var keys = [];

    // keys.push({
    //     frame: 0,
    //     value: 12
    // });

    // keys.push({
    //     frame: 80,
    //     value: 2.5
    // });

    // //创建换动函数
    // var easingFunction = new BABYLON.CircleEase();
    // //选择缓动的方式
    // easingFunction.setEasingMode(BABYLON.EasingFunction.EASINGMODE_EASEOUT);
    // //将缓动添加给动画
    // zoomIn.setEasingFunction(easingFunction);

    // //将动画数组添加到动画对象：
    // zoomIn.setKeys(keys);
    // //将此动画链接到相机的radius上；
    // camera.animations.push(zoomIn);


    // var animationGroup1 = new BABYLON.AnimationGroup("camera_in");
    // animationGroup1.addTargetedAnimation(zoomIn, camera);

    // animationGroup1.play(false);
     

    // BABYLON.Animation.CreateAndStartAnimation('light', scene.environmentTexture, 'rotationY', 30, 1000, 0, Math.PI * 2);
  
    return scene;
};
/******* End of the create scene function ******/

var scene = createScene(); //Call the createScene function

// 注册渲染循环以重复渲染场景
engine.runRenderLoop(function () {
    scene.render();
});

// 监测浏览器/画布调整大小事件
window.addEventListener("resize", function () {
    engine.resize();
});
// let ag = engine.scenes[0].getAnimationGroupByName('XuanHuiPoSuiJi_BaoZha');


// ag.stop();
