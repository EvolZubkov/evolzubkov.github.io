// List of font awesome codes used as illustrations, can be modified
const icons = [
	'fa-kiwi-bird',
  'fa-chess',
  'fa-flag',
  'fa-camera-retro',
  'fa-plug',
  'fa-anchor',
  'fa-birthday-cake',
  'fa-cube',
  'fa-dice',
  'fa-bug',
  'fa-cut',
  'fa-cat'
];

// Duplicate elements of an array
const duplicate = (arr) => {
	return arr.concat(arr).sort()
};

// Check if two cards are a match
const checkMatch = (icons) => {
	if (icons[0] === icons[1]) {
  	console.log("it's a match");
  	return true;
  }
};

new Vue({
    el: "#app",
    data: {
      cards: _.range(0, icons.length * 2),
      running: false,
      startTime: null, // Время начала игры
      elapsedTime: 0, // Прошедшее время
      movesCount: 0 // Количество ходов
    },
    methods: {
      cardsShuffle() {
        this.startTime = Date.now(); // Запоминаем время начала игры
        this.elapsedTime = 0;
        this.movesCount = 0;
        
        // Перемешивание карточек
        this.cards.forEach((card, index) => {
          this.cards[index] = { icon: '', down: true, matched: false };
        });
        icons.forEach((icon, index) => {
          this.cards[index].icon = icon;
          this.cards[index + icons.length].icon = icon;
        });
        this.cards = _.shuffle(this.cards);
      },
      handleClick(cardClicked) {
        if (!this.running && !cardClicked.matched && this.cardCount.cardsUp < 2) {
          // Начинаем считать ход
          this.movesCount++;
  
          cardClicked.down = false;
  
          if (this.cardCount.cardsUp === 2) {
            this.running = true;
            setTimeout(() => {
              let match = checkMatch(this.cardCount.icons);
              this.cards.forEach((card) => {
                if (match && !card.down && !card.matched) {
                  card.matched = true;
                } else {
                  card.down = true;
                }
              });
              this.running = false;
            }, 1500);
          }
        }
      },
      restartGame() {
        this.cardsShuffle(); // Перезапуск игры
      }
    },
    mounted() {
      this.cardsShuffle();
    },
    computed: {
      cardCount() {
        let cardUpCount = 0;
        let cardMatchedCount = 0;
        let icons = [];
        this.cards.forEach((card) => {
          if (!card.down && !card.matched) {
            cardUpCount++;
            icons.push(card.icon);
          }
          if (card.matched) {
            cardMatchedCount++;
          }
        });
        return { cardsUp: cardUpCount, cardsMatched: cardMatchedCount, icons: icons };
      },
      victory() {
        if (this.cardCount.cardsMatched === this.cards.length) {
          this.elapsedTime = ((Date.now() - this.startTime) / 1000).toFixed(1); // Рассчитываем время
          return true;
        }
        return false;
      }
    }
  })