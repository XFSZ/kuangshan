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
    let iframeVal =  window.parent.document.getElementById("ifr")
    iframeVal.width ="0%"
    iframeVal.height ="0%"
    iframeVal.hidden = true
//    setTimeout(()=>{
        window.parent.initscene()
        window.parent.initBotton()
//    },2000)
  
}