
var count;

function setup(){
	createCanvas(windowWidth,windowHeight)
	
}

function draw(){
	eye = new Eye(0,0); //Create New Eye object
	// eye2 = new Eye(100,100); //Create New Eye object
	background(0); //Set background to zero
	translate(windowWidth/2,windowHeight/2); //translate Everything. Now cordinate (0,0) is center of the window 
	// eye.openAndClose();
	push();
	eye.white(); //Draw Eye White 
	eye.iris(); // Draw Iris
	// eye.mouseMovement();
	pop();
	// push();
	// eye2.white(); //Draw Eye White 
	// eye2.iris(); // Draw Iris
	// eye2.mouseMovement();
	// pop();
}

function Eye(x,y){ //Define Eye Object
	this.position = { //Set position
		x: x,
		y: y
	}
	this.relativeMousePosition = { //Define translated mouseX and mouseY
		x: mouseX - (windowWidth/2),
		y: mouseY - (windowHeight/2)
	}
	this.size = { //Set Size
		x: 100,
		y: 100,
	}	
	this.open = true;
	this.irisMoveRange = 40;
	this.irisTransformRange = this.irisMoveRange/10
	this.irisPerspectiveTransform = this.irisMoveRange;
}


// reference:https://p5js.org/reference/#/p5/angleMode
Eye.prototype.iris = function(){
	this.distanceFromCenter = sqrt(((this.relativeMousePosition.x)*(this.relativeMousePosition.x))+((this.relativeMousePosition.y)*(this.relativeMousePosition.y)))
	
	if(this.distanceFromCenter <= this.irisMoveRange){
		this.irisSizeMap = map(this.distanceFromCenter,-this.irisMoveRange,this.irisMoveRange,-this.irisTransformRange,this.irisTransformRange)
		this.irisPerspectiveTransform = this.distanceFromCenter;
	}else{
		this.irisSizeMap = this.irisTransformRange;
	}
	push();
		angleMode(DEGREES); // Change the mode to DEGREES
		var a = atan2(this.relativeMousePosition.y,this.relativeMousePosition.x);
		rotate(a);
		noStroke();
		fill(10)
		ellipse(this.position.x+this.irisPerspectiveTransform,this.position.y,this.size.x/5-this.irisSizeMap,this.size.y/5);
	pop();
	// console.log("this.irisSizeMap",this.irisSizeMap)
	// console.log("this.size.y",this.size.y)
	// console.log(this.relativeMousePosition)
	// console.log(sqrt(1000))
	// console.log(this.distanceFromCenter)
}

Eye.prototype.white = function(){
	fill(255)
	if(this.open == true){
		this.size.y = 100;
	}else if(this.open == false){
		this.size.y = 0;
	}
	ellipse(this.position.x,this.position.y,this.size.x,this.size.y);
}



Eye.prototype.rotation = function(){
}

Eye.prototype.mouseMovement = function(){
	fill(255);
	ellipse(this.relativeMousePosition.x,this.relativeMousePosition.y,10,10)
	text(this.relativeMousePosition.x,this.relativeMousePosition.x,this.relativeMousePosition.y) //Just checking
	


}

// Eye.prototype.openAndClose = function(){
// 	if(mouseButton){
// 		console.log("Tadah")
// 		if(this.open == true){
// 			this.open = false;
// 		}else if(this.open == false){
// 			this.open == true;
// 		}
// 		console.log(this.size.y)
// 	}
// }