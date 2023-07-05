function removePX(string) { return Number(string.substring(0, string.length-2)); }
function       px(  val ) { return val + "px"; }

function dpRound(number) {
    let places = 2;
    let multiplier = Math.pow(10, places);
    return Math.round(number*multiplier)/multiplier;
}

function getDistOut(direction, center, distanceOut, x, radius, divSize) {
    return px(center + direction * (distanceOut*radius*x + x*divSize/2))
}

function setCanvasStyle(context, colour) {
    context.lineWidth = thickness;
    context.strokeStyle = window.getComputedStyle(document.body).getPropertyValue(colour);
}

function removeRotateDeg(string) {
    return Number(string.substring(7, string.length-4));
}

function drawGraph(func, canvas, width, height, radius) {
    let context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    setCanvasStyle(context, "--dGrey");
    context.beginPath()
    for (let x = 0; x <= width; x++) {
        context.lineTo(x, -radius*func(x*(2*Math.PI)/width)+removePX(height)/2);
    }
    context.stroke();
}

function getGraphCoordinates(func, width, angleDegreesPositive) {
    pixelX = Math.round(angleDegreesPositive*width/360);
    pixelY = func(Math.PI*angleDegreesPositive/180)*radius;
    return pixelX, pixelY
}

function setBallLocation(ball, xPixels, yPixels) {
    ball.style.left =  xPixels + "px";
    ball.style.top  = -yPixels + "px";
}

function setHorizontalConnector(connector, xPixels, yPixels) {
    connector.style.width = px(xPixels + gap/2);
    connector.style.left = px(xPixels - removePX(connector.style.width));
    connector.style.top  = px(-yPixels);
}

function setGraphValueLines(horizontalLine, verticalLine, xPixels, yPixels, thick) {
    horizontalLine.style.width = px(xPixels + thick/2);
    verticalLine.style.height = px(Math.abs(yPixels) + thick/2);
    verticalLine.style.top = px(-(yPixels < 0 ? thick/2 : yPixels));
    verticalLine.style.left = px(xPixels);
}

function setGraphSize_axis(document, char, canvas, height, width) {
    canvas.setAttribute("height", height);
    canvas.setAttribute("width" , px(width));
    document.getElementById(char + "xAxis").style.width = px(width);
    for (let i = 1; i <= 4; i++) {
        document.getElementById(char + "yAxis" + i).style.left = px(i*width/4);
    }
}

function drawConnectorArc(context, canvas, gap, radius) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    context.arc(canvas.width-gap/2, gap/2, radius, Math.PI, 0.5*Math.PI, 1);
    context.stroke();
}

/*
 * Circle graph
 */

// Box
let boxElement =   document.getElementById("box");
let box        = boxElement.getBoundingClientRect();
let boxHcenter = (box.left + box.right )/2;
let boxVcenter = (box.top  + box.bottom)/2;
let thickness = removePX(window.getComputedStyle(document.body).getPropertyValue("--thickness"));
let thick = Number(thickness);

// Moving elements
let circleGraphBall = document.getElementById("circleGraphBall");
let chLine = document.getElementById("chLine");
let cvLine = document.getElementById("cvLine");
let cdLine = document.getElementById("cdLine");
let angle;

// Angle arc
const canvas  = document.getElementById("arcCanvas");
const context = canvas  .getContext("2d");

const boxSize = window.getComputedStyle(boxElement).getPropertyValue("height");
canvas.setAttribute("height", boxSize);
canvas.setAttribute("width" , boxSize);
const canvasCenter = removePX(boxSize)/2;
setCanvasStyle(context, "--green");

const radius = removePX(window.getComputedStyle(document.body).getPropertyValue("--radius"));
const angleArcRadius = radius/5;

// Textboxes
const distanceOut = 1.1;
const coordinates    = document.getElementById("coordinates"   );
const coordinatesDiv = document.getElementById("coordinatesDiv");
const     degrees    = document.getElementById(    "degrees"   );
const     degreesDiv = document.getElementById(    "degreesDiv");

/*
 * sin graph
 */

// Box
let sinBoxElement =   document.getElementById("sinBox");

// Plot graph
let boxSizeP = 1.6*removePX(boxSize);
const sinCanvas  =  document.getElementById("sinCanvas");
const sinContext = sinCanvas.getContext("2d");
setGraphSize_axis(document, "s", sinCanvas, boxSize, boxSizeP);

// Moving elements
let sinBall  = document.getElementById("sinBall");
let pixelX;
let pixelY;
let sinhLine = document.getElementById("sinhLine");
let sinvLine = document.getElementById("sinvLine");
const sinConnector = document.getElementById("sinConnector");

// Draw graph
drawGraph(Math.sin, sinCanvas, boxSizeP, boxSize, radius);

