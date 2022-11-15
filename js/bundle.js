/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calculator.js":
/*!**********************************!*\
  !*** ./js/modules/calculator.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calculator (){
    const result = document.querySelector('.calculating__result span');

         

    let sex,height, weight, age,ratio ;
     
    // заповнення локального сховища за замовчуванням 
        if(localStorage.getItem('sex')){
            sex = localStorage.getItem('sex');
        }else{
            sex = 'female';
            localStorage.setItem('sex', "female");
        }

        if(localStorage.getItem('ratio')){
            sex = localStorage.getItem('ratio');
        }else{
            ratio =1.375;
            localStorage.setItem('ratio', "1.375");
        }


    function initLocalSetting(selector, activeClass){
        const element = document.querySelectorAll(selector);

        element.forEach(elem => {
            elem.classList.remove(activeClass);
            if(elem.getAttribute('id') === localStorage.getItem('sex')){
                elem.classList.add(activeClass);
            }
            if(elem.getAttribute('data-ratio') === localStorage.getItem('ratio')){
                elem.classList.add(activeClass);
            }
        });
    }
    initLocalSetting('#gender', 'calculating__choose-item_active');
    initLocalSetting('.calculating__choose_big', 'calculating__choose-item_active');

     function calcTotal(){
        // перевірка на повну заповненість 
        if (!sex || !height || !weight || !age || !ratio){
            result.textContent = '~~~';
            return;
        }
        if(sex === 'female'){
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else{
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
     }
     calcTotal();
     function getStaticInformation( parentSelector, activeClass){
        const element = document.querySelectorAll(`${parentSelector} div`);
        element.forEach(elem =>{
            elem.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-ratio')){
                    ratio = +e.target.getAttribute('data-ratio');
                    // збереження в локальному сховищі
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));

                }else{
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }
                element.forEach(elem => {
                    elem.classList.remove(activeClass);
                });
                e.target.classList.add(activeClass);

                calcTotal();
            });
        });
        
     } 
     getStaticInformation('#gender', 'calculating__choose-item_active' );
     getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active' );

     function getDynamicInformation(selector){
        const input = document.querySelector(selector);
        input.addEventListener('input', () => {
            // при введені не числа появляється червона рамка
            if (input. value.match(/\D/g)){
                input.style.boxShadow =  '0px 0px 35px -2px rgba(255,0,0,1)';
            }else{
                input.style.boxShadow =  '0px 0px 35px -2px rgba(0,255,0,1)';
            }

            switch(input.getAttribute('id')){
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }
            calcTotal();
        });
        
     }
     getDynamicInformation('#height');
     getDynamicInformation('#weight');
     getDynamicInformation('#age');
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calculator);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards () {
    class MenuCard{
        constructor(src, alt, title, descr ,price, parentSelector, ...classes){
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.classes = classes;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }
        render() {
            // якщо не буде переданий клас встановлюється параметр за замовчуванням menu__item
            const element = document.createElement('div');

            if (this.classes.length === 0) { 
                this.element = 'menu__item';
                element.classList.add();
            } else {
                this.classes.forEach(className => element.classList.add(className));
            }
            
            element.innerHTML =`
            <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Price:</div>
                <div class="menu__item-total"><span>${this.price}</span> UAH/day</div>
            </div>
            `;
            this.parent.append(element);
        }
    } 
    
// створює стільки обєктів скільки масивів буде в базі даних menu, код сам верішує скільки буде запусків  
    // getResource('http://localhost:3000/menu')
        // .then(data => {
        //     data.forEach(({img, altimg, title, descr, price}) =>{
        //         new MenuCard(img, altimg, title, descr, price, '.menu .container', 'menu__item').render();
        //     });
        // });
// використовуємо Axios бібліотеку
    axios.get("http://localhost:3000/menu")
    .then(data => {
        data.data.forEach(({img, altimg, title, descr, price}) =>{
            new MenuCard(img, altimg, title, descr, price, '.menu .container', 'menu__item').render();
        });
    });
// виклик обєкту лише один раз 
    // new MenuCard(
    //     "img/tabs/vegy.jpg",
    //     "vegy",
    //     'Menu "Fitness"',
    //     'Menu "Fitness" is a new approach to cooking: more fresh vegetables and fruits. Product of active and healthy people. This is a brand new product with the best price and high quality!',
    //     10,
    //     '.menu .container',
    //     'menu__item'
    // ).render();
    // new MenuCard(
    //     "img/tabs/elite.jpg",
    //     "elite",
    //     'Menu “Premium”',
    //     'In the “Premium” menu, we use not only beautiful packaging design, but also high-quality execution of dishes. Red fish, seafood, fruits - a restaurant menu without going to a restaurant!',
    //     20,
    //     '.menu .container',
    //     'menu__item'
    // ).render();
    // new MenuCard(
    //     "img/tabs/post.jpg",
    //     "post",
    //     '"Lenten" menu',
    //     'The Lenten menu is a careful selection of ingredients: the complete absence of animal products, milk from almonds, oats, coconut or buckwheat, the right amount of protein from tofu and imported vegetarian steaks.',
    //     15,
    //     '.menu .container',
    //     'menu__item'
    // ).render();

}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/form.js":
/*!****************************!*\
  !*** ./js/modules/form.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");

 


function form (formSelector, modalTimerId){
    const forms = document.querySelectorAll(formSelector);

        const message ={
            loading: 'img/form/spinner.svg',
            success: 'Thank you, we will contact you soon',
            failure: 'Soo... we have a problem'

        };

        forms.forEach(item =>{
            bindPostData(item);
        });

        

        function bindPostData(form){
            form.addEventListener('submit', (e) => {
                e.preventDefault();

                const statusMessage = document.createElement('img');
                statusMessage.src = message.loading;
                statusMessage.style.cssText = `
                    display: block;
                    margin: 0 auto;
                `;
                // поміщаємо спінер під форму 
                form.insertAdjacentElement('afterend', statusMessage);

                const formData = new FormData(form); 

                const json = JSON.stringify(Object.fromEntries(formData.entries()));

                     (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)(' http://localhost:3000/requests',json)
                     .then(data => {
                        console.log(data);
                        showThanksModal(message.success);
                        setTimeout(() => {
                        statusMessage.remove();
                     }).catch(() => {
                        showThanksModal(message.failure);
                     }).finally(() =>{
                        form.reset();
                     });
                  });
            });
        }
        // редизайн форми 
         function showThanksModal(message){
            const prevModalDialog = document.querySelector('.modal__dialog');

            prevModalDialog.classList.add('hide');
            (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal',modalTimerId);
            const thanksModal = document.createElement('div');
                thanksModal.classList.add('modal__dialog');
                thanksModal.innerHTML = `
                <div class = "modal__content">
                    <div class = "modal__close" data-close>&times;</div>
                    <div class= "modal__title">${message}</div>
                </div>
                `;

            document.querySelector('.modal').append(thanksModal);
            setTimeout(() =>{
                thanksModal.remove();
                prevModalDialog.classList.add('show');
                prevModalDialog.classList.remove('hide');
                (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
            }, 4000);
         }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (form);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "openModal": () => (/* binding */ openModal)
