'use strict';

//create constants to store the to-be generated words in the game, as well as the game elements like the time and amount of words displayed
const GLOBAL_WORDS = 'in one good real school set they state high life consider and not come what also for point can want as while with of order child about thing never hold find each too between program work end home place around problem begin interest public where see time increase give think seem small both another same eye way who into again fact than under head become real possible write know however late because nation change form world run more open large turn over still old take need line leave number part against great first help year long without new people may use like never since show general will few out might ask feel right system stand say move lead after face must go play little should become house present develop govern mean follow possible'.trim().split(' ');
const GAME_TIME = 30000;
const WORD_BATCH = 50;


//reference to all HTML elements within the index
const DIV_GAME = document.getElementById('game');
const DIV_WORDS = document.getElementById('words');
const DIV_CURSOR = document.getElementById('cursor');
const DIV_INFO = document.getElementById('info');


//create variables to store data from the player and the game
let startTime = null;
let timer = null;
let totalTyped = 0;
let correctTyped = 0;
let scrollOffset = 0;
let cursorQueued = false;
let gameActive = false;

//returns a random word from the array of words
function randomWord(){
  //create a temporary variable to generate a random number to be the index of the array to be returned
  let index = Math.floor(Math.random() * GLOBAL_WORDS.length);

  //return the element of the index number from the array of words
  return GLOBAL_WORDS[index];
}

//formats the word by adding it into a div in the HTML and splitting the word into individual letters
function formatWord(word){
  //create a temporary variable to store the letters of the word passed through into the function, seperated
  let lettersOfWord = word.split('');
  //create a new variable to store the HTML to be displayed in the div of the game
  let newHtml = '<div class="word" data-state="pending">';

  //iterate through a loop for the amount of letters to input the word into the div
  for (let i = 0; i < lettersOfWord.length; i++) {
    newHtml += '<span class="letter">' + lettersOfWord[i] + '</span>';
  }

  //add the ending tag of the div
  newHtml += '</div>';

  //return the new HTMl to be added into the div
  return newHtml;
}

//add a certain amount of words to the div in the HTML whenever a new line of to-be typed words occurs
function addWords(numberOfWords = WORD_BATCH){
  //create a temporary local variable to store the to be inserted HTML
  let editHtml = '';
  
  //iterate a certain amount of times, according to the parameter value passed through, adding a random word in format to the local variable
  for (let i = 0; i < numberOfWords; i++){
    editHtml += formatWord(randomWord());
  }

  //inserts the final HTML in adjacent to what the div stores
  DIV_WORDS.innerHTML += editHtml;
}

//removes the "current" class from all letter elements
function clearCurrentLetters(){
  //create a temporary variable to select all letter elements that currently have the current class
  let lettersOfWord = document.querySelectorAll('.letter.current');

  //loop through each selected letter
  for (let i = 0; i < lettersOfWord.length; i++){

    //removes the "current" class from the letter
    lettersOfWord[i].classList.remove('current');
  }
}

//removes the "current" class from all word elements
function clearCurrentWords(){

  //create a temporary variable to store the current word elements with the "current" class
  let wordsInGame = document.querySelectorAll('.word.current');

  //loops through each selected word
  for (let i = 0; i < wordsInGame.length; i++){
    //removes the "current" class from this word
    wordsInGame[i].classList.remove('current');
  }
}

// clears all current highlights before updating cursor position
function clearAllCurrent(){

  //removes the "current" class from all letters and words
  clearCurrentLetters();
  clearCurrentWords();
}

//queues a smooth cursor update using the browser's animation frame
function runCursorUpdate(){

  //update the cursor's visual pattern
  updateCursor();

  //allow future ursor updates to be queued again by setting the variable that tracks if the cursor is already queued to update its animation to be false
  cursorQueued = false;
}
//updates the blinking cursors position smoothly without being called multiple times
function queueCursorUpdate(){
  //checks if the cursor has already been queued, stopping the function immediately from progressing
  if (cursorQueued) return;

  //sets the boolean variable to track cursor movement to be true
  cursorQueued = true;

  //updates the cursor position using requestAnimationFrame and runCursorUpdate to make it visually smooth, avoiding rigidness
  requestAnimationFrame(runCursorUpdate);
}

