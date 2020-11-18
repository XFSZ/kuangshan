function openOne(){
    localStorage.setItem("id","1")
    // window.location.href="../index.html"
    iframehidden()
}
function openTwo(){
    localStorage.setItem("id","2")
    // window.location.href="../index.html"
    iframehidden()
}
function openThree(){
    localStorage.setItem("id","3")
 //   window.location.href="Babylonjs/index.html?id=" +encodeURI("3")
    // window.location.href="../index.html"
    iframehidden()
}
function iframehidden(){
    let initpage = window.parent.document.getElementById("initPageButton")
    let iframeVal =  window.parent.document.getElementById("ifr")
    iframeVal.width ="0%";
    iframeVal.height ="0%";

    initpage.hidden = false;

    iframeVal.hidden = true;
    //window.parent.document.getElementById("modelbtn1")
    //window.parent.document.getElementById("modelbtn2")
    //window.parent.document.getElementById("modelbtn3")
    window.parent.initscene();
    window.parent.inithtml()
//    setTimeout(()=>{
   // window.parent.initscene()
   
   
//    },2000)
  
}