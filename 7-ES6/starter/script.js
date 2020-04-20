/* // let and const

// es5
var name55 = "Muzza";
var age5 = 12;
name55 = "Mariffo";
console.log("name5: - " + name55);

// es6
const name6 = "Muzza";
let age6 = 23;
//name6 = 'MarioMarioooo';
console.log("name6: - " + name6);
// you can't edit consts after the fact

///////////// Scoping constraints
// es5
function driversLicence5(passedTest) {
  var firstName = "John";
  var yearOfBirth = 1990;

  if (passedTest) {
    console.log(
      firstName + ", born in " + yearOfBirth + ", is now allowed to drive"
    );
  }
}
driversLicence5(true);

//es6
// you cannot access let/const outside of their BLOCK of code
function driversLicence6(passedTest) {
  if (passedTest) {
    let firstName = "John";
    const yearOfBirth = 1990;
    console.log(
      firstName + ", born in " + yearOfBirth + ", is now allowed to drive"
    );
  }
  // won't work:
  //console.log(firstName + ', born in ' + yearOfBirth + ', is now allowed to drive');
}

driversLicence6(true);

// The two i's are completely different variables!
let i = 23;
console.log(i);
for (let i = 0; i < 5; i++) {
  console.log(i);
}
console.log(i);

//////////////////////////////////////////
// Blocks and IIFEs

// scoping changes are great for data privacy
//ES5
(function () {
  var c = 3;
})();

//ES6
// All you need are curly bois
{
  const a = 1;
  let b = 2;
}

//neither of these work as the variables are protected
// console.log(a+b);
// console.log(c);

//////////////////////////////////////////////////////
// STRINGS

// ES5
let firstName = "Mari";
let lastName = "Cappa";
const dob = 1981;

function calcAge(year) {
  return 2020 - year;
}

//ES5 string output
console.log(
  "This is " +
    firstName +
    " " +
    lastName +
    ", born in " +
    dob +
    ", he is now " +
    calcAge(dob)
);

// ES6 output
// 'Temporal Literals'
console.log(
  `This is ${firstName} ${lastName}. He was born in ${dob}. Today he is ${calcAge(
    dob
  )}`
);

//String methods
const n = `${firstName} ${lastName}`;
console.log(n.startsWith("M"));
console.log(n.endsWith("ppa"));
console.log(n.includes("rio"));
console.log(`${firstName} `.repeat(5));

//////////////////////////////////////////////
///////// Arrow functions

const years = [1990, 1965, 1982, 1937];

// es5
var ages5 = years.map(function (el) {
  return 2020 - el;
});

console.log(ages5);

// es6
// no parentheses required on single element call
let ages6 = years.map((el) => 2020 - el);
console.log(ages6);

// parentheses required on multiple elements
ages6 = years.map((el, index) => `AgeElement ${index + 1}: ${2020 - el}`);
console.log(ages6);

// curly bois required when you have more than one line of code in the function
// you also have to manually set the return value in this case
ages6 = years.map((el, index) => {
  const now = new Date().getFullYear();
  const age = now - el;
  return `AgeElement ${index + 1}: ${2020 - el}`;
});

console.log(ages6);

//////////////////////////////////////////////
///////// Arrow functions continued

// ES5
var box5 = {
  color: "green",
  position: 1,
  clickMe: function () {
    // hack to provide access to this object within listener function
    var self = this;
    document.querySelector(".green").addEventListener("click", function () {
      console.log(
        "ES5: I am Box " + self.position + " and my color is : " + self.color
      );
    });
  },
};

box5.clickMe();

// ES6
//Arrow functions persist the this object
const box6 = {
  color: "green",
  position: 1,
  clickMe: function () {
    document.querySelector(".green").addEventListener("click", () => {
      console.log(
        "ES6: I am Box " + this.position + " and my color is : " + this.color
      );
    });
  },
};
box6.clickMe();

//////////// ES5 this persistance requires fancy binding calls
function Person(name) {
  this.name = name;
}
var friends = ["Bob", "Jane", "Mark"];

// ES5 function
Person.prototype.myFriends5 = function (friends) {
  var arr = friends.map(function (el) {
    return this.name + " is friends with " + el;
  }.bind(this));
  console.log(arr);
};

// ES6 arrow function, one line, no braces
Person.prototype.myFriends6 = function (friends) {
  var arr = friends.map(el => `${this.name} is friends with ${el}`);
  console.log(arr);
};

new Person("John").myFriends5(friends);
new Person("John6").myFriends6(friends); */

///////////////////////////////////////////////////
////// DESCTRUCTURING

