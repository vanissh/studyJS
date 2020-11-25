'use strict';

const isNumber = function(n){
    return !isNaN(parseFloat(n)) && isFinite(n);
};

let money;
const income = 'фриланс';
const addExpenses = prompt('Перечислите возможные расходы за' +
'рассчитываемый период через запятую','Квартплата, проездной, кредит');
const deposit = confirm('Есть ли у Вас депозит в банке?');
const mission = 1000000;
const period = 6;

let expenses = [];
let number = [];

const start = function(){
    do {
        money = prompt('Ваш доход за месяц?');
    } while (!isNumber(money));
};
start();

const showTypeOf = function(data){
    console.log(data, typeof(data));
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

console.log(addExpenses.toLowerCase().split(', '));

const getExpensesMonth = function(){
    let sum = 0;
    for(let i = 0; i < 2; i++){

        expenses[i] = prompt('Введите обязательную стaтью расходов');

        do {
            number[i] = prompt('Во сколько Вам это обойдется?');
        } while (!isNumber(number[i]));
        sum += +number[i];

    }
    return sum;
};

let expensesAmount = getExpensesMonth();

console.log('Сумма обязательных расходов за месяц:',
expensesAmount,'рублей');

const getAccumulatedMonth = function(m){
    return m - expensesAmount;
};

const accumulatedMonth = getAccumulatedMonth(money);

const getTargetMonth = function(mis){
    return mis/accumulatedMonth;
};
const targetMonth = Math.ceil(getTargetMonth(mission),1);

const checkAim = function(){
    if(targetMonth > 0){
        console.log('Цель будет достигнута за', targetMonth,' месяцев');
    } else {
        console.log('Цель не будет достигнута');
    }
};

checkAim();

const budgetDay = accumulatedMonth/30;
console.log('Бюджет на день:', Math.floor(budgetDay, 1),'рублей');

const getStatusIncome = function(){
if (budgetDay > 1200){
    return('У Вас высокий уровень дохода!');
} else if(budgetDay > 600) {
    return('У Вас средний уровень дохода!');
} else if(budgetDay > 0){
    return('К сожалению, Ваш уровень дохода ниже среднего =(');
} else {
    return('Что-то пошло не так');
}
};
console.log(getStatusIncome());
