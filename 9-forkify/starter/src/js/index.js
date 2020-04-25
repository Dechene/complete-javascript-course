import Search from "./models/Search";
import Recipe from "./models/Recipe.js";

import * as searchView from "./views/searchView";
import * as recipeView from "./views/recipeView";
import { elements, renderLoader, clearLoader } from "./views/base";

/* Global state of the app
    - Search Object
    - Current recipe object
    - Shopping list object
    - Like recipes
 */
const state = {};

/* 

 ** SEARCH CONTROLLER

 */
const controlSearch = async () => {
  // get query from view
  const query = searchView.getInput(); //TODO
  console.log(query);

  if (query) {
    // new search object and add to state
    state.search = new Search(query);

    // prepare UI for results
    searchView.clearSearchInput();
    searchView.clearSearchResults();
    renderLoader(elements.searchResults);

    try {
      // search for recipes
      await state.search.getResults();

      // render results on UI
      clearLoader();
      searchView.renderResults(state.search.result);
    } catch (error) {
      console.log("Something went wrong with searching.");
      clearLoader();
    }
  }
};

// SEARCH button event listener
elements.searchForm.addEventListener("submit", e => {
  e.preventDefault();
  controlSearch();
});

// Previous and next listeners
elements.searchResPages.addEventListener("click", e => {
  const btn = e.target.closest(".btn-inline");
  if (btn) {
    const goToPage = parseInt(btn.dataset.goto);
    searchView.clearSearchResults();
    searchView.renderResults(state.search.result, goToPage);
  }
});

/* 

 ** RECIPE CONTROLLER

 */
const controlRecipe = async () => {
  // get the hash id from the url
  const id = window.location.hash.replace("#", "");

  if (id) {
    // prepare ui for chnages
    recipeView.clearRecipe();
    renderLoader(elements.recipe);

    // create a new recipe object
    state.recipe = new Recipe(id);

    try {
      // get recipe dataset
      await state.recipe.getRecipe();
      state.recipe.parseIngredients();

      // calc Time and Serving functions
      state.recipe.calcTime();
      state.recipe.calcServings();

      // render recipe
      clearLoader();
      recipeView.renderRecipe(state.recipe);

      console.log(state.recipe);
    } catch (error) {
      console.log(error);
      alert(`Error processing recipe :( `);
    }
  }
};

["hashchange", "load"].forEach(event =>
  window.addEventListener(event, controlRecipe)
);
