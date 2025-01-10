document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('#tabs a');
    const cardContainer = document.getElementById('card-container');
    const burgerMenu = document.getElementById('burger-menu');
    const menu = document.getElementById('menu');
    const menuLinks = menu.querySelectorAll('a');
    const arrowUp = document.getElementById('arrow-up');
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

    // ARROW UP
    arrowUp.classList.remove('visible');

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

    // fetch data from the JSON file
    fetch('./gifts.json')
        .then(response => response.json())
        .then(data => {
            // display all gifts
            displayGifts(data);

            // Ffilter gifts by category
            tabs.forEach(tab => {
                tab.addEventListener('click', (event) => {
                    event.preventDefault();

                    // remove active class from all tabs
                    tabs.forEach(tab => tab.classList.remove('active'));

                    // add active class to clicked tab
                    tab.classList.add('active');

                    // filter gifts based on the clicked tab
                    const category = tab.textContent.trim().toLowerCase();

                    if (category === 'all') {
                        displayGifts(data);
                    } else {
                        const filteredGifts = data.filter(gift => gift.category.toLowerCase() === category);
                        displayGifts(filteredGifts);
                    }
                });
            });
        })
        .catch(error => console.error("Error loading JSON data:", error));

    // function to display gifts in the card container
    function displayGifts(gifts) {
        cardContainer.innerHTML = '';

        // go through the gifts and create a card for each one
        gifts.forEach(gift => {
            const card = document.createElement('div');
            card.classList.add('card', 'flex-column');

            // set category color and image based on gift category
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

            // add card content
            card.innerHTML = `
                <div class="card-img ${categoryImage}"></div>
                <div class="card-name flex-column">
                    <h4 class="text-uppercase text-bold text-blue" style="color: ${categoryColor};">${gift.category}</h4>
                    <h3 class="text-uppercase text-secondary">${gift.name}</h3>
                </div>
            `;

            // add event listener to open the modal when the card is clicked
            card.addEventListener('click', () => openModal(gift));

            // add card to container
            cardContainer.appendChild(card);
        });
    }

    // MODAL
    function closeModal() {
        modal.style.display = 'none';
        modalOverlay.style.display = 'none';
        document.documentElement.classList.remove('no-scroll');
    }

    function openModal(gift) {
        console.log("Gift Object:", gift);
        console.log("Superpowers:", gift.superpowers);

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
        console.log("Before adding superpowers:", modalSuperpowers.innerHTML);

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

        console.log("After adding superpowers:", modalSuperpowers.innerHTML);

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