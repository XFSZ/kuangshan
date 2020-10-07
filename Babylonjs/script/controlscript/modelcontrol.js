"use strict"
var id = location.search;
let params = decodeURI(id).replace(/[^\d]/g, "");

var animArr = [
    { name: "XuanHuiPoSuiJi", val: { exploit: "XuanHuiPoSuiJi_BaoZha", exploitout: "XuanHuiPoSuiJi_BaoZha_Inout", inout: "XuanHuiPoSuiJi_inout" } },
    { name: "YuanZhuiPoSuiJi", val: { exploit: "YuanZhuiPoSuiJi_BaoZha", exploitout: "YuanZhuiPoSuiJi_BaoZha_Inout", inout: "YuanZhuiPoSuiJi_inout" } },
    { name: "ZhiShaJi", val: { exploit: "ZhiShaJi_BaoZha", exploitout: "ZhiShaJi_BaoZha_Inout", inout: "ZhiShaJi_inout" } }]


function initAnimation(animationName) {
    setTimeout(function () {
        let ag = scene.getAnimationGroupByName(animationName);
        ag.start()
    }, 500);

}
// function startAnimation(animationName) {
//     let ag = scene.getAnimationGroupByName(animationName);
//     ag.start()
// }
window.onload = function () {
    (function () {
        if (params == '1') {
            initAnimation('XuanHuiPoSuiJi_inout');
        }
        if (params == '2') {
            initAnimation('YuanZhuiPoSuiJi_inout');
        }
        if (params == '3') {
            initAnimation('ZhiShaJi_inout');
        }
    })()
}
