// vector-lib.js
function main() {  
  // Retrieve <canvas> element //removed var
  canvas = document.getElementById('cnv1');  
  if (!canvas) { 
    console.log('Failed to retrieve the <canvas> element');
    return false; 
  } 

  // Get the rendering context for 2DCG //removed var
  ctx = canvas.getContext('2d');

  // Draw a black rectangle
  ctx.fillStyle = 'rgba(0, 0, 0, 1.0)'; // Set color to black
  ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill a rectangle with the color

}

//clears the canvas
function clearCanvas() {
  ctx.fillStyle = 'rgba(0, 0, 0, 1.0)'; // Set color to black
  ctx.fillRect(0, 0, canvas.width, canvas.height); // Fill a rectangle with the color
}

function drawVector(v, color){
  ctx.beginPath();
  ctx.moveTo(200,200);
  ctx.strokeStyle = color;

  ctx.lineTo(200 + v.elements[0]*20, 200 - v.elements[1]*20);
  ctx.stroke();
}

function handleDrawEvent(){
  clearCanvas();
  // reads v1 x and y values
  let x1 = document.getElementById("x1").value;
  let y1 = document.getElementById("y1").value;
  // set vector
  let v1 = new Vector3([x1,y1,0]);
  //console.log(v1.elements);
  drawVector(v1,"red");

  //reads v2 x and y values
  let x2 = document.getElementById("x2").value;
  let y2 = document.getElementById("y2").value;
  // set vector
  let v2 = new Vector3([x2,y2,0]);
  drawVector(v2,"blue");
}

function handleDrawOperationEvent(){
  clearCanvas();
  // reads v1 x and y values
  let x1 = document.getElementById("x1").value;
  let y1 = document.getElementById("y1").value;
  // set vector
  let v1 = new Vector3([x1,y1,0]);
  drawVector(v1,"red");

  //reads v2 x and y values
  let x2 = document.getElementById("x2").value;
  let y2 = document.getElementById("y2").value;
  // set vector
  let v2 = new Vector3([x2,y2,0]);
  drawVector(v2,"blue");

  let op = document.getElementById("operation").value;

  var v3, v4, s;
  switch(op) {
    case "add":
      v3 = v1.add(v2);
      drawVector(v3, "green");
      break;
    case "sub":
      v3 = v1.sub(v2);
      drawVector(v3, "green");
      break;
    case "mult":
      s = document.getElementById("scalar").value;
      v3 = v1.mul(s);
      v4 = v2.mul(s);
      drawVector(v3, "green");
      drawVector(v4, "green");
      break;
    case "div":
      s = document.getElementById("scalar").value;
      v3 = v1.div(s);
      v4 = v2.div(s);
      drawVector(v3, "green");
      drawVector(v4, "green");
      break;
    case "angle":
      console.log(angleBetween(v1,v2));
      break;
    case "area":
      console.log("Area of triangle: ", areaTriangle(v1,v2));
      break;
    case "mag":
      console.log("Magnitude v1: ", v1.magnitude());
      console.log("Magnitude v2: ", v2.magnitude());
      break;
    case "norm":
      //console.log(v1.normalize().elements);
      //console.log(v2.normalize().elements);
      drawVector(v1.normalize(), "green");
      drawVector(v2.normalize(), "green");
      break;
    default:
      break;
  }
}

function angleBetween(v1, v2){
  // calculate dot(v1,v2)
  let dot = Vector3.dot(v1,v2);
  // calculates ||v1|| * ||v2||
  let m = v1.magnitude() * v2.magnitude();
  let angle = Math.acos(dot/m);
  // convert from radians to degrees
  return angle*180 / Math.PI;
}

function areaTriangle(v1, v2){
  let v3 = Vector3.cross(v1,v2);
  return v3.magnitude()/2;
}
