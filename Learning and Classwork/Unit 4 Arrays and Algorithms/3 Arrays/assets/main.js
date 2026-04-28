'use strict';

// HTML targets
const IMG_CUR = document.getElementById('img-current');

// "Windows spotlight"
const IMG_PATHS = [
    'lor-binahteaparty.jpg', 'lor-chesedbattle.jpg', 'lor-credits.jpg', 'lor-emptylibrary.png', 'lor-floor-of-art.png',
    'lor-floor-of-philosophy.jpeg', 'lor-floor-of-religion.png', 'lor-floor-of-social-science.jpg', 'lor-librarytree.png',
    'lor-palelibrarian.png', 'lor-rolandAndAngelaNoLogo.jpg', 'lor-rolandAndAngelaWithLogo.jpg', 'lor-seedoflight.png', 'lor.jpg'
];
let cur_idx = 0;

/** switch the image slideshow "windows spotlight" to the next image */
function nextPicture() {
    cur_idx = (cur_idx+1)%IMG_PATHS.length;
    IMG_CUR.src = "assets/img/" + IMG_PATHS[cur_idx];
}
