import axios from "axios";

export default class Recipe {
  constructor(id) {
    this.id = id;
  }

  async getRecipe() {
    try {
      const result = await axios(
        `https://forkify-api.herokuapp.com/api/get?rId=${this.id}`
      );
      this.title = result.data.recipe.title;
      this.author = result.data.recipe.publisher;
      this.img = result.data.recipe.image_url;
      this.url = result.data.recipe.source_url;
      this.ingredients = result.data.recipe.ingredients;
    } catch (error) {
      console.log(error);
      alert(`Something went kabang :( `);
    }
  }

  // Every 3 ingrediets adds 15 minute to prep time
  calcTime() {
    const numIng = this.ingredients.length;
    const periods = Math.ceil(numIng / 3);
    this.time = periods * 15;
  }

  calcServings() {
    this.servings = 4;
  }

  parseIngredients() {
    const unitsLong = [
      "tablespoons",
      "tablespoon",
      "ounces",
      "ounces",
      "teaspoons",
      "teaspoon",
      "cups",
      "pounds",
    ];
    const unitsShort = [
      "tbsp",
      "tbsp",
      "oz",
      "oz",
      "tsp",
      "tsp",
      "cup",
      "pound",
    ];

    const units = [...unitsShort, "kg", "g"];

    const newIngredients = this.ingredients.map(el => {
      // uniform the units
      let ingredient = el.toLowerCase();
      unitsLong.forEach((unit, i) => {
        ingredient = ingredient.replace(unit, unitsShort[i]);
      });

      // remove parentheses and all text within
      ingredient = ingredient.replace(/ *\([^]*\) */g, " ");

      // parse ingredients into count, unit and ingredient
      const arrIng = ingredient.split(" ");

      // findIndex and includes are looking for the current el2 element, in the given array
      const unitIndex = arrIng.findIndex(el2 => units.includes(el2));

      let objIng, count;

      if (unitIndex > -1) {
        // there is a unit

        // 4 1/2 cups - arrCount is [4, 1/2] --> eval('4+1/2') --> 4.5
        // 4 cups - arrCount is [4]
        const arrCount = arrIng.slice(0, unitIndex);
        if (arrCount.length === 1) {
          count = eval(arrIng[0].replace("-", "+"));
        } else {
          count = eval(arrIng.slice(0, unitIndex).join("+"));
        }

        objIng = {
          count,
          unit: arrIng[unitIndex],
          ingredient: arrIng.slice(unitIndex + 1).join(" "),
        };
      } else if (parseInt(arrIng[0], 10)) {
        // the first value is a number and there is no found Unit
        objIng = {
          count: parseInt(arrIng[0]),
          unit: "",
          ingredient: arrIng.slice(1).join(" "),
        };
      } else if (unitIndex === -1) {
        // there is NO unit
        objIng = {
          count: 1,
          unit: "",
          ingredient,
        };
      }

      return objIng;
    });

    this.ingredients = newIngredients;
  }
}
