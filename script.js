"use strict";

const mainSection = document.querySelector("main");
const form = document.querySelector(".form");
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
}
