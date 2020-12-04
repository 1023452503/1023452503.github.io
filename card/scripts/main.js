'use strict';

class Card {
    constructor(name) {
        this.name = name;
    }

    getImage() {
        return `./static/${this.name}.png`;
    }
}


function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let card = [];
const initCardList = (card) => {
    let alpha = ['C', 'D', 'S', 'H'];
    let special = ['J', 'Q', 'K', 'A'];
    for(let i = 2; i <= 10;i++) {
        for (let a of alpha) {
                let newCard = new Card(`${i}${a}`);
                card.push(newCard);
        }
    }

    for(let b of special) {
        for (let a of alpha) {
                let newCard = new Card(`${b}${a}`);
                card.push(newCard);
        }
    }
}


const draw = (cardL) => {
    const length = cardL.length;
    const choice = getRandomInt(length);
    let card = cardL[choice];
    cardL.splice(choice, 1);
    return card;
}



let state = {
    player: [],
    dealer: [],
    gameState: "notStart"
};

const score = (hand, index) => {
    const normal = ['2', '3', '4', '5', '6', '7', '8', '9', '10'];
    const ace = 'A';
    const ten = ['J', 'K', 'Q'];
    let summation = 0;
    for (let i = 0;i < hand.length;i++) {
        const card = hand[i];
        if (index == 0 && i == 0){
            continue;
        }
        if (normal.includes(card.name[0])) {
            summation += parseInt(card.name[0]);
        } else if (card.name[0] == ace) {
            if (summation <= 10) {
                summation += 11
            } else {
                summation += 1;
            }
        } else {
            summation += 10;
        }
    }
    return summation;
}

const whowins = (state) => {
    const playerScore = score(state.player, 1);
    const dealerScore = score(state.dealer, 1);
    console.log(playerScore);
    console.log(dealerScore);
    if (playerScore > 21) {
        return "dealer";
    } else if (playerScore == 21) {
        return "player";
    } else if (dealerScore > 21) {
        return "player";
    } else {
        if (playerScore > dealerScore) {
            return "player";
        } else if (playerScore === dealerScore) {
            return "push";
        } else {
            return "dealer";
        }
    }
}


const render = (state) => {
    // render 1: button state
    if (state.gameState === "notStart") {
        $('#deal').prop('disabled', false);
        $('#stand').prop('disabled', true);
        $('#hit').prop('disabled', true);
        return;
    } else if (state.gameState === "game"){
        $('#deal').prop('disabled', true);
        $('#stand').prop('disabled', false);
        $('#hit').prop('disabled', false);
    } else {
        $('#deal').prop('disabled', false);
        $('#stand').prop('disabled', true);
        $('#hit').prop('disabled', true);
    }


    $(".dealer_score").html("");
    $(".player_score").html("");
    $(".dealer_hand").html("");
    $(".player_hand").html("");
    // other case: game or end
    let html1 = `<h1 class="less-chrome">Dealer has ${score(state.dealer, 0)}</h1>`;
    let html2 = `<h1 class="less-chrome">You have ${score(state.player, 1)}</h1>`;
    $(".dealer_score").append(html1);
    $(".player_score").append(html2);
    
    // game
    if (state.gameState === "game") {
        let html = "";
        for(let i = 0; i < state.dealer.length;i++){
            if (i != 0) {
                html += `<img src="${state.dealer[i].getImage()}" class="dcard-${i}"/>`;
            } else {
                html += `<img src="./static/gray_back.png" class="dcard-${0}"/>`;
            }
        }
        $(".dealer_hand").append(html);

        html = "";
        for(let i = 0; i < state.player.length;i++){
            html += `<img src="${state.player[i].getImage()}" class="pcard-${i}"/>`;
        }
        $(".player_hand").append(html);
    } else {
        let html = "";
        for(let i = 0; i < state.dealer.length;i++){
            html += `<img src="${state.dealer[i].getImage()}" class="dcard-${i}"/>`;
        }
        $(".dealer_hand").append(html);

        html = "";
        for(let i = 0; i < state.player.length;i++){
            html += `<img src="${state.player[i].getImage()}" class="pcard-${i}"/>`;
        }
        $(".player_hand").append(html);
    }


    if (state.gameState === "end") {
        $(".dealer_score").html("");
        $(".player_score").html("");
        let html1 = `<h1 class="less-chrome">Dealer has ${score(state.dealer, 1)}</h1>`;
        let html2 = `<h1 class="less-chrome">You have ${score(state.player, 1)}</h1>`;
        $(".dealer_score").append(html1);
        $(".player_score").append(html2);
        const compete = whowins(state);
        console.log(compete);
        if (compete === "dealer") {
            $(".result").text("You lose!");
        } else if (compete === "push") {
            $(".result").text("Nobody wins!")
        } else {
            $(".result").text("You win!");
        }
    }
}

const hit = (state) => {
    let newCard = draw(card);
    state.player.push(newCard);
    const playerScore = score(state.player, 1);
    if (playerScore > 21) {
        state.gameState = "end";
        render(state);
    } else if (playerScore == 21) {
        state.gameState = "end";
        render(state);
    } else {
        render(state);
    }
}

const stand = async (state) => {
    while (true) {
        let sc = score(state.dealer, 1);
        if (sc > 17) {
            break;
        }
        console.log(sc);
        let newCard = draw(card);
        state.dealer.push(newCard);
        render(state);
        sc = score(state.dealer, 1);
        if (sc > 17) {
            break;
        }
        console.log(sc);
        await sleep(1000);
    }
    state.gameState = "end";
    render(state);
}

const deal = (state) => {
    console.log('deal');
    initCardList(card);
    state.player = [];
    state.dealer = [];
    state.gameState = "game";
    $(".result").text("");

    state.player.push(draw(card));
    state.player.push(draw(card));
    state.dealer.push(draw(card));
    state.dealer.push(draw(card));
    const playerScore = score(state.player, 1);
    const dealerScore = score(state.dealer, 1);
    if (playerScore === 21 || dealerScore === 21) {
        state.gameState = "end";
    }
    render(state);
}

$('#deal').prop('disabled', false);
$('#stand').prop('disabled', true);
$('#hit').prop('disabled', true);
$("#deal").on("click", () => {
    deal(state);
});
$("#stand").on("click", () => {
    stand(state);
});
$("#hit").on("click", () => {
    hit(state);
});




