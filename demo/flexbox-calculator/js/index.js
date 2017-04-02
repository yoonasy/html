'use strict';

var display = document.getElementsByClassName('display')[0],
    numberKeys = document.getElementsByClassName('num'),
    addKey = document.getElementsByClassName('add')[0],
    subtractKey = document.getElementsByClassName('subtract')[0],
    divideKey = document.getElementsByClassName('divide')[0],
    multiplyKey = document.getElementsByClassName('multiply')[0],
    clearKey = document.getElementsByClassName('clear')[0],
    evalKey = document.getElementsByClassName('equals')[0];

var curNumber = 0,
    prevNumber = 0,
    afterOperation = false,
    curOperation = undefined;

// add listeners to number numberKeys

var _loop = function _loop(i) {
  numberKeys[i].onclick = function () {
    changeDisplayVal(numberKeys[i].innerHTML);
  };
};

for (var i = 0; i < numberKeys.length; i++) {
  _loop(i);
}

clearKey.onclick = function () {
  clearAll();
};

addKey.onclick = function () {
  doOperation('add');
};

subtractKey.onclick = function () {
  doOperation('subtract');
};

multiplyKey.onclick = function () {
  doOperation('multiply');
};

divideKey.onclick = function () {
  doOperation('divide');
};

evalKey.onclick = function () {
  evaluate(curOperation);
};

function doOperation(operation) {
  if (!curOperation) {
    prevNumber = curNumber;
    curOperation = operation;
    afterOperation = true;
  } else if (!afterOperation) {
    evaluate(curOperation);
    prevNumber = curNumber;
    curOperation = operation;
    afterOperation = true;
  } else {
    curOperation = operation;
  }
};

function clearAll() {
  curNumber = 0;
  prevNumber = 0;
  curOperation = undefined;
  afterOperation = false;
  display.innerHTML = '0';
};

function changeDisplayVal(numString) {
  if (display.innerHTML === '0' || afterOperation) {
    display.innerHTML = '';
    afterOperation = false;
  }
  // fix having more than one decimal point
  if (numString === '.' && display.innerHTML.indexOf('.') > -1) {
    numString = '';
  }
  if (display.innerHTML.length >= 16) {
    // do nothing (16 digit limit)
  } else {
      display.innerHTML += numString;
    };
  // set current number
  curNumber = Number(display.innerHTML);
};

function evaluate(operation) {
  if (!afterOperation) {
    switch (operation) {
      case 'add':
        curNumber = prevNumber + curNumber;
        break;
      case 'subtract':
        curNumber = prevNumber - curNumber;
        break;
      case 'multiply':
        curNumber = prevNumber * curNumber;
        break;
      case 'divide':
        curNumber = prevNumber / curNumber;
        break;
    }
    if (curNumber.toString().length >= 16) {
      curNumber = Number(curNumber.toFixed(16));
    }
    display.innerHTML = curNumber;
  }
  afterOperation = true;
  curOperation = undefined;
};