class Menu {
    constructor(navWrap)
    {
        this.navWrap = navWrap;

        this.addEvent();
    }

    addEvent()
    {
        this.navWrap.querySelector('.bar_container').addEventListener('click', () => {
            this.toggleNav();
        });

        this.navWrap.querySelectorAll('.nav__link').forEach(element => {
            element.addEventListener('click', () => {
                this.toggleNav();
            });
        });
    }

    toggleNav()
    {
        document.querySelector('.main').classList.toggle('nav-active');

        document.querySelector('body').classList.toggle('disabled-scroll');

        this.navWrap.querySelector('.bar_container').classList.toggle('close');

        this.navWrap.querySelector('.nav').classList.toggle('active');
    }
}

new Menu(document.querySelector('.nav_wrap'));


class Calendar {
    constructor(calendar)
    {
        this.calendar = calendar;

        this.addEvent();
    }

    addEvent()
    {
        this.calendar.querySelectorAll('.calendar-day').forEach(element => {
            element.addEventListener('click', (event) => {
                this.setDay(event);
            });
        });
    }

    setDay(event)
    {
        const selectedDate =  document.querySelector('.selected_date_day');
        const date = this.parseDate(event.target.getAttribute('data-date'));

        if (event.target.classList.contains('calendar-disabled')) {
            return false;
        }

        document.querySelector('#date_day').value = event.target.getAttribute('data-date');

        this.calendar.querySelectorAll('.calendar-day').forEach(element => {
            element.classList.remove('active');
        });

        event.target.classList.add('active');

        selectedDate.textContent = 'Wybrana data: ' + date;
        selectedDate.classList.remove('hidden');
    }

    parseDate(date)
    {
        date = new Date(date);
        let day = date.getDate();
        let month = date.getMonth() + 1;
        const year = date.getFullYear();
        
        if (day < 10) {
          day = '0' + day
        }
        if (month < 10) {
          month = '0' + month
        }
        
        return day + '.' + month + '.' + year;
    }
}

class Booking {
    constructor(booking)
    {
        this.booking = booking;

        this.addEvent();
    }

    addEvent()
    {
        this.booking.querySelectorAll('.next-step').forEach(element => {
            element.addEventListener('click', (event) => {
                this.getStep(event);
            });
        });
    }

    getStep(event)
    {
        const stepsView = this.booking.querySelectorAll('.step_view');
        const stepsPoints = this.booking.querySelectorAll('.step');
        const stepDone = event.target.getAttribute('data-step-done');

        stepsView.forEach(element => {
            element.classList.add('hidden-step');
        });

        stepsPoints.forEach((element, index) => {
            
            element.classList.remove('active');
    
            if (index - 1 == stepDone) {
                element.classList.add('active');
            }

            element.classList.add('done');

            if (index > stepDone) {
                element.classList.remove('done');
            }
        });

        this.booking.querySelector(event.target.getAttribute('data-step')).classList.remove('hidden-step');
    }
}

new Booking(document.querySelector('.book__modal'));

class Modal {
    constructor(modalOpenBtn) {
        this.modalOpenBtn = modalOpenBtn;
        this.modalCloseBtn = document.querySelectorAll('.modal__close');
        this.modals = document.querySelectorAll('.modal');
        this.modal = null;

        this.init();
    }

    init() {
        this.addEvent();
    }

    addEvent() {
        this.modalOpenBtn.forEach((btn) => {
            btn.addEventListener('click', (event) => {
                this.openModal(event);
            });
        });

        this.modalCloseBtn.forEach((btn) => {
            btn.addEventListener('click', (event) => {
                this.closeModal(event);
            });
        });

        this.modals.forEach((modal) => {
            modal.addEventListener('click', (event) => {
                if (event.currentTarget !== event.target) {
                    return false;
                }

                this.closeModal(event);
            });
        });

        document.addEventListener('keydown', (event) => {
            if (event.keyCode !== 27) {
                return false;
            }

            this.closeModal();
        });
    }

    openModal(event) {
        const modal = document.querySelector(event.target.getAttribute('data-modal'));

        this.modal = modal;

        document.querySelector('body').classList.add('disabled-scroll');

        modal.classList.add('show-modal');
    }

    closeModal() {
        this.modal.classList.remove('show-modal');

        document.querySelector('body').classList.remove('disabled-scroll');
    }
}

new Modal(document.querySelectorAll('.moda__btn'));