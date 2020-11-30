document.addEventListener('DOMContentLoaded', () => {
    const gameboard = document.querySelector('.gameboard');
    const numberOfCards = 12;
    const images = [
        'albatross', 'anchor', 'coral',
        'dolphin', 'fish', 'squid'
    ];
    const imgDirName = 'img';
    const imgFormat = 'png';

    function imgPathBuilder(imgName) {
        return `${imgDirName}/${imgName}.${imgFormat}`;
    }

    function createCardElement(n) {
        const card = document.createElement('div');
        const img = document.createElement('img');

        card.className = 'card';
        img.src = imgPathBuilder(images[0]);

        card.appendChild(img);
        
        return card;
    }

    function createCardsFragment() {
        const fragment = document.createDocumentFragment();
        for (let i = 1; i <= numberOfCards; i++) {
            fragment.appendChild( createCardElement(i) );
        }
        return fragment;
    }

    gameboard.appendChild( createCardsFragment() );

    gameboard.addEventListener('click', (e) => {
        const el = e.target;
        if (!el.classList.contains('card')) return false;
        console.log(el);
        console.dir(el);

        console.log("This is %cMy stylish message", "color: yellow; font-style: italic; background-color: blue; padding: 2px;");
    });

});