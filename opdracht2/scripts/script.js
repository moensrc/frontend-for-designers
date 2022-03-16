// Get HTML elements and define as variables
var instructionText = document.querySelector("section h2");
var bingoBall = document.querySelector("section h3");
var buttonNewBall = document.querySelector("section button");

var myCards = document.querySelector("aside");
var myCardsTitle = document.querySelector("aside h2");
var buttonAddCard = document.querySelector("aside button");

var bingoCard1 = document.querySelector("table:first-of-type");

// Selecting all bingo number squares with querySelectorAll
var square = document.querySelectorAll("table tr td");

var numbersArr = [];



// Click & swipe event for showing bingocards tab
myCardsTitle.addEventListener("click", showMyCards, false);
// swipe event


function showMyCards() {
    myCards.classList.toggle("showList");
}


// All squares listen to click event
[].forEach.call(square, el => {
    el.addEventListener("click", addStamp, false)
  });

function addStamp() {
    this.classList.toggle("stamp"); // Square that is clicked, will toggle class on or off
}


// Click on button to generate new bingo number ball
buttonNewBall.addEventListener("click", updateBall, false);


// Generating random number for number ball
function newNumber() {
    var randomNumber = Math.random(); // Generate number between 0 and 1
    randomNumber = Math.floor(randomNumber * 74 + 1); // Multiplies by (range-1) to add 1. Rounds off to bottom
        
    // Check in numbersArr for duplicate (push the right ones)


    // Return the right number that isn't a duplicate
    return randomNumber;
}

function updateBall() {
    bingoBall.textContent = newNumber();
    // bingoBall.classList.add("roll");
}
