document.addEventListener('DOMContentLoaded', () => {
    // BURGER MENU
    const burgerMenu = document.getElementById('burger-menu');
    const menu = document.getElementById('menu');
    const menuLinks = menu.querySelectorAll('a');
    const arrowUp = document.getElementById('arrow-up');

    // toggle the active class on the menu and burger icon when the burger menu is clicked
    burgerMenu.addEventListener('click', () => {
        console.log('Burger menu clicked');
        menu.classList.toggle('active');
        burgerMenu.classList.toggle('open');
        document.body.classList.toggle('no-scroll');
    });

    // remove active class when any menu link is clicked & closing the menu
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
            burgerMenu.classList.remove('open');
            document.body.classList.remove('no-scroll');
        });
    });

    // show the "arrow-up" button when scrolling down to 300, and hide it when scrolling up
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            arrowUp.classList.add('visible');
        } else {
            arrowUp.classList.remove('visible');
        }
    });

    // scroll to the top of the page when the "arrow-up" button is clicked
    arrowUp.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    });

    // SLIDER
    const leftButton = document.getElementById('left-button');
    const rightButton = document.getElementById('right-button');
    const rowSlider = document.getElementById('row-slider');

    let sliderPosition = 0;

    // get the screen width and set the number of clicks needed
    function getSliderClicks() {
        const screenWidth = window.innerWidth;

        if (screenWidth >= 769) {
            return 3;
        } else if (screenWidth >= 380) {
            return 6;
        } else {
            return 9;
        }
    }

    // calculate how far the slider should move with each click
    function calculateMovement() {
        const totalWidth = 940;
        const visibleWidth = 400;
        const clicks = getSliderClicks();
        return (totalWidth - visibleWidth) / clicks;
    }

    // move the slider left or right
    function moveSlider(direction) {
        const movement = calculateMovement();

        // calculate the new slider position
        if (direction === 'right') {
            sliderPosition += movement;
        } else if (direction === 'left') {
            sliderPosition -= movement;
        }

        // set the new position of the slider
        rowSlider.style.transform = `translateX(-${sliderPosition}px)`;

        // disable the left button if at the extreme left position
        if (sliderPosition <= 0) {
            leftButton.disabled = true;
        } else {
            leftButton.disabled = false;
        }

        // disable the right button if at the extreme right position
        const maxPosition = (940 - 400);
        if (sliderPosition >= maxPosition) {
            rightButton.disabled = true;
        } else {
            rightButton.disabled = false;
        }
    }

    // add event listeners to the buttons
    rightButton.addEventListener('click', () => {
        moveSlider('right');
    });

    leftButton.addEventListener('click', () => {
        moveSlider('left');
    });

    // set buttons to the starting position
    moveSlider('right');


    // TIMER
    function updateTimer() {
        // get the current time
        const currentTime = new Date();

        // setup the targetdate
        const targetDate = new Date('December 31, 2025 00:00:00 UTC');

        // calculate the time remaining in milliseconds
        const timeRemaining = targetDate - currentTime;

        // ensure that the time remaining is positive, otherwise return early
        if (timeRemaining <= 0) {
            clearInterval(timerInterval); // stop the timer
            document.getElementById('par').textContent = "Happy New Year!"; // show message
            document.getElementById('timer').classList.add('hidden'); // hide the timer
            return;
        }

        // calculate days, hours, minutes, and seconds
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        // format leading zeros
        const daysFormatted = days < 10 ? '0' + days : days;
        const hoursFormatted = hours < 10 ? '0' + hours : hours;
        const minutesFormatted = minutes < 10 ? '0' + minutes : minutes;
        const secondsFormatted = seconds < 10 ? '0' + seconds : seconds;

        // update the DOM elements with the new values (text content inside <h2> tags)
        document.getElementById('days').querySelector('h2').textContent = daysFormatted;
        document.getElementById('hours').querySelector('h2').textContent = hoursFormatted;
        document.getElementById('mins').querySelector('h2').textContent = minutesFormatted;
        document.getElementById('seconds').querySelector('h2').textContent = secondsFormatted;
    }

    // update the timer every 1000 milliseconds
    const timerInterval = setInterval(updateTimer, 1000);

    // call the function
    updateTimer();

});