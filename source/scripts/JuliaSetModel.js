function renderJulia(cWidth, cHeight, cDense, cScaleX, cScaleY, cTarget, BW, xDel, yDel) {
    //Quadratic Julia Set | Z'^2 = Z^2 + C
    //Canvas: cTarget | Size: cWidth*cHeight | Pixel Density: cDense
    var hueValue = Number(hue.value);
    var saturValue = Number(satur.value);
    var lightValue = Number(light.value);
    var rValue = Number(rPart.value);
    var iValue = Number(iPart.value);
    if (BW == true) {
        hueValue = 204; saturValue = 32; lightValue = 96;
    }   //Get Hue, Saturation, Lightness - Color
    //Get Quadratic Julia Constant C - Shape
    var depth = 100; var xScl = 2*cScaleX/cWidth; var yScl = 2*cScaleY/cHeight;
    var theshold = 4; var cJulia = [rValue, iValue];
    //Preparation for sketching, including scale and iteration depth
    var juliaOuterRing = 2; var juliaGradOuter = 16; var juliaGradInner = 92;
    var juliaRim = 4; var juliaHCGrad = 5.6; var juliaLCGrad = 0.92;
    //Generate color palette for rendering Julia Set

    function cAddit(cNum1, cNum2) {
        return [cNum1[0] + cNum2[0], cNum1[1] + cNum2[1]];
    }   //Addition for complex numbers
    function cMulti(cNum1, cNum2) {
        return [cNum1[0]*cNum2[0] - cNum1[1]*cNum2[1], cNum1[0]*cNum2[1] + cNum1[1]*cNum2[0]];
    }   //Multiplication for complex numbers
    function cMagni(cNum) {
        return Math.sqrt(cNum[0]*cNum[0] + cNum[1]*cNum[1]);
    }   //Magnitute for complex numbers
    //Arithmetic operations for complex numbers

    function divergRate(cNum) {
        var counter = 0; var cTemp = cNum;
        while (counter <= depth) {
            if (cMagni(cTemp) > theshold) return counter;
            cTemp = cAddit(cMulti(cTemp, cTemp), cJulia);
            counter = counter<=juliaGradOuter ? counter+1 : counter+4;}
        return depth;
    }   //Calculate the divergence rate

    function mapLight(col) {
        if (col <= juliaOuterRing) {
            var gradLight = lightValue>50 ? (lightValue-50)/2.4 : (lightValue-50)/4;
            return (juliaRim+gradLight)<=1 ? 1 : (juliaRim+gradLight);
        } else if (col <= juliaGradOuter) {
            var gradLight = lightValue>50 ? (lightValue-50)/2.4 : (lightValue-50)/3.6;
            if (lightValue<10) gradLight*=1.8;
            else if (lightValue<20) gradLight*=1.4;
            var temp = (col-juliaOuterRing)*juliaHCGrad+juliaRim+gradLight;
            if (temp >= 100) return 100;
            else if (temp <= 1) return 1;
            else return temp;
        } else if (col <= juliaGradInner) {
            var gradLight = lightValue>50 ? (lightValue-50)/2.4 : (lightValue-50)/3.2;
            if (lightValue<10) gradLight*=1.8;
            else if (lightValue<20) gradLight*=1.4;
            var temp = (col-juliaGradOuter)*juliaLCGrad+14*juliaHCGrad+juliaRim+gradLight;
            return temp>=100 ? 100 : temp;
        } else return 100;
    }   //Map lightness to base Julia Set

    function plotJulia() {
        var canvas = document.getElementById(cTarget);
        var context = canvas.getContext("2d");
        for (var iteS=0; iteS<cWidth; iteS+=cDense) {
            var bound = -1; var preBound = -1;
            for (var iteJ=0; iteJ<cHeight; iteJ+=cDense) {
                var point = [(iteS*xScl-cScaleX+xDel), (iteJ*yScl-cScaleY+yDel)];
                bound = divergRate(point);
                if (bound != preBound) {
                    if (bound == depth) {
                        context.fillStyle = "#000000"; preBound = bound;}
                    else {context.fillStyle = `hsl(${hueValue},${saturValue}%,${mapLight(bound)}%)`;
                        preBound = bound;}}   //Set fillStyle with HEX colors, no need to set strokeStyle
                context.fillRect(iteS, iteJ, cDense, cDense);}}}   //Plot Julia Set
    plotJulia();    //Render the image with lightness as the factor
}   //Complete Model for Quadratic Julia Set
