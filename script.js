let elements = ['rock', 'paper', 'scissor'];
let score = [{user:{name:'test',points:0}},{cpu:{name:'test',points:0}}];
let rules = ['rock > scissor', 'paper > rock', 'scissor > paper'];
let elements_images = ['./assets/icon-rock.svg','./assets/icon-paper.svg','./assets/icon-scissors.svg'];


let check = (str,userInput,cpuInput) => {

        switch (str) {
            case rules[0]:
                calculatePoints(userInput, cpuInput, 'rock');
                break;
            case rules[1]:
                console.log(userInput);
                calculatePoints(userInput, cpuInput, 'paper');
                break;
            case rules[2]:
                calculatePoints(userInput, cpuInput, 'scissor');
                break;
        }
    
}


async function inputs(userInput) {

    let index = Math.round(Math.random() * (elements.length - 1));
    let cpuInput = elements[index];
    


    document.getElementById('select_element').style.display = 'none';

    document.getElementById('display_result')
        .innerHTML = `   
            <div  class="circle_wrap ">
                <h3>You Picked</h3>
                <div class="circle1 single_circle">
                    <div class="circle_white single_white_circle">
                        <img src="${elements_images[userInput]}" alt="">
                    </div>
                </div>
            </div> 

            <div class="circle_wrap">
                <h3>CPU Picked</h3>
                <div id="circle2Result" class="circle1 single_circle" style="border:none!important">
                    <div class="circle_white single_white_circle" style="display:none">
                        <img src="${elements_images[index]}" alt="">
                    </div>
                </div>
            </div> 
            `
    
    setTimeout( async () => {
        
        console.log();

        document.querySelector('#circle2Result').style.border = 'unset';
        document.querySelector('#circle2Result .circle_white').style.display = 'flex';

        setTimeout( async () => {
                    
            await checkIfEqual(elements[userInput],cpuInput);
    
            declareResult();

        },100);
        
    },1000);
  


}

function calculatePoints(userInput, cpuInput, element) {
    
    switch (true) {
        case cpuInput === element:
            score[1].cpu.points += 1;    
            break;
        case userInput === element:
            score[0].user.points += 1;    
            break;
    }

}


function declareResult() {

    console.log(score);

    if (score[0].user.points > score[1].cpu.points) {
        score[0].user.points = 0;
        alert('User Wins');
    } else if (score[0].user.points < score[1].cpu.points){
        score[1].cpu.points = 0;
        alert('CPU Wins');
    }

}

function checkIfEqual(userInput, cpuInput) {
    
    console.log(userInput,cpuInput);

    if (userInput === cpuInput) {
        alert('DUE');
    } else {    
        check(`${userInput} > ${cpuInput}`,userInput,cpuInput)
        check(`${cpuInput} > ${userInput}`,userInput,cpuInput)
    }

}

declareResult();