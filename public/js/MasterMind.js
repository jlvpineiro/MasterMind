const MasterMind = class {
    constructor(
        canvas,
        attempts,
        slots,
        colors
    ) {
        this.canvas = canvas;
        this.n = canvas.width;
        this.m = canvas.height;
        this.attempts = attempts;
        this.slots = slots;
        this.colors = colors;
    }

    getContext = function () {
        return this.canvas.getContext("2d");
    }
    getBase = function () {
        return this.n/(this.attempts+1);
    }
    
    getWidth = function () {
        return this.getBase() - 10;
    }

    resetGuess = function () {
        let guess = [];
        for (let i = 0; i < this.slots; i++) {
            guess.push("black");
        }
        return guess;
    }

    randomizeAnswer = function () {
        let answer = [];
        for (let i = 0; i < this.slots; i++) {
            answer.push(this.colors[Math.floor(Math.random() * Math.floor(this.colors.length))]);
        }
        return answer
    }

    drawMarble = function (turn,slot,marble) {

        let ctx = this.getContext();
        let base = this.getBase();
        let w = this.getWidth();

        let x = base*turn+5;
        let y = 60;
        let dx = w;
        let dy = this.m/2;

        ctx.beginPath();
        ctx.arc(x+(dx/2),y+(dy/(this.slots+1)*(slot+1)),w/2-7,0,Math.PI*2);
        ctx.fillStyle = this.colors[marble];
        ctx.fill();
        ctx.closePath();
    }

    drawMarbleSelect = function () {

        let ctx = this.getContext();
        let w = this.getWidth();
        let marbleTypes = this.colors.length;

        // draw the marble selection rectangle
        let selectW = 0.75*this.n;
        let selectH = w;
        let selectX = (this.n-selectW)/2;  
        let selectY = this.m/2+70;
        ctx.clearRect(selectX,selectY,selectW,selectH);

        ctx.beginPath(); 
        ctx.rect(selectX,selectY,selectW,selectH);
        ctx.fillStyle = "gray";
        ctx.fill();
        ctx.closePath();

        // draw the marbles for selection
        for (let i = 0; i < marbleTypes; i++) {
            ctx.beginPath();
            ctx.arc(selectX + (selectW/(marbleTypes+1)*(i+1)),selectY + (selectH/2),w/2-7,0,Math.PI*2);
            ctx.fillStyle = this.colors[i];
            ctx.fill();
            ctx.closePath();
        }
        //console.log(`Current marble: ${marble}`);

        // outline the selected marble
        ctx.beginPath();
        ctx.arc(selectX + (selectW/(marbleTypes+1)*(this.marble+1)),selectY + (selectH/2),w/2-7,0,Math.PI*2);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 5;
        ctx.stroke();
        ctx.closePath();
    }

    drawGuess = function(turn,guess,selectedSlot) {

        let ctx = this.getContext();
        let base = this.getBase();
        let w = this.getWidth();

        //console.log(`Currently selected slot: ${selectedSlot}`);
        // draw the rectangle with slots
        ctx.beginPath(); 
        let x = base*turn+5;
        let y = 60;
        let dx = w;
        let dy = this.m/2;
        ctx.rect(x,y,dx,dy);
        ctx.fillStyle = "gray";
        ctx.fill();
        ctx.closePath();

        this.drawPegs(turn,0,0);

        //draw the the 4x1 empty circular slots in the guess boxes
        for (let j = 0; j < this.slots; j++) {
            ctx.beginPath();
            ctx.arc(x+(dx/2),y+(dy/(this.slots+1)*(j+1)),w/2-7,0,Math.PI*2);
            ctx.fillStyle = guess[j];
            ctx.fill();
            ctx.closePath();
        }

        //outline selected slot
        if (turn == this.turn) {
            if (selectedSlot != -1) {
                ctx.beginPath();
                ctx.arc(x+(dx/2),y+(dy/(this.slots+1)*(selectedSlot+1)),w/2-7,0,Math.PI*2);
                ctx.strokeStyle = "cyan";
                ctx.lineWidth = 5;
                ctx.stroke();
                ctx.closePath();
            }
            else {
                ctx.beginPath(); 
                let x = base*turn+5;
                let y = 5;
                let dx = base-10;
                let dy = w;
                ctx.lineWidth = 4;
                ctx.rect(x,y,dx,dy);
                ctx.strokeStyle = "black";
                ctx.stroke();
                ctx.closePath();
            }
        }
    }

    //countHits = function (guess,answer) {

        //let hits = 0;
        //for (let i = 0; i < this.slots; i++) {
            //if (guess[i] == answer[i]) {
                //hits++;
            //}
        //}
        //return hits;
    //}

    countHitsAndBlows = function (guess,answer) {
        
        let hits = 0;
        let blows = 0;
        let answerCopy = [...answer];
        console.log(answerCopy.toString());

        for (let i = 0; i < this.slots; i++) {
            console.log(`i: ${i}, guess[${i}]: ${guess[i]}, answerCopy[${i}]: ${answerCopy[i]}`);
            if (guess[i] == answerCopy[i]) {
                hits++;
                answerCopy[i] = "black";
            }
            else if (answerCopy.includes(guess[i])) {
                let ansIdx = answerCopy.indexOf(guess[i]);
                while (ansIdx != -1 && answerCopy[ansIdx] == guess[ansIdx]) {
                    ansIdx = answerCopy.indexOf(guess[i],ansIdx+1);
                }
                if (ansIdx != -1) {
                    blows++;
                    answerCopy[ansIdx] = "black";
                    console.log(answerCopy.toString());
                }
            }
        }
        return [hits, blows];
    }

    drawPegs = function (turn,hits,blows) {

        let ctx = this.getContext();
        let base = this.getBase();
        let w = this.getWidth();

        let x = base*turn+5;
        let y = 5;
        let dx = base-10;
        let dy = w;

        // draw the result pegs
        if (!this.ready) {
            //console.log(`drawing peg: ${turn}`);
            ctx.beginPath(); 
            ctx.rect(x,y,dx,dy);
            ctx.fillStyle = "blue";
            ctx.fill();
            ctx.closePath();
            //draw the circular peg slots in a 2x2 grid
            for (let j = 0; j < this.slots; j++) {
                let pegX = (j & 1) + 1;
                let pegY = ((j & (1 << 1)) >> 1) + 1;
                ctx.beginPath();
                ctx.arc(x + pegX*w/3,y + pegY*w/3,w/9,0,Math.PI*2);
                if (hits > 0) {
                    ctx.fillStyle = "red";
                    hits--;
                }
                else if (blows > 0) {
                    ctx.fillStyle = "white";
                    blows--;
                } 
                else {
                    ctx.fillStyle = "black";
                }
                ctx.fill();
                ctx.closePath();
            }
        }
        else {
            ctx.beginPath(); 
            ctx.rect(x,y,dx,dy);
            ctx.fillStyle = "green";
            ctx.fill();
            ctx.fillStyle = "black";
            ctx.font = '16px serif';
            ctx.fillText("OK", x + (dx/2-10), y + (dy/2+4));
            ctx.closePath();
        }
    }

    drawBoard = function () {
        
        let ctx = this.getContext();

        //clear board to start
        ctx.clearRect(0,0,this.n,this.m);

        //console.log(`attempts: ${this.attempts}`);
        // draw the result pegs
        for (let i = 0; i < this.attempts; i++) {
            this.drawPegs(i,0,0);
        }

        // draw the rectangles with slots
        for (let i = 0; i < this.attempts; i++) {
            this.drawGuess(i,this.resetGuess(),0);
        }

        // draw the answer box
        this.drawAnswerBox(false);

        // draw the marble select box
        this.drawMarbleSelect();
    }

    decrementSlot = function () {
        if (this.slot - 1 >= 0 || (this.ready && this.slot - 1 == -1)) {
            this.slot -= 1;
        } else {
            this.slot = this.slots - 1;
        }
        this.drawGuess(this.turn,this.guess,this.slot);
    }

    incrementSlot = function () {
        this.slot = this.incrementSlot_h(this.slot);

        this.drawGuess(this.turn,this.guess,this.slot);
    }

    incrementSlot_h = function (slot) {
        if (slot + 1 < this.slots) {
            return slot + 1;
        } else if (this.ready) {
            return -1;
        } else {
            return 0;
        }
    }

    incrementSlotEnter = function () {
        let nextSlot = this.incrementSlot_h(this.slot);
        while (nextSlot != -1 && this.guess[nextSlot] != "black") {
            nextSlot = this.incrementSlot_h(nextSlot);
        }
        this.slot = nextSlot;
        this.drawGuess(this.turn,this.guess,this.slot);
    }

    decrementMarble = function () {
        if (this.marble - 1 >= 0) {
          this.marble -= 1;
        } else {
          this.marble = this.colors.length - 1;
        }
        this.drawMarbleSelect();
    }
    incrementMarble = function () {
        if (this.marble + 1 < this.colors.length) {
          this.marble += 1;
        } else {
          this.marble = 0;
        }
        this.drawMarbleSelect();
    }

    move = function (direction) {
        if (direction == 0) {
            this.decrementSlot();
        } else if (direction == 1) {
            this.incrementMarble();
        } else if (direction == 2) {
            this.incrementSlot();
        } else if (direction == 3) {
            this.decrementMarble();
        }
    }

    submitGuess = function () {

        let [hits,blows] = this.countHitsAndBlows(this.guess,this.answer);
        console.log(`hits: ${hits}, blow: ${blows}`);
        this.ready = false;
        this.drawPegs(this.turn,hits,blows);
        if (hits == 4) {
            this.endGame(true);
            this.end = true;
        } else if (this.turn+1 >= this.attempts) {
            this.endGame(false);
            this.end = true;
        } else { 
            this.guess = this.resetGuess();
            this.turn++;
            this.slot = 0;
            this.drawGuess(this.turn,this.guess,this.slot);
            console.log(`Advancing from turn ${this.turn-1} to turn ${this.turn}`);
        }

    }

    changeGuess = function () {
        this.guess[this.slot] = this.colors[this.marble];
        if (!this.guess.includes("black")) {
            this.ready = true;
            this.slot = -1;
            this.drawGuess(this.turn,this.guess,this.slot);
        } else {
            this.ready = false;
            this.incrementSlotEnter();
        }
        this.drawPegs(this.turn,0,0);
    }

    onEnter = function () {
        if (this.ready && this.slot == -1) { 
            this.submitGuess();
        }
        else {
            this.changeGuess();
        }
    }

    drawAnswerBox = function (end) {

        console.log("drawing the answer Box");
        let ctx = this.getContext();
        let base = this.getBase();
        let w = this.getWidth();

        let x = base*this.attempts+5;
        let y = 60;
        let dx = w;
        let dy = this.m/2;

        ctx.beginPath(); 
        ctx.rect(x,y,dx,dy);
        ctx.fillStyle = "black";
        ctx.fill();
        ctx.closePath();

        if (end) {
            for (let j = 0; j < this.slots; j++) {
                ctx.beginPath();
                ctx.arc(x+(dx/2),y+(dy/(this.slots+1)*(j+1)),w/2-7,0,Math.PI*2);
                ctx.fillStyle = this.answer[j];
                ctx.fill();
                ctx.closePath();
            }
        }
    }

    endGame = function (won) {
        this.drawAnswerBox(true);

        let ctx = this.getContext();
        
        let w = this.n/4;
        let h = this.m/4;
        let x = (this.n - w) / 2;
        let y = (this.m - h) / 2;
        ctx.beginPath();
        ctx.rect(x,y,w,h);
        ctx.fillStyle = "gray";
        ctx.fill();
        ctx.fillStyle = "black";
        ctx.font = '48px serif';
        ctx.fillText("Play again?", x + (w/2-24), y + (h/2+24));
        ctx.closePath();

        let checking = true;
        document.addEventListener(
            "keydown",
            (e) => {
                if (checking) {
                    let keyName = e.key;
                    if (keyName == "Enter") {
                        checking = false;
                        this.startGame();
                    }

                }
            }
        );
    }

    startGame = function () {
        this.ready = false;
        this.turn = 0;
        this.marble = 0;
        this.slot = 0;
        this.guess = this.resetGuess();
        this.answer = this.randomizeAnswer();
        this.end = false;

        this.drawBoard();
        //this.answer = ["green","red","yellow","red"];

        //document.addEventListener(
            //"keydown",
            //(e) => {
                //if (!end) {
                    //let keyName = e.key;

                    //if (keyName == "ArrowLeft") {
                        //this.decrementMarble();
                    //} 
                    //else if (keyName == "ArrowRight") {
                        //this.incrementMarble();
                    //}
                    //else if (keyName == "ArrowUp") {
                        //this.decrementSlot();
                    //}
                    //else if (keyName == "ArrowDown") {
                        //this.incrementSlot();
                    //}
                    //else if (keyName == "Enter") {
                        //this.onEnter();
                    //}
                //}
            //}
        //);
    }
}

export default MasterMind;