//updates the cursors position in according to where the user is typing in the line of text
function updateCursor(){
  //create constants to store the current letter and word the user is on in the game
  const CURRENT_LETTER = document.querySelector('.letter.current');
  const CURRENT_WORD = document.querySelector('.word.current');

  //checks if the user is currently not on a word, rather between a word, and stops the update of the cursor immediately
  if (!CURRENT_WORD) return;

  //create constants to store the game boundaries to edit the position of the cursor
  const TARGET_ELEMENT = CURRENT_LETTER || CURRENT_WORD;
  const RECTANGLE = TARGET_ELEMENT.getBoundingClientRect();
  const GAME_RECTANGLE = DIV_GAME.getBoundingClientRect();

  //updates the cursor div in according to the position of the user in the line of text
  DIV_CURSOR.style.left =
    (CURRENT_LETTER ? RECTANGLE.left : RECTANGLE.right) - GAME_RECTANGLE.left + 'px';
  DIV_CURSOR.style.top =
    RECTANGLE.top - GAME_RECTANGLE.top + 'px';
}

//removes the top line of words once the user reaches the third line to prevent overflow
function recycleLines(){
  //create a temporary constant to get the currently active word the user is on
  const CURRENT_WORD = document.querySelector('.word.current');

  //checks if there is no word active, terminating the function immediately
  if (!CURRENT_WORD) return;

  //creates a temporary constant array to store all word elements inside the words container as an array
  const WORDS_ARRAY = new Array(DIV_WORDS.children.length);

  //iterate through the constant to store the word elements to the according index inside the array
  for (let i = 0; i < DIV_WORDS.children.length; i++) {
    WORDS_ARRAY[i] = DIV_WORDS.children[i];
  }

  //checks if there are few too words, thus doing nothing and terminating the function immediately
  if (WORDS_ARRAY.length < 10) return;

  //create a temporary constant, acting as an object to group words by their vertical position
  const LINE_MAP = {};

  //iterate through each word and group them by their top offset (the line the word is on in the game)
  for (let i = 0; i < WORDS_ARRAY.length; i++){
    //create temporary variables to store the ith element of the word array as well as the offset of that word
    let wordInIndex = WORDS_ARRAY[i];
    let wordPosition = wordInIndex.offsetTop;

    //checks if the line of words does not exist yet, creating an empty array for it
    if (!LINE_MAP[wordPosition]){
      LINE_MAP[wordPosition] = [];
    }

    //store the current length of the array in a variable
    let index = LINE_MAP[wordPosition].length;

    //manually add the word to the array
    LINE_MAP[wordPosition][index] = wordInIndex;
  }

  //create a temporary constant to store every unique vertical position of lines
  const LINE_POSITION = [];

  //iterate through each line stored in LINE_MAP
  for (let POSITION in LINE_MAP){
    //convert the position key from string to number stored in a variable
    let positionNumber = Number(POSITION);

    //store the current length of the array in a variable
    let index = LINE_POSITION.length;

    //manually insert the position into the array
    LINE_POSITION[index] = positionNumber;
  }

  //manually sort the line positions from top to bottom (ascending order)
  for (let i = 0; i < LINE_POSITION.length - 1; i++){

    //nested loop starts at the element after 1
    for (let j = i + 1; j < LINE_POSITION.length; j++){
      //swap values if they are out of order
      if (LINE_POSITION[i] > LINE_POSITION[j]){

        //store the current value temporarily in a variable
        let temporaryValue = LINE_POSITION[i];

        //replace the current value with the smaller value
        LINE_POSITION[i] = LINE_POSITION[j];

        //put the larger value into the later position
        LINE_POSITION[j] = temporaryValue;
      }
    }
  }

  //checks if there are less than 3 lines that exist, only proceeding past this if-statement if there are 3 or more lines to avoid deleting lines too early
  if (LINE_POSITION.length < 3) return;

  //create temporary constants to store the vertical position of the first and third lines for later reference
  const FIRST_LINE_POSITION = LINE_POSITION[0];
  const THIRD_LINE_POSITION = LINE_POSITION[2];

  //checks if the user has reached the third line, only proceeding to remove the first line once it is, if not terminating the function
  if (CURRENT_WORD.offsetTop != THIRD_LINE_POSITION) return;

  //remove every word in the topmost line by iterating through the array created to store the first line's words, removing the child
  for (let i = 0; i < LINE_MAP[FIRST_LINE_POSITION].length; i++){
    //create a temporary variable to store the word of the ith word in the array
    let wordInIndex = LINE_MAP[FIRST_LINE_POSITION][i];

    //removes the word in the div storing all the words displayed on the screen
    DIV_WORDS.removeChild(wordInIndex);
  }
}

