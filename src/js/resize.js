/**
 * Resize for the others pages 
 */
window.addEventListener("resize",windowResize);
window.onload = function(){
    windowResize();
}

function windowResize(){
    if(!document.querySelector(".is-small-screen")){
        document.querySelector(".title").style = "margin-left: -55px;";
        document.getElementById("demo-menu-lower-right").style = "margin-right: -15px;";
    }
    else{
        document.querySelector(".title").style = "margin-left: 0px;";
        document.getElementById("demo-menu-lower-right").style = "margin-right: 0px;";
    }
}