'use strict';

const books = document.querySelectorAll('.book');
const adv = document.querySelector('.adv');

const secBookElem = books[0].querySelectorAll('li');
const fifBookElem = books[5].querySelectorAll('li');
const sixBookElem = books[2].querySelectorAll('li');

const chapter = document.createElement('li');
const img = document.querySelector('body');

img.style.backgroundImage = "url('image/you-dont-know-js.jpg')";
adv.remove();

books[0].before(books[1]);
books[5].after(books[2]);
books[4].after(books[3]); 

books[4].querySelector('a').innerText = 'Книга 3. this и Прототипы Объектов';

secBookElem[1].after(secBookElem[3]);
secBookElem[3].after(secBookElem[6]);
secBookElem[6].after(secBookElem[8]);
secBookElem[10].before(secBookElem[2]);

fifBookElem[1].after(fifBookElem[9]);
fifBookElem[4].after(fifBookElem[2]);
fifBookElem[8].before(fifBookElem[5]);

chapter.innerHTML = 'Глава 8: За пределами ES6';
sixBookElem[9].before(chapter);
