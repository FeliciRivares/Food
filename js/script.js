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
});