"use strict";

const mainSection = document.querySelector("main");
const form = document.querySelector(".form");
const overview = document.querySelector(".recipe-overview");
const inputTitle = document.querySelector("#title");
const inputTime = document.querySelector("#time");
const inputKind = document.querySelector("#kind");
const inputWoke = document.querySelector("#woke");
const inputIngredients = document.querySelector("#ingredients");
const inputPrep = document.querySelector("#prep");
const toggleFormButton = document.querySelector(".toggle-form");
const searchInput = document.querySelector("[data-search]");

class Recipe {
  date = new Date();
  constructor(title, time, kind, woke, ingredients, prep) {
    this.title = title;
    this.time = time;
    this.kind = kind;
    this.woke = woke;
    this.ingredients = ingredients;
    this.prep = prep;
  }
}

class Library {
  recipeLibrary = [];

  constructor() {
    form.addEventListener("submit", this.newRecipe.bind(this));

    this.getLocalStorage();
  }

  newRecipe(e) {
    e.preventDefault();

    const title = inputTitle.value;
    const time = inputTime.value;
    const kind = inputKind.value;
    const woke = inputWoke.value;
    const ingredients = inputIngredients.value;
    const prep = inputPrep.value;

    let recipe;
    recipe = new Recipe(title, time, kind, woke, ingredients, prep);

    this.recipeLibrary.push(recipe);
  }

  renderRecipe(recipe) {
    let ingredientsFormatted = function () {
      let ingr = recipe.ingredients;
      return ingr.replaceAll("; ", "<br>");
    };

    let prepFormatted = function () {
      let prepForm = recipe.prep;
      let finalPrep = [];

      prepForm.split("; ").forEach((element, index) => {
        finalPrep.push(`${index + 1}. ${element}`);
      });

      return finalPrep.join("<br>");
    };
    let html = `
      <div class="recipe-div">
          <h3 class="title">${recipe.title}</h3>
          <h3 class="time">${recipe.time}</h3>
      </div>
      <card class="content">
          <p class="ingr">Ingredients</p>
              <div class="content-item">${ingredientsFormatted(
                recipe.ingredients
              )}</div>
          <p class="prep">Preparation</p>
              <div class="content-item">${prepFormatted(recipe.prep)}</div>
      </card>
      `;

    overview.insertAdjacentHTML("afterbegin", html);

    let coll = document.querySelector(".recipe-div");
    coll.addEventListener("click", this.openRecipe.bind(this));
  }

  setLocalStorage() {
    localStorage.setItem("recipes", JSON.stringify(this.recipeLibrary));
  }

  getLocalStorage() {
    const data = JSON.parse(localStorage.getItem("recipes"));

    if (!data) return;

    this.recipeLibrary = data;

    this.recipeLibrary.forEach((rec) => {
      this.renderRecipe(rec);
    });
  }

  openRecipe(e) {
    let recipeDiv = e.target.closest(".recipe-div");
    let content = e.target.closest(".recipe-div").nextElementSibling;
    recipeDiv.classList.toggle("active");
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  }
}

function showHideForm() {
  form.classList.toggle("hidden");
  toggleFormButton.textContent =
    toggleFormButton.textContent === "Add a new recipe"
      ? "Hide form"
      : "Add a new recipe";
}

toggleFormButton.addEventListener("click", showHideForm);

const library = new Library();
