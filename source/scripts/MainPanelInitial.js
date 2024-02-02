//Control and Functionalities | Main Panel
var rPart = document.getElementById("value_R");
var iPart = document.getElementById("value_I");
var hue = document.getElementById("value_H");
var satur = document.getElementById("value_S");
var light = document.getElementById("value_L");
var rLock = document.getElementById("rSwitch");
var iLock = document.getElementById("iSwitch");
var hLock = document.getElementById("hSwitch");
var sLock = document.getElementById("sSwitch");
var lLock = document.getElementById("lSwitch");
var rAnimator = document.getElementById("animateR");
var iAnimator = document.getElementById("animateI");
var hAnimator = document.getElementById("animateH");
var sAnimator = document.getElementById("animateS");
var lAnimator = document.getElementById("animateL");
var rAnimator_off = true;   //Pivot for animating R
var iAnimator_off = true;   //Pivot for animating I
var hAnimator_off = true;   //Pivot for animating H
var sAnimator_off = true;   //Pivot for animating S
var lAnimator_off = true;   //Pivot for animating L
var rDirec = Math.pow(-1,Math.round(Math.random()*10));
var iDirec = Math.pow(-1,Math.round(Math.random()*10));
var hDirec = Math.pow(-1,Math.round(Math.random()*10));
var sDirec = Math.pow(-1,Math.round(Math.random()*10));
var lDirec = Math.pow(-1,Math.round(Math.random()*10));
var frameRate = 60;    //Interval before new frame is generated
var realtime_mode = 1; var realtime_off_triger = 1;

function updateOutput() {
var outputList = document.getElementsByTagName("output");
var sliderList = document.querySelectorAll("input[type='range']");
for (var ite=0; ite<outputList.length; ite++) {
    outputList[ite].textContent = sliderList[ite+1].value;}
}   //Update output for every parameter

function randomize(rPartTag = false, iPartTag = false, hueTag = false, saturTag = false, lightTag = false) {
    if (hueTag == true) hue.value = Math.floor(Math.random()*360);
    if (saturTag == true) satur.value = Math.floor(Math.random()*100) + 1;
    if (lightTag == true) light.value = Math.floor(Math.random()*60) + 40;
    if (rPartTag == true) rPart.value = (Math.random()*2 * Math.sign(Math.random() - 0.5)).toFixed(2);
    if (iPartTag == true) iPart.value = (Math.random()*2 * Math.sign(Math.random() - 0.5)).toFixed(2);
}   //Generate Randomized parameters

function randomTrigger(ite) {
    if (ite == 0) randomize(true, false, false, false, false);
    else if (ite == 1) randomize(false, true, false, false, false);
    else if (ite == 2) randomize(false, false, true, false, false);
    else if (ite == 3) randomize(false, false, false, true, false);
    else if (ite == 4) randomize(false, false, false, false, true);
    updateOutput();   //Update output
}   //Randomize specific parameter

function resetTrigger(ite) {
    if (ite == 0) reset(true, false, false, false, false);
    else if (ite == 1) reset(false, true, false, false, false);
    else if (ite == 2) reset(false, false, true, false, false);
    else if (ite == 3) reset(false, false, false, true, false);
    else if (ite == 4) reset(false, false, false, false, true);
    updateOutput();   //Update output
}   //Reset specific parameter

function reset(rPartTag = false, iPartTag = false, hueTag = false, saturTag = false, lightTag = false) {
    if (hueTag == true) hue.value = 208;
    if (saturTag == true) satur.value = 60;
    if (lightTag == true) light.value = 64;
    if (rPartTag == true) rPart.value = 0;
    if (iPartTag == true) iPart.value = 0;
}   //Reset parameters

function animationGen(requiree = "", method = "") {
    var target = document.getElementById("value_" + requiree.toUpperCase());
    var lowerBound = Number(target.min); var upperBound = Number(target.max);
    var pace = Number(target.step); var current = Number(target.value);
    if (method == "linear") {
        target.value = (current+pace)>upperBound ? lowerBound : (current+pace);
    } else if (method == "swing") {
        pace = eval(requiree + "Direc * pace");
        if ((pace+current) > upperBound) {
            pace = -1*pace;
            eval(requiree + "Direc = " + requiree + "Direc * (-1);");
        } else if ((pace+current) < lowerBound) {
            pace = -1*pace;
            eval(requiree + "Direc = " + requiree + "Direc * (-1);");
        } target.value = pace + current;
    }   //Add more animation styles if needed
    updateOutput();   //Update output
}   //Refresh parameters

function animateTrigger() {
    var hiddenFlag = document.getElementById("animateOFF");
    if (rAnimator_off && iAnimator_off && hAnimator_off && sAnimator_off && lAnimator_off) hiddenFlag.value = true;
    else hiddenFlag.value = false;
}   //Animate specific parameter

