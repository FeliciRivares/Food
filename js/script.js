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

});