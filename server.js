document.addEventListener('DOMContentLoaded', () => {
    const burgerMenu = document.getElementById('burger-menu');
    const menu = document.getElementById('menu');
    const menuLinks = menu ? menu.querySelectorAll('a') : [];
    const modal = document.getElementById('gift-modal');
    const modalOverlay = document.getElementById('modal-overlay');
    const closeModalBtn = document.getElementById('close-modal');
    const modalGiftName = document.getElementById('modal-gift-name');
    const modalCategory = document.getElementById('modal-category');
    const modalDescription = document.getElementById('modal-description');
    const modalSuperpowers = document.getElementById('modal-superpowers');

    // BURGER MENU
    if (burgerMenu && menu) {
        burgerMenu.addEventListener('click', () => {
            console.log('Burger menu clicked');
            menu.classList.toggle('active');
            burgerMenu.classList.toggle('open');
            document.documentElement.classList.toggle('no-scroll');
        });

        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('active');
                burgerMenu.classList.remove('open');
                document.documentElement.classList.toggle('no-scroll');
            });
        });
    }

    // SLIDER
    const leftButton = document.getElementById('left-button');
    const rightButton = document.getElementById('right-button');
    const rowSlider = document.getElementById('row-slider');

    let sliderPosition = 0;

    // get the number of clicks needed based on the screen width
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

        // ensure the slider doesn't exceed its boundaries
        const maxPosition = 940 - 400;
        sliderPosition = Math.max(0, Math.min(sliderPosition, maxPosition));

        rowSlider.style.transform = `translateX(-${sliderPosition}px)`;

        // disable buttons if at the extreme position
        leftButton.disabled = sliderPosition <= 0;
        rightButton.disabled = sliderPosition >= maxPosition;
    }

    // event listeners for the buttons
    if (rightButton && leftButton) {
        rightButton.addEventListener('click', () => {
            moveSlider('right');
        });

        leftButton.addEventListener('click', () => {
            moveSlider('left');
        });

        moveSlider('left');
    }

    // recalculate on window resize to ensure proper behavior
    window.addEventListener('resize', () => {
        sliderPosition = Math.min(sliderPosition, calculateMovement() * getSliderClicks());
        moveSlider('left');
    });

    // TIMER
    function updateTimer() {
        const currentTime = new Date();
        const targetDate = new Date('December 31, 2025 00:00:00 UTC');
        const timeRemaining = targetDate - currentTime;

        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            const par = document.getElementById('par');
            const timer = document.getElementById('timer');
            if (par && timer) {
                par.textContent = "Happy New Year!";
                timer.classList.add('hidden');
            }
            return;
        }

        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        const daysElement = document.getElementById('days');
        const hoursElement = document.getElementById('hours');
        const minsElement = document.getElementById('mins');
        const secondsElement = document.getElementById('seconds');

        if (daysElement && hoursElement && minsElement && secondsElement) {
            daysElement.querySelector('h2').textContent = String(days).padStart(2, '0');
            hoursElement.querySelector('h2').textContent = String(hours).padStart(2, '0');
            minsElement.querySelector('h2').textContent = String(minutes).padStart(2, '0');
            secondsElement.querySelector('h2').textContent = String(seconds).padStart(2, '0');
        }
    }

    const timerInterval = setInterval(updateTimer, 1000);
    updateTimer();

    // fetch and display GIFTS from gifts.json file
    fetch('./gifts.json')
        .then(response => response.json())
        .then(data => displayRandomGifts(data))
        .catch(error => console.error("Error loading JSON data:", error));

    // display 4 random gifts
    function displayRandomGifts(gifts) {
        const cardContainer = document.getElementById('card-container');
        if (!cardContainer) return;

        const shuffledGifts = shuffleArray(gifts).slice(0, 4);

        shuffledGifts.forEach(gift => {
            const card = document.createElement('div');
            card.classList.add('card', 'flex-column');

            let categoryColor = '';
            let categoryImage = '';

            switch (gift.category.toLowerCase()) {
                case 'for work':
                    categoryColor = '#4361FF';
                    categoryImage = 'card-img-one';
                    break;
                case 'for harmony':
                    categoryColor = '#FF43F7';
                    categoryImage = 'card-img-three';
                    break;
                case 'for health':
                    categoryColor = '#06A44F';
                    categoryImage = 'card-img-two';
                    break;
                default:
                    categoryColor = 'gray';
                    break;
            }

            card.innerHTML = `
                <div class="card-img ${categoryImage}"></div>
                <div class="card-name flex-column">
                    <h4 class="text-uppercase text-bold text-blue" style="color: ${categoryColor};">${gift.category}</h4>
                    <h3 class="text-uppercase text-secondary">${gift.name}</h3>
                </div>
            `;

            card.addEventListener('click', () => openModal(gift));

            cardContainer.appendChild(card);
        });
    }

    // shuffle function
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // MODAL
    function closeModal() {
        modal.style.display = 'none';
        modalOverlay.style.display = 'none';
        document.documentElement.classList.remove('no-scroll');
    }

    function openModal(gift) {
        // update modal with gift details
        modalGiftName.textContent = gift.name;
        modalCategory.textContent = gift.category;

        // add styles based on the category (adjusting category color and icon)
        let categoryColor = '';
        let categoryImage = '';

        switch (gift.category.toLowerCase()) {
            case 'for work':
                categoryColor = '#4361FF';
                categoryImage = 'assets/gift-for-work.png';
                break;
            case 'for harmony':
                categoryColor = '#FF43F7';
                categoryImage = 'assets/gift-for-harmony.png';
                break;
            case 'for health':
                categoryColor = '#06A44F';
                categoryImage = 'assets/gift-for-health.png';
                break;
            default:
                categoryColor = 'gray';
                categoryImage = 'assets/gift-for-work.png';
        }

        // apply the category color to the modal category
        modalCategory.style.color = categoryColor;

        // insert the category image into the modal image container
        const imageContainer = document.getElementById('modal-image-container');
        const image = document.createElement('img');
        image.src = categoryImage;
        image.alt = gift.name;
        imageContainer.innerHTML = '';
        imageContainer.appendChild(image);

        // update description
        modalDescription.textContent = gift.description;

        // clear previous superpowers and populate them
        modalSuperpowers.innerHTML = '';

        if (gift.superpowers && typeof gift.superpowers === 'object') {
            Object.entries(gift.superpowers).forEach(([key, value]) => {
                const li = document.createElement('li');
                li.textContent = `${key[0].toUpperCase() + key.slice(1, key.length)}: ${value}`;
                modalSuperpowers.appendChild(li);
            });
        } else {
            const li = document.createElement('li');
            li.textContent = 'No superpowers available';
            modalSuperpowers.appendChild(li);
        }

        // make the modal and overlay visible
        modal.style.display = 'block';
        modalOverlay.style.display = 'block';
        document.documentElement.classList.add('no-scroll');
    }

    modalOverlay.addEventListener('click', closeModal);
    closeModalBtn.addEventListener('click', closeModal);

    // close modal on pressing 'X' key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
});