//reset all game data and create a new game, generating a new batch of words and resetting the timer for the user
function newGame(){
  //clears any current timer running from previous games, and the remaining time
  clearInterval(timer);
  timer = null;

  //clear all words from the screen inside the div
  DIV_WORDS.innerHTML = '';

  //reset scrolling and timing variables' data
  scrollOffset = 0;
  startTime = null;

  //reset typing statistics
  totalTyped = 0;
  correctTyped = 0;

  //enables typing
  gameActive = true;

  //add an initial batch of words, with additional words being added for smoother scrolling
  addWords(WORD_BATCH * 2);

  //clear any remaining indicators from previous games
  clearAllCurrent();

  //create a temporary variable to reference the first word from the HTML
  let firstWord = document.querySelector('.word');

  //sets the very first word and letter as active
  firstWord.classList.add('current');
  firstWord.firstChild.classList.add('current');

  //resets the timer display
  DIV_INFO.textContent = '30';

  //focus the game div so it recieves keyboard input
  DIV_GAME.focus();

  //position the cursor correctly
  updateCursor();
}

//ends the game, stops the timer, and displays results
function gameOver(){
  //stop the countdown timer
  clearInterval(timer);

  //sets the timer variable back to null saying that there is no active timer
  timer = null;
  //disables typing
  gameActive = false;

  //create temporary variables to calculate the words per minute typed and the accuracy of the user
  let elapsedTime = GAME_TIME / 60000;
  let wordsPerMinute = Math.round((correctTyped / 5) / elapsedTime);
  let accuracyTyped = totalTyped ? Math.round((correctTyped / totalTyped) * 100) : 100;

  //displays the final statistics to the user
  DIV_INFO.innerText = 'WPM: ' + wordsPerMinute + ' |  Acc: ' + accuracyTyped + '%';
}



//checks whether a letter has already been typed by the user
//a letter is considered typed if it is marked correct or incorrect
function letterIsTyped(letter){
  //returns true if the letter has the class "correct" or "incorrect"
  //returns false if neither class is present
  return letter.classList.contains('correct') || letter.classList.contains('incorrect');
}

//checks whether a letter was typed correctly
function letterIsCorrect(letter){
  //returns true only if the letter has the "correct" class, used to check if the entire word is correct
  return letter.classList.contains('correct');
}

//finds the last letter in a word in an collection of letter elements in an array
function findLastLetter(letters){
  //checks if the letters collection is not empty, thus returning the last letter
  //otherwise returns null to avoid an error
  return letters.length ? letters[letters.length - 1] : null;
}

//checks whether all letters in a word are correct
function allLettersCorrect(letters){
  //iterates through every letter in the word passed into the function
  for (let i = 0; i < letters.length; i++){
    //checks if the letter is not correct, then the whole word is incorrect, returning false
    if (!letterIsCorrect(letters[i])) return false;
  }
  //if every latter passed the check, then the word is correct, returning true
  return true;
}

//mark any untyped letters as incorrect
function markIncorrectLetters(letters){
  //iterates through each letter in the word passed into the function
  for (let i = 0; i < letters.length; i++){
    //checks if the letter was never typed, devoid of a class
    if (!letters[i].classList.contains('correct') && !letters[i].classList.contains('incorrect')){
      //marks the letter as incorrect
      letters[i].classList.add('incorrect');
    }
  }
}

//updates the countdown timer display
function updateTimer(){
  //create a temporary variable to calculate the remaining time in seconds
  let remainingTime = Math.max(0, Math.round((GAME_TIME - (Date.now() - startTime)) / 1000));

  //displays the remaining time
  DIV_INFO.textContent = remainingTime;

  //checks if there is no more remaining time left in the set timer, ending the game
  if (remainingTime == 0 && timer != null) gameOver();
}

//starts the game timer
function startTimer(){
  //records the start time in according to the current time in real life, instead of using a counter to track time which can cause inefficiency
  startTime = Date.now();
  
  //updates the timer once every second
  timer = setInterval(updateTimer, 1000);
}

