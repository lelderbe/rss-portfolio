let openedAccordion = Number(sessionStorage.getItem('openedAccordion')) || 0;

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

prepareAccordions();

console.log(`
   ----------------------------
 <  Я эксперт в своей области)  >
   ----------------------------
          \\   ^__^
           \\  (oo)\\_______
              (__)\\       )\/\\
                  ||----w |
                  ||     ||
`);
