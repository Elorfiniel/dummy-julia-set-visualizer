var playground = document.getElementById("option_manu1");
var gallery = document.getElementById("option_manu2");
var information = document.getElementById("option_manu3");
var playground_manu = document.getElementById("sub_manu1");
var gallery_manu = document.getElementById("sub_manu2");
var information_manu = document.getElementById("sub_manu3");
var span_gallery0 = document.getElementById("span_gallery0");
var map_canvas = document.getElementById("map_canvas");
var gallery0 = document.getElementById("gallery0");
var gallery1 = document.getElementById("gallery1");
var gallery2 = document.getElementById("gallery2");
var gallery3 = document.getElementById("gallery3");
var gallery4 = document.getElementById("gallery4");
var gallery5 = document.getElementById("gallery5");
var gallery6 = document.getElementById("gallery6");
var gallery7 = document.getElementById("gallery7");
var gallery8 = document.getElementById("gallery8");
var gallery9 = document.getElementById("gallery9");
//Gallery Collections and Option Manus
var scaleCanvas = document.getElementById("magnify");
var waterMark = document.getElementById("watermark");
var wmSwitch = document.getElementById("wMark_switch");
var download = document.getElementById("dlImage");
var xTrans = 0; var yTrans = 0;    //Shift Camera
var pixelDensity = 8; var keyBoard = true;
var manual = document.getElementById("hot_key");

function galleryJulia(target) {
    var galleryCollect = document.getElementById("gallery_value" + target);
    var galleryList = []; eval("galleryList = " + galleryCollect.value + ";");
    rPart.value = Number(galleryList[0]);
    iPart.value = Number(galleryList[1]);
    hue.value = Number(galleryList[2]);
    satur.value = Number(galleryList[3]);
    light.value = Number(galleryList[4]);
    updateOutput();    //Update output
    scaleCanvas.value = 1; xTrans = 0; yTrans = 0;
    renderJulia(640, 640, pixelDensity, 2, 2, "canvas", false, 0, 0);
}   //Display gallery collections

function miniMap() {
    var context = map_canvas.getContext('2d');
    context.strokeStyle='rgba(254, 204, 17, 0.8)';
    context.fillStyle='rgba(254, 204, 17, 0.08)';
    var pDel = 192/Number(scaleCanvas.value);
    context.strokeRect((192-pDel)/2 + 48*xTrans, (192-pDel)/2 + 48*yTrans, pDel, pDel);
    context.fillRect((192-pDel)/2 + 48*xTrans, (192-pDel)/2 + 48*yTrans, pDel, pDel);
}   //Map current camera focus

function downloadImage() {
    //Create new canvas and render Julia Set with ordered resolution
    var tempCanvas = document.createElement("canvas");
    var context = tempCanvas.getContext("2d");
    var domNode = document.getElementById("hidden_canvas");
    var format1 = document.getElementById("format1");
    var format2 = document.getElementById("format2");
    var format3 = document.getElementById("format3");
    var defina1 = document.getElementById("defina1");
    var defina2 = document.getElementById("defina2");
    var defina3 = document.getElementById("defina3");
    var defina4 = document.getElementById("defina4");
    var format; var defina; var wMark = "";    //Temperary Container
    if (Boolean(format1.checked)) format = "png";
    else if (Boolean(format2.checked)) format = "jpeg";
    else if (Boolean(format3.checked)) format = "bmp";
    if (Boolean(defina1.checked)) defina = "800";
    else if (Boolean(defina2.checked)) defina = "1000";
    else if (Boolean(defina3.checked)) defina = "1500";
    else if (Boolean(defina4.checked)) defina = "1800";
    tempCanvas.setAttribute("id", "tempCanvas");
    tempCanvas.setAttribute("width", defina + "px");
    tempCanvas.setAttribute("height", defina + "px");
    domNode.appendChild(tempCanvas);
    renderJulia(Number(defina), Number(defina), 1, 2/Number(scaleCanvas.value), 2/Number(scaleCanvas.value), "tempCanvas", false, xTrans, yTrans);
    if (Boolean(wmSwitch.checked)) {
        wMark = waterMark.value;
        context.fillStyle = "#ffffff";
        if (wMark) {
            context.font = `${0.026*Number(defina)}px Georgia serif`;
            context.fillText("Julia Set", 0.014*Number(defina), 0.96*Number(defina));
            context.font=`${0.016*Number(defina)}px Georgia serif`;
            context.fillText(wMark, 0.014*Number(defina), 0.98*Number(defina));}
        else {
            context.font = `${0.026*Number(defina)}px Georgia serif`;
            context.fillText("Julia Set", 0.014*Number(defina), 0.98*Number(defina));        }
    }   //Tag watermark to the final work
    //Convert canvas element to data URL
    var aHref = document.createElement("a");
    document.body.append(aHref);
    aHref.href = tempCanvas.toDataURL("image/" + format);
    //Set default file name when the download is activated
    var time = new Date().toISOString();
    aHref.download = "JuliaSet_(" + rPart.value + "," + iPart.value + ")_" + time.slice(11, 19) + "." + format;
    aHref.click();  //JavaScript click
    domNode.removeChild(tempCanvas);
    document.body.removeChild(aHref);
}   //Remove tempCanvas after download activation

for (var ite=0; ite<=9; ite++) {
    var galleryCollect = document.getElementById("gallery_value" + ite);
    var galleryList = []; eval("galleryList = " + galleryCollect.value + ";");
    rPart.value = Number(galleryList[0]);
    iPart.value = Number(galleryList[1]);
    hue.value = Number(galleryList[2]);
    satur.value = Number(galleryList[3]);
    light.value = Number(galleryList[4]);
    renderJulia(70, 92, 1, 1.52, 2, "gallery" + String(ite), false, 0, 0);
}   //Initialize gallery collections

