document.addEventListener('DOMContentLoaded', () => {
    // BURGER MENU
    const burgerMenu = document.getElementById('burger-menu');
    const menu = document.getElementById('menu');
    const menuLinks = menu.querySelectorAll('a');
    const arrowUp = document.getElementById('arrow-up');

    // toggle the active class on the menu and burger icon when the burger menu is
    // clicked
    burgerMenu.addEventListener('click', () => {
        console.log('Burger menu clicked');
        menu
            .classList
            .toggle('active');
        burgerMenu
            .classList
            .toggle('open');
        document
            .body
            .classList
            .toggle('no-scroll'); // stop scrolling when menu is active
    });

    // remove active class when any menu link is clicked & closing the menu
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            menu
                .classList
                .remove('active');
            burgerMenu
                .classList
                .remove('open');
            document
                .body
                .classList
                .remove('no-scroll');
        });
    });

    // show the "arrow-up" button when scrolling down to 300, and hide it when
    // scrolling up
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            arrowUp
                .classList
                .add('visible');
        } else {
            arrowUp
                .classList
                .remove('visible');
        }
    });

    // scroll to the top of the page when the "arrow-up" button is clicked
    arrowUp.addEventListener('click', () => {
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
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
});
