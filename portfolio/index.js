let openedAccordion = Number(sessionStorage.getItem('openedAccordion')) || 0;

document.addEventListener('DOMContentLoaded', () => {
    prepareBurger();
    prepareAccordions();
    prepareModal();
    prepareSlider();
});

function prepareBurger() {
    const burgerMenuOpenBtn = document.querySelector('.burger-btn__open');
    const burgerMenuCloseBtn = document.querySelector('.burger-btn__close');
    const menuPanel = document.querySelector('#menu');

    if (!burgerMenuOpenBtn || !burgerMenuCloseBtn || !menuPanel) {
        return;
    }

    const escapeHandler = (event) => {
        if (event.key === 'Escape') {
            burgerMenuOpenBtn.classList.remove('hide');
            burgerMenuCloseBtn.classList.add('hide');
            menuPanel.classList.remove('open');
            document.body.style.overflow = '';
            document.removeEventListener('keydown', escapeHandler);
        }
    };

    burgerMenuOpenBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        burgerMenuOpenBtn.classList.toggle('hide');
        burgerMenuCloseBtn.classList.toggle('hide');
        menuPanel.classList.toggle('open');
        document.body.style.overflow = document.body.style.overflow === '' ? 'hidden' : '';
        document.addEventListener('keydown', escapeHandler);
    });

    menuPanel.addEventListener('click', (e) => {
        if (e.target.localName !== 'a') {
            e.stopPropagation();
        }
    });

    document.body.addEventListener('click', () => {
        burgerMenuOpenBtn.classList.remove('hide');
        burgerMenuCloseBtn.classList.add('hide');
        menuPanel.classList.remove('open');
        document.body.style.overflow = '';
    });
}

function prepareAccordions() {
    const accordionsParent = document.querySelector('#accordions');
    const accordions = document.querySelectorAll('details[name="faq"]');

    if (!accordionsParent || !accordions) {
        return;
    }

    if (openedAccordion !== -1) {
        accordionsParent.children[openedAccordion].setAttribute('open', '');
    }

    accordions.forEach((accordion) => {
        accordion.addEventListener('toggle', () => {
            const id = Number(accordion.dataset.id);
            if (accordion.open) {
                openedAccordion = id;
            } else if (id === openedAccordion) {
                openedAccordion = -1;
            }
            sessionStorage.setItem('openedAccordion', openedAccordion);
        });
    });
}

function prepareModal() {
    const modalBtnClose = document.querySelector('.modal-btn__close');
    const modalOverlay = document.querySelector('.modal__overlay');
    const modalContent = document.querySelector('.modal__content');
    const orderButtons = document.querySelectorAll('button[data-order]');

    if (!modalBtnClose || !modalOverlay || !modalContent || !orderButtons) {
        return;
    }

    const escapeHandler = (event) => {
        if (event.key === 'Escape') {
            modalOverlay.classList.remove('show');
            document.documentElement.style.overflow = '';
            document.removeEventListener('keydown', escapeHandler);
        }
    };

    orderButtons.forEach((button) => {
        button.addEventListener('click', () => {
            modalOverlay.classList.add('show');
            document.documentElement.style.overflow = 'hidden';
            document.addEventListener('keydown', escapeHandler);
        });
    });

    modalBtnClose.addEventListener('click', (e) => {
        e.stopPropagation();
        modalOverlay.classList.remove('show');
        document.documentElement.style.overflow = '';
    });

    modalOverlay.addEventListener('click', (e) => {
        e.stopPropagation();
        modalOverlay.classList.remove('show');
        document.documentElement.style.overflow = '';
    });

    modalContent.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

function prepareSlider() {
    const leftSlideArea = document.querySelector('.slide__left');
    const rightSlideArea = document.querySelector('.slide__right');
    const container = document.querySelector('.portfolio__gallery');
    const slider = document.querySelector('.slider');

    if (!container || !slider) {
        return;
    }

    const directions = {
        left: -1,
        none: 0,
        right: 1,
    };

    const SLIDE_STEP = 5;
    let animationId;
    let direction = directions.none;

    slider.scrollLeft = (slider.scrollWidth - container.clientWidth) / 2;

    const animateCarousel = () => {
        slider.scrollLeft += direction * SLIDE_STEP;
        if (direction !== directions.none) {
            animationId = requestAnimationFrame(animateCarousel);
        }
    };

    const start = () => {
        if (!animationId) {
            animationId = requestAnimationFrame(animateCarousel);
        }
    };

    const stop = () => {
        cancelAnimationFrame(animationId);
        animationId = null;
    };

    leftSlideArea?.addEventListener('mouseenter', () => {
        direction = directions.left;
        start();
    });

    rightSlideArea?.addEventListener('mouseenter', () => {
        direction = directions.right;
        start();
    });

    leftSlideArea?.addEventListener('mouseleave', () => {
        direction = directions.nothing;
        stop();
    });

    rightSlideArea?.addEventListener('mouseleave', () => {
        direction = directions.nothing;
        stop();
    });
}
