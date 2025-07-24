// function to shorten getting elements
function gebi(id) {
    return document.getElementById(id);
}

// define all the elements we're gonna use
const pass_out   = gebi('password');
const gen_button = gebi('gen-button');
const slider_in  = gebi('len-slider');
const slider_out = gebi('length');
//
const ch_upper    = gebi('ch-upper');
const ch_lower    = gebi('ch-lower');
const ch_numbers  = gebi('ch-numbers');
const ch_symbols  = gebi('ch-symbols');
const ch_brackets = gebi('ch-brackets');
const ch_punc     = gebi('ch-punc');

// define all other variables, arrays, and maps
let passwordLength = 0;
let finalPasswordGlobal = '';
const checkboxes = [ch_upper, ch_lower, ch_numbers, ch_symbols, ch_brackets, ch_punc];
const checksMap = {
    'ch-upper'    : ['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','Z','X','C','V','B','N','M'],
    'ch-lower'    : ['q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l','z','x','c','v','b','n','m'],
    'ch-numbers'  : ['1','2','3','4','5','6','7','8','9','0'],
    'ch-brackets' : ['(', ')', '[', ']', '{', '}', '<', '>'],
    'ch-symbols'  : ['@', '#', '$', '%', '^', '&', '*', '-', '_', '=', '+', '\\', '|', '/', '`', '~'],
    'ch-punc'     : ['.', ',', ';', ':', '?', '!', '\'', '"']
};

// add event listeners
gen_button.addEventListener('click', generate_password);
slider_in.addEventListener('input', update_length);
pass_out.addEventListener('click', copy_password);
window.onload = () => { passwordLength = Number(slider_in.value); slider_out.textContent = String(slider_in.value).padStart(3,0); } // update length on load
checkboxes.forEach((checkbox) => {checkbox.addEventListener('click', generate_password)})

function update_length() {
    passwordLength = Number(slider_in.value);
    slider_out.textContent = String(slider_in.value).padStart(3,0);
    generate_password();
}
function generate_password() {
    // clear variables
    let masterArray = [];
    let passwordArray = [];
    let finalPassword = '';

    // update password length in case it's stale or smth
    passwordLength = Number(slider_in.value);

    // determine what chars to give
    checkboxes.forEach((checkbox) => {
        if (checkbox.checked) { masterArray.push(...checksMap[checkbox.id]); }
    })
    
    // only generate if there's stuff in masterArray
    // if not, do the nuh-uh animation
    if (masterArray.length > 0) {
        // grab items from masterArray and add them to passwordArray
        for (let i = 0; i < passwordLength; i++) {
            let char_index = Math.floor(Math.random() * masterArray.length);
            let char = masterArray[char_index];
            passwordArray.push(char);
            // passwordArray.push(masterArray[Math.floor(Math.random() * masterArray.length)])
        }

        // join the array into a string and display it
        finalPassword = passwordArray.join('');
        finalPasswordGlobal = finalPassword;
        pass_out.textContent = finalPassword;
    }
    else {
        gen_button.style.animation = 'none';
        void gen_button.offsetWidth;
        gen_button.style.animation = 'nuh-uh 0.08s';
        gen_button.style.animationIterationCount = '3';
    }
}
function copy_password() {
    if (pass_out.textContent !== 'CLICK TO COPY') {
        navigator.clipboard.writeText(finalPasswordGlobal);
        // pass_out.textContent = 'COPIED';
        // setTimeout(() => {
        //     pass_out.textContent = finalPasswordGlobal;
        // }, 750);
        pass_out.style.animation = 'none';
        void pass_out.offsetWidth;
        pass_out.style.animation = 'pop 0.2s ease';
    }
}