// circleSinConnector
const circleSinConnector = document.getElementById("circleSinConnector");

/*
 * cos graph
 */

// Box
let cosBoxElement =   document.getElementById("cosBox");

// Connector canvas
const gap = removePX(window.getComputedStyle(document.body).getPropertyValue("--gap"));
const changingConnectorArcCanvas  =        document.getElementById("changingConnectorArcCanvas");
const changingConnectorArcContext = changingConnectorArcCanvas.getContext("2d");
changingConnectorArcCanvas.setAttribute("height", removePX(boxSize)+gap+"px");
changingConnectorArcCanvas.setAttribute("width" , removePX(boxSize)+gap+"px");
const middleConnectorArcCanvas  =        document.getElementById("middleConnectorArcCanvas");
const middleConnectorArcContext = middleConnectorArcCanvas.getContext("2d");
middleConnectorArcCanvas.setAttribute("height", removePX(boxSize)+gap+"px");
middleConnectorArcCanvas.setAttribute("width" , removePX(boxSize)+gap+"px");
document.getElementById("connectorBox").style.width = removePX(boxSize) + gap + "px";
document.getElementById("connectorBox").style.height = removePX(boxSize) + gap + "px";
setCanvasStyle(changingConnectorArcContext, "--lGrey")
setCanvasStyle(middleConnectorArcContext, "--lGrey")
const extraRadius = gap/2 + radius*(window.getComputedStyle(document.body).getPropertyValue("--axis")-2)/2

drawConnectorArc(middleConnectorArcContext, middleConnectorArcCanvas, gap, radius+extraRadius);

// circlCosConnector
const circleCosConnector = document.getElementById("circleCosConnector");

// Plot graph
const cosCanvas  =  document.getElementById("cosCanvas");
const cosContext = cosCanvas.getContext("2d");
setGraphSize_axis(document, "c", cosCanvas, boxSize, boxSizeP);

// Moving elements
let cosBall  = document.getElementById("cosBall");
let coshLine = document.getElementById("coshLine");
let cosvLine = document.getElementById("cosvLine");
const cosConnector = document.getElementById("cosConnector");

// Draw graph
drawGraph(Math.cos, cosCanvas, boxSizeP, boxSize, radius);

/*
 * cos rotate
 */

function detectLeftButton(evt) {
    evt = evt || window.event;
    if ("buttons" in evt) {
        return evt.buttons == 1;
    }
    let button = evt.which || evt.button;
    return button == 1;
}

let cosBoxAngle = 0;
let oldCosBoxAngle;
let currentBoxAngle = 0;

let mouseOver;
cosBoxElement.addEventListener("mouseover", function () {
    mouseOver = true;
  }, false);
cosBoxElement.addEventListener("mouseout", function () {
    mouseOver = false;
}, false);

let sinNumbersBox = document.getElementById("sinNumbersBox");
let cosNumbersBox = document.getElementById("cosNumbersBox");
let cosNumbersBoxRel = document.getElementById("cosNumbersBoxRel");

function functionName(fun) {
    let ret = fun.toString();
    ret = ret.substr('function '.length);
    ret = ret.substr(0, ret.indexOf('('));
    return ret;
}

function getEquation(funcName, x, strY) {
    return funcName + "(" + Math.round(x) + ") = " + strY;
}

function writeNewNumbers(func, afunc, numbersBox, x) {
    let arrX = [[1/2, "1/2"], [1/Math.sqrt(2), "1/√2"], [Math.sqrt(3)/2, "√3/2"]];
    y = func(x*Math.PI/180);
    for (let i = 0; i < arrX.length; i++) {
        arrX[i].push(afunc(arrX[i][0])*180/Math.PI);
    }
    arrX.push([y, String(dpRound(y)), x]);
    arrX = arrX.sort(function(a, b) {
        return b[0] - a[0];
    });
    let string = "";
    for (let i = 0; i < arrX.length; i++) {
        string += getEquation(functionName(func), arrX[i][2], arrX[i][1]) + "\n";
    }
    numbersBox.innerText = string.substring(0);
}

