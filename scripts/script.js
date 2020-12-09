'use strict';

const isNumber = function(n){
    return !isNaN(parseFloat(n)) && isFinite(n);
};

const startButton = document.getElementById('start');
const clearButton = document.getElementById('cancel');

const plusIncomeButton = document.querySelector('button');
const plusExpensesButton = document.querySelectorAll('button')[1];

const depositCheckBox = document.querySelector('#deposit-check');
const depositAmount = document.querySelector('input.deposit-amount');
const depositPencent = document.querySelector('input.deposit-percent');

const addIncomeItem = document.querySelectorAll('.additional_income-item');

const budgetMonthValue = document.querySelector('.budget_month-value');
const budgetDayValue = document.querySelector('.budget_day-value');
const expensesMonthValue = document.querySelector('.expenses_month-value');
const addIncomeValue = document.querySelector('input.additional_income-value');

const addExpensesValue = document.querySelector('input.additional_expenses-value');
const incomePeriodValue = document.querySelector('.income_period-value');
const targetMonthValue = document.querySelector('.target_month-value');

const salaryAmount = document.querySelector('.salary-amount');
const incomeTitle = document.querySelector('.income-title');
const incomeAmount = document.querySelector('.income-amount');

const expensesTitle = document.querySelector('input.expenses-title');
let expensesItems = document.querySelectorAll('.expenses-items');
const addExpensesItem = document.querySelectorAll('.additional_expenses-item');

const targetAmount = document.querySelector('.target-amount');
const periodSelect = document.querySelector('.period-select');
let incomeItems = document.querySelectorAll('.income-items');
const periodAmount = document.querySelector('.period-amount');

let inputNumber = document.querySelectorAll('[placeholder = "Сумма"]');
let inputWord = document.querySelectorAll('[placeholder = "Наименование"]');
let allInputs = document.querySelectorAll('input');

const AppData = function(){
    this.income = {};
    this.incomeMonth = 0;
    this.addIncome = [];
    this.expenses = {};
    this.addExpenses = [];
    this.deposit = false;
    this.percentDeposit = 0;
    this.moneyDeposit = 0;
    this.budget = 0;
    this.budgetDay = 0;
    this.itemIncome = 0;
    this.cashIncome = 0;
    this.budgetMonth = 0;
    this.expensesMonth = 0;
    
};

AppData.prototype.start = function(){  
    
    this.budget = parseInt(salaryAmount.value);

    this.getExpenses();
    this.getIncome();
    this.getExpensesMonth();
    this.getBudget();
    this.getAddExpenses();
    this.getAddIncome();

    this.showResult();
};

AppData.prototype.addExpensesBlock = function(){

    let cloneExpensesItem = expensesItems[0].cloneNode(true);
    let cloneInputs = cloneExpensesItem.querySelectorAll('input');

    cloneInputs.forEach(function(item){
        item.value = null;
    });

    plusExpensesButton.before(cloneExpensesItem);
    
    inputNumber = document.querySelectorAll('[placeholder = "Сумма"]');
    inputWord = document.querySelectorAll('[placeholder = "Наименование"]');

    this.letNumbersOnly(inputNumber);
    this.letWords(inputWord);

    allInputs = document.querySelectorAll('input');
    expensesItems = document.querySelectorAll('.expenses-items');

    if(expensesItems.length === 3){
        plusExpensesButton.hidden = true;
    }
};

AppData.prototype.getExpenses = function(){
    expensesItems.forEach((item) => {
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;
        if(itemExpenses !== '' && cashExpenses !== ''){
            this.expenses[itemExpenses] = cashExpenses;
        }
    });
};

AppData.prototype.addIncomeBlock = function(){

    let cloneIncomeItem = incomeItems[0].cloneNode(true);
    let cloneInputs = cloneIncomeItem.querySelectorAll('input');

    cloneInputs.forEach(function(item){
        item.value = null;
    });

    plusIncomeButton.before(cloneIncomeItem);

    inputNumber = document.querySelectorAll('[placeholder = "Сумма"]');
    inputWord = document.querySelectorAll('[placeholder = "Наименование"]');
    
    this.letNumbersOnly(inputNumber);
    this.letWords(inputWord);

    allInputs = document.querySelectorAll('input');
    incomeItems = document.querySelectorAll('.income-items'); 
    
    if(incomeItems.length === 3){
        plusIncomeButton.hidden = true;
    }
};

AppData.prototype.getIncome = function(){
    incomeItems.forEach((item) => {
        let itemIncome = item.querySelector('.income-title').value;
        let cashIncome = item.querySelector('.income-amount').value;
        if(itemIncome !== '' && cashIncome !== ''){
            this.income[itemIncome] = cashIncome;
        }
    });

    const calcAmount = () => {
        for(let key in this.income){
        this.incomeMonth += +this.income[key];
    }
    };
    calcAmount.call(AppData);
    
};

AppData.prototype.letNumbersOnly = function(arr){
    arr.forEach((item) => {
        item.addEventListener('input', function(){
        this.value = this.value.replace(/[^\d]/g, '');
    });
    });    
};

AppData.prototype.letWords = function(arr){
    arr.forEach((item) =>{
        item.addEventListener('input', function(){
        this.value = this.value.replace(/[^\А-я\ё\s\W]/gi, '');
    });
    });    
};

AppData.prototype.showResult = function(){

    budgetMonthValue.value = this.budgetMonth;
    budgetDayValue.value = this.budgetDay;
    expensesMonthValue.value = this.expensesMonth;
    addExpensesValue.value = this.addExpenses.join(', ');
    addIncomeValue.value = this.addIncome.join(', ');
    targetMonthValue.value = Math.ceil(this.getTargetMonth());
    
    periodSelect.addEventListener('input', () => {
        incomePeriodValue.value = this.calcPeriod();
    });

};

