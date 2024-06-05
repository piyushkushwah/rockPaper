const elements = ["rock", "paper", "scissor"];
const borderColors = [
    { name: "rock", color: "hsl(349, 71%, 52%)", shadowColor: '#9e152e' },
    { name: "paper", color: "hsl(230, 89%, 62%)", shadowColor: '#2740be' },
    { name: "scissor", color: "hsl(39, 89%, 49%)", shadowColor: '#c96d1d' },
];
let score = {
    user: { name: "test", points: 0, totalScore: 0 },
    cpu: { name: "test", points: 0, totalScore: 0 },
};
const rules = ["rock > scissor", "paper > rock", "scissor > paper"];
const elements_images = [
    "./assets/icon-rock.svg",
    "./assets/icon-paper.svg",
    "./assets/icon-scissors.svg",
];
let winnerName = "";
let count = 0;
const popupWrapper = document.getElementById('popupWrapper');
const userScore = document.getElementById("userScore");
const selectUserInputElement = document.getElementById("selectUserInputElement");
const displayResult = document.getElementById("displayResult");

function checkRules(str, userInput, cpuInput) {
    switch (str) {
        case rules[0]:
            calculatePoints(userInput, cpuInput, "rock");
            break;
        case rules[1]:
            calculatePoints(userInput, cpuInput, "paper");
            break;
        case rules[2]:
            calculatePoints(userInput, cpuInput, "scissor");
            break;
    }
}

function userInput(userInput) {
    let index = Math.round(Math.random() * (elements.length - 1));
    let cpuInput = elements[index];

    selectUserInputElement.style.display = "none";
    displayResult.style.display = "flex";

    displayResult.innerHTML = `
            <div  class="circle_wrap ">
                <h3>YOU PICKED</h3>
                <div class="user-input-wrapper">
                <div id="userWinShowCircleBg" class="hide">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div style="border-color:${borderColors[userInput].color};
                 box-shadow: 0 0.6em 0 ${borderColors[userInput].shadowColor}"
                 class="circle single_circle">
                    <div class="circle_white-border single_white_circle">
                        <img src="${elements_images[userInput]}" alt="">
                    </div>
                </div>
                </div>
               
            </div> 

            <div id="declareWinnerName">
                <h1 style="visibility:hidden">Placeholder</h1>
                <button class="button" onclick="playAgain()">Play Again</button>
            </div>


            <div class="circle_wrap">
                <h3>THE HOUSE PICKED</h3>
                <div class="user-input-wrapper">
                    <div id="cpuWinShowCircleBg" class="hide">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <div style="border-color:${borderColors[index].color};
                     box-shadow: 0 0.6em 0 ${borderColors[index].shadowColor}"
                     id="circle2Result" class="circle single_circle">
                        <div class="circle_white-border single_white_circle" style="display:none">
                            <img src="${elements_images[index]}" alt="">
                        </div>
                    </div>
                </div>
            </div> 
            `;

    setTimeout(() => {
        document.querySelector(
            "#circle2Result .circle_white-border"
        ).style.display = "flex";
        checkDueMatch(elements[userInput], cpuInput);
    }, 100);
}

function calculatePoints(userInput, cpuInput, element) {
    switch (true) {
        case cpuInput === element:
            score.cpu.points += 1;
            break;
        case userInput === element:
            score.user.points += 1;
            break;
    }
}

function declareResult() {

    if (score.user.points > score.cpu.points) {
        score.user.totalScore += 1;
        userScore.innerText = score.user.totalScore;
        score.user.points = 0;
        addCircleBg("userWinShowCircleBg");
        winnerName = "YOU WON";
    } else if (score.user.points < score.cpu.points) {
        score.cpu.totalScore += 1;
        score.cpu.points = 0;
        addCircleBg("cpuWinShowCircleBg");
        winnerName = "YOU LOSE";
    }

    showWinnerName(winnerName);

}

function checkDueMatch(userInput, cpuInput) {
    if (userInput === cpuInput) {
        showWinnerName("It's a draw");
    } else {
        checkRules(`${userInput} > ${cpuInput}`, userInput, cpuInput);
        checkRules(`${cpuInput} > ${userInput}`, userInput, cpuInput);
        declareResult();
    }
}

function playAgain() {
    selectUserInputElement.style.display = "flex";
    displayResult.innerHTML = "";
    displayResult.style.display = "none";
    popupWrapper.style.display = 'none';
    popupWrapper.style.opacity = 0
}

function showWinnerName(name) {
    const declareWinnerName = document.getElementById("declareWinnerName");
    const h1 = declareWinnerName.childNodes[1];
    h1.style.visibility = 'visible'
    h1.innerText = name

    if (count >= 4 && score.user.totalScore > score.cpu.totalScore) {
        userScore.innerText = 0;
        updatePopupInfo(':)', 'Congratulations! You emerged victorious in this match! 🎉 Well done on your win!')
        resetScore();
    } else if (count >= 4 && score.user.totalScore < score.cpu.totalScore) {
        userScore.innerText = 0;
        updatePopupInfo(':(', 'Unfortunately, the game did not turn out in your favor this time. Keep your spirits up!')
        resetScore();
    } else {
        count++;
    }
}

function updatePopupInfo(title, desc) {
    const child = popupWrapper.childNodes;
    child[1].childNodes[1].innerText = title
    child[1].childNodes[3].innerText = desc
}

function addCircleBg(id) {
    document.getElementById(id).classList.add("animatedCircles");
    document.getElementById(id).classList.remove("hide");
}

function resetScore() {
    score = {
        user: { name: "", points: 0, totalScore: 0 },
        cpu: { name: "", points: 0, totalScore: 0 },
    };
    count = 0
    popupWrapper.style.display = 'flex';
    setTimeout(() => {
        popupWrapper.style.opacity = 1
    }, 100);
}