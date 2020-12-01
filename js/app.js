document.addEventListener('DOMContentLoaded', () => {
    const gameboard = document.querySelector('.gameboard');
    const score = document.querySelector('.score');
    const numberOfCards = 12;
    let numberOfOpenCards = 0;
    const images = [
        'albatross', 'anchor', 'coral',
        'dolphin', 'fish', 'squid'
    ];

    const imagesTwice = doubleImages(images);

    const imgDirName = 'img';
    const imgFormat = 'png';
    let openCards = [];

    function rand(min, max) {
        let rand = min + Math.random() * (max + 1 - min);
        return Math.floor(rand);
    }

    function randomCutImage() {
        return imagesTwice.splice(rand(0, imagesTwice.length - 1), 1);
    }

    function doubleImages(images) {
        return images.concat(images);
    }

    function imgPathBuilder(imgName) {
        return `${imgDirName}/${imgName}.${imgFormat}`;
    }

    function createCardElement() {
        const cardTemplate = `
            <div class="flip-container card">
                <div class="flipper">
                    <div class="front"></div>
                    <div class="back">
                        <img src="{{imgpath}}" alt="card image">
                    </div>
                </div>
            </div>
        `;
        const card = cardTemplate.replace('{{imgpath}}', imgPathBuilder( randomCutImage() ));

        return card;
    }

    function createCardsFragment() {
        let fragment = '';
        for (let i = 1; i <= numberOfCards; i++) {
            fragment += createCardElement();
        }
        return fragment;
    }

    function checkPair() {
        const cardImgSrc1 = openCards[0].querySelector('img').src;
        const cardImgSrc2 = openCards[1].querySelector('img').src;
        if (cardImgSrc1 === cardImgSrc2) {
            markPair(openCards);
            numberOfOpenCards += 2;
        } else {
            removeOpenClass(openCards);
        }
        openCards = [];
    }

    function markPair(cards) {
        cards.forEach(card => {
            card.classList.add('pair');
        });
    }

    function removeOpenClass(cards) {
        cards.forEach(card => {
            card.classList.remove('open');
        });
    }

    function showScore() {
        score.innerHTML = numberOfOpenCards;
    }

    function checkWin() {
        if (numberOfOpenCards === 12) {
            console.log('%cWIN!!!', "color: yellow; font-style: italic; background-color: blue; padding: 2px;");
        }
    }

    gameboard.insertAdjacentHTML('beforeend', createCardsFragment());

    gameboard.addEventListener('click', (e) => {
        const el = e.target.closest('.card');
        if (!el) return false;
        if (openCards.includes(el)) return false;
        if (el.classList.contains('pair')) return false;
        
        el.classList.add('open');
        openCards.push(el);

        if (openCards.length === 2) checkPair();
        showScore();
        checkWin();
        console.log(el);
        console.dir(el);
        console.log(openCards);
    });

});