AppData.prototype.getAddExpenses = function(){
    addExpensesItem.forEach((item)=>{
        let itemValue = item.value.trim();
        if (itemValue !== ''){
            this.addExpenses.push(itemValue);
        }
    });
};

AppData.prototype.getAddIncome = function(){
    addIncomeItem.forEach((item)=>{
        let itemValue = item.value.trim();
        if (itemValue !== ''){
            this.addIncome.push(itemValue);
        }
    });
};

AppData.prototype.getExpensesMonth = function(){

    let sum = 0;

    const calcAmount = () => {
        for (let key in this.expenses){
    sum += +this.expenses[key];
    }
    this.expensesMonth = +sum;
    };
    calcAmount.call(this);
    
};

AppData.prototype.getBudget = function(){

    this.budgetMonth = this.budget - this.expensesMonth + this.incomeMonth;  
    this.budgetDay = Math.floor(this.budgetMonth/30);
};

AppData.prototype.getTargetMonth = function(){
    return targetAmount.value/this.budgetMonth;
};

AppData.prototype.calcPeriod = function(){
    return this.budgetMonth * periodSelect.value;
};

/*
AppData.prototype.getInfoDeposit = function (){
    appData.deposit = confirm('Есть ли у Вас депозит в банке?');

    if(appData.deposit){
        do {
            appData.percentDeposit = prompt('Какой годовой процент?','10');
        } while (!isNumber(appData.percentDeposit));
        
        do {
            appData.moneyDeposit = prompt('Какая сумма заложена?','10000');
        } while (!isNumber(appData.moneyDeposit));
        
    }
};
*/

AppData.prototype.reset = function(){
    for(let i = incomeItems.length - 1; i > 0; i--){
        incomeItems[i].remove();
    }
    for(let i = expensesItems.length - 1; i > 0; i--){
        expensesItems[i].remove();
    }

    plusExpensesButton.hidden = false;
    plusIncomeButton.hidden = false;

    this.budget = 0;
    this.budgetDay = 0;
    this.budgetMonth = 0;

    periodSelect.value = 0;
    periodSelect.addEventListener('input', () => {
        incomePeriodValue.value = 0;
    });

    this.expenses = {};
    this.income = {};
    this.addExpenses = [];
    this.addIncome = [];

    this.incomeMonth = 0;
    this.expensesMonth = 0;

    allInputs.forEach(function(item){
        item.value = null;
        
    }); 
};

/*
AppData.prototype.checkAim = function(){

    if(this.getTargetMonth() > 0){
        console.log('Цель будет достигнута за', 
        Math.ceil(appData.getTargetMonth(), 1),'месяцев');
    } else {
        console.log('Цель не будет достигнута');
    }
};

AppData.prototype.getStatusIncome = function(){

    if (this.budgetDay > 1200){
        return('У Вас высокий уровень дохода!');
    } else if(this.budgetDay > 600 && this.budgetDay <=1200) {
        return('У Вас средний уровень дохода!');
    } else if(this.budgetDay > 0 && this.budgetDay <=600){
        return('К сожалению, Ваш уровень дохода ниже среднего =(');
    } else {
        return('Что-то пошло не так');
    }
};

AppData.prototype.outputData = function(){
    console.log('Наша программа включает в себя данные:');
    for(let key in AppData) {
        console.log(key);
        console.log(this[key]);
    }
};
*/
// AppData.prototype.contextBind = function(){
    
// let start = this.start.bind(this);
// let reset = this.reset.bind(this);

// let letNumbersOnly = this.letNumbersOnly.bind(this);
// let letWords = this.letWords.bind(this);
// letNumbersOnly(inputNumber);
// letWords(inputWord);

// let addExpensesBlock = this.addExpensesBlock.bind(this);
// let addIncomeBlock = this.addIncomeBlock.bind(this);
// };

AppData.prototype.eventListeners = function (){

    let start = this.start.bind(this);
    let reset = this.reset.bind(this);

    let letNumbersOnly = this.letNumbersOnly.bind(this);
    let letWords = this.letWords.bind(this);
    letNumbersOnly(inputNumber);
    letWords(inputWord);

    let addExpensesBlock = this.addExpensesBlock.bind(this);
    let addIncomeBlock = this.addIncomeBlock.bind(this);

    clearButton.disabled = true;
    startButton.disabled = true;

    salaryAmount.addEventListener('input',function(){
        startButton.disabled = salaryAmount.value.trim() === '';
    });

    startButton.addEventListener('click', () => {
        start();
        allInputs.forEach(function(item){
            item.disabled = true;
        });
        periodSelect.disabled = false;
        clearButton.disabled = false;
        startButton.disabled = true;
        startButton.style.display = 'none';
        clearButton.style.display = 'block';
    });


    clearButton.addEventListener('click', () => {
        reset();
        periodSelect.value = 0;
        periodAmount.textContent = 0;
        allInputs.forEach(function(item){
            item.disabled = false;
        });
        clearButton.style.display = 'none';
        clearButton.disabled = true;
        startButton.style.display = 'block';
    });

    plusExpensesButton.addEventListener('click', addExpensesBlock);
    plusIncomeButton.addEventListener('click', addIncomeBlock);

    periodSelect.addEventListener('input', function(){
        periodAmount.textContent = periodSelect.value;   
    });
};

const appData = new AppData();
appData.eventListeners();
console.log(appData);