randomize(true, true, true, true, true);
updateOutput();   //Update output
//Set up random canvas when initialized

var preR = rPart.value;
var preI = iPart.value;
var preH = hue.value;
var preS = satur.value;
var preL = light.value;
var preC = scaleCanvas.value;
var preX = xTrans;
var preY = yTrans;
//Previous Parameters for Realtime Rendering

//Eventlisteners that target the current manu
playground.addEventListener("click", function() {
    playground_manu.style.zIndex = 5;
    playground_manu.style.opacity = 1;
    playground_manu.style.transform = "scale(1)";
    playground_manu.style.transitionDelay = "0.4s";
    gallery_manu.style.zIndex = 2;
    gallery_manu.style.opacity = 0;
    gallery_manu.style.transform = "scale(0.96)";
    gallery_manu.style.transitionDelay = "0s";
    information_manu.style.zIndex = 3;
    information_manu.style.opacity = 0;
    information_manu.style.transform = "scale(0.96)";
    information_manu.style.transitionDelay = "0s";});
gallery.addEventListener("click", function() {
    playground_manu.style.zIndex = 1;
    playground_manu.style.opacity = 0;
    playground_manu.style.transform = "scale(0.96)";
    playground_manu.style.transitionDelay = "0s";
    gallery_manu.style.zIndex = 5;
    gallery_manu.style.opacity = 1;
    gallery_manu.style.transform = "scale(1)";
    gallery_manu.style.transitionDelay = "0.4s";
    information_manu.style.zIndex = 3;
    information_manu.style.opacity = 0;
    information_manu.style.transform = "scale(0.96)";
    information_manu.style.transitionDelay = "0s";});
information.addEventListener("click", function() {
    playground_manu.style.zIndex = 1;
    playground_manu.style.opacity = 0;
    playground_manu.style.transform = "scale(0.96)";
    playground_manu.style.transitionDelay = "0s";
    gallery_manu.style.zIndex = 2;
    gallery_manu.style.opacity = 0;
    gallery_manu.style.transform = "scale(0.96)";
    gallery_manu.style.transitionDelay = "0s";
    information_manu.style.zIndex = 5;
    information_manu.style.opacity = 1;
    information_manu.style.transform = "scale(1)";
    information_manu.style.transitionDelay = "0.4s";});

//Eventlisteners for displaying gallery collections
gallery0.addEventListener("click", function() {galleryJulia("0");});
gallery1.addEventListener("click", function() {galleryJulia("1");});
gallery2.addEventListener("click", function() {galleryJulia("2");});
gallery3.addEventListener("click", function() {galleryJulia("3");});
gallery4.addEventListener("click", function() {galleryJulia("4");});
gallery5.addEventListener("click", function() {galleryJulia("5");});
gallery6.addEventListener("click", function() {galleryJulia("6");});
gallery7.addEventListener("click", function() {galleryJulia("7");});
gallery8.addEventListener("click", function() {galleryJulia("8");});
gallery9.addEventListener("click", function() {galleryJulia("9");});

//Eventlistener for watermark focus
waterMark.addEventListener("focus", function() {keyBoard = false;});
waterMark.addEventListener("blur", function() {keyBoard = true;});

//Eventlistener for watermark activation
wmSwitch.addEventListener("click", function() {
    if (!Boolean(wmSwitch.checked)) {
        waterMark.disabled = true; setTimeout(function() {
            waterMark.placeholder = "Watermark OFF"; waterMark.value = "";}, 200);
        waterMark.title = "Turn on the switch to add watermark";
        waterMark.setAttribute("class", waterMark.getAttribute("class").replace("textBox", "textBox_off"));
    } else {
        waterMark.disabled = false; waterMark.placeholder = "Designed by Elorfiniel";
        waterMark.title = "Alphanumerical Characters or Spaces";
        waterMark.setAttribute("class", waterMark.getAttribute("class").replace("textBox_off", "textBox"));}
});    //Disable watermark function when the switch is off

download.addEventListener("click", function() {
    if (waterMark.validity.valid) downloadImage();
    else window.alert("Only alphanumerical characters or spaces are accepted");
});    //Click to download when watermark is in valid form

//Eventlistener for manual and introduction
manual.addEventListener("click", function() {
    var intro_container = document.getElementById("intro_container");
    var keyboard = document.getElementById("hidden_manual");
    var copyright = document.getElementById("copyright");
    if (manual.value == "Keyboard") {
        copyright.style.opacity = 0;
        copyright.style.transform = "scale(0.96)";
        window.setTimeout(function() {
            manual.value = "Welcome";
            intro_container.style.zIndex = 4;
            keyboard.style.zIndex = 5;
        }, 200);
        window.setTimeout(function() {
            copyright.style.opacity = 1;
            copyright.style.transform = "scale(1)";
        }, 400);
    } else {
        copyright.style.opacity = 0;
        copyright.style.transform = "scale(0.96)";
        window.setTimeout(function() {
            manual.value = "Keyboard";
            intro_container.style.zIndex = 5;
            keyboard.style.zIndex = 4;
        }, 200);
        window.setTimeout(function() {
            copyright.style.opacity = 1;
            copyright.style.transform = "scale(1)";
        }, 400);
    }   //Switch between keyboard and welcome
});    //Click to switch between keyboard and welcome
