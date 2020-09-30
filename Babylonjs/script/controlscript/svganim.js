"use strict"
var idw = location.search;
let paramsw = decodeURI(idw).replace(/[^\d]/g, "");
var coloranim=[];
var modelanim=[];
var displayanim=[];
function animDirection(anim,val) {
    anim.setDirection(val)
    anim.play()
}

function animfunc(name,anims){
    for(let i = 0;i<anims.length;i++){
         if(name ==anims[i].name){
            let direction = anims[i].mouse_event ? 1 : -1
            animDirection(anims[i].anim,direction)
            anims[i].mouse_event = !anims[i].mouse_event
         }
         else{
            let direction = -1
            animDirection(anims[i].anim,direction)
            anims[i].mouse_event = true
         }
    }
}

function mouseup(type,name) {
    let animdata =[];
    if(type=="color"){
        animdata = coloranim;
    }
    if(type=="model"){
        animdata = modelanim;
    }
    if(type=="display"){
        animdata = displayanim;
    }
    animfunc(name,animdata)

};

function btnrander(type,name, path) {
    let animData = {
        wrapper: document.getElementById(name),
        animType: "svg",
        loop: false,
        prerender: true,
        autoplay: false,
        path: path
    };
    let anim = bodymovin.loadAnimation(animData);
    if(type=="color"){
        coloranim.push({ name: name, mouse_event: true, anim: anim })
    }
    if(type=="model"){
        modelanim.push({ name: name, mouse_event: true, anim: anim })
    }
    if(type=="display"){
        displayanim.push({ name: name, mouse_event: true, anim: anim })
    }
   
}

(function () {
    btnrander('model','modelbtn1', '../../../animation/datam1.json');
    btnrander('model','modelbtn2', '../../../animation/datam2.json');
    btnrander('model','modelbtn3', '../../../animation/datam3.json');
    btnrander('color','colorbtn1', '../../../animation/datac1.json');
    btnrander('color','colorbtn2', '../../../animation/datac2.json');
    btnrander('color','colorbtn3', '../../../animation/datac3.json');
    btnrander('display','displaybtn1', '../../../animation/dataplus.json');
    let modelname ="modelbtn" + paramsw
    // let colorname ="colorbtn" + paramsw
    mouseup('model',modelname);
    mouseup('color','colorbtn2');
})()