//handles every button pressed on the keyboard, updating the HTML based on what key is pressed
function handleKeydown(keyboardEvent){
  //checks if there is a current game active, preventing input when the game is not active, terminating the function
  if (!gameActive) return;

  //create a temporary variable to store the word being typed
  let currentWord = document.querySelector('.word.current');

  //checks if there is no active word currently being typed, terminating the function
  if (!currentWord) return;

  //create a temporary variable to get the current letter inside the word
  let currentLetter = document.querySelector('.letter.current');

  //create a temporary variable to check if the word contains extra letters
  let hasExtras = currentWord.querySelector('.extra');

  //prevents spacebar usage while typing mid-word
  if (keyboardEvent.key == ' ' && currentLetter){
    //prevents the standard action of the key when it is pressed so the program has control over the function of the key
    keyboardEvent.preventDefault();

    //terminates the function
    return;
  }

  //starts timer on the very first valid input of the game
  if (!startTime && keyboardEvent.key.length == 1 && keyboardEvent.key != ' '){
    //calls the start timer function to start the timer
    startTimer();
  }

  //checks if the input from the keyboard is a backspace
  if (keyboardEvent.key == 'Backspace'){
    //prevents the standard action of the key when it is pressed so the program has control over the function of the key
    keyboardEvent.preventDefault();

    //stores the current word the user is typing in in a temporary variable
    let currentWord = document.querySelector('.word.current');
    
    //checks if extra letters exist, deleting them first
    if (hasExtras){
      //removes the last child of all elements within currentWord, being the most recently typed extra letter
      currentWord.lastChild.remove();

      //recalculates and updates the cursor position after removing the letter
      queueCursorUpdate();

      //stops further backspace logic from running to prevent bugs
      return;
    }
    //checks if the word does not have extra letters and there is an active word being typed
    if (!hasExtras && currentWord){
      //create temporary variables to store the letters of the current word and the last letter of the group of letters
      let currentLetters = currentWord.children;
      let lastLetter = currentLetters[currentLetters.length - 1];

      //check if last letter is incorrect and extra letters exist
      if (lastLetter && lastLetter.classList.contains('incorrect')){
        //reset the visual state of the last letter
        lastLetter.classList.remove('incorrect', 'current');

        //mark it as current so cursor is correctly placed
        lastLetter.classList.add('current');

        //updates the cursor position
        queueCursorUpdate();

        //stop further backspace logic
        return;
      }
    }

    //create a boolean variable to store whether the letter has been typed or not, assuming it hasn't
    let isTyped = false;

    //create a temporary variable to store the HTMl collection of letter elements within the div of letters
    let currentWordLetters = currentWord.children;

    //iterate through the list of letters
    for (let i = 0; i < currentWordLetters.length; i++){
      //check if any letter in current word is typed
      if (letterIsTyped(currentWordLetters[i])) isTyped = true;
    }

    //check if no letter has been typed
    if (!isTyped){
      //stores the previous word in a temporary variable
      let previousWord = currentWord.previousSibling;

      //checks if there are no previous words, terminating the function
      if (!previousWord) return;

      //stores whether the previous word has extra letters typed or not
      let previousWordHasExtras = previousWord.querySelector('.extra');

      //checks if the previous word was incorrect or has extras
      if (previousWord.dataset.state == 'incorrect' || previousWordHasExtras){
        //clears all current classes from letters and words to prepare for cursor update
        clearAllCurrent();

        //change the previous word's class to be current
        previousWord.classList.add('current');

        //store the previous letters from the previous word in a temporary variable
        let previousLetters = previousWord.children;

        //store in a temporary variable the last letter to be null
        let lastLetter = null;

        //iterates in reverse through the previous word's letters to check if the letter has been typed or has extra letters
        for (let i = previousLetters.length - 1; i >= 0; i--){
          //checks if the previous letter has been typed or if the previous word contained extra letters
          if (letterIsTyped(previousLetters[i]) || previousLetters[i].classList.contains('extra')){
            //set the last letter to be the ith letter of the word
            lastLetter = previousLetters[i];
            //break from the for loop
            break;
          }
        }

        //checks if there is no last letter, exiting the function
        if (!lastLetter) return;

        //check if the last letter is an extra letter
        if (lastLetter.classList.contains('extra')){
          //remove the extra letter
          lastLetter.remove();
          //resets the last letter to find a new last letter in the future
          lastLetter = null;

          //itereates backwards to find the new last typed letter
          for (let i = previousLetters.length - 1; i >= 0; i--){
            //checks if the letter was typed
            if (letterIsTyped(previousLetters[i])){
              //sets the last letter to the last typed letter
              lastLetter = previousLetters[i];

              //breaks out of the for loop
              break;
            }
          }

          //checks if there was no typed letter found, using the first letter
          if (!lastLetter) lastLetter = previousLetters[0];
        } 
        else{
          //remove typing classes to visually reset the letter
          lastLetter.classList.remove('correct', 'incorrect');
        }

        //marks the last letter as the current active letter
        lastLetter.classList.add('current');

        //updates the cursor visually
        queueCursorUpdate();
      }

      //exits the backspace handling section
      return;
    }

    //checks if the current word has typed letters but the current letter is not filled in
    if (!currentLetter){

      //create a temporary array of the size of the amount of letters to store the letters in reversed order
      let reversedArray = new Array(currentWordLetters.length);

      //iterates through the "amount of letters" amount of times
      for (let i = 0; i < currentWordLetters.length; i++){
        //fill the array in reversed order
        reversedArray[i] = currentWordLetters[currentWordLetters.length - 1 - i];
      }

      //initialize the last typed variable
      let lastTypedLetter = null;

      //find the last typed letter in the reversed array
      for (let i = 0; i < reversedArray.length; i++){
        //checks if the letter is typed
        if (letterIsTyped(reversedArray[i])){
          //sets the last typed letter to be the current letter in the checked array
          lastTypedLetter = reversedArray[i];

          //breaks out of the for loop
          break;
        }
      }

      //checks if there was no typed letter found, terminating the function
      if (!lastTypedLetter) return;

      //resets the typing classes
      lastTypedLetter.classList.remove('correct', 'incorrect');

      //sets the cursor to be the last typed letter
      lastTypedLetter.classList.add('current');
      
      //marks the current word as active
      currentWord.classList.add('current');
    }
    else{
      //create a temporary variable to store the previous sibling of the current letter
      let previousLetter = currentLetter.previousSibling;

      //checks if there was no previous letter, terminating the function
      if (!previousLetter) return;

      //resets the typing classes
      previousLetter.classList.remove('correct', 'incorrect');

      //sets the cursor to the previous letter
      previousLetter.classList.add('current');

      //marks the current word as active
      currentWord.classList.add('current');
    }

    //updates the cursor visually
    queueCursorUpdate();

    //exists the backspace section
    return;
  }


  //checks if the keyboard button pressed has a length of one, and is not equal to the space key
  if (keyboardEvent.key.length == 1 && keyboardEvent.key != ' '){

    //increment the total typed words by one
    totalTyped++;

    //checks if there is no current letter, creating a new extra letter span
    if (!currentLetter){
      //create a temporary variable to store the new span to be added within the HTML
      let newSpan = document.createElement('span');

      //sets the typed letter
      newSpan.textContent = keyboardEvent.key;

      //marks the span as extra and incorrect
      newSpan.className = 'letter extra incorrect';

      //append to the current word
      currentWord.appendChild(newSpan);

      //updatse the cursor visually to the extra letter accordingly
      queueCursorUpdate();

      //exits the function
      return;
    }

    //checks if the typed letter matches the expected letter
    if (keyboardEvent.key == currentLetter.textContent){
      //marks the letter as correct
      currentLetter.classList.add('correct'); 
      //incrememnts the amount of correct letters typed by one
      correctTyped++;
    }
    else{
      //marks the letter as incorrect otherwise
      currentLetter.classList.add('incorrect');
    }

    //clears all current classes
    clearAllCurrent();
    //marks the current word as active
    currentWord.classList.add('current');

    //checks if the next letter is true, moving the cursor to the next letter
    if (currentLetter.nextSibling){
      currentLetter.nextSibling.classList.add('current');
    }
  }

  //checks if the inputted keyboard event was a space
  if (keyboardEvent.key == ' '){
    //create a temporary array to store the letters of the current word of the length of the word
    let lettersOfWord = new Array(currentWord.children.length);
    //iterates through the current word's children of spans to assign the values to the array
    for (let i = 0; i < currentWord.children.length; i++){
      //assign each letter directly to the array
      lettersOfWord[i] = currentWord.children[i];
    }

    //creates a temporary variable to store a boolean value if all the letters are correct
    let isWordCorrect = allLettersCorrect(lettersOfWord);

    //stores the wrod state in a dataset either as correct or incorrect depending on if the word had all correct letters
    currentWord.dataset.state = isWordCorrect ? 'correct' : 'incorrect';

    //marks any untyped letters as incorrect
    markIncorrectLetters(lettersOfWord);

    //clears all current classes on words and letters
    clearAllCurrent();

    //moves the cursor to the next word
    let nextWord = currentWord.nextSibling;

    //checks there is no next word
    if (!nextWord){

      //generates new words
      addWords();

      //sets the next word to be the next word after the current word in the HTML
      nextWord = currentWord.nextSibling;
    }

    //marks the next word as active
    nextWord.classList.add('current');

    //marsk the first letter of the next word as active
    nextWord.firstChild.classList.add('current');
  }

  //recycles the lines that have been scrolled past
  recycleLines();

  //updates the cursor visually
  queueCursorUpdate();
}

//attach the listener to the game's div
DIV_GAME.addEventListener('keydown', handleKeydown);

//start a new game immediately on the page loading
newGame();
