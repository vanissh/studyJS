'use strict';

let money = 123456789000000;
let income = 'фриланс';
let addExpenses = 'Интернет, Такси, Коммуналка';
let deposit = true;
let mission = 1000000;
let period = 6;

console.log(typeof(money));
console.log(typeof(income));
console.log(typeof(deposit));

console.log(addExpenses.length);

console.log('Период равен', period, 'месяцев');
console.log('Цель заработать', mission, 'рублей');

console.log(addExpenses.toLowerCase().split(', '));

let budgetDay = money/30;
console.log('Бюджет на день:',budgetDay);

money = +prompt('Ваш месячный доход?');
addExpenses = prompt('Перечислите возможные расходы за' +
'рассчитываемый период через запятую','Квартплата, проездной, кредит');

deposit = prompt('Есть ли у Вас депозит в банке?','Да/нет');
if (deposit.toLowerCase() === 'да'){
    deposit = true;
} else {
    deposit = false;
}

let expenses1 = prompt('Введите обязательную стaтью расходов');
let amount1 = +prompt('Во сколько Вам это обойдется?');

let expenses2 = prompt('Введите обязательную стaтью расходов');
let amount2 = +prompt('Во сколько Вам это обойдется?');

let budgetMonth = money - (amount1 + amount2);
console.log('Бюджет на месяц:', budgetMonth);

console.log('Цель будет достигнута за:', Math.ceil(mission/budgetMonth, 1),'месяцев');

budgetDay = budgetMonth/30;
console.log('Бюджет на день:', Math.floor(budgetDay, 1));

if (budgetDay > 1200){
    console.log('У Вас высокий уровень дохода!');
} else if(budgetDay > 600) {
    console.log('У Вас средний уровень дохода!');
} else if(budgetDay > 0){
    console.log('К сожалению, Ваш уровень дохода ниже среднего =(');
} else {
    console.log('Что-то пошло не так');
}



















