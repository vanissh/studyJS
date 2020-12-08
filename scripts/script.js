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

const appData = {
    income: {},
    incomeMonth: 0,
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    budget: 0,
    budgetDay: 0,
    itemIncome: 0,
    cashIncome: 0,
    budgetMonth: 0, 
    expensesMonth: 0,
    
    start: function(){
        
        this.budget = parseInt(salaryAmount.value);

        this.getExpenses();
        this.getIncome();
        this.getExpensesMonth();
        this.getBudget();
        this.getAddExpenses();
        this.getAddIncome();

        this.showResult();

    },

    
    addExpensesBlock: function(){

        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        let cloneInputs = cloneExpensesItem.querySelectorAll('input');

        cloneInputs.forEach(function(item){
            item.value = null;
        });

        plusExpensesButton.before(cloneExpensesItem);
        
        inputNumber = document.querySelectorAll('[placeholder = "Сумма"]');
        inputWord = document.querySelectorAll('[placeholder = "Наименование"]');

        appData.letNumbersOnly(inputNumber);
        appData.letWords(inputWord);

        allInputs = document.querySelectorAll('input');
        expensesItems = document.querySelectorAll('.expenses-items');
        console.log(expensesItems);

        if(expensesItems.length === 3){
            plusExpensesButton.hidden = true;
        }
    },

    getExpenses: function(){
        expensesItems.forEach((item) => {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if(itemExpenses !== '' && cashExpenses !== ''){
                this.expenses[itemExpenses] = cashExpenses;
            }
        });
    },

    addIncomeBlock: function(){

        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        let cloneInputs = cloneIncomeItem.querySelectorAll('input');

        cloneInputs.forEach(function(item){
            item.value = null;
        });

        plusIncomeButton.before(cloneIncomeItem);

        inputNumber = document.querySelectorAll('[placeholder = "Сумма"]');
        inputWord = document.querySelectorAll('[placeholder = "Наименование"]');

        appData.letNumbersOnly(inputNumber);
        appData.letWords(inputWord);

        allInputs = document.querySelectorAll('input');
        incomeItems = document.querySelectorAll('.income-items'); 
        console.log(incomeItems);
        
        if(incomeItems.length === 3){
            plusIncomeButton.hidden = true;
        }
    },

    getIncome: function(){
        incomeItems.forEach((item) => {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if(itemIncome !== '' && cashIncome !== ''){
                this.income[itemIncome] = cashIncome;
            }
        });

        for(let key in appData.income){
            appData.incomeMonth += +appData.income[key];
        }
    },
    
    letNumbersOnly: function(arr){
        arr.forEach((item) => {
            item.addEventListener('input', function(){
            this.value = this.value.replace(/[^\d]/g, '');
        });
        });    
    },

    letWords: function(arr){
        arr.forEach((item) =>{
            item.addEventListener('input', function(){
            this.value = this.value.replace(/[^\А-я\ё\s\W]/gi, '');
        });
        });    
    },

    showResult: function(){

        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = this.budgetDay;
        expensesMonthValue.value = this.expensesMonth;
        addExpensesValue.value = this.addExpenses.join(', ');
        addIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(this.getTargetMonth());
        
        periodSelect.addEventListener('input', () => {
            incomePeriodValue.value = this.calcPeriod();
        });

    },

    getAddExpenses: function(){
        addExpensesItem.forEach((item)=>{
            let itemValue = item.value.trim();
            if (itemValue !== ''){
                this.addExpenses.push(itemValue);
            }
        });
    },

    getAddIncome: function(){
        addIncomeItem.forEach((item)=>{
            let itemValue = item.value.trim();
            if (itemValue !== ''){
                this.addIncome.push(itemValue);
            }
        });
    },

    getExpensesMonth: function(){

        let sum = 0;

        for (let key in appData.expenses){
        sum += +appData.expenses[key];
        }
        appData.expensesMonth = +sum;
    },

    getBudget: function(){

        this.budgetMonth = this.budget - this.expensesMonth + this.incomeMonth;  
        this.budgetDay = Math.floor(this.budgetMonth/30);
    },

    getTargetMonth: function(){
        return targetAmount.value/this.budgetMonth;
    },
    
    calcPeriod: function(){
        return this.budgetMonth * periodSelect.value;
    },
    
    // getInfoDeposit: function (){
    //     appData.deposit = confirm('Есть ли у Вас депозит в банке?');

    //     if(appData.deposit){
    //         do {
    //             appData.percentDeposit = prompt('Какой годовой процент?','10');
    //         } while (!isNumber(appData.percentDeposit));
            
    //         do {
    //             appData.moneyDeposit = prompt('Какая сумма заложена?','10000');
    //         } while (!isNumber(appData.moneyDeposit));
            
    //     }
    // },
    
    reset: function(){
        for(let i = incomeItems.length - 1; i > 0; i--){
            incomeItems[i].remove();
        }
        for(let i = expensesItems.length - 1; i > 0; i--){
            expensesItems[i].remove();
        }

        plusExpensesButton.hidden = false;
        plusIncomeButton.hidden = false;

        periodSelect.value = 0;

        allInputs.forEach(function(item){
            item.value = null;
        }); 

        for(let key in this.expenses){
            this.expenses[key] = null;
        }
        for(let key in this.incomes){
            this.expenses[key] = null;
        }
    },

    // checkAim: function(){

    //     if(this.getTargetMonth() > 0){
    //         console.log('Цель будет достигнута за', 
    //         Math.ceil(appData.getTargetMonth(), 1),'месяцев');
    //     } else {
    //         console.log('Цель не будет достигнута');
    //     }
    // },

    // getStatusIncome: function(){

    //     if (this.budgetDay > 1200){
    //         return('У Вас высокий уровень дохода!');
    //     } else if(this.budgetDay > 600 && this.budgetDay <=1200) {
    //         return('У Вас средний уровень дохода!');
    //     } else if(this.budgetDay > 0 && this.budgetDay <=600){
    //         return('К сожалению, Ваш уровень дохода ниже среднего =(');
    //     } else {
    //         return('Что-то пошло не так');
    //     }
    // },

    outputData : function(){
        console.log('Наша программа включает в себя данные:');
        for(let key in this) {
            console.log(key);
            console.log(appData[key]);
        }
    },
};
let start = appData.start.bind(appData);
let reset = appData.reset.bind(appData);

clearButton.disabled = true;
startButton.disabled = true;
salaryAmount.addEventListener('input',function(){
    startButton.disabled = salaryAmount.value.trim() === '';
});

appData.letNumbersOnly(inputNumber);
appData.letWords(inputWord);

startButton.addEventListener('click', function(){
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


clearButton.addEventListener('click', function(){
    reset();
    periodSelect.value = 0;
    periodAmount.textContent = 0;
    allInputs.forEach(function(item){
        item.disabled = false;
    });
    clearButton.style.display = 'none';
    clearButton.disabled = true;
    startButton.disabled = false;
    startButton.style.display = 'block';
});

plusExpensesButton.addEventListener('click', appData.addExpensesBlock);
plusIncomeButton.addEventListener('click', appData.addIncomeBlock);

periodSelect.addEventListener('input',function(){
    periodAmount.textContent = periodSelect.value;   
});
