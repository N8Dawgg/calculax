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
    } else if (btnID == "c") {
        currentInput = "";
        updateInput();
        return;
    }

    let symbol = isSymbol(btnID);
    let lastChar = currentInput[currentInput.length-1];
    let lastSymbol = isSymbol(lastChar);

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

let mathFunction = [multi,divide,add,sub];
let mathSymbol = ["*","/","+","-"];

function solve() {
    currentInput = cleanUp(currentInput);
    //mdas
    let storedInput = currentInput;
    currentInput = currentInput.replace("+",",+,");
    currentInput = currentInput.replace("-",",-,");
    currentInput = currentInput.replace("/",",/,");
    currentInput = currentInput.replace("*",",*,");
    let inputList = currentInput.split(',');
    //for each mathematic property:
    for (let i=0; i<4; i++) {
        let curIdx = 0;
        while (curIdx != -1) {
            curIdx = inputList.indexOf(mathSymbol[i]);
            if (curIdx != -1) {
                let a = parseFloat(inputList[curIdx-1]);
                let b = parseFloat(inputList[curIdx+1]);
                inputList[curIdx-1] = mathFunction[i](a,b);
                inputList.splice(curIdx,2);
            }
        }
    }
    currentInput = inputList[0].toString();


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
    newStr = clipSymbolsOffEnd(newStr);
    return newStr;
}

function clipSymbolsOffEnd(str) {
    while(true) {
        let lastChar = str[str.length-1];
        if (isSymbol(lastChar)) {
            str = str.substring(0,str.length-1);
        } else {
            return str;
        }
    }
}



function add(a,b) {
    return a+b;
}

function sub(a,b) {
    return a-b;
}

function multi(a,b) {
    return a*b;
}

function divide(a,b) {
    return a/b;
}


function isSymbol(char) {
    return (char == "/" ||
    char == "+" ||
    char == "-" ||
    char == "*" ||
    char == ".");
}


