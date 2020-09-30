BABYLON.SceneLoader.Append("model/SheBei/", "XuanHuiPoSuiJi.gltf", scene, function (meshes) {
    scene.getTransformNodeByID("XuanHuiPoSuiJi").position = new BABYLON.Vector3(-2, 0, 0);

    let aoTexture = new BABYLON.Texture("model/SheBei/XuanHuiPoSuiJi_Ao.jpg", scene);
    // aoTexture.coordinatesIndex = 1;
    aoTexture.vScale = -1;

    /*      scene.getMeshByID('__root__').rotation = new BABYLON.Vector3(Math.PI / 2, 0, 0);
            scene.getMeshByID("__root__").scaling = new BABYLON.Vector3(0.3, 0.3, -0.3);
            scene.getMeshByID("__root__").position = new BABYLON.Vector3(0, 0.04, 0); */

    //材质调整
    let M_AN_Shelf_Steel_Black = scene.getMaterialByID("M_XuanHuiPoSuiJi_AN_Shelf_Steel_Black");
    let M_Metal_Iron = scene.getMaterialByID("M_XuanHuiPoSuiJi_Metal_Iron");
    let M_Paint_Main = scene.getMaterialByID("M_XuanHuiPoSuiJi_Paint_Main");
    let M_Metal_Iron_Black = scene.getMaterialByID("M_XuanHuiPoSuiJi_Metal_Iron_Black");
    let M_Metal_Iron_Crimson = scene.getMaterialByID("M_XuanHuiPoSuiJi_Metal_Iron_Crimson");
    let M_Metal_Iron_Gray = scene.getMaterialByID("M_XuanHuiPoSuiJi_Metal_Iron_Gray");
    let M_Metal_Steel_Silver = scene.getMaterialByID("M_XuanHuiPoSuiJi_Metal_Steel_Silver");
    let M_Logo_Texture = scene.getMaterialByID("M_XuanHuiPoSuiJi_Logo_Texture");

    // 添加ao

    M_Paint_Main.ambientTexture = aoTexture;
    M_Metal_Iron.ambientTexture = aoTexture;
    M_Metal_Iron_Black.ambientTexture = aoTexture;
    M_Metal_Iron_Crimson.ambientTexture = aoTexture;
    M_Metal_Iron_Gray.ambientTexture = aoTexture;
    M_Metal_Steel_Silver.ambientTexture = aoTexture;
    M_AN_Shelf_Steel_Black.ambientTexture = aoTexture;


    M_Paint_Main.bumpTexture = new BABYLON.Texture("model/SheBei/Plastic_Polymer_256_normal.jpg", scene);
    M_Paint_Main.bumpTexture.level = 0.45;
    M_Paint_Main.bumpTexture.uScale = 30;
    M_Paint_Main.bumpTexture.vScale = 30;
    M_Paint_Main.metallic = 0;
    M_Paint_Main.roughness = 0.23;

    M_Metal_Iron.metallic = 1;
    M_Metal_Iron.roughness = 0.18;
    M_Metal_Iron.albedoColor = new BABYLON.Color3(0.18823529411764706, 0.18823529411764706, 0.18823529411764706);

    M_Metal_Iron_Black.metallic = 1;
    M_Metal_Iron_Black.roughness = 0.24;

    M_Metal_Iron_Gray.metallic = 1;
    M_Metal_Iron_Gray.roughness = 0.64;

    M_Metal_Iron_Crimson.metallic = 0;
    M_Metal_Iron_Crimson.roughness = 0.4;

    M_Metal_Steel_Silver.metallic = 1;
    M_Metal_Steel_Silver.roughness = 0.05;

    M_Logo_Texture.opacityTexture = new BABYLON.Texture("model/SheBei/ShenYangShunDa_alpha_ShenYangShunDa.png");
    M_Logo_Texture.opacityTexture.vScale = -1;
    M_Logo_Texture.transparencyMode = 3;
    M_Logo_Texture.roughness = 0.5;
    M_Logo_Texture.albedoColor = new BABYLON.Color3(0, 0, 0);


    M_Metal_Iron_Crimson.albedoColor = new BABYLON.Color3(0.1333333, 0.027450980, 0.0274509);
    M_Metal_Iron_Crimson.bumpTexture = new BABYLON.Texture("model/SheBei/Plastic_Polymer_256_normal.jpg", scene);
    M_Metal_Iron_Crimson.bumpTexture.uScale = 20;
    M_Metal_Iron_Crimson.bumpTexture.vScale = 20;

    M_AN_Shelf_Steel_Black.albedoColor = new BABYLON.Color3(0, 0, 0);
    M_AN_Shelf_Steel_Black.metallic = 1;
    M_AN_Shelf_Steel_Black.roughness = 0.24;

    //创建只接受阴影的材质
    shadowGenerator.getShadowMap().renderList.push(scene.getMeshByID("XuanHuiPoSuiJi_primitive2"));
    shadowGenerator.getShadowMap().renderList.push(scene.getMeshByID("XuanHuiPoSuiJi_Module_2_primitive1"));
    shadowGenerator.getShadowMap().renderList.push(scene.getMeshByID("XuanHuiPoSuiJi_Module_2_primitive0"));
    shadowGenerator.getShadowMap().renderList.push(scene.getMeshByID("XuanHuiPoSuiJi_Module_3_primitive0"));
    shadowGenerator.getShadowMap().renderList.push(scene.getMeshByID("XuanHuiPoSuiJi_Module_3_primitive1"));
    shadowGenerator.getShadowMap().renderList.push(scene.getMeshByID("XuanHuiPoSuiJi_Module_4_primitive0"));
    shadowGenerator.getShadowMap().renderList.push(scene.getMeshByID("XuanHuiPoSuiJi_Module_5_primitive1"));
    shadowGenerator.getShadowMap().renderList.push(scene.getMeshByID("XuanHuiPoSuiJi_Module_5_primitive3"));

});


