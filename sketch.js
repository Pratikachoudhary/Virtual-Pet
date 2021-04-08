var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var database;
//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {

// defining database
  database=firebase.database();

// creating canvas
  createCanvas(1000,400);

// creating food
  foodObj = new Food();

// referring database
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);

// creating dog sprite
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

//creating feed the dog button here
  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {

// giving background colour
  background(46,139,87);

// displaying
  foodObj.display();

  //write code to read fedtime value from the database 
if(lastfed>12){
  text("last fed = 12pm",350,30);
}else if(lastFed<12){
 text("last fed = 12am",350,30);
}else {
  text("last fed = day after yesterday",350,30);
}
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
  
  //write code here to update food stock and last fed time

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
