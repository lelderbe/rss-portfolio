let openedAccordion = Number(sessionStorage.getItem('openedAccordion')) || 0;

document.addEventListener('DOMContentLoaded', () => {
    prepareBurger();
    prepareAccordions();
    prepareModal();
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

// console.log(`
//    ----------------------------
//  <  Я эксперт в своей области)  >
//    ----------------------------
//           \\   ^__^
//            \\  (oo)\\_______
//               (__)\\       )\/\\
//                   ||----w |
//                   ||     ||
// `);
