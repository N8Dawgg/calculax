const inputField = document.querySelector('#input-field');
const calcBtnList = document.querySelectorAll('.calc-btn');
let currentInput = "";


function start() {
    calcBtnList.forEach((e) => {
        e.addEventListener('click',calcBtnClicked);
    });
}

start();

function calcBtnClicked(e) {
    currentInput = inputField.value
    let btnID = e.target.id;
    if (btnID == "=") {
        solve();
        return;
    }

    let symbol = (btnID == "/" ||
    btnID == "+" ||
    btnID == "-" ||
    btnID == "*" ||
    btnID == ".");
    let lastChar = currentInput[currentInput.length-1];
    let lastSymbol = (lastChar == "/" ||
    lastChar == "+" ||
    lastChar == "-" ||
    lastChar == "*" ||
    lastChar == ".");

    if (symbol && currentInput.length == 0) {
        currentInput += "0"
    }   else if (symbol && lastSymbol) {
        currentInput = currentInput.substring(0,currentInput.length-1);
    }


    currentInput += btnID;
    updateInput();
};

function updateInput() {
    inputField.value = currentInput;
}

function solve() {
    currentInput = cleanUp(currentInput);
    updateInput();
};

function cleanUp(str) {
    let newStr = "";
    for (let i = 0;i<str.length;i++){
        if (str[i] == '+' ||
            str[i] == '-' ||
            str[i] == '*' ||
            str[i] == '/' ||
            str[i] == '.' ||
            str[i] == '0' ||
            str[i] == '1' ||
            str[i] == '2' ||
            str[i] == '3' ||
            str[i] == '4' ||
            str[i] == '5' ||
            str[i] == '6' ||
            str[i] == '7' ||
            str[i] == '8' ||
            str[i] == '9') 
        {
            newStr += str[i];
        }
    }
    return newStr;
}