function modifyPanelClass(target = "", prohibit = "") {
    var mod1 = document.getElementById("random" + target);
    var mod2 = document.getElementById("reset" + target);
    var mod3 = document.getElementById("animate" + target);
    var mod4 = document.getElementById("animate_wrapper_" + target);
    var mod5 = document.getElementById("value_" + target);
    if (prohibit == true) {
        mod1.setAttribute("class", mod1.getAttribute("class").replace("switch_botton", "switch_botton_off"));
        mod2.setAttribute("class", mod2.getAttribute("class").replace("switch_botton", "switch_botton_off"));
        if (Boolean(mod3.checked)) mod3.checked = false;
        mod3.disabled = true; mod4.setAttribute("class", "animate_wrapper_off");
        mod5.disabled = true; mod5.setAttribute("class", "rangeSlider_off");
        eval(target.toLowerCase() + "Animator_off = true;")
    } else {mod1.setAttribute("class", mod1.getAttribute("class").replace("switch_botton_off", "switch_botton"));
    mod2.setAttribute("class", mod2.getAttribute("class").replace("switch_botton_off", "switch_botton"));
    mod3.checked = false; mod3.disabled = false; mod4.setAttribute("class", "animate_wrapper");
    mod5.disabled = false; mod5.setAttribute("class", "rangeSlider");}
}   //Modify panel accessibility

rLock.addEventListener("click", function() {
    if (!Boolean(rLock.checked)) modifyPanelClass("R", true);
    else modifyPanelClass("R", false);});
iLock.addEventListener("click", function() {
    if (!Boolean(iLock.checked)) modifyPanelClass("I", true);
    else modifyPanelClass("I", false);});
hLock.addEventListener("click", function() {
    if (!Boolean(hLock.checked)) modifyPanelClass("H", true);
    else modifyPanelClass("H", false);});
sLock.addEventListener("click", function() {
    if (!Boolean(sLock.checked)) modifyPanelClass("S", true);
    else modifyPanelClass("S", false);});
lLock.addEventListener("click", function() {
    if (!Boolean(lLock.checked)) modifyPanelClass("L", true);
    else modifyPanelClass("L", false);});
//Eventlisteners for parameter locks

var randomR = document.getElementById("randomR");
randomR.addEventListener("click", function() {
    if (Boolean(rLock.checked)) randomTrigger(0);});
var randomI = document.getElementById("randomI");
randomI.addEventListener("click", function() {
    if (Boolean(iLock.checked)) randomTrigger(1);});
var randomH = document.getElementById("randomH");
randomH.addEventListener("click", function() {
    if (Boolean(hLock.checked)) randomTrigger(2);});
var randomS = document.getElementById("randomS");
randomS.addEventListener("click", function() {
    if (Boolean(sLock.checked)) randomTrigger(3);});
var randomL = document.getElementById("randomL");
randomL.addEventListener("click", function() {
    if (Boolean(lLock.checked)) randomTrigger(4);});
//Eventlisteners for randomizing specific parameter

var resetR = document.getElementById("resetR");
resetR.addEventListener("click", function() {
    if (Boolean(rLock.checked)) resetTrigger(0);});
var resetI = document.getElementById("resetI");
resetI.addEventListener("click", function() {
    if (Boolean(iLock.checked)) resetTrigger(1);});
var resetH = document.getElementById("resetH");
resetH.addEventListener("click", function() {
    if (Boolean(hLock.checked)) resetTrigger(2);});
var resetS = document.getElementById("resetS");
resetS.addEventListener("click", function() {
    if (Boolean(sLock.checked)) resetTrigger(3);});
var resetL = document.getElementById("resetL");
resetL.addEventListener("click", function() {
    if (Boolean(lLock.checked)) resetTrigger(4);});
//Eventlisteners for resetting specific parameter

rAnimator.addEventListener("click", function() {
    if (Boolean(rAnimator.checked)) {
        rAnimator_off = false;
        animateTrigger();
    } else {
        rAnimator_off = true;
        animateTrigger();}});
iAnimator.addEventListener("click", function() {
    if (Boolean(iAnimator.checked)) {
        iAnimator_off = false;
        animateTrigger();
    } else {
        iAnimator_off = true;
        animateTrigger();}});
hAnimator.addEventListener("click", function() {
    if (Boolean(hAnimator.checked)) {
        hAnimator_off = false;
        animateTrigger();
    } else {
        hAnimator_off = true;
        animateTrigger();}});
sAnimator.addEventListener("click", function() {
    if (Boolean(sAnimator.checked)) {
        sAnimator_off = false;
        animateTrigger();
    } else {
        sAnimator_off = true;
        animateTrigger();}});
lAnimator.addEventListener("click", function() {
    if (Boolean(lAnimator.checked)) {
        lAnimator_off = false;
        animateTrigger();
    } else {
        lAnimator_off = true;
        animateTrigger();}});
//Eventlisteners for animating specific parameters

window.setInterval(function() {
    if (!rAnimator_off) animationGen("r", "swing");
    if (!iAnimator_off) animationGen("i", "swing");
    if (!hAnimator_off) animationGen("h", "linear");
    if (!sAnimator_off) animationGen("s", "swing");
    if (!lAnimator_off) animationGen("l", "swing");
}, frameRate);    //Active evertlistener for generating animation