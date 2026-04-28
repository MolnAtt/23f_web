
/* 
This is a multi-line comment in JavaScript.
It can span multiple lines and is useful for providing detailed explanations or documentation.
*/

// This is a single-line comment in JavaScript. It is used for brief explanations or notes.

/**
 * Greets a user with a personalized message.
 * @param {string} name - The name of the user.
 * @returns {string} A greeting message.
 */
function greet(name) {
    return `Hello, ${name}! Welcome to JavaScript programming.`;
}


function idegesites(esemeny) {
    confirm('Ideges vagy-e?');
}


console.log('Hello, World! This is a "simple" JavaScript file.');

console.log(greet('Hunor'));


var a;
a = 5;
var b = 10;

let c = 15;
let d;
d = 20;

const e = 25;

console.log(a, b, c, d, e);

let g = document.getElementById('gombocska');
let g2 = document.querySelector('#gombocska');

// g.addEventListener('click', idegesites);

// let idegesit2 = function(e) {
//     confirm('Megnyugodtál már?');
// }

// g.addEventListener('click', idegesit2);


g.addEventListener('click', function(e) {
    confirm('Megnyugodtál már tényleg?');
});

// neten fellelhető leggyakoribb stílus az, hogy egyből az addeventlistenerbe 
// írják a függvény implementációját. 

g.addEventListener('click', e => {
    confirm('Megnyugodtál már tényleg?');
});





