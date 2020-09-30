"use strict"
var id = location.search;
let params = decodeURI(id).replace(/[^\d]/g, "");

let animArr = [
    { name: "XuanHuiPoSuiJi",  val: { exploit: "XuanHuiPoSuiJi_BaoZha", exploitout: "XuanHuiPoSuiJi_BaoZha_Inout", inout: "XuanHuiPoSuiJi_inout" } },
     { name: "YuanZhuiPoSuiJi", val: {exploit: "YuanZhuiPoSuiJi_BaoZha", exploitout: "YuanZhuiPoSuiJi_BaoZha_Inout", inout: "YuanZhuiPoSuiJi_inout" } },
    { name: "ZhiShaJi", val: {exploit: "ZhiShaJi_BaoZha", exploitout: "ZhiShaJi_BaoZha_Inout", inout: "ZhiShaJi_inout" } }]



function startAnimation(animationName) {
    setTimeout(function () {
        let ag = scene.getAnimationGroupByName(animationName);
        ag.start()
    }, 500);

}
window.onload = function () {
    (function () {
        if (params == '1') {
            startAnimation('XuanHuiPoSuiJi_inout');
        }
        if (params == '2') {
            startAnimation('YuanZhuiPoSuiJi_inout');
        }
        if (params == '3') {
            startAnimation('ZhiShaJi_inout');
        }
    })()
}
