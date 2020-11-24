'use strict';

let money = +prompt('Ваш доход за месяц?');
let income = 'фриланс';
let addExpenses = prompt('Перечислите возможные расходы за' +
'рассчитываемый период через запятую','Квартплата, проездной, кредит');
let deposit = confirm('Есть ли у Вас депозит в банке?');
let mission = 1000000;
let period = 6;

let showTypeOf = function(data){
    console.log(data, typeof(data));
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

let expenses1 = prompt('Введите обязательную стaтью расходов');
let amount1 = +prompt('Во сколько Вам это обойдется?');
let expenses2 = prompt('Введите обязательную стaтью расходов');
let amount2 = +prompt('Во сколько Вам это обойдется?');

let getExpensesMonth = function(a, b){
    return a+b;
};

console.log('Сумма обязательных расходов за месяц:',
getExpensesMonth(amount1, amount2),'рублей');

console.log(addExpenses.toLowerCase().split(', '));

let getAccumulatedMonth = function(m, a, b){
    return m - getExpensesMonth(a, b);
};

let accumulatedMonth = getAccumulatedMonth(money, amount1, amount2);

let getTargetMonth = function(mis){
    return mis/accumulatedMonth;
};

console.log('Цель будет достигнута за', 
Math.ceil(getTargetMonth(mission),1),' месяцев');

let budgetDay = accumulatedMonth/30;
console.log('Бюджет на день:', Math.floor(budgetDay, 1),'рублей');

let getStatusIncome = function(){
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



