import Search from "./models/Search";
import Recipe from "./models/Recipe";
import List from "./models/List";
import Likes from "./models/Likes";

import * as searchView from "./views/searchView";
import * as recipeView from "./views/recipeView";
import * as listView from "./views/listView";
import * as likesView from "./views/likesView";
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
    if (state.search) searchView.highlightSelected(id);

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
      recipeView.renderRecipe(state.recipe, state.likes.isLiked(id));
    } catch (error) {
      console.log(error);
      alert(`Error processing recipe :( `);
    }
  }
};

["hashchange", "load"].forEach(event =>
  window.addEventListener(event, controlRecipe)
);

/*
 **
 ** LIST CONTROLLER
 **
 */
const controlList = () => {
  // create a new list if there is none so far
  if (!state.list) state.list = new List();

  // add each ingredient to the list
  state.recipe.ingredients.forEach(el => {
    const item = state.list.addItem(el.count, el.unit, el.ingredient);
    listView.renderItem(item);
  });
};

// Handle Item Delete and Update events
elements.shopping.addEventListener("click", e => {
  const id = e.target.closest(".shopping__item").dataset.itemid;

  if (e.target.matches(".shopping__delete, .shopping__delete *")) {
    // delete from state
    state.list.deleteItem(id);

    // delete from UI
    listView.deleteItem(id);

    // Update the count in shopping list item
  } else if (e.target.matches(".shopping__count-value")) {
    const val = parseFloat(e.target.value, 10);
    state.list.updateCount(id, val);
  }
});

/*
 **
 ** LIKES CONTROLLER
 **
 */

const controlLike = () => {
  if (!state.likes) state.likes = new Likes();
  const currentID = state.recipe.id;
  if (!state.likes.isLiked(currentID)) {
    // add like to state
    const newLike = state.likes.addLike(
      currentID,
      state.recipe.title,
      state.recipe.author,
      state.recipe.img
    );
    // toggle the like button
    likesView.toggleLike(true);

    // add like to UI list
    likesView.renderLike(newLike);
  } else {
    // remove like from state
    state.likes.deleteLike(currentID);
    // toggle the like button
    likesView.toggleLike(false);

    // remove like from UI
    likesView.deleteLike(currentID);
  }

  likesView.toggleLikeMenu(state.likes.getNumLikes());
};

// page load eventhandle, getthe likes from storage
window.addEventListener("load", () => {
  state.likes = new Likes();

  // restore likes from cache
  state.likes.readStorage();

  // toggle the like menu button on / off
  likesView.toggleLikeMenu(state.likes.getNumLikes());

  // render the current likes
  state.likes.likes.forEach(like => likesView.renderLike(like));
});

// handling recipe serving buttons
elements.recipe.addEventListener("click", e => {
  // match the button decrease, or any child of it
  if (e.target.matches(".btn-decrease, .btn-decrease *")) {
    if (state.recipe.servings > 1) {
      state.recipe.updateServings("dec");
      recipeView.updateServingsIngredients(state.recipe);
    }
  } else if (e.target.matches(".btn-increase, .btn-increase *")) {
    if (state.recipe.servings < 20) {
      state.recipe.updateServings("inc");
      recipeView.updateServingsIngredients(state.recipe);
    }
  } else if (e.target.matches(".recipe__btn--add, .recipe__btn--add *")) {
    // Add ingredients to shopping list
    controlList();
  } else if (e.target.matches(".recipe__love, .recipe__love *")) {
    //Like controller
    controlLike();
  }
});

