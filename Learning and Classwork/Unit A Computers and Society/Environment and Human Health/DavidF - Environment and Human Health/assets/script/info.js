'use strict';

// Declare const targets to html elements
const INFO_HEAD = document.getElementById('info-heading');
const SECT_HEAD = document.getElementById('section-heading');
const INFO_BODY = document.getElementById('info-body');

// Declare dynamic variables used for section tracking
let topic = 0, section = 0;

/** 
 * Function to display information onto the information body/section; 
 * receives one parameter, a reference to the button itself 
*/
function display(btn) {
    // Clear previous active buttons and set current button to active
    document.querySelectorAll('.nav-child').forEach(el => el.classList.remove('active'));
    if (btn) btn.classList.add('active');

    // Display heading
    INFO_HEAD.textContent = btn.textContent;

    // Display section subheading and body
    topic = Number(btn.getAttribute('id'));
    section = 1;
}

