// -------------------------------------таби------------------------------------

window.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

    // Ховаємо всі елементи табів 

    function hideTabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        // видаляємо клас активності 

        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    // показуємо наші елементи присвоюючи display = 'block'
    // параметр за замовчуванням 0

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show' , 'fade');
        tabsContent[i].classList.remove('hide');
        // додаємо клас активності для показу елементу

        tabs[i].classList.add('tabheader__item_active');
    }


    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click', (e) => {
        const target = e.target;

        // перевірка що дійсно натиснули на елемент а не на його батька

        if (target && target.classList.contains('tabheader__item')) {

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

    //-------------------------------- Робота з таймером------------------------------------
    // початкова дата

    const deadline = '2023-05-20';
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
    setClock('.timer', deadline);
    // -------------------------модальне вікно---------------------------
    const modalTrigger = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal'),
        modalCloseBtn = document.querySelector('[data-close]');
    // привязка відкриття мождального вікна до декіькох елементів
    function openModal(){
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        // якщо користувавч відкрив вже модальне вікно очищуємо інтервал 
        clearInterval(modalTimerId);
    }
    modalTrigger.forEach(btn => {
        btn.addEventListener('click',openModal);
    });
    // закриття модального вікна 
    function closeModal(){
        modal.classList.add('hide');
        modal.classList.remove('show');
        document.body.style.overflow = '';
    }
        modalCloseBtn.addEventListener('click', closeModal);
        // закриття модального вікна по кліку за територією діалогового вікна 
        modal.addEventListener('click', (e) => {
            if (e.target == modal){
                closeModal();
            }
        });
         // закриття модального вікна по кліку на esc 
         document.addEventListener('keydown', (e) => {
            if (e.code === "Escape" && modal.classList.contains('show')){
                closeModal();
            }
         });
    // виклик модального вікна з плином часу 
        //  const modalTimerId = setTimeout(openModal, 5000);
    // виклик модального вікна якщо сторінка догорнута докінця 
        function showModalByScroll(){
            if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight -1){
                openModal();
                // функція видаляється після першого виклику 
                window.removeEventListener('scroll', showModalByScroll);
            }
        }
         window.addEventListener('scroll', showModalByScroll);




        // класи карточок
        class MenuCard{
            constructor(src, alt, title, descr ,price, parentSelector){
                this.src = src;
                this.alt = alt;
                this.title = title;
                this.descr = descr;
                this.price = price;
                this.parent = document.querySelector(parentSelector);
                this.transfer = 27;
                this.changeToUAH();
            }

            changeToUAH() {
                this.price = this.price * this.transfer;
            }
            render() {
                const element = document.createElement('div');
                element.innerHTML =`
                <div class="menu__item">
                <img src=${this.src} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.descr}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Price:</div>
                    <div class="menu__item-total"><span>${this.price}</span> UAH/day</div>
                </div>
            </div>
                `;
                this.parent.append(element);
            }
        } 
        // виклик обєкту лише один раз 
        new MenuCard(
            "img/tabs/vegy.jpg",
            "vegy",
            'Menu "Fitness"',
            'Menu "Fitness" is a new approach to cooking: more fresh vegetables and fruits. Product of active and healthy people. This is a brand new product with the best price and high quality!',
            10,
            '.menu .container'
        ).render();
        new MenuCard(
            "img/tabs/elite.jpg",
            "elite",
            'Menu “Premium”',
            'In the “Premium” menu, we use not only beautiful packaging design, but also high-quality execution of dishes. Red fish, seafood, fruits - a restaurant menu without going to a restaurant!',
            20,
            '.menu .container'
        ).render();
        new MenuCard(
            "img/tabs/post.jpg",
            "post",
            '"Lenten" menu',
            'The Lenten menu is a careful selection of ingredients: the complete absence of animal products, milk from almonds, oats, coconut or buckwheat, the right amount of protein from tofu and imported vegetarian steaks.',
            15,
            '.menu .container'
        ).render();
});