/* //ES5
var john = ["John, 26"];
//var name = john[0];
//var age = john[1];

//ES6
const [namees6, agees6] = ["John", 26];
console.log(namees6);
console.log(agees6);

const obj = {
  firstName: "John",
  lastName: "Smith",
};

const { firstName, lastName } = obj;
console.log(firstName);
console.log(lastName);

function calcAgeRetirement(year) {
  const age = new Date().getFullYear() - year;
  return [age, 65 - age];
}

const [age, retirement] = calcAgeRetirement(1990);
console.log(age);
console.log(retirement);

///////////////////////////////////////////////////
////// ARRAYSA

const boxes = document.querySelectorAll(".box");
// es5

var boxesArr5 = Array.prototype.slice.call(boxes);

boxesArr5.forEach(function (cur) {
  cur.style.backgroundColor = "dodgerblue";
});

//// ES6
const boxesArr6 = Array.from(boxes);
boxesArr6.forEach((cur) => (cur.style.backgroundColor = "dodgerblue")); */

//Looping
// es5
/* 
for (var i = 0; i < boxesArr5.length; i++) {

  if (boxesArr5[i].className === "box blue") {
    continue;
  }

  boxesArr5[i].textContent = "I changed to blue!";
  
}
 */
/* 
// ES6 FOR-OF
for (const cur of boxesArr6) {
  if (cur.className.includes("blue")) {
    continue;
  }

  cur.textContent = "I changed to blue!";
}

// ES5
var ages = [12, 17, 8, 21, 14, 11];
var agesArr = ages.map(function (cur) {
  return cur >= 18;
});
console.log(agesArr);
console.log(agesArr.indexOf(true));
console.log(ages[agesArr.indexOf(true)]);

//ES6
console.log(ages.findIndex(cur => cur >= 18));

console.log(ages.find(cur => cur >= 18)); */

/////////////////////////////////////////////
// SPREAD OPERATOR

/* function addAges(a,b,c,d){
  return a + b + c + d;
}

var sum1 = addAges(18,30,12,21);
console.log(sum1);

var ages = [18,30,12,21];
var sum2 = addAges.apply(null, ages);
console.log(sum2);


// ES6
const sum3 = addAges(...ages);
console.log(sum3);

const familySmith = ['John', 'jane', 'jill'];
const familyMiller = ['Mary', 'Bob', 'Macca'];

// merge two arrays with the ... operator
const bigFamily = [...familyMiller, ...familySmith];
console.log(bigFamily);

const h = document.querySelector('h1');
const boxes = document.querySelectorAll('.box');

const all = [h, ...boxes];

console.log(all);

Array.from(all).forEach(cur => cur.style.color = 'purple');

 */

////////////////////////////////
/// REST PARAMETERS
////    ...
/* 

The spread parameter breaks an array down
into individual variable when being used to call a function.

isFullAge(...ages);

The REST parameter breaks down an array in a similar manner, but is used in
function parameter blocks to affect incoming arrays

function isFullAge(...ages){
  // some code
}

/*  */
//ES5
/* function isFull5(){
  // console.log(arguments);
  var args = Array.prototype.slice.call(arguments);

  args.forEach(function(cur){
    console.log((2020 - cur) >= 18)
  });
}

isFull5(1991,2013,1965);
isFull5(1991,2013,1965, 2021, 2100, 1998); 

// ES6
function isFullAge6(...years){
  console.log(years);
  years.forEach(cur => console.log((2020 - cur) >= 18));
};
isFullAge6(1991,2013,1965,2016,1987,1247);
 
//ES5
/* function isFull5(){
  // console.log(arguments);
  var args = Array.prototype.slice.call(arguments);

  args.forEach(function(cur){
    console.log((2020 - cur) >= 18)
  });
}

isFull5(1991,2013,1965);
isFull5(1991,2013,1965, 2021, 2100, 1998);

// ES6
function isFullAge6(...years){
  console.log(years);
  years.forEach(cur => console.log((2020 - cur) >= 18));
};
isFullAge6(1991,2013,1965,2016,1987,1247);
*/

////////////////// second example REST / SPREAD

//ES5
/* function isFull5(limit) {
  // slice the first value off the array as it is now limit
  var args = Array.prototype.slice.call(arguments, 1);

  args.forEach(function (cur) {
    // console.log((2020 - cur) >= limit)
  });
}

isFull5(1, 1991, 2013, 1965);
//isFull5(1991,2013,1965, 2021, 2100, 1998);

// ES6
function isFullAge6(limit, ...years) {
  console.log(years);
  years.forEach((cur) => console.log(2020 - cur >= limit));
}
isFullAge6(16, 2013, 1965, 2016, 1987, 1247); */

