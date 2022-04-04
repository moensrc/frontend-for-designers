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
var cardInstruction = document.querySelector("aside p");
var buttonAddCard = document.querySelector("aside button");

// Setup for swipe-event library
const { SwipeEventListener } = window.SwipeEventListener;

// Global array will store all previously rolled numbers
var numbersArr = [];





// NUMBERBALL FUNCTIONS
// SECTION 

// Click on button to generate new bingo number ball
buttonNewBall.addEventListener("click", updateBall, false);
// Or double click on bingo ball to generate new bingo number ball
bingoBall.addEventListener("dblclick", updateBall, false);

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
    // For loop runs previousNumbers.length times, updates numbers from last to fifth-last, if you add n amount of li's in html, function will run n amount of times.
    for (var i = 0; i < previousNumbers.length; i++) {
        var liElement = previousNumbers[i]; // Select individual li element(s) from array

        var numberRolled = numbersArr[numbersArr.length - (1 + i)]; // Length - (1 + i) because we want the most recent one after the second-, third-, etc. last

        liElement.textContent = numberRolled; // Update balls with the numberRolled relevant to the array

        // Conditional statement: if li has no content, add class .hide
        if (numberRolled === undefined) {
            liElement.classList.add("hide");
        } else {
            liElement.classList.remove("hide");
            instructionText.textContent = "Rol een nieuw balletje!";
        } 
    }
}

updateBallList() // Call function updateBallList once on reload, so it hides li ballList by default





// BINGOCARD FUNCTIONS
// TAB / ASIDE

// Click & swipe event for showing bingocards tab
myCardsTitle.addEventListener("click", toggleMyCardsTab, false);

// Swipe-event Library https://www.npmjs.com/package/swipe-event-listener 
const { swipeArea, updateOptions } = SwipeEventListener({
    swipeArea: document.querySelector("aside")
  });

swipeArea.addEventListener("swipeUp", showMyCardsTab);
swipeArea.addEventListener("swipeDown", hideMyCardsTab);


function toggleMyCardsTab() {
    // Show full list of bingocards in screen (move with class -> transform: translateY())
    myCardsTab.classList.toggle("showList");
    sectionNumbers.classList.toggle("moveUp");
}

// When swipe up in Aside
function showMyCardsTab() {
    myCardsTab.classList.add("showList");
    sectionNumbers.classList.add("moveUp");
}

// When swipe down in Aside
function hideMyCardsTab() {
    myCardsTab.classList.remove("showList");
    sectionNumbers.classList.remove("moveUp");
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

    cardUl.appendChild(card); // Add list item template to ul

    // Remove text that says you dont have cards with class
    cardInstruction.classList.add("hide");

    myCardsTitle.textContent = "Mijn Bingokaarten (" + (cardUl.children.length - 1) + ")";
    // Set max. cards to 4. If max is reached, hide add button with class
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
        // Select columns from card by using selector :nth-of-type(i+1), because nth-of-type starts at value 1 (Column number equals i+1)
        var column = card.querySelectorAll("tr td:nth-of-type(" + (i + 1) + ")" )
        
        // For loop runs 5 times: for each 5 squares of each column
        for (var j = 0; j < 5; j++) {
            var square = column[j];

            // Only change the squares that are empty, so FREE square does not change
            if (square.textContent == "") {
                square.textContent = columns[i][j];
            }

            // Add click eventlistener to squares to addStamp()
            square.addEventListener("click", toggleStamp, false);    

            // Add eventlistener for Enter key (with tabindex in html) squares to addStamp()
            square.addEventListener("keydown", function (event) {
                if (event.key === "Enter") {
                    this.classList.toggle("stamp");
                }
            });
        }
    }
}


function toggleStamp() {
    this.classList.toggle("stamp"); // Square that is clicked will toggle class on or off

    // Whenever user adds stamp, listen for Bingo! (Could be in a different spot maybe?)
    listen();
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
    // console.log(columns);
    return columns;
}





// BINGO CONFETTI
// SECTION
// Functions to listen for BINGO!
/* https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API/Using_the_Web_Speech_API */

// for Chrome
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

// Commands for speech
var commandos = ["bingo"];
var grammar = '#JSGF V1.0; grammar commandos; public <commando> = ' + commandos.join(' | ') + ' ;'

// Define speech recognition instance 
var recognition = new SpeechRecognition();
var speechRecognitionList = new SpeechGrammarList();

speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
recognition.continuous = true;
recognition.lang = 'en';
recognition.interimResults = true;
recognition.maxAlternatives = 1;

// Handle command
function handleSpeech(event) {
  var confettiScreen = document.querySelector("section:nth-of-type(2)");
  var last = event.results.length - 1;
  var commando = event.results[last][0].transcript;
//   console.log('Result received: ' + commando + '. ' + 'Confidence: ' + event.results[0][0].confidence);

// If the command == Bingo, add confetti
  if (commando.trim() == "bingo") {
    confettiScreen.classList.add("confetti");
  } 
}

function listen(){
   recognition.start();
   console.log('Ready to receive a command.');
}

recognition.onresult = function(event) {
   handleSpeech(event);
}
