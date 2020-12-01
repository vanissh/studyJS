'use strict';

const isNumber = function(n){
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money;
const start = function(){
    do {
        money = prompt('Ваш доход за месяц?');
    } while (!isNumber(money));
};
start();

const appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 1000000,
    period: 6,
    budget: +money,
    budgetDay: 0,
    itemIncome: 0,
    cashIncome: 0,
    budgetMonth: 0,
    expensesMonth: 0,

    asking: function() {

        if(confirm('Есть ли у Вас дополнительный источник заработка?')){

            do{
                this.itemIncome = prompt('Какой у Вас дополнительный заработок?');
            } while (+this.itemIncome === parseInt(this.itemIncome));

            do {
                this.cashIncome = prompt('Сколько в месяц Вы на этом зарабатываете?');
            } while (!isNumber(this.cashIncome));

            appData.income[this.itemIncome] = this.cashIncome;
        }

        let addExpenses = prompt('Перечислите возможные расходы за' +
            'рассчитываемый период через запятую','Квартплата, проездной, кредит');
        this.addExpenses = addExpenses.toLowerCase().split(', ');

        for(let i = 0; i < this.addExpenses.length; i++){
            this.addExpenses[i] = this.addExpenses[i].charAt(0).toUpperCase() + this.addExpenses[i].substr(1);
        }
        console.log(this.addExpenses.join(', '));

        let sum, question;
        for (let i = 0; i < 2; i++) {

            do{
                question = prompt('Какие обязательные ежемесячные расходы у вас есть?');
            } while (+question === parseInt(question));

            do {
            sum = prompt('Во сколько это обойдется?');
            } while (isNaN(sum));
            appData.expenses[question] = sum;
        }
        return +sum;
    },

    getExpensesMonth: function(){

        let sum1 = 0;
        
        for (let key in appData.expenses){
        sum1 += +appData.expenses[key];
        }
        return sum1;
    },

    getBudget: function(){

        this.budgetMonth = this.budget - this.expensesMonth;  
        this.budgetDay = this.budgetMonth/30;
    },

    getTargetMonth: function(){
        return this.mission/this.budgetMonth;
    },
    
    getInfoDeposit: function (){
        this.deposit = confirm('Есть ли у Вас депозит в банке?');

        if(this.deposit){
            do {
                this.percentDeposit = prompt('Какой годовой процент?','10');
            } while (!isNumber(this.percentDeposit));
            
            do {
                this.moneyDeposit = prompt('Какая сумма заложена?','10000');
            } while (!isNumber(this.moneyDeposit));
            
        }
    },

    calcSavedMoney: function(){
        return this.budgetMonth * this.period;   
    },
    
    checkAim: function(){

        if(this.getTargetMonth() > 0){
            console.log('Цель будет достигнута за', 
            Math.ceil(this.getTargetMonth(), 1),'месяцев');
        } else {
            console.log('Цель не будет достигнута');
        }
    },

    getStatusIncome: function(){

        if (this.budgetDay > 1200){
            return('У Вас высокий уровень дохода!');
        } else if(this.budgetDay > 600 && this.budgetDay <=1200) {
            return('У Вас средний уровень дохода!');
        } else if(this.budgetDay > 0 && this.budgetDay <=600){
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

appData.asking();

appData.expensesMonth = appData.getExpensesMonth();

appData.getBudget();

console.log('Сумма обязательных расходов за месяц:',
appData.expensesMonth,'рублей');

appData.checkAim();

console.log(appData.getStatusIncome());
appData.getInfoDeposit();
appData.outputData();

