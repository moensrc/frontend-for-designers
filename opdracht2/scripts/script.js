// GLOBAL VARIABLES
// (GET HTML ELEMENTS)
var headingTitle = document.querySelector("section h1");
var instructionText = document.querySelector("section h2");
var bingoBall = document.querySelector("section h3");
var buttonNewBall = document.querySelector("section button");

// Create an array from the children of the previousnumbers ul, all li elements are placed in the array
var previousNumbers = Array.from(document.querySelector("section ul").children);

var myCards = document.querySelector("aside");
var myCardsTitle = document.querySelector("aside h2");
var buttonAddCard = document.querySelector("aside button");

var bingoCard1 = document.querySelector("table:first-of-type");
var bingoCard2 = document.querySelector("table:nth-of-type(2)");

// Global array will store all previously rolled numbers
var numbersArr = [];

// Selecting all bingo number squares with querySelectorAll
var square = document.querySelectorAll("table tr td");




// BINGOCARD FUNCTIONS
// TAB / ASIDE

// Click & swipe event for showing bingocards tab
myCardsTitle.addEventListener("click", showMyCards, false);
// Swipe event here



function showMyCards() {
    // Show full list of bingocards in screen (move with class -> transform: translateY())
    myCards.classList.toggle("showList");

    headingTitle.classList.toggle("hide");
    instructionText.classList.toggle("hide");
    bingoBall.classList.toggle("hide");
    buttonNewBall.classList.toggle("hide");
}


// All squares listen to click event
[].forEach.call(square, el => {
    el.addEventListener("click", addStamp, false);
  }
);

function addStamp() {
    this.classList.toggle("stamp"); // Square that is clicked will toggle class on or off
}




// NUMBERBALL FUNCTIONS
// SECTION 

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
    // For loop runs previousNumbers.length times, updates numbers from last to fifth-last
    for (var i = 0; i < previousNumbers.length; i++) {
        const liElement = previousNumbers[i]; // Select individual li element(s)

        const numberRolled = numbersArr[numbersArr.length - (1 + i)]; // length - (1 + i) because we want the most recent one after the second-, third-, etc. last

        liElement.textContent = numberRolled; // update balls with the numberRolled relevant to the array
        
        // Conditional statement: if li has no content, add class .hide
        if (numberRolled === undefined) {
            liElement.classList.add("hide");
            // instructionText.textContent = "Rol je eerste balletje!";
        } else {
            liElement.classList.remove("hide");
            // instructionText.textContent = "Rol een nieuw balletje!";
        }
       
    }
}

updateBallList() // Call function updateBallList once on reload, so it hides li ballList

