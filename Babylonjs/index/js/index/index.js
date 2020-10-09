
let mouse_event = true;
let direction = 1;
var animData = {};


var anim ;

//   function animStop() {
//     anim.stop();
//   }
//   function animPlay() {
//     anim.play();
//   }
function animDirection(val) {
    anim.setDirection(val)
    anim.play()
}

//   function mousedown(event) {
// var e = window.event;
// var obj = e.srcElement;
// obj.style.color = 'blue';
//    }

function mouseup(event) {
    direction = mouse_event ? 1 : -1
    animDirection(direction)
    mouse_event = !mouse_event
}
(function () {
    animData = {  
    wrapper: document.getElementById("bodymovin"),
    animType: "html",
    loop: false,
    prerender: true,
    autoplay: false,
    path: "js/svganim/data.json",
};
anim= bodymovin.loadAnimation(animData);
})();