///////////////////////////////
///// Default parameters
/* 
function SmithPerson(firstName, dob, lastname, natio) {
  lastname === undefined ? (lastname = "smith") : (lastname = lastname);
  natio === undefined ? (natio = "american") : (natio = natio);

  this.firstName = firstName;
  this.lastname = lastname;
  this.dob = dob;
  this.natio = natio;
}

var john = new SmithPerson("john", 1990);
var emily = new SmithPerson("Emily", 1990, "Diaz", "Spanish");

console.log(john);
console.log(emily);

function MillerPerson(firstName, dob, lastname = "smith", natio = "american") {
  this.firstName = firstName;
  this.lastname = lastname;
  this.dob = dob;
  this.natio = natio;
}

var john = new MillerPerson("john", 1990);
var emily = new MillerPerson("Emily", 1990, "Diaz", "Spanish");

console.log(john);
console.log(emily); */

///////////////////////////////
///// ES6 MAPS

// Better than objects for hashmaps
// You can use anything for the Key, not just strings
// Maps are iterable via loops
// Easy to add/remove

/* 
const question = new Map();

// Key : Value pair
question.set(
  "question",
  "What is the official name of the latest major version of JS?"
);
question.set(1, "ES5");
question.set(2, "ES6");
question.set(3, "ES2015");
question.set(4, "ES7");
question.set(5, "C++");
question.set("correct", 3);
question.set(true, "Correct Answer");
question.set(false, "Wrong, try again");

console.log(question.get("question"));
console.log(question.size);

// Delete from a map
if (question.has(5)) {
  question.delete(5);
}

console.log(question.get("question"));
console.log(question.size);

//clear everything inside the Map object
//question.clear();

console.log(question.get("question"));
//console.log(question.size);

// FOREACH looping
// question.forEach((value, key) =>
// console.log(`This is ${key}, and it is set to ${value}`))

// FOR..OF Loop
for (let [key, value] of question.entries()) {
  if (typeof key === "number") {
    console.log(`Option ${key}: ${value}`);
  }
}

// We have a value being returned from the user
// Then we compare it to the correct answer key/value
// Then if that calculation is true, it outputs the string from the true key/value
// Else it outputs the falsey key/value instead, clever!
const ans = parseInt(prompt('Write the correct answer'));
console.log(ans);
console.log (question.get(ans === question.get('correct')));

 */

///////////////////////////////
///// CLASSES

// Nothing crazy new, just syntatic sugar
// Classes are not hoisted
// Must have a constructor method

/* // ES5
var Person5 = function (name, dob, job) {
  this.name = name;
  this.dob = dob;
  this.job = job;
};

Person5.prototype.calcAge = function () {
  var age = new Date().getFullYear() - this.dob;
  console.log(age);
};

var john = new Person5("John", 1990, "teacher");

john.calcAge();

// ES6
class Person6 {
  constructor(name, dob, job) {
    this.name = name;
    this.dob = dob;
    this.job = job;
  }

  calculateAge() {
    var age = new Date().getFullYear() - this.dob;
    console.log(age);
  }
}

const john6 = new Person6("John", 1990, "teacher");
john6.calculateAge();
 */
///////////////////////////////
///// CLASSES and INHERITANCE

// ES5 - inheritance
/* 
//A function constructor
var Person5 = function (name, dob, job) {
  this.name = name;
  this.dob = dob;
  this.job = job;
};

//Add a method to the prototype
Person5.prototype.calcAge = function () {
  var age = new Date().getFullYear() - this.dob;
  console.log(age);
};

//Another function constructor
var Athlete5 = function (name, dob, job, games, medals) {
  Person5.call(this, name, dob, job);
  this.games = games;
  this.medals = medals;
};

// Connect the two functions, this provides the actual link and inheritance across the classes
Athlete5.prototype = Object.create(Person5.prototype);

//Add a method just for Athlete types
Athlete5.prototype.wonMedal = function () {
  this.medals++;
  console.log(this.name + " has won: " + this.medals + " medals.");
};

var johnAth = new Athlete5("John", 1990, "Swimmer", 2, 7);
//johnAth.calcAge(); */
//johnAth.wonMedal();

//console.log(johnAth);

// do the same in ES6 now

//Create the person class and a method for it
/* class Person6 {
  constructor(name, dob, job) {
    this.name = name;
    this.dob = dob;
    this.job = job;
  }

  calculateAge() {
    var age = new Date().getFullYear() - this.dob;
    console.log(age);
  }
}

//Create an athlete class which clearly extends the Person one
class Athlete6 extends Person5 {
  constructor(name, dob, job, medals, games) {
    super(name, dob, job);
    this.medals = medals;
    this.games = games;
  }

  wonMedal() {
    this.medals++;
    console.log(this.name + " has won: " + this.medals + " medals.");
  }
}

const john6 = new Athlete6("John", 1990, "swimmer", 3 , 10);

john6.wonMedal();
john6.calcAge();
 */

