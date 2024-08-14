"use strict";

const input = document.querySelector(".input");
const clearBtn = document.querySelector(".clear");
const keys = document.querySelectorAll(".bottom span");
let result;
let answer;
let operation = "";
let decimalAdded = false;

const operators = ["+", "-", "x", "÷"];

function handleKeyPress(e) {
  const key = e.target.dataset.key;
  const lastChar = operation[operation.length - 1];

  if (key === "=") {
    return;
  }

  if (key === "." && decimalAdded) {
    return;
  }

  if (operators.indexOf(key) !== -1) {
    decimalAdded = false;
  }

  if (operation.length === 0 && key === "-") {
    operation += key;
    input.innerHTML = operation;
    return;
  }

  if (operation.length === 0 && operators.indexOf(key) !== -1) {
    input.innerHTML = operation;
    return;
  }

  if (operators.indexOf(lastChar) !== -1 && operators.indexOf(key) !== -1) {
    operation = operation.replace(/.$/, key);
    input.innerHTML = operation;
    return;
  }

  if (key) {
    if (key === ".") decimalAdded = true;
    operation += key;
    input.innerHTML = operation;
    return;
  }
}

function evaluate(e) {
  const key = e.target.dataset.key;
  const lastChar = operation[operation.length - 1];

  if (key === "=" && operators.indexOf(lastChar) !== -1) {
    operation = operation.slice(0, -1);
  }

  if (operation.length === 0) {
    answer = "";
    result = answer;
    return;
  }

  try {

    const final = operation.replace(/x/g, "*").replace(/÷/g, "/");

    // Handle division by zero
    if (final.includes("/0")) {
      answer = "undefined";
    } else {
      answer = eval(final); // Evaluate the mathematical expression
    }

    if (key === "=") {
      decimalAdded = false;
      operation = `${answer}`;
      if (answer === "undefined") {
        result= answer;
      } else {
        result= "";
      }
      input.innerHTML = operation;
      return;
    }

    result= answer;
  } catch (e) {
    if (key === "=") {
      decimalAdded = false;
      // input.innerHTML = `<span class="error">${operation}</span>`;
      input.innerHTML = `<span class="error">Bad Expression</span>`;
    }
    console.log(e);
  }
}

function clearInput() {
  operation = "";
  answer = "";
  input.innerHTML = operation;
  result= answer;
  let decimalAdded = false;
}

clearBtn.addEventListener("click", clearInput);
keys.forEach((key) => {
  key.addEventListener("click", handleKeyPress);
  key.addEventListener("click", evaluate);
});