/* harmony export */ });
function closeModal(modalSelector){
    const modal = document.querySelector(modalSelector);
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}
function openModal(modalSelector, modalTimerId){
    const modal = document.querySelector(modalSelector);
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
    // якщо користувавч відкрив вже модальне вікно очищуємо інтервал 
    if (modalTimerId){
        clearInterval(modalTimerId);
    }
    
}

function modal ( triggerSelector, modalSelector, modalTimerId) {
    const modalTrigger = document.querySelectorAll(triggerSelector),
    modal = document.querySelector(modalSelector);
// привязка відкриття мождального вікна до декіькох елементів

modalTrigger.forEach(btn => {
    btn.addEventListener('click',() =>  openModal(modalSelector, modalTimerId));
});
// закриття модального вікна 


    // закриття модального вікна по кліку за територією діалогового вікна 
    modal.addEventListener('click', (e) => {
        if (e.target == modal || e.target.getAttribute('data-close')==''){
            closeModal(modalSelector);
        }
    });
     // закриття модального вікна по кліку на esc 
     document.addEventListener('keydown', (e) => {
        if (e.code === "Escape" && modal.classList.contains('show')){
            closeModal(modalSelector);
        }
     });

// виклик модального вікна якщо сторінка догорнута докінця 
    function showModalByScroll(){
        if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1){
            openModal(modalSelector, modalTimerId);
            // функція видаляється після першого виклику 
            window.removeEventListener('scroll', showModalByScroll);
        }
    }
     window.addEventListener('scroll', showModalByScroll);


}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider ({container, slide, nextArrow, prewArrow, totalCounter, currentCounter, wrapper, field}){

    const slides = document.querySelectorAll(slide),
    slider  = document.querySelector(container),
    prev = document.querySelector(prewArrow),
    next = document.querySelector(nextArrow),
    total =  document.querySelector(totalCounter),
    current = document.querySelector(currentCounter),
    slidesWraper = document.querySelector(wrapper),
    slidesField = document.querySelector(field),
    width = window.getComputedStyle(slidesWraper).width;
let slideIndex = 1;
let offset= 0;
// ------------------------------------------------------------------------ slider 2 start 
if(slides.length < 10){
    total.textContent = `0${slides.length}`;
    current.textContent =`0${slideIndex}`;
}else{
   total.textContent = slides.length;
   current.textContent = slideIndex;
    }

    slidesField.style.width = 100 * slides.length + '%';
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';

    slidesWraper.style.overflow = 'hidden';

    slides.forEach(slide => {
       slide.style.width = width;
    });

        // крапки на слайдерах 
        slider.style.position =  'relative';
        const indicators = document.createElement('ol'),
           dots = [];
        indicators.classList.add('carousel-indicators');
        indicators.style.cssText =`
           position: absolute;
           right: 0;
           bottom: 0;
           left: 0;
           z-index: 15;
           display: flex;
           justify-content: center;
           margin-right: 15%;
           margin-left: 15%;
           list-style: none;
        `;
        slider.append(indicators);

        for(let i = 0; i < slides.length; i++){
           const dot = document.createElement('li');
           dot.setAttribute('data-slide-to', i + 1);
           dot.style.cssText = `
               box-sizing: content-box;
               flex: 0 1 auto;
               width: 30px;
               height: 6px;
               margin-right: 3px;
               margin-left: 3px;
               cursor: pointer;
               background-color: #fff;
               background-clip: padding-box;
               border-top: 10px solid transparent;
               border-bottom: 10px solid transparent;
               opacity: .5;
               transition: opacity .6s ease;
           `;
           if (i == 0){
               dot.style.opacity = 1;
           }
           indicators.append(dot);
           dots.push(dot);
        }
   function addZerov () {
       if(slides.length < 10){
           current.textContent = `0${slideIndex}`;
       }else{
           current.textContent = slideIndex;
       }
   }
   function changeOpacity (){
       dots.forEach(dot => dot.style.opacity = '.5');
       dots[slideIndex - 1].style.opacity = '1';
   }
   function deleteNotDigits(text){
       return +text.replace(/\D/g, ''); 
   }
    next.addEventListener('click', () =>{
       if (offset == deleteNotDigits(width) * (slides.length - 1)){
           offset = 0;
       } else {
           offset += deleteNotDigits(width);
       }
       slidesField.style.transform = `translateX(-${offset}px)`;
       if(slideIndex == slides.length){
           slideIndex = 1;
       }else{
           slideIndex++;
       }
       addZerov();
       changeOpacity (); 

    });
    prev.addEventListener('click', () =>{
       if (offset == 0){
           offset = deleteNotDigits(width) * (slides.length - 1);
       } else {
           offset -= deleteNotDigits(width);
       }
       slidesField.style.transform = `translateX(-${offset}px)`;
       if(slideIndex == 1){
           slideIndex = slides.length;
       }else{
           slideIndex--;
       }
       addZerov();
       changeOpacity ();

    });

    dots.forEach(dot =>{
       dot.addEventListener('click', (e) =>{
           const slideTo = e.target.getAttribute('data-slide-to');

           slideIndex = slideTo;
           offset = deleteNotDigits(width) * (slideTo - 1);

           slidesField.style.transform = `translateX(-${offset}px)`;

         
           addZerov();
           changeOpacity ();


       });
    });
    // -------------------------------------------------------------- slider 2 end
   //  ініціалізуємо, починаємо роботу з 1 слайдера 
// showSlides(slideIndex);
//  if(slides.length < 10){
//     total.textContent = `0${slides.length}`;
//  }else{
//     total.textContent = slides.length;
//  }
// function showSlides(n){
//     // перевірка на межі закіньчення слайдерів щоб йшло все по кругу  
//     if (n > slides.length){
//         slideIndex = 1;
//     }
//     if (n < 1){
//         slideIndex = slides.length;
//     }
//     // ховаємо всі слайдери залишаємо лише один 
//     slides.forEach(item => item.style.display = 'none');

//     slides[slideIndex - 1].style.display = 'block';

//     if(slides.length < 10){
//         current.textContent = `0${slideIndex}`;
//      }else{
//         current.textContent = slideIndex;
//      }

//   }

//     function plusSlides(n){
//         showSlides(slideIndex += n);
//     }

//     prev.addEventListener('click', () =>{
//         plusSlides(-1);
//     });
//     next.addEventListener('click', () =>{
//         plusSlides(1);
//     });
//  ------------------------  slider 1 - end
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs (tabsSelector, tabsContentSelector, tabsParentSelector, activeClass){
        const tabs = document.querySelectorAll(tabsSelector),
        tabsContent = document.querySelectorAll(tabsContentSelector),
        tabsParent = document.querySelector(tabsParentSelector);

    // Ховаємо всі елементи табів 

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        // видаляємо клас активності 

        tabs.forEach(item => {
            item.classList.remove(activeClass);
        });
    }

    // показуємо наші елементи присвоюючи display = 'block'
    // параметр за замовчуванням 0

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show' , 'fade');
        tabsContent[i].classList.remove('hide');
        // додаємо клас активності для показу елементу

        tabs[i].classList.add(activeClass);
    }


    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (e) => {
        const target = e.target;

        // перевірка що дійсно натиснули на елемент а не на його батька

        if (target && target.classList.contains(tabsSelector.slice(1))) {

            //визначаємо номер нашого елементу серед всіх табів і по цьому номеру викликаємо функцію showTabContent

            tabs.forEach((item, i) => {

                // якщо елемент на якого ми натискаємо є елементом який ми перебираємо в циклі ми викликаємо функції

                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/time.js":
/*!****************************!*\
  !*** ./js/modules/time.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function time (id, deadline) {
    function getTimeRemaining(endTime){
        let days, hours, minutes, seconds;
        const t = Date.parse(endTime) - Date.parse(new Date());
        if(t <= 0) {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0; 
        } else {
            days = Math.floor((t / (1000 * 60 * 60 * 24)));
            seconds = Math.floor(( t / 1000) % 60);
            minutes = Math.floor(( t / 1000 / 60) % 60);
            hours = Math.floor((t / (1000 * 60 * 60 ) % 24));
        }
        


        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }
    //підставка 0 якщо число менше 10
        function getZero(num){
        if(num >= 0 && num < 10){
            return `0${num}`;
        }else{
            return num;
        }
    }
    // виявляємо елементи
    function setClock(selector, endTime){
        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
    // інтервал в 1хв 
            timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemaining(endTime);

                days.innerHTML = getZero(t.days) ;
                hours.innerHTML = getZero(t.hours);
                minutes.innerHTML = getZero(t.minutes);
                seconds.innerHTML = getZero(t.seconds);

                if(t.total <= 0){
                    clearInterval(timeInterval);
                }
            }
    } 
    setClock(id, deadline);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (time);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getResource": () => (/* binding */ getResource),
/* harmony export */   "postData": () => (/* binding */ postData)
/* harmony export */ });
const postData = async (url, data) =>{
    const res = await fetch(url, {
        method: "POST",
            headers: {'Content-type': 'application/json'},
            body: data
           
    });

    return await res.json();

};


const getResource = async (url) =>{
    const res = await fetch(url);
    // запобігає помилок 404 500-2 (http(s) - запитів)
    if (!res.ok){
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();

};




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_form__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/form */ "./js/modules/form.js");
/* harmony import */ var _modules_time__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/time */ "./js/modules/time.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_calculator__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calculator */ "./js/modules/calculator.js");










window.addEventListener('DOMContentLoaded', () => {
    // виклик модального вікна з плином часу 
    const modalTimerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.openModal)('.modal', modalTimerId), 50000);
      

        (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])('.tabheader__item','.tabcontent','.tabheader__items','tabheader__item_active');
        (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])('[data-modal]','.modal', modalTimerId);
        (0,_modules_cards__WEBPACK_IMPORTED_MODULE_2__["default"])();
        (0,_modules_form__WEBPACK_IMPORTED_MODULE_3__["default"])('form', modalTimerId);
        (0,_modules_time__WEBPACK_IMPORTED_MODULE_4__["default"])('.timer', '2023-02-02');
        (0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__["default"])({
            container: '.offer__slider',
            slide: '.offer__slide',
            nextArrow: '.offer__slider-next',
            prewArrow: '.offer__slider-prev',
            totalCounter: '#total',
            currentCounter: '#current',
            wrapper: '.offer__slider-wrapper',
            field: '.offer__slider-inner'
        });
        (0,_modules_calculator__WEBPACK_IMPORTED_MODULE_6__["default"])();
        
        
    });
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map