// var Person = function (name, yearOfBirth, job) {
//   this.name = name;
//   this.yearOfBirth = yearOfBirth;
//   this.job = job;
// };

// // Functions I applied to the prototype are now available
// // to the Person object and all objects created from it
// Person.prototype.calculateAge = function () {
//   console.log(2020 - this.yearOfBirth);
// };

// Person.prototype.lastname = "Smith";

// var john = new Person("John", 1990, "teacher");
// var jane = new Person("Jane", 1969, "designer");
// var mark = new Person("Mark", 1948, "retired");

// console.log(john);

// john.calculateAge();
// jane.calculateAge();
// mark.calculateAge();

// var Animal = function (name, legs, habitat) {
//   this.name = name;
//   this.habitat = habitat;
//   this.legs = legs;
// };

// var cow = new Animal("Cow", 4, "Farm");
// var crab = new Animal("crab", 8, "Ocean");
// var dog = new Animal("Dog", 4, "Couch");

// console.log(cow);
// console.log(crab);
// console.log(dog);

// OBJECT.CREATE

// var personProto = {
//     calculateAge : function(){
//         console.log(2020 - this.yearOfBirth);
//     }
// };

// var john = Object.create(personProto);

// john.name = 'John';
// john.yearOfBirth = 1990;
// john.teacher = 'designer';
// console.log(john);

// var jane = Object.create(personProto, {
//     name: { value: 'Jane'},
//     yearOfBirth: { value: 1969 },
//     job: { value: 'designer'}
// });

// console.log(jane);

// CLOSURES

// function interviewQuestion(job) {
//   return function (name) {
//     if (job === "designer") {
//       console.log(name + ", can you please explain what UX design is?");
//     } else if (job === "teacher") {
//       console.log("What subject do you teach, " + name + "?");
//     } else {
//       console.log(name + ", what do you do?");
//     }
//   };
// }

// interviewQuestion("designer")("Johnno");
// interviewQuestion("teacher")("Macca");

// BIND CALL APPLY

/* var john = {
  name: "John",
  age: 26,
  job: "teacher",
  presentation: function (style, timeOfDay) {
    if (style === "formal") {
      console.log(
        "Good " +
          timeOfDay +
          ", Ladies and gentlemen! I'm " +
          this.name +
          " and I'm a " +
          this.job +
          ", I'm " +
          this.age +
          " years old."
      );
    } else if (style === "friendly") {
      console.log(
        "Hey, whats up? " +
          "I'm " +
          this.name +
          ", I'm a " +
          this.job +
          ", I'm " +
          this.age +
          " years old." +
          " Have a nice " +
          timeOfDay +
          "!"
      );
    }
  },
};

var emily = {
    name: 'Emily',
    age: 35,
    job: 'designer'
};

john.presentation('formal','morning');

//CALL - We are calling Johns method on emily's behalf here:
john.presentation.call(emily, 'friendly', 'afternoon');

//APPLY - essentially the same as CALL, but it passes through the object being shared, 
// and then an array of parametes, instead of individual arguments.
john.presentation.apply(emily, ['formal', 'afternoon']);

//BIND returns a function but can set a value for you permanently
//  It has basically preset the friendly value in the below example
var johnFriendly = john.presentation.bind(john, 'friendly');

johnFriendly('tea-time');
johnFriendly('lunch');

var emilyFormal = john.presentation.bind(emily, 'formal');
emilyFormal('arvo'); */

// CODING CHALLENGE

(function () {
  var score = 0;

  var Question = function (question, answers, correctAnswer) {
    (this.question = question),
      (this.answers = answers),
      (this.correctAnswer = correctAnswer);
  };

  Question.prototype.askQuestion = function () {
    console.log(this.question);
    for (var i = 0; i < this.answers.length; i++) {
      console.log(i + " - " + this.answers[i]);
    }
  };

  Question.prototype.checkAnswer = function (response) {
    if (response === this.correctAnswer) {
      console.log("You know it!");
      score++;
    } else {
      console.log("Aww dawg, you suck...");
    }
  };

  Question.prototype.showScore = function () {
    console.log("Your current score is: " + score);
    console.log("-------------------------------");
  };

  var q1 = new Question(
    "How old is Mario?",
    ["Super Old", "Super Young", 38],
    2
  );

  var q2 = new Question(
    "Ptooey you ---",
    ["Bastad", "Javascript", "ChingChong"],
    0
  );

  var q3 = new Question(
    "To edit permissions, you use: ",
    ["Chmod", "Chamon", "ChingChong"],
    0
  );

  var arrQ = [q1, q2, q3];

  while (1 === 1) {
    var r = Math.floor(Math.random() * arrQ.length);
    arrQ[r].askQuestion();
    var response = prompt(arrQ[r].question);

    if (response === "exit") {
      return;
    } else {
      arrQ[r].checkAnswer(parseInt(response));
      arrQ[r].showScore();
    }
  }
})();
