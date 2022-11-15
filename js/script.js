import tabs  from './modules/tabs';
import modal  from './modules/modal';
import cards  from './modules/cards';
import form  from './modules/form';
import time  from './modules/time';
import slider  from './modules/slider';
import calculator  from './modules/calculator';
import {openModal} from './modules/modal';


window.addEventListener('DOMContentLoaded', () => {
    // виклик модального вікна з плином часу 
    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 50000);
      

        tabs('.tabheader__item','.tabcontent','.tabheader__items','tabheader__item_active');
        modal('[data-modal]','.modal', modalTimerId);
        cards();
        form('form', modalTimerId);
        time('.timer', '2023-02-02');
        slider({
            container: '.offer__slider',
            slide: '.offer__slide',
            nextArrow: '.offer__slider-next',
            prewArrow: '.offer__slider-prev',
            totalCounter: '#total',
            currentCounter: '#current',
            wrapper: '.offer__slider-wrapper',
            field: '.offer__slider-inner'
        });
        calculator();
        
        
    });