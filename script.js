const inputField = document.querySelector('#input-field');
const calcBtnList = document.querySelectorAll('.calc-btn');

function start() {
    calcBtnList.forEach((e) => {
        e.addEventListener('click',calcBtnClicked);
    });
}

start();

function calcBtnClicked(e) {
    console.log(e.target.id);
}