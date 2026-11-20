
const symbols = ["🍎", "🍌", "🍇", "🍒",
                 "🍕", "🍔", "⚽", "🚀"];

let cards = [];
let selected = [];
let score = 0;
let time = 0;
let locked = false;
let timerInterval;

function startGame() {
    cards = [...symbols, ...symbols];

    cards.sort(() => Math.random() - 0.5);

    selected = [];
    score = 0;
    time = 0;
    locked = false;

    document.getElementById("score").textContent = score;
    document.getElementById("timer").textContent = time;
    document.getElementById("message").textContent = "";

    const board = document.getElementById("gameBoard");
    board.innerHTML = "";

    cards.forEach((symbol, index) => {
        const card = document.createElement("div");

        card.classList.add("card");
        card.textContent = "?";

        card.dataset.symbol = symbol;
        card.dataset.index = index;

        card.addEventListener("click", () => flipCard(card));

        board.appendChild(card);
    });

    clearInterval(timerInterval);

    timerInterval = setInterval(() => {
        time++;
        document.getElementById("timer").textContent = time;
    }, 1000);
}

function flipCard(card) {
    if (locked ||
        card.classList.contains("matched") ||
        selected.includes(card)) {
        return;
    }

    card.textContent = card.dataset.symbol;
    selected.push(card);

    if (selected.length === 2) {
        locked = true;

        const [first, second] = selected;

        if (first.dataset.symbol === second.dataset.symbol) {
            first.classList.add("matched");
            second.classList.add("matched");

            score++;
            document.getElementById("score").textContent = score;

            selected = [];
            locked = false;

            if (score === 8) {
                clearInterval(timerInterval);
                document.getElementById("message").textContent =
                    "🎉 Congratulations! You Won!";
            }

        } else {
            setTimeout(() => {
                first.textContent = "?";
                second.textContent = "?";

                selected = [];
                locked = false;
            }, 800);
        }
    }
}

function restartGame() {
    startGame();
}

startGame();

