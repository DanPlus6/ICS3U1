'use strict';

// Declare const html targets
const NAV_BAR = document.querySelector('.nav-bar');
const INFO_CONT = document.querySelector('.info-container');
const QUIZ_CONT = document.getElementById('quiz-container');
const QUIZ_FAB = document.getElementById('quiz-fab');
const QUIZ_SUBMIT = document.getElementById('quiz-submit');
const QUIZ_SCORE = document.getElementById('quiz-score');
const QUIZ_CLOSE = document.getElementById('quiz-close');
const SCORE_TEXT = document.getElementById('score-text');

/** Quiz time baby! Opens the quiz: greys menu, disables quiz fab, hides info, shows quiz */
function openQuiz() {
    // Greys menu, disables quiz fab, hides info
    NAV_BAR.classList.add('greyed');
    QUIZ_FAB.classList.add('disabled');
    INFO_CONT.style.display = 'none';

    // Reset quiz state
    resetQuiz();

    // Shows quiz
    QUIZ_CONT.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

/** Closes the quiz and restores the normal view */
function closeQuiz() {
    QUIZ_CONT.classList.remove('active');
    NAV_BAR.classList.remove('greyed');
    QUIZ_FAB.classList.remove('disabled');
    INFO_CONT.style.display = '';
}

/** Resets all question selections and hides score */
function resetQuiz() {
    document.querySelectorAll('.quiz-option').forEach(btn => {
        btn.classList.remove('correct', 'wrong');
        btn.disabled = false;
    });

    // Re-attach option click listeners
    document.querySelectorAll('.quiz-question-block').forEach(block => {
        const options = block.querySelectorAll('.quiz-option');
        options.forEach((btn, idx) => {
            btn.onclick = () => selectOption(block, idx);
        });
        delete block.dataset.selected;
    });

    QUIZ_SCORE.classList.remove('active');
    QUIZ_CLOSE.style.display = 'none';
    QUIZ_SUBMIT.style.display = '';
    SCORE_TEXT.textContent = '';
}

/** Handles selecting an answer for a question block */
function selectOption(block, selectedIdx) {
    /** const refs for each option of current block */
    const options = block.querySelectorAll('.quiz-option');

    /** Clear previous selection styling for this question */
    options.forEach(btn => btn.classList.remove('correct', 'wrong'));

    // Mark selection (highlight in dark to show it's chosen)
    options[selectedIdx].style.outline = '';
    block.dataset.selected = selectedIdx;

    // Indicate selected answers
    options.forEach((btn, i) => {
        btn.style.backgroundColor = '';
        btn.style.color = '';
    });
    options[selectedIdx].style.backgroundColor = 'rgba(94, 95, 100, 1)';
    options[selectedIdx].style.color = 'white';
}

/** Submit the quiz, grade answers and show score */
function submitQuiz() {
    const blocks = document.querySelectorAll('.quiz-question-block');
    let score = 0;

    blocks.forEach(block => {
        const correct = Number(block.dataset.answer);
        const selected = block.dataset.selected !== undefined ? Number(block.dataset.selected) : null;
        const options = block.querySelectorAll('.quiz-option');

        // Reset inline styles set during selection
        options.forEach(btn => {
            btn.style.backgroundColor = '';
            btn.style.color = '';
            btn.disabled = true;
        });

        if (selected === null) {
            // No answer selected — just reveal correct
            options[correct].classList.add('correct');
        } else if (selected === correct) {
            options[correct].classList.add('correct');
            score++;
        } else {
            options[selected].classList.add('wrong');
            options[correct].classList.add('correct');
        }
    });

    // Show final score
    const total = blocks.length;
    SCORE_TEXT.textContent = `You scored ${score} / ${total}`;
    QUIZ_SUBMIT.style.display = 'none';
    QUIZ_SCORE.classList.add('active');
    QUIZ_CLOSE.style.display = '';
}

