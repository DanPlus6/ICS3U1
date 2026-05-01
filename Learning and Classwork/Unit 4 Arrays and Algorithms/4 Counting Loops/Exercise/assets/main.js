'use strict';

// HTML targets
const IPT_NUM_QUES = document.getElementById('txt-num-questions');
const P_QUESTIONS = document.getElementById('p-math-questions');
const P_ANS = document.getElementById('p-math-answers');

/** 
 * returns a random integer in the given range (inclusive)
 * @param {number} min the lower bound
 * @param {number} max the upper bound
 * @returns {number} the random integer
 */
function randint(min=1,max=100) {
    // swap bounds of max < min
    if (max < min) { [min,max] = [max,min]; }

    return Math.floor(Math.random() * (max-min+1)) + min;
}

/** main callback to generate addition questions and answers based on user input */
function makeAdditionQuestions() {
    for (let i = 0; i < Number(IPT_NUM_QUES.value); i++) {
        
    }
}

