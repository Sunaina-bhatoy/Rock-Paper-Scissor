const rules_btn = document.querySelector(".rules-btn");
const close_btn = document.querySelector(".close-btn");
const modal = document.querySelector(".modal");

rules_btn.addEventListener("click", () => {
    modal.classList.toggle("show-modal");
});
close_btn.addEventListener("click", () => {
    modal.classList.toggle("show-modal");
});

const CHOICES = [
    {
        name: "paper",
        beats: "rock",
    },
    {
        name: "scissors",
        beats: "paper",
    },
    {
        name: "rock",
        beats: "scissors",
    },
];

const choiceButtons = document.querySelectorAll(".choice-btn");
const gameDiv = document.querySelector(".game");
const resultsDiv = document.querySelector(".results");
const resultDivs = document.querySelectorAll(".results__result");

let yourScore = 0;
let computerScore = 0;

const yourScoreElement = document.getElementById('your-score');
const computerScoreElement = document.getElementById('computer-score');

// Load scores from localStorage on page load
window.addEventListener('load', () => {
    const savedYourScore = localStorage.getItem('yourScore');
    const savedComputerScore = localStorage.getItem('computerScore');

    if (savedYourScore !== null) {
        yourScore = parseInt(savedYourScore);
        yourScoreElement.innerText = yourScore;
    }

    if (savedComputerScore !== null) {
        computerScore = parseInt(savedComputerScore);
        computerScoreElement.innerText = computerScore;
    }
});

choiceButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const choiceName = button.dataset.choice;
        const choice = CHOICES.find((choice) => choice.name === choiceName);
        choose(choice);
    });
});

function choose(choice) {
    const aichoice = aiChoose();
    displayResults([choice, aichoice]);
    displayWinner([choice, aichoice]);
}

function aiChoose() {
    const rand = Math.floor(Math.random() * CHOICES.length);
    return CHOICES[rand];
}

function displayResults(results) {
    resultDivs.forEach((resultDiv, idx) => {
        setTimeout(() => {
            resultDiv.innerHTML = `
                <div class="choice ${results[idx].name}">
                    <img src="images/${results[idx].name}.png" alt="${results[idx].name}" />
                </div>
            `;
        }, idx * 1000);
    });
    gameDiv.classList.toggle("hidden");
    resultsDiv.classList.toggle("hidden");
}

const resultWinner = document.querySelector(".results__winner");
const resultText = document.querySelector(".results__text");

function displayWinner(results) {
    setTimeout(() => {
        const userWins = isWinner(results);
        const aiWins = isWinner(results.reverse());

        if (userWins) {
            resultText.innerText = "You Win";
            resultDivs[0].classList.toggle("winner");
            updateScore(1, 0); // Update your score
            
            // Create Next button
            const nextButton = document.createElement("button");
            nextButton.innerText = "Next";
            nextButton.style.position = "absolute";
            nextButton.style.bottom = "2rem";
            nextButton.style.right = "1rem";
            nextButton.style.background = "none";
            nextButton.style.outline = "none";
            nextButton.style.border = "2px solid var(--light-color)";
            nextButton.style.borderRadius = "0.6rem";
            nextButton.style.color = "var(--light-color)";
            nextButton.style.padding = "0.6rem 2.5rem";
            nextButton.style.fontSize = "1.3rem";
            nextButton.style.letterSpacing = "0.1em";
            nextButton.style.cursor = "pointer";
            nextButton.style.fontWeight = "600";
           
            nextButton.onclick = function() {
                window.location.href = "next.html";
            };

            // Append button to the body
            document.body.appendChild(nextButton);
        } else if (aiWins) {
            resultText.innerText = "You Lose";
            resultDivs[1].classList.toggle("winner");
            updateScore(0, 1); // Update computer score
        } else {
            resultText.innerText = "Tie Up";
        }

        resultWinner.classList.toggle("hidden");
        resultsDiv.classList.toggle("show-winner");
    }, 1000);
}

function isWinner(results) {
    return results[0].beats === results[1].name;
}

let yourScore=0;
let  computerScore=0;
function updateScore(yourPoint, computerPoint) {
    yourScore += yourPoint;
    computerScore += computerPoint;

    // Update the UI
    yourScoreElement.innerText = yourScore;
    computerScoreElement.innerText = computerScore;

    // Save scores to localStorage
    localStorage.setItem('yourScore', yourScore);
    localStorage.setItem('computerScore', computerScore);
}

const playAgainBtn = document.querySelector(".play-again");
playAgainBtn.addEventListener("click", () => {
    gameDiv.classList.toggle("hidden");
    resultsDiv.classList.toggle("hidden");

    resultDivs.forEach((resultDiv) => {
        resultDiv.innerHTML = "";
        resultDiv.classList.remove("winner");
    });

    resultText.innerText = "";
    resultWinner.classList.toggle("hidden");
    resultsDiv.classList.toggle("show-winner");

    // Reset scores
    yourScore = 0;
    computerScore = 0;
    localStorage.removeItem('yourScore');
    localStorage.removeItem('computerScore');
    yourScoreElement.innerText = yourScore;
    computerScoreElement.innerText = computerScore;
});
