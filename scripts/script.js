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
console.log('Цель заработать', mission, 'биткоинов');

console.log(addExpenses.toLowerCase().split(', '));

let budgetDay = money/30;
console.log(budgetDay);