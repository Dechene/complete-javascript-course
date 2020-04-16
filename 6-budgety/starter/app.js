//BUDGET CONTROLLER
var budgetController = (function () {
  var Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  var data = {
    allItems: {
      exp: [],
      inc: [],
    },
    totals: {
      exp: 0,
      inc: 0,
    },
    budget: 0,
    percentage: -1,
  };

  var calculateTotal = function (type) {
    var sum = 0;

    data.allItems[type].forEach(function (cur) {
      sum += cur.value;
    });

    data.totals[type] = sum;
  };

  return {
    addItem: function (type, desc, val) {
      var newItem, ID;

      //Create a new ID
      if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        ID = 0;
      }

      //Creat a new item based on passed data
      if (type === "exp") {
        newItem = new Expense(ID, desc, val);
      } else if (type === "inc") {
        newItem = new Income(ID, desc, val);
      }

      //Push to Data object
      data.allItems[type].push(newItem);

      //Return the new item back
      return newItem;
    },

    calculateBudget: function () {
      // calc total income and expenses
      calculateTotal("exp");
      calculateTotal("inc");

      // calculate the budget : inc - exp
      data.budget = data.totals.inc - data.totals.exp;

      // calculate the percent for expenses
      if (data.totals.inc > 0) {
        data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
      } else {
        data.percentage = -1;
      }
    },

    getBudget: function () {
      return {
        budget: data.budget,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
        percentage: data.percentage,
      };
    },

    testing: function () {
      console.log(data);
    },
  };
})();

//UI CONTROLLER
var UIController = (function () {
  var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    inputButton: ".add__btn",
    incomeContainer: ".income__list",
    expenseContainer: ".expenses__list",
    budgetLabel: ".budget__value",
    incomeLabel: ".budget__income--value",
    expenseLabel: ".budget__expenses--value",
    percentageLabel: ".budget__expenses--percentage",
  };

  return {
    getInput: function () {
      return {
        // This is the dropdown box, either 'inc' or 'exp' being returned
        type: document.querySelector(DOMstrings.inputType).value,
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: parseFloat(document.querySelector(DOMstrings.inputValue).value),
      };
    },

    addListItem: function (obj, type) {
      var html, newHTML, element;
      // Create HTML with placeholders
      if (type === "inc") {
        element = DOMstrings.incomeContainer;
        html =
          '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else if (type === "exp") {
        element = DOMstrings.expenseContainer;
        html =
          '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }

      // Replace placeholder txt with actual data
      newHTML = html.replace("%id%", obj.id);
      newHTML = newHTML.replace("%description%", obj.description);
      newHTML = newHTML.replace("%value%", obj.value);

      // Insert HTML into DOM
      document.querySelector(element).insertAdjacentHTML("beforeend", newHTML);
    },

    displayBudget: function (obj) {
      document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
      document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc;
      document.querySelector(DOMstrings.expenseLabel).textContent =
        obj.totalExp;

      if (obj.percentage > 0) {
        document.querySelector(DOMstrings.percentageLabel).textContent =
          obj.percentage + "%";
      } else {
        document.querySelector(DOMstrings.percentageLabel).textContent = "---";
      }
    },

    clearFields: function () {
      var fields, fieldsArr;

      // Get all fields we want to be cleared using querySelectorAll
      // It accepts a CSV string of classes and returns a LIST object
      fields = document.querySelectorAll(
        DOMstrings.inputDescription + "," + DOMstrings.inputValue
      );

      // Use the Array slice method to force JS to return us an Array version of the previous LIST
      fieldsArr = Array.prototype.slice.call(fields);

      // Loop through the elements in the Array and clear them
      fieldsArr.forEach(function (current, index, array) {
        current.value = "";
      });

      //   Provide focus back to the desired DOM item
      fieldsArr[0].focus();
    },

    getDOMstrings: function () {
      return DOMstrings;
    },
  };
})();

// GLOBAL APP CONTROLLER
var controller = (function (budgetCTRL, UIctrl) {
  var setupEventListeners = function () {
    var DOM = UIctrl.getDOMstrings();

    //User has clicked on the add item button
    document
      .querySelector(DOM.inputButton)
      .addEventListener("click", ctrlAddItem);

    //User has hit ENTER to add an item
    document.addEventListener("keypress", function (e) {
      if (e.keyCode === 13) {
        ctrlAddItem();
      }
    });
  };

  var updateBudget = function () {
    // Calculate the budget
    budgetCTRL.calculateBudget();

    // Return the budget
    var budget = budgetCTRL.getBudget();

    // Display the budget on the UI
    UIctrl.displayBudget(budget);
  };

  var ctrlAddItem = function () {
    var input, newItem;
    // Get the input item from the UI controller
    input = UIctrl.getInput();

    if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
      // Add the item to the budget controller
      newItem = budgetController.addItem(
        input.type,
        input.description,
        input.value
      );

      // Clear the fields
      UIctrl.clearFields();

      // Add the item to the UI
      UIctrl.addListItem(newItem, input.type);

      // Calc and update budget
      updateBudget();
    }
  };

  return {
    init: function () {
      console.log("app has started");
      UIctrl.displayBudget({
        budget: 0,
        totalInc: 0,
        totalExp: 0,
        percentage: -1,
      });
      setupEventListeners();
    },
  };
})(budgetController, UIController);

//Kick off the entire program
controller.init();
