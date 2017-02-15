var calculator = {
    // Application Constructor
    initialize: function () {
        this.addMyCustomFunctions();
        this.resultItem = document.getElementById('result');
        this.expressionItem = document.getElementById('expression');
        this.bindEvents();
    },
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener('click', this.detectButtons, false);

    },
    onDeviceReady: function () {
        //when everythings load...
        calculator.calcContainer = document.getElementById('calculator');
        calculator.getRatio();
        calculator.setModeByRatio();
        //resulution change
        (function () {
            var width = window.innerWidth,
                height = window.innerHeight;
            setInterval(function () {
                if (window.innerWidth !== width || window.innerHeight !== height) {
                    width = window.innerWidth;
                    height = window.innerHeight;
                    calculator.resulutionChange();
                }
            }, 50);
        }());
    },
    detectButtons: function (event) {
        var target = event.target;
        var resutlText = document.getElementById('result').innerText;
        if (event.target.classList[0] === 'button') {
            switch (event.target.classList[1]) {
                case 'number':
                    calculator.appendToResult(target);
                    break;
                case 'expression':
                    calculator.addToExpression(target);
                    break;
                case 'clear-all':
                    calculator.clearAll();
                    break;
                case 'clear-current':
                    calculator.clearCurrent();
                    break;
                case 'point':
                    if (resutlText.indexOf('.') < 0 && resutlText.length > 0) {
                        calculator.appendToResult(target);
                    }
                    break;
                default:
                    calculator.calculate();
            }
        }

    },
    appendToResult: function (target) {
        if (calculator.isCalculated) {
            calculator.resultItem.innerHTML = target.innerText;
            calculator.isCalculated = false;
        } else {
            calculator.resultItem.innerHTML = calculator.resultItem.innerHTML + target.innerText;
        }
    },
    addToExpression: function (target) {
        if (calculator.resultItem.innerText !== '') {
            calculator.expressionItem.innerHTML = calculator.expressionItem.innerHTML + calculator.resultItem.innerText + ' ' + target.innerText + ' ';
            calculator.resultItem.innerHTML = '';
        }else if(calculator.expressionItem.innerText !== ''){
            var text = calculator.expressionItem.innerHTML;
            var expLength = text.length;
            text = text.replaceAt((expLength - 2) ,target.innerText);
            calculator.expressionItem.innerHTML = text;
        }
    },
    clearAll: function () {
        calculator.resultItem.innerHTML = '';
        calculator.expressionItem.innerHTML = '';
    },
    clearCurrent: function () {
        calculator.resultItem.innerHTML = '';
    },
    calculate: function () {
        var result = calculator.resultItem.innerHTML;
        var expresssion = calculator.expressionItem.innerHTML;
        if (result !== "" && expresssion !== "") {
            expresssion = calculator.escapeSpecChars(expresssion + result);
            calculator.resultItem.innerHTML = eval(expresssion);
            calculator.expressionItem.innerHTML = '';
            calculator.isCalculated = true;
        } else if (expresssion !== "") {
            var length = expresssion.length;
            expresssion = expresssion.substr(0, (length - 3));
            expresssion = calculator.escapeSpecChars(expresssion + result);
            calculator.resultItem.innerHTML = eval(expresssion);
            calculator.expressionItem.innerHTML = '';
            calculator.isCalculated = true;
        } else {
            return false;
        }

    },
    resulutionChange: function () {
        calculator.getRatio();
        calculator.setModeByRatio();
    },
    escapeSpecChars: function (str) {
        return str.replace(new RegExp(/[^0-9-+÷ ']/gi), '*').replace(new RegExp(/[^0-9-+* ']/gi), '/');
    },
    getRatio: function () {
        var w = window.innerWidth;
        var h = window.innerHeight;
        calculator.ratio = w / h;
    },
    setModeByRatio: function () {
        if (calculator.ratio === '') {
            calculator.getRatio();
        }

        if (calculator.ratio < 1) {
            calculator.calcContainer.className = 'calculator normal';
        }else{
            calculator.calcContainer.className = 'calculator wide';
        }

        calculator.calcContainer.setAttribute('style', 'height: ' + window.innerHeight + 'px');
    },
    addMyCustomFunctions: function(){
        String.prototype.replaceAt = function(index, character) {
            return this.substr(0, index) + character + this.substr(index+character.length);
        }
    },
    numArray: [],
    resultItem: '',
    expressionItem: '',
    isCalculated: false,
    ratio: '',
    calcContainer: ''

};
