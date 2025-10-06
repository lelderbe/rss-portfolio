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

    burgerMenuOpenBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        burgerMenuOpenBtn.classList.toggle('hide');
        burgerMenuCloseBtn.classList.toggle('hide');
        menuPanel.classList.toggle('open');
        document.body.style.overflow = document.body.style.overflow === '' ? 'hidden' : '';
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

    orderButtons.forEach((button) => {
        button.addEventListener('click', () => {
            modalOverlay.classList.add('show');
            document.documentElement.style.overflow = 'hidden';
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
    console.log(leftSlideArea);
    let id;
    let scrollBy = 0;
    let isDesktop = false;

    const mediaQuery = window.matchMedia('(max-width: 1439px)');
    isDesktop = !mediaQuery.matches;

    if (!isDesktop) {
        container.scrollLeft = (slider.scrollWidth - container.clientWidth) / 2;
    }

    leftSlideArea.addEventListener('mouseenter', () => {
        id = setInterval(() => {
            const rect = slider.getBoundingClientRect();
            const leftBeyondAmount = Math.max(0, -rect.left);
            scrollBy += Math.min(leftBeyondAmount, 10);
            slider.style.transform = `translateX(${scrollBy}px)`;
        }, 30);
    });

    rightSlideArea.addEventListener('mouseenter', () => {
        id = setInterval(() => {
            const rect = slider.getBoundingClientRect();
            const rightBeyondAmount = Math.max(0, rect.right - window.innerWidth);
            scrollBy -= Math.min(rightBeyondAmount, 10);
            slider.style.transform = `translateX(${scrollBy}px)`;
        }, 30);
    });

    leftSlideArea.addEventListener('mouseleave', () => {
        clearInterval(id);
    });

    rightSlideArea.addEventListener('mouseleave', () => {
        clearInterval(id);
    });
}

// console.log(`
//    ----------------------------
//  <  Я эксперт в своей области   >
//    ----------------------------
//           \\   ^__^
//            \\  (oo)\\_______
//               (__)\\       )\/\\
//                   ||----w |
//                   ||     ||
// `);