function spinRadius(x, y) {
    // TEMPORARY FIX
    box        = boxElement.getBoundingClientRect();
    boxHcenter = (box.left + box.right )/2;
    boxVcenter = (box.top  + box.bottom)/2;

    // Calculate angle
    angle = Math.atan2(y, x);
    let angleDegrees = angle*180/Math.PI;
    let angleDegreesPositive = angle >= 0 ? angleDegrees : 360 + angleDegrees;
    
    // Calculate corner location
    x = Math.cos(angle);
    y = Math.sin(angle);

    /*
    * Circle graph
    */

    // Set circleGraphBall location
    circleGraphBall.style.left = px( radius*x);
    circleGraphBall.style.top  = px(-radius*y);
    
    coordinatesDiv.style.left = 
        getDistOut(1, boxHcenter, distanceOut, x, radius, coordinatesDiv.getBoundingClientRect().width);
    
    coordinatesDiv.style.top = 
        getDistOut(-1, boxVcenter, distanceOut, y, radius, coordinatesDiv.getBoundingClientRect().height);
    
    degreesDiv.style.left = 
        getDistOut(1, boxHcenter, distanceOut, x, angleArcRadius, degreesDiv.getBoundingClientRect().width);
    
    degreesDiv.style.top = 
        getDistOut(-1, boxVcenter, distanceOut, y, angleArcRadius, degreesDiv.getBoundingClientRect().height);

    // Set horizontal line
    let width = radius*x
    chLine.style.width = px(Math.abs(width) + thick);
    chLine.style.left  = px(width >= 0 ? 0 : width);

    // Set vertical line
    let height = radius*y
    cvLine.style.height = Math.abs(height) + "px";
    cvLine.style.top   = - (height < 0 ? 0 : height - thick) + "px";
    cvLine.style.left  = + width + "px";

    canvas.style.zIndex = x > 0 ? 2 : 4;
    cvLine.style.zIndex = x > 0 && y > 0 ? 1 : 3;
    // Set diagonal line
    cdLine.style.rotate = -angleDegreesPositive + "deg";

    // Set angle arc
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
    context.arc(canvasCenter, canvasCenter, angleArcRadius, 0, 2*Math.PI-angle, 1);
    context.stroke();

    // Set text
    coordinates.innerText = dpRound(x) + ", " + dpRound(y);
    degrees.innerText = Math.round(angleDegreesPositive) + "°";

    /*
     * sin graph
     */

    pixelX, pixelY = getGraphCoordinates(Math.sin, boxSizeP, angleDegreesPositive);
    setBallLocation(sinBall, pixelX, pixelY);
    setHorizontalConnector(sinConnector, pixelX, pixelY);
    setGraphValueLines(sinhLine, sinvLine, pixelX, pixelY, thick);

    circleSinConnector.style.width = px(removePX(boxSize)/2 - removePX(circleGraphBall.style.left) + gap/2 + 1);
    circleSinConnector.style.top  = circleGraphBall.style.top;
    circleSinConnector.style.left = circleGraphBall.style.left;

    /*
     * cos graph
     */

    pixelX, pixelY = getGraphCoordinates(Math.cos, boxSizeP, angleDegreesPositive);
    setBallLocation(cosBall, pixelX, pixelY);
    setHorizontalConnector(cosConnector, pixelX, pixelY);
    setGraphValueLines(coshLine, cosvLine, pixelX, pixelY, thick);
    
    // Set connector arc
    drawConnectorArc(changingConnectorArcContext, changingConnectorArcCanvas, gap, radius-width+extraRadius);

    circleCosConnector.style.height = removePX(boxSize)/2 - removePX(circleGraphBall.style.top) + gap/2 + "px";
    circleCosConnector.style.top  = circleGraphBall.style.top;
    circleCosConnector.style.left = removePX(circleGraphBall.style.left) + "px";

    writeNewNumbers(Math.sin, Math.asin, sinNumbersBox, angleDegreesPositive);
    writeNewNumbers(Math.cos, Math.acos, cosNumbersBox, angleDegreesPositive);
}

spinRadius(0, 0);
// mousemove
document.addEventListener("mousemove", function(e) {
    // Calculate mouse location
    let x =  (e.clientX - boxHcenter);
    let y = -(e.clientY - boxVcenter);

    spinRadius(x, y);

    /*
     * rotate cos
     */

    // get relative angle
    x = (e.clientX - (box.left + box.width + gap/2));
    y = (e.clientY - (box.top + box.height + gap/2));
    oldCosBoxAngle = cosBoxAngle;
    cosBoxAngle = Math.atan2(y,x)*180/Math.PI;
    if (detectLeftButton(e) && mouseOver) {
        currentBoxAngle = removeRotateDeg(cosBoxElement.style.transform);
        newBoxAngle = currentBoxAngle + cosBoxAngle - oldCosBoxAngle;
        if (newBoxAngle <= 90 && newBoxAngle >= 0) {
            cosBoxElement.style.transform = 'rotate(' + newBoxAngle + 'deg)';
            document.getElementById("cosWhite").style.transform = 'translate(-100%, -50%) rotate(' + newBoxAngle + 'deg)';

            cosNumbersBoxRel.style.transform = 'rotate(' + -newBoxAngle + 'deg)';
            cosNumbersBox.style.transform = 'translate(' + radius*newBoxAngle/60 + 'px, -' + (4*newBoxAngle/90 + 1)*50 + '%)';
        }
    }
});