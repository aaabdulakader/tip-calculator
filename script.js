// Select relevant HTML elements
const billAmt = document.querySelector(".billAmt")
let tipEl = document.querySelector(".tip"); 
const custom = document.querySelector(".custom");
const tipPer = document.querySelectorAll(".btn");
let tipBox  = document.querySelector(".tip-box");
let numOfpeople = document.querySelector(".nop");
let reset = document.querySelector(".reset"); 
let totalPerPerson = document.querySelector(".total"); 
let error = document.querySelector(".error");

// Set initial values for tip and total per person displays
tipEl.innerHTML = "$0.00";
totalPerPerson.innerHTML = "$0.00";

// Get the initial value of the bill amount
let bill = +billAmt.value;

// Update the bill variable when the user inputs a new bill amount
billAmt.addEventListener("input", (e) => { 
  e.preventDefault();
  bill = +billAmt.value;
});

// Update the tip variable and display when the user clicks a tip percentage button
let tip;
  tipBox.addEventListener("click", (e) => {
  e.preventDefault();
  // Add "active" class to clicked button and remove it from all others
  e.target.classList.contains("custom") ? "" : e.target.classList.add("active");
  for (let i = 0; i < tipPer.length; i++) {
    if (tipPer[i] !== e.target) { 
      tipPer[i].classList.remove("active");
    }
  }
  custom.value = "";
  tip = (bill * e.target.value) 
  calculateTip();
});

// Update the tip variable and display when the user inputs a custom tip percentage
custom.addEventListener("input", (e) => {
  e.preventDefault(); 
  tip = (bill * (e.target.value / 100));
  +tip;
  calculateTip();
});

// Calculate and display the tip and total per person when the user inputs a number of people
numOfpeople.addEventListener("input", (e) => { 
  e.preventDefault();

  if (numOfpeople.value == 0 && numOfpeople.value !== "") {
  // Display error message and change input field outline to red if number of people is 0 or empty
  tipEl.innerHTML = "$0.00"
  totalPerPerson.innerHTML = "$0.00";
    error.style.display = "block";
    numOfpeople.style.outline = "2px solid red";

  } else if (numOfpeople.value > 0 || numOfpeople.value == "") {
    // Calculate and display tip and total per person if number of people is greater than 0 or empty
    error.style.display = "none";
    numOfpeople.style.outline = "2px solid var(--strongcyan)";
    calculateTip();
  }
});

// Calculate and display the tip and total per person

let calculateTip = () => {
  // if tip is undefined, set it to 0
  tip === undefined ? tip = 0 : tip;

  // calculate the tip amount per person and round to 2 decimal places
  tipEl.innerHTML = numOfpeople.value === "" ?"$"+ tip : "$"+ Math.floor(tip / +numOfpeople.value * 100) / 100;

  // calculate the total amount per person and round to 2 decimal places
  let totalPer = numOfpeople.value === "" ? (bill + tip ) : ((bill + tip ) / +numOfpeople.value);
  totalPerPerson.innerHTML = "$"+ Math.round(totalPer * 100) / 100;
}

// event listener for the reset button
reset.addEventListener("click", (e) => {
  e.preventDefault();

  // reset all fields to their default values
  billAmt.value = "";
  tipEl.innerHTML = "$0.00"
  totalPerPerson.innerHTML = "$0.00";
  custom.value = "";
  numOfpeople.value = "";
  error.style.display = "none";
  numOfpeople.style.outline = "2px solid var(--strongcyan)";
});
