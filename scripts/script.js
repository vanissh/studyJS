'use strict';

const isNumber = function(n){
    return !isNaN(parseFloat(n)) && isFinite(n);
};

const startButton = document.getElementById('start');

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

const addExpensesValue = document.querySelector('.additional_expenses-value');
const incomePeriodValue = document.querySelector('.income_period-value');
const targetMonthValue = document.querySelector('.target_month-value');

const salaryAmount = document.querySelector('.salary-amount');
const incomeTitle = document.querySelector('.income-title');
const incomeAmount = document.querySelector('.income-amount');

const expensesTitle = document.querySelector('input.expenses-title');
let expensesItems = document.querySelectorAll('.expenses-items');
const addExpensesItem = document.querySelector('input.additional_expenses-item');

const targetAmount = document.querySelector('.target-amount');
const periodSelect = document.querySelector('.period-select');
let incomeItems = document.querySelectorAll('.income-items');
let periodAmount = document.querySelector('.period-amount');

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

        appData.budget = parseInt(salaryAmount.value);

        appData.getExpenses();
        appData.getIncome();
        appData.getExpensesMonth();
        appData.getBudget();
        appData.getAddExpenses();
        appData.getAddIncome();

        appData.showResult();

    },

    addExpensesBlock: function(){

        let cloneExpensesItem = expensesItems[0].cloneNode(true);
        plusExpensesButton.before(cloneExpensesItem);
        expensesItems = document.querySelectorAll('.expenses-items');

        if(expensesItems.length === 3){
            plusExpensesButton.remove();
        }
    },

    getExpenses: function(){
        expensesItems.forEach(function(item){
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if(itemExpenses !== '' && cashExpenses !== ''){
                appData.expenses[itemExpenses] = cashExpenses;
            }
        });
    },

    addIncomeBlock: function(){

        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        plusIncomeButton.before(cloneIncomeItem);
        incomeItems = document.querySelectorAll('.income-items'); 
        
        if(incomeItems.length === 3){
            plusIncomeButton.remove();
        }
    },

    getIncome: function(){
        incomeItems.forEach(function(item){
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if(itemIncome !== '' && cashIncome !== ''){
                appData.income[itemIncome] = cashIncome;
            }
        });

        for(let key in appData.income){
            appData.incomeMonth += +appData.income[key];
        }
    },

    showResult: function(){

        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = appData.budgetDay;
        expensesMonthValue.value = appData.expensesMonth;
        addExpensesValue.value = appData.addExpenses.join(', ');
        addIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = Math.ceil(appData.getTargetMonth());
        

        periodSelect.addEventListener('input', function(){
            incomePeriodValue.value = appData.calcPeriod();
        });

    },

    getAddExpenses: function(){
        let addExpenses = addExpensesItem.value.split(',');
        addExpenses.forEach(function(item){
            item = item.trim();
            if( item !== ''){
                appData.addExpenses.push(item);
            }
        });
    },

    getAddIncome: function(){
        addIncomeItem.forEach(function(item){
            let itemValue = item.value.trim();
            if (itemValue !== ''){
                appData.addIncome.push(itemValue);
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

        appData.budgetMonth = appData.budget - appData.expensesMonth + appData.incomeMonth;  
        appData.budgetDay = Math.floor(appData.budgetMonth/30);
    },

    getTargetMonth: function(){
        return targetAmount.value/appData.budgetMonth;
    },
    
    calcPeriod: function(){
        return appData.budgetMonth * periodSelect.value;
    },
    
    getInfoDeposit: function (){
        appData.deposit = confirm('Есть ли у Вас депозит в банке?');

        if(appData.deposit){
            do {
                appData.percentDeposit = prompt('Какой годовой процент?','10');
            } while (!isNumber(appData.percentDeposit));
            
            do {
                appData.moneyDeposit = prompt('Какая сумма заложена?','10000');
            } while (!isNumber(appData.moneyDeposit));
            
        }
    },

    checkAim: function(){

        if(appData.getTargetMonth() > 0){
            console.log('Цель будет достигнута за', 
            Math.ceil(appData.getTargetMonth(), 1),'месяцев');
        } else {
            console.log('Цель не будет достигнута');
        }
    },

    getStatusIncome: function(){

        if (appData.budgetDay > 1200){
            return('У Вас высокий уровень дохода!');
        } else if(appData.budgetDay > 600 && appData.budgetDay <=1200) {
            return('У Вас средний уровень дохода!');
        } else if(appData.budgetDay > 0 && appData.budgetDay <=600){
            return('К сожалению, Ваш уровень дохода ниже среднего =(');
        } else {
            return('Что-то пошло не так');
        }
    },

    outputData : function(){
        console.log('Наша программа включает в себя данные:');
        for(let key in appData) {
            console.log(key);
            console.log(appData[key]);
        }
    },
};

if(salaryAmount.value === ''){
    startButton.disabled = true;
} else { 
    startButton.disabled = false;
}

startButton.addEventListener('click', appData.start);
plusExpensesButton.addEventListener('click', appData.addExpensesBlock);
plusIncomeButton.addEventListener('click', appData.addIncomeBlock);

periodSelect.addEventListener('change',function(){
    periodAmount.textContent = periodSelect.value;
});

appData.checkAim();