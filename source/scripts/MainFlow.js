window.addEventListener("keydown", function (KEY) {
  if (keyBoard) {
    switch (KEY.keyCode) {
      // Arrows may lead to shortcut conflicts in the browser
      case 65: // Press a/A to shift the camera leftwards
        xTrans = xTrans - 0.1 / Number(scaleCanvas.value);
        if (xTrans < 2 / Number(scaleCanvas.value) - 2)
          xTrans = 2 / Number(scaleCanvas.value) - 2;
        break;
      case 87: // Press w/W to shift the camera upwards
        yTrans = yTrans - 0.1 / Number(scaleCanvas.value);
        if (yTrans < 2 / Number(scaleCanvas.value) - 2)
          yTrans = 2 / Number(scaleCanvas.value) - 2;
        break;
      case 68: // Press d/D to shift the camera rightwards
        xTrans = xTrans + 0.1 / Number(scaleCanvas.value);
        if (xTrans > 2 - 2 / Number(scaleCanvas.value))
          xTrans = 2 - 2 / Number(scaleCanvas.value);
        break;
      case 83: // Press s/S to shift the camera downwards
        yTrans = yTrans + 0.1 / Number(scaleCanvas.value);
        if (yTrans > 2 - 2 / Number(scaleCanvas.value))
          yTrans = 2 - 2 / Number(scaleCanvas.value);
        break;
      case 73: // Press i/I to zoom in
        var sTemp = 1.08 * Number(scaleCanvas.value);
        if (sTemp > 32) scaleCanvas.value = 32;
        else scaleCanvas.value = sTemp;
        break;
      case 79: // Press o/O to zoom out
        var sTemp = 0.92 * Number(scaleCanvas.value);
        if (sTemp < 1) scaleCanvas.value = 1;
        else scaleCanvas.value = sTemp;
        break;
      case 82: // Press r/R to reset all parameters
        reset(
          Boolean(rLock.checked),
          Boolean(iLock.checked),
          Boolean(hLock.checked),
          Boolean(sLock.checked),
          Boolean(lLock.checked)
        );
        scaleCanvas.value = 1;
        xTrans = 0;
        yTrans = 0;
        updateOutput();
        break;
      case 69: // Press e/E to randomize all parameters
        randomize(
          Boolean(rLock.checked),
          Boolean(iLock.checked),
          Boolean(hLock.checked),
          Boolean(sLock.checked),
          Boolean(lLock.checked)
        );
        scaleCanvas.value = 1;
        xTrans = 0;
        yTrans = 0;
        updateOutput();
        break;
      case 67: // Press c/C to reset camera
        xTrans = 0;
        yTrans = 0;
        break;
      case 77: // Press m/M to reset magnifier
        scaleCanvas.value = 1;
        break;
      case 48: // Press 0 to display gallery 0
        galleryJulia("0");
        break;
      case 49: // Press 1 to display gallery 1
        galleryJulia("1");
        break;
      case 50: // Press 2 to display gallery 2
        galleryJulia("2");
        break;
      case 51: // Press 3 to display gallery 3
        galleryJulia("3");
        break;
      case 52: // Press 4 to display gallery 4
        galleryJulia("4");
        break;
      case 53: // Press 5 to display gallery 5
        galleryJulia("5");
        break;
      case 54: // Press 6 to display gallery 6
        galleryJulia("6");
        break;
      case 55: // Press 7 to display gallery 7
        galleryJulia("7");
        break;
      case 56: // Press 8 to display gallery 8
        galleryJulia("8");
        break;
      case 57: // Press 9 to display gallery 9
        galleryJulia("9");
        break;
    } // Keyboard controls
  } // Lock keyboard adjustments when adding watermark
}); // Interact with parameters

window.setInterval(function () {
  var hiddenFlag = document.getElementById("animateOFF");
  if (hiddenFlag.value == "false") {
    renderJulia(
      640,
      640,
      pixelDensity,
      2 / Number(scaleCanvas.value),
      2 / Number(scaleCanvas.value),
      "canvas",
      false,
      xTrans,
      yTrans
    );
    renderJulia(192, 192, 2, 2, 2, "map_canvas", true, 0, 0);
    miniMap(); // Animation rendering - Main Canvas and Mini Map
    realtime_mode = 1;
    realtime_off_triger = 1;
  } else if (realtime_mode == 1) {
    renderJulia(
      640,
      640,
      pixelDensity,
      2 / Number(scaleCanvas.value),
      2 / Number(scaleCanvas.value),
      "canvas",
      false,
      xTrans,
      yTrans
    );
    renderJulia(192, 192, 2, 2, 2, "map_canvas", true, 0, 0);
    miniMap(); // Realtime rendering - Main Canvas and Mini Map
    realtime_off_triger += 1;
    if (realtime_off_triger > 8) {
      realtime_mode = 0;
      realtime_off_triger = 1;
    }
  } else if (realtime_mode == 0) {
    renderJulia(
      640,
      640,
      1,
      2 / Number(scaleCanvas.value),
      2 / Number(scaleCanvas.value),
      "canvas",
      false,
      xTrans,
      yTrans
    );
    renderJulia(192, 192, 1, 2, 2, "map_canvas", true, 0, 0);
    miniMap(); // HD rendering - Main Canvas and Mini Map
    realtime_mode = -1;
  }
  if (
    preR != rPart.value ||
    preI != iPart.value ||
    preH != hue.value ||
    preS != satur.value ||
    preL != light.value ||
    preC != scaleCanvas.value ||
    preX != xTrans ||
    preY != yTrans
  ) {
    realtime_mode = 1;
    realtime_off_triger = 1;
    preR = rPart.value;
    preI = iPart.value;
    preH = hue.value;
    preS = satur.value;
    preL = light.value;
    preC = scaleCanvas.value;
    preX = xTrans;
    preY = yTrans;
  }
}, 3 * frameRate); // Detect the change in the parameters and activate realtime rendering
