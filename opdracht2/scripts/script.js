// GLOBAL VARIABLES
// (GET HTML ELEMENTS)
var sectionNumbers = document.querySelector("section:first-of-type");
var headingTitle = document.querySelector("section:first-of-type h1");
var instructionText = document.querySelector("section:first-of-type h2");
var bingoBall = document.querySelector("section:first-of-type h3");
var buttonNewBall = document.querySelector("section:first-of-type button");

// Create array from the children of the previousnumbers ul
var previousNumbers = Array.from(document.querySelector("section:first-of-type ul").children);

// Create array from the children of the bingocards ul
var cardUl = document.querySelector("aside ul");

var myCardsTab = document.querySelector("aside");
var myCardsTitle = document.querySelector("aside h2");
var cardInstruction = document.querySelector("p");
var buttonAddCard = document.querySelector("aside button");

// Global array will store all previously rolled numbers
var numbersArr = [];

// Selecting all bingo number squares with querySelectorAll
var squares = document.querySelectorAll("table tr td");





// BINGOCARD FUNCTIONS
// TAB / ASIDE

// Click & swipe event for showing bingocards tab
myCardsTitle.addEventListener("click", showMyCardsTab, false);
// To do: Swipe event here


function showMyCardsTab() {
    // Show full list of bingocards in screen (move with class -> transform: translateY())
    myCardsTab.classList.toggle("showList");
    sectionNumbers.classList.toggle("moveUp");
}

// Click on button to add bingo card
buttonAddCard.addEventListener("click", addCard, false);

// Add bingocard to list in aside
function addCard() {
    // Select template from HTML document
    var cardTemplate = document.querySelector("template"); 
    // Use cloneNode to clone template of li HTML
    var card = cardTemplate.content.cloneNode(true);
    fillCard(card); // Run function to fill card with numbers
    cardUl.appendChild(card); // Add list item template

    // Remove text that says you dont have cards
    cardInstruction.classList.add("hide");

    // Set max. cards to 4. If max is reached, hide add button
    if (cardUl.children.length == 5) {
        buttonAddCard.classList.add("hide");
    }
}

// Fill HTML table with numbers from generateBingoCard()
function fillCard(card) {
    // Define var columns with values of generateBingoCard
    var columns = generateBingoCard();

    // For loop runs 5 times: for each column of the card
    for (var i = 0; i < 5; i++) {
        // Select columns from card by using selector :nth-of-type(i+1), because nth-of-type starts at value 1
        var column = card.querySelectorAll("tr td:nth-of-type(" + (i + 1) + ")" )
        
        // For loop runs 5 times: for each square of each column
        for (var j = 0; j < 5; j++) {
            var square = column[j];

            // Only change the squares that are empty, so FREE square does not change
            if (square.textContent == "") {
                square.textContent = columns[i][j];
            }

            // Add eventlistener to squares to addStamp()
            square.addEventListener("click", addStamp, false);
        }
    }
}

function addStamp() {
    this.classList.toggle("stamp"); // Square that is clicked will toggle class on or off
}


// Generate a number between a min & max value
function generateNumberBetween(min, max) {
    var randomNumber = Math.random(); // Generate number between 0 (inclusive) and 1 (not inclusive)
    // Number is split in two: a constant min part and a random part from 0 to max-min inclusive Minus 1 is needed to make min and max inclusive
    randomNumber = min + Math.floor(randomNumber * (max - min + 1));  
    return randomNumber;
}

// Generates numbers for columns in bingo card 
function generateBingoCard() {
    // Create an array for the 5 columns of the card
    var columns = [];

    // For loop runs 5 times for all columns
    for (var i = 0; i < 5; i++) {
        // Var column is filled with 5 values, for the 5 squares inside each column
        var column = [];
        
        // Define min & max with default values, overwriting them in coming conditional statement
        var min = 0
        var max = 0

        // If statement checks nth time the loop runs: aka in which column of 5 (BINGO) we are currently
        // Conditions are set for generateNumberBetween for each column
        if (i == 0) {
            min = 1; max = 15
        } else if (i == 1) {
            min = 16; max = 30
        } else if (i == 2) {
            min = 31; max = 45
        } else if (i == 3) {
            min = 46; max = 60
        } else if (i == 4) {
            min = 61; max = 75
        }

        // Define random number
        for (var j = 0; j < 5; j++) {
            var randomNumber 
            do { // Run code block at least once, then check condition
                randomNumber = generateNumberBetween(min, max);
            } while (column.includes(randomNumber)) // While condition is true, run code block

            column[j] = randomNumber;
        }
        
        // Fill columns array with column
        columns[i] = column;
    }
    return columns;
}




// NUMBERBALL FUNCTIONS
// SECTION 

// Click on button to generate new bingo number ball
buttonNewBall.addEventListener("click", updateBall, false);

// Generating random number for number ball
function newBall() {
    var randomNumber = generateNumberBetween(1, 75);
    
    // Check in numbersArr for duplicate: if it includes it, call function again
    if (numbersArr.includes(randomNumber)) {
        return newBall();
    }
    // Push randomNumber into Array
    numbersArr.push(randomNumber);
    // Return the right number that isn't a duplicate
    return randomNumber;
}

// Function updateBall makes function newBall generate an unique number between 1-75
function updateBall() {
    // Remove & add class '.roll' so every new click resets CSS animation
    bingoBall.classList.remove("roll");
    bingoBall.offsetWidth; // This is a hack.. I've tried conditional statements & different orders
    bingoBall.classList.add("roll");

    bingoBall.textContent = newBall(); // Textcontent is updated with returned random number
   
    updateBallList() // Every time we update the ball, ballList of previous numbers is updated
}

function updateBallList() {
    // For loop runs previousNumbers.length times, updates numbers from last to fifth-last
    for (var i = 0; i < previousNumbers.length; i++) {
        var liElement = previousNumbers[i]; // Select individual li element(s)

        var numberRolled = numbersArr[numbersArr.length - (1 + i)]; // length - (1 + i) because we want the most recent one after the second-, third-, etc. last

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

