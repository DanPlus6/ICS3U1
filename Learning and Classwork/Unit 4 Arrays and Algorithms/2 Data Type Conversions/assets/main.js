'use strict';

// HTML targets
const IPT_NUM1 = document.getElementById('ipt-num-1');
const IPT_NUM2 = document.getElementById('ipt-num-2');
const P_ANS = document.getElementById('p-answers');

/**
 * Takes the value of the number 1 and number 2 input boxes and adds them
 */
function add() {
    if (!IPT_NUM1.value || !IPT_NUM2.value) { alert("Input must not be empty!"); return; }
    if (isNaN(IPT_NUM1.value) || isNaN(IPT_NUM2.value)) { alert("Invalid input! Inputs must be proper numbers!"); return; }
    P_ANS.textContent = ((+IPT_NUM1.value) + (+IPT_NUM2.value));
}