//////////////////////////////////////
//////////////////////////////////////
//////////////////// CODING CHALLENGE!
//////////////////////////////////////
//////////////////////////////////////

// Create my classes
class Element {
  constructor(name, buildYear) {
    this.name = name;
    this.buildYear = buildYear;
  }

  getAge() {
    let age = new Date().getFullYear() - this.buildYear;
    return parseInt(age);
  }
}

class Park extends Element {
  constructor(name, buildYear, countTrees, area) {
    super(name, buildYear);
    this.area = area;
    this.countTrees = countTrees;
  }

  calcDensity() {
    this.density = Math.round(this.countTrees / this.area);

    console.log(
      `${this.name} has a tree density of ${this.density} trees per square km`
    );
  }
}

class Street extends Element {
  constructor(name, buildYear, length, size = 3) {
    super(name, buildYear);
    this.size = size;
    this.length = length;
  }

  classifyStreet() {
    const classification = new Map();
    classification.set(1, "tiny");
    classification.set(2, "small");
    classification.set(3, "normal");
    classification.set(4, "big");
    classification.set(5, "huge");

    console.log(
      `${this.name}, built in ${this.buildYear}, is a ${classification.get(
        this.size
      )} street`
    );
  }
}

// Init vars
let avgParkAge = 0,
  parkCount = 0,
  maxTrees = 0;
let totalStreetLength = 0,
  streetCount = 0;

// Put them all in arrays
const allParks = [
  new Park("Green Park", 1990, 500, 3),
  new Park("Red Park", 1965, 987, 7),
  new Park("Blue Park", 1998, 2500, 7),
];

const allStreets = [
  new Street("Green Street", 1980, 2.8, 1),
  new Street("Red Street", 1979, 2.2),
  new Street("Blue Street", 1985, 5.4, 2),
  new Street("Purple Street", 1970, 7.6, 5),
];

function reportParks(p) {
  console.log("----PARKS REPORT-----");

  // Density
  p.forEach((el) => el.calcDensity());

  // Average age
  const ages = p.map((el) => new Date().getFullYear() - el.buildYear);
  const [totalAge, avgAge] = calcStats(ages);
  console.log(`Our ${p.length} parks have an average age of ${avgAge} yrs `);

  // Which has more than 1000
  const i = p.map((el) => el.countTrees).findIndex((el) => el >= 1000);
  console.log(`${p[i].name} has more than 1000 trees.`);
}

function reportStreets(s) {
  console.log("----STREETS REPORT-----");

  // total and average length of the towns streets
  const streetLengths = s.map((el) => el.length);

  const [totalKM, avgKM] = calcStats(streetLengths);
  console.log(
    `Our ${s.length} streets have an total length of ${totalKM} km, and an average of ${avgKM}`
  );

  // street classification
  s.forEach((el) => el.classifyStreet());
}

// this function takes any given array and returns the sum and avg value of it
function calcStats(arr) {
  const sum = arr.reduce((pre, cur, index) => pre + cur, 0);
  return [sum, sum / arr.length];
}

reportParks(allParks);
reportStreets(allStreets);

///////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////
// Arrow functions
// https://www.youtube.com/watch?v=6sQDTgOqh-I

/* 

- great for small, inline and single purpose abilities

 */

const dragonEvents = [
  { type: "attack", value: 12, target: "player-dorkman" },
  { type: "yawn", value: 40, target: "player-dorkman" },
  { type: "eat", target: "horse" },
  { type: "attack", value: 23, target: "player-fluffykins" },
  { type: "attack", value: 12, target: "player-dorkman" },
];

// No arrow
const totalDamageOnDorkman = dragonEvents
  .filter(function (event) {
    return event.type === "attack";
  })
  .filter(function (event) {
    return event.target === "player-dorkman";
  })
  .map(function (event) {
    return event.value;
  })
  .reduce(function (prev, value) {
    return (prev || 0) + value;
  });

  // With arrow
const totalDamageOnDorkmanArrow = dragonEvents
  .filter(e => e.type === "attack")
  .filter(e => e.target === "player-dorkman")
  .map(e => e.value)
  .reduce((prev, value) => (prev || 0) + value);

console.log("totalDamageOnDorkman", totalDamageOnDorkman);
console.log("totalDamageOnDorkmanArrow", totalDamageOnDorkmanArrow);
