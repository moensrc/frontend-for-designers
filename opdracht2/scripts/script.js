// Get HTML elements and define as variables
var instructionText = document.querySelector("section h2");
var bingoBall = document.querySelector("section h3");
var buttonNewBall = document.querySelector("section button");

var previousNumbers = Array.from(document.querySelector("section ul").children);

var myCards = document.querySelector("aside");
var myCardsTitle = document.querySelector("aside h2");
var buttonAddCard = document.querySelector("aside button");

var bingoCard1 = document.querySelector("table:first-of-type");

// Selecting all bingo number squares with querySelectorAll
var square = document.querySelectorAll("table tr td");

// Array will store all previously rolled numbers
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
    var randomNumber = Math.random(); // Generate number between 0 (inclusive) and 1 (not inclusive)
    randomNumber = Math.floor(randomNumber * 75 + 1); // Multiplies by (range + 1) to add 1. Rounds off to bottom
    

    // Check in numbersArr for duplicate: if it includes it, call function again
    if (numbersArr.includes(randomNumber)) {
        return newNumber()
    } 
    // Push number into Array
    numbersArr.push(randomNumber);
    // Return the right number that isn't a duplicate
    return randomNumber;
}

// Function updateBall makes function newNumber generate an unique number between 1-75
function updateBall() {
    bingoBall.textContent = newNumber(); // Textcontent is updated with returned random number
    updateBallList() // Every time we update the ball, ballList of previous numbers is updated

    // Remove & add class '.roll' so every new click resets CSS animation 
    bingoBall.classList.remove("roll");
    bingoBall.offsetWidth;
    bingoBall.classList.add("roll");
}

function updateBallList() {
    for (let i = 0; i < previousNumbers.length; i++) {
        const liElement = previousNumbers[i];

        const numberRolled = numbersArr[numbersArr.length - (1 + i)];

        liElement.textContent = numberRolled;
        
        // Conditional statement: if li has no content, add class .hide
        if (numberRolled === undefined) {
            liElement.classList.add("hide");
        } else {
            liElement.classList.remove("hide");
        }
       
    }
}

updateBallList() // Call function updateBallList on reload, so it hides li balls