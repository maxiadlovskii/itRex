function Plane(){};

Plane.prototype.takeoff = function takeoff(callback) {
 setTimeout(function() {
   callback()
   console.log('Took off');
 }, 600);
};
Plane.prototype.closeChassis = function closeChassis(callback) {
 setTimeout(function() {
   callback()
   console.log('Chassis closed');
 }, 1000);
};
Plane.prototype.turnOnAutoPilot = function turnOnAutoPilot(callback) {
 setTimeout(function() {
   callback()
   console.log('Autopilot turned on');
 }, 750);
};
Plane.prototype.flyToDestination = function flyToDestination(callback) {
 setTimeout(function() {
   callback()
   console.log('Flown to destination');
 }, 2000);
};
Plane.prototype.openChassis = function openChassis(callback) {
 setTimeout(function() {
   callback()
   console.log('Chassis open');
 }, 500);
};
Plane.prototype.land = function land(callback) {
 setTimeout(function() {
   callback()
   console.log('Landed');
 }, 3000);
};
//DONT MODIFY ANYTHING ABOVE HERE
// START ADD YOUR CODE HERE
var plane = {};
plane.arr = [];
plane.execute = function(){
  if (plane.arr.length >0 ){  
  plane.arr[0].call(this, plane.execute)
  plane.arr.shift();
  } 

}
plane.takeoff = function(){
  plane.arr.push(Plane.prototype.takeoff)
  plane.execute(); 
  return plane;
 }
plane.closeChassis = function(){
  plane.arr.push(Plane.prototype.closeChassis )
  return plane;
}

plane.turnOnAutoPilot = function(){
  plane.arr.push(Plane.prototype.turnOnAutoPilot)
  return plane;
}
plane.flyToDestination = function(){
   plane.arr.push(Plane.prototype.flyToDestination )
  return plane;
}

plane.openChassis = function(){
  plane.arr.push(Plane.prototype.openChassis)
  return plane;
}
plane.land = function(){
  plane.arr.push(Plane.prototype.land )
  return plane;
}

// END ADD YOUR CODE HERE
//DONT MODIFY ANYTHING BELOW HERE
console.log("Expected Output:")
console.log("Took off");
console.log("Chassis closed");
console.log("Autopilot turned on");
console.log("Flown to destination");
console.log("Chassis open");
console.log("Landed");
console.log("\n\nActual Output:")
plane.takeoff().closeChassis().turnOnAutoPilot().flyToDestination().openChassis().land();
