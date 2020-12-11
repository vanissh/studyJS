'use strict';

const isNumber = function(n){
    return !isNaN(parseFloat(n)) && isFinite(n);
};

const startButton = document.getElementById('start');
const clearButton = document.getElementById('cancel');

const plusIncomeButton = document.querySelector('button');
const plusExpensesButton = document.querySelectorAll('button')[1];
const checkBox = document.querySelector('#deposit-check');

const depositAmount = document.querySelector('.deposit-amount');
const depositPercent = document.querySelector('.deposit-percent');
const depositBank = document.querySelector('.deposit-bank');

const addIncomeItem = document.querySelectorAll('.additional_income-item');

const budgetMonthValue = document.querySelector('.budget_month-value');
const budgetDayValue = document.querySelector('.budget_day-value');
const expensesMonthValue = document.querySelector('.expenses_month-value');
const addIncomeValue = document.querySelector('input.additional_income-value');

const addExpensesValue = document.querySelector('input.additional_expenses-value');
const incomePeriodValue = document.querySelector('.income_period-value');
const targetMonthValue = document.querySelector('.target_month-value');

let salaryAmount = document.querySelector('.salary-amount');
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

class AppData {
    constructor(){
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
    }
    
    start (){  
    
        this.budget = parseInt(salaryAmount.value);
        
        this.getIncome();
        this.getExpenses();
        this.getAddExpenses();
        this.getAddIncome();
        this.getExpensesMonth();
        this.getInfoDeposit();
        this.getBudget();
        
        

        this.showResult();
    }

    addExpensesBlock (){

        const cloneExpensesItem = expensesItems[0].cloneNode(true);
        const cloneInputs = cloneExpensesItem.querySelectorAll('input');

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
    }

    getExpenses (){
        expensesItems.forEach((item) => {
            const itemExpenses = item.querySelector('.expenses-title').value;
            const cashExpenses = item.querySelector('.expenses-amount').value;
            if(itemExpenses !== '' && cashExpenses !== ''){
                this.expenses[itemExpenses] = cashExpenses;
            }
        });
    }

    addIncomeBlock (){

        const cloneIncomeItem = incomeItems[0].cloneNode(true);
        const cloneInputs = cloneIncomeItem.querySelectorAll('input');
    
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
    }

    getIncome (){
        incomeItems.forEach((item) => {
            const itemIncome = item.querySelector('.income-title').value;
            const cashIncome = item.querySelector('.income-amount').value;
            if(itemIncome !== '' && cashIncome !== ''){
                this.income[itemIncome] = cashIncome;
            }
        });
    
        const calcAmount = () => {
            for(let key in this.income){
            this.incomeMonth += +this.income[key];
        }
        };
        calcAmount.call(this);
        
    }

    letNumbersOnly (arr){
        arr.forEach((item) => {
            item.addEventListener('input', function(){
            this.value = this.value.replace(/[^\d]/g, '');
        });
        });    
    }
    
    letWords (arr){
        arr.forEach((item) =>{
            item.addEventListener('input', function(){
            this.value = this.value.replace(/[^\А-я\ё\s\W]/gi, '');
        });
        });    
    }
    
    showResult (){
    
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        addExpensesValue.value = this.addExpenses.join(', ');
        addIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        
        periodSelect.addEventListener('input', () => {
            incomePeriodValue.value = this.calcPeriod();
        });
    
    }
    
    getAddExpenses (){
        addExpensesItem.forEach((item)=>{
            const itemValue = item.value.trim();
            if (itemValue !== ''){
                this.addExpenses.push(itemValue);
            }
        });
    }
    
    getAddIncome (){
        addIncomeItem.forEach((item)=>{
            const itemValue = item.value.trim();
            if (itemValue !== ''){
                this.addIncome.push(itemValue);
            }
        });
    }
    
    getExpensesMonth (){
    
        let sum = 0;
    
        const calcAmount = () => {
            for (let key in this.expenses){
        sum += +this.expenses[key];
        }
        this.expensesMonth = +sum;
        };
        calcAmount.call(this);
        
    }
    
    getBudget (){

        const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
        this.budgetMonth = this.budget - this.expensesMonth + this.incomeMonth + monthDeposit;  
        this.budgetDay = Math.floor(this.budgetMonth/30);
    }
    
    getTargetMonth (){
        return targetAmount.value/this.budgetMonth;
    }
    
    calcPeriod (){
        return this.budgetMonth * periodSelect.value;
    }
    
    reset (){
        for(let i = incomeItems.length - 1; i > 0; i--){
            incomeItems[i].remove();
        }
        for(let i = expensesItems.length - 1; i > 0; i--){
            expensesItems[i].remove();
        }

        plusExpensesButton.hidden = false;
        plusIncomeButton.hidden = false;

        depositBank.style.display = 'none';
        depositAmount.style.display = 'none';
        depositPercent.style.display = 'none';

        depositBank.value = '';
        depositAmount.value = '';
        depositPercent.value = '';
        this.deposit = false;

        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;

        this.moneyDeposit = 0;
        this.percentDeposit = 0;
        checkBox.checked = false;

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

        periodSelect.value = 0;
        periodAmount.textContent = 0;
        allInputs.forEach(function(item){
            item.disabled = false;
        });

        });
    }

    changePersent() {
        const valueSelect = this.value;
        if(valueSelect === 'other'){
            depositPercent.style.display = 'inline-block';

            depositPercent.addEventListener('input', () => {

                if(!isNumber(depositPercent.value) ||
                    depositPercent.value > 100 || 
                    depositPercent.value < 0) {

                    alert('Введите корректное значение в поле "Проценты"');
                    depositPercent.value = '';
                    startButton.disabled = true;
                } else {
                    startButton.disabled = false;
                    this.percentDeposit = depositPercent.value;
                }
                });

        } else {
            depositPercent.value = valueSelect;
        }

    }
    
    getInfoDeposit  (){
        if(this.deposit){
            this.percentDeposit = depositPercent.value;
            this.moneyDeposit = depositAmount.value;
        } 
    }

    depositHandler(){
        if(checkBox.checked){
            depositBank.style.display = 'inline-block';
            depositAmount.style.display = 'inline-block';
            this.deposit = true;
            depositBank.addEventListener('change', this.changePersent);

        } else {
            depositBank.style.display = 'none';
            depositAmount.style.display = 'none';
            depositPercent.style.display = 'none';

            depositBank.value = '';
            depositAmount.value = '';
            depositPercent.value = '';
            this.deposit = false;
            depositBank.removeEventListener('change', this.changePersent);
        }
    }

    eventListeners  (){

        const start = this.start.bind(this);
        const reset = this.reset.bind(this);

        const letNumbersOnly = this.letNumbersOnly.bind(this);
        const letWords = this.letWords.bind(this);
        letNumbersOnly(inputNumber);
        letWords(inputWord);

        const addExpensesBlock = this.addExpensesBlock.bind(this);
        const addIncomeBlock = this.addIncomeBlock.bind(this);
        const depositHandler = this.depositHandler.bind(this);

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
            
            clearButton.style.display = 'none';
            clearButton.disabled = true;
            startButton.style.display = 'block';
        });

        if(window.performance){
            reset();
        }

        checkBox.addEventListener('change', () => {
            depositHandler();
        });

        plusExpensesButton.addEventListener('click', addExpensesBlock);
        plusIncomeButton.addEventListener('click', addIncomeBlock);

        periodSelect.addEventListener('input', function(){
            periodAmount.textContent = periodSelect.value;   
        });
    }
}

const appData = new AppData();
appData.eventListeners();







