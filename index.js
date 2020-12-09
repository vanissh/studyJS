'use strict';

function DomElement (selector, height, width, bg, fontSize){
    this.selector = selector;
    this.height =  height;
    this.width = width;
    this.bg = bg;
    this.fontSize = fontSize;
}

DomElement.prototype.createDomElement = function(){
    let newElement;

    if(this.selector.substring(0, 1) === '.'){
        newElement = document.createElement('div');
        newElement.classList = this.selector.slice(1);
    }

    if(this.selector.substring(0, 1) === '#'){
        newElement = document.createElement('p');
        newElement.id = this.selector.slice(1);      
    }
    newElement.textContent = this.textContent;  
    
    newElement.style.cssText = `
    background: ${this.bg};
    height: ${this.height};
    width: ${this.width};
    font-size: ${this.fontSize};
    `
    ;
    document.body.append(newElement);
};

let newEl = new DomElement('#best', '500px', '500px', 'green', '50px');
newEl.textContent = 'element with id';

newEl.createDomElement();