BABYLON.SceneLoader.Append("model/SheBei/", "ZhiShaJi.gltf", scene, function (meshes) {
    scene.getTransformNodeByID("ZhiShaJi").position = new BABYLON.Vector3(2, 0, 0);

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
    M_Logo_Texture.transparencyMode = 2;
    M_Logo_Texture.metallic = 1;
    M_Logo_Texture.roughness = 0;

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

});

BABYLON.SceneLoader.Append("model/SheBei/", "YuanZhuiPoSuiJi.gltf", scene, function (meshes) {

    let aoTexture = new BABYLON.Texture("model/SheBei/YuanZhuiPoSuiJi_AO.jpg", scene);
    aoTexture.vScale = -1;

    //材质调整
    let M_AN_Line_Rubber_Black = scene.getMaterialByID("M_YuanZhuiPoSuiJi_AN_Line_Rubber_Black");
    let M_AN_Line_Steel = scene.getMaterialByID("M_YuanZhuiPoSuiJi_AN_Line_Steel");
    let M_AN_Screw_Steel = scene.getMaterialByID("M_YuanZhuiPoSuiJi_AN_Screw_Steel");
    let M_AN_Shelf_Steel_Black = scene.getMaterialByID("M_YuanZhuiPoSuiJi_AN_Shelf_Steel_Black");

    let M_Paint_Main = scene.getMaterialByID("M_YuanZhuiPoSuiJi_Paint_Main");
    let M_Paint_Less = scene.getMaterialByID("M_YuanZhuiPoSuiJi_Paint_Less");

    let M_Logo_Texture = scene.getMaterialByID("M_YuanZhuiPoSuiJi_Logo_Texture");
    let M_Metal_Brass = scene.getMaterialByID("M_YuanZhuiPoSuiJi_Metal_Brass");
    let M_Metal_Iron_Black = scene.getMaterialByID("M_YuanZhuiPoSuiJi_Metal_Iron_Black");
    let M_Metal_Iron_Crimson = scene.getMaterialByID("M_YuanZhuiPoSuiJi_Metal_Iron_Crimson");
    let M_Metal_Iron_Gray = scene.getMaterialByID("M_YuanZhuiPoSuiJi_Metal_Iron_Gray");
    let M_Metal_Steel_Silver = scene.getMaterialByID("M_YuanZhuiPoSuiJi_Metal_Steel_Silver");
    let M_Plastic_Black = scene.getMaterialByID("M_YuanZhuiPoSuiJi_Plastic_Black");

    // 添加ao
    M_AN_Line_Rubber_Black.ambientTexture = aoTexture;
    M_AN_Line_Steel.ambientTexture = aoTexture;
    M_AN_Screw_Steel.ambientTexture = aoTexture;
    M_AN_Shelf_Steel_Black.ambientTexture = aoTexture;
    M_Paint_Main.ambientTexture = aoTexture;
    M_Paint_Less.ambientTexture = aoTexture;
    M_Metal_Brass.ambientTexture = aoTexture;
    M_Metal_Iron_Black.ambientTexture = aoTexture;
    M_Metal_Iron_Gray.ambientTexture = aoTexture;
    M_Metal_Steel_Silver.ambientTexture = aoTexture;
    M_Plastic_Black.ambientTexture = aoTexture;


    M_Logo_Texture.opacityTexture = new BABYLON.Texture("model/SheBei/ShenYangShunDa_alpha_ShenYangShunDa.png");
    M_Logo_Texture.opacityTexture.vScale = -1;
    M_Logo_Texture.transparencyMode = 2;
    M_Logo_Texture.roughness = 0.5;
    M_Logo_Texture.albedoColor = new BABYLON.Color3(0, 0, 0);

    M_Paint_Main.bumpTexture = new BABYLON.Texture("model/SheBei/Plastic_Polymer_256_normal.jpg", scene);
    M_Paint_Main.bumpTexture.level = 0.45;
    M_Paint_Main.bumpTexture.uScale = 30;
    M_Paint_Main.bumpTexture.vScale = 30;
    M_Paint_Main.metallic = 0;
    M_Paint_Main.roughness = 0.23;


    M_Paint_Less.albedoColor = new BABYLON.Color3(0.30980392156862746, 0.30980392156862746, 0.30980392156862746);
    M_Paint_Less.emissiveColor = new BABYLON.Color3(0, 0, 0);
    M_Paint_Less.metallic = 1;
    M_Paint_Less.roughness = 0.23;
    M_Paint_Less.bumpTexture = new BABYLON.Texture("model/SheBei/Plastic_Polymer_256_normal.jpg", scene);
    M_Paint_Less.bumpTexture.level = 0.15;
    M_Paint_Less.bumpTexture.uScale = 30;
    M_Paint_Less.bumpTexture.vScale = 30;

    M_Metal_Brass.albedoColor = new BABYLON.Color3(0.3411764705882353, 0.27058823529411763, 0.0784313725490196);
    M_Metal_Brass.metallic = 1;
    M_Metal_Brass.roughness = 0.08;

    M_Metal_Iron_Black.albedoColor = new BABYLON.Color3(0.03137254901960784, 0.03137254901960784, 0.03137254901960784);
    M_Metal_Iron_Black.metallic = 1;
    M_Metal_Iron_Black.roughness = 0.38;

    M_Metal_Iron_Gray.metallic = 1;
    M_Metal_Iron_Gray.roughness = 0.64;

    M_Metal_Iron_Crimson.albedoColor = new BABYLON.Color3(0.1333333, 0.027450980, 0.0274509);
    M_Metal_Iron_Crimson.metallic = 0;
    M_Metal_Iron_Crimson.roughness = 0.4;
    M_Metal_Iron_Crimson.bumpTexture = new BABYLON.Texture("model/SheBei/Plastic_Polymer_256_normal.jpg", scene);
    M_Metal_Iron_Crimson.bumpTexture.uScale = 20;
    M_Metal_Iron_Crimson.bumpTexture.vScale = 20;

    M_Metal_Steel_Silver.metallic = 1;
    M_Metal_Steel_Silver.roughness = 0.05;

    M_AN_Shelf_Steel_Black.albedoColor = new BABYLON.Color3(0, 0, 0);
    M_AN_Shelf_Steel_Black.metallic = 1;
    M_AN_Shelf_Steel_Black.roughness = 0.24;

    M_AN_Line_Rubber_Black.roughness = 0.27;

    M_AN_Line_Steel.albedoColor = new BABYLON.Color3(0.18823529411764706, 0.18823529411764706, 0.18823529411764706);
    M_AN_Line_Steel.metallic = 1;
    M_AN_Line_Steel.roughness = 0.18;

    M_AN_Screw_Steel.albedoColor = new BABYLON.Color3(0, 0, 0);
    M_AN_Screw_Steel.metallic = 1;
    M_AN_Screw_Steel.roughness = 0.18;


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

});