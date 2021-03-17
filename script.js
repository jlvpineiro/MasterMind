import MasterMind from "./MasterMind.js";

const canvas = document.querySelector("canvas");
const attempts = 8;
const slots = 4;
const colors = ["blue","red","green","yellow","pink","white"];

const mm = new MasterMind(canvas,attempts,slots,colors);
mm.run();
//const ctx = canvas.getContext("2d");
//const n = canvas.width;
//const m = canvas.height;
//const x = canvas.width/2;
//const y = canvas.height/2;
//const dx = 2;
//const dy = -2;

//const attempts = 8;
//const slots = 4;

//const base = n/(attempts+1);
//const w = base-10; // general width

//const colors = ["blue","red","green","yellow","pink","white"];
//const marbleTypes = colors.length;

//const drawMarble = function (turn,slot) {

//}


//const drawMarbleSelect = function (marble) {

    //// draw the marble selection rectangle
    //let selectW = 0.75*n;
    //let selectH = w;
    //let selectX = (n-selectW)/2;  
    //let selectY = m/2+70;
    //ctx.clearRect(selectX,selectY,selectW,selectH);

    //ctx.beginPath(); 
    //ctx.rect(selectX,selectY,selectW,selectH);
    //ctx.fillStyle = "gray";
    //ctx.fill();
    //ctx.closePath();

    //// draw the marbles for selection
    //for (let i = 0; i < marbleTypes; i++) {
        //ctx.beginPath();
        //ctx.arc(selectX + (selectW/(marbleTypes+1)*(i+1)),selectY + (selectH/2),w/2-7,0,Math.PI*2);
        //ctx.fillStyle = colors[i];
        //ctx.fill();
        //ctx.closePath();
    //}
    //console.log(`Current marble: ${marble}`);

    //// outline the selected marble
    //ctx.beginPath();
    //ctx.arc(selectX + (selectW/(marbleTypes+1)*(marble+1)),selectY + (selectH/2),w/2-7,0,Math.PI*2);
    //ctx.strokeStyle = "black";
    //ctx.lineWidth = 5;
    //ctx.stroke();
    //ctx.closePath();
//}

//const drawGuess = function(turn,guess,selectedSlot) {

    //console.log(`Currently selected slot: ${selectedSlot}`);
    //// draw the rectangle with slots
    //ctx.beginPath(); 
    //let x = base*turn+5;
    //let y = 60;
    //let dx = w;
    //let dy = m/2;
    //ctx.rect(x,y,dx,dy);
    //ctx.fillStyle = "gray";
    //ctx.fill();
    //ctx.closePath();
    ////draw the the 4x1 empty circular slots in the guess boxes
    //for (let j = 0; j < slots; j++) {
        //ctx.beginPath();
        //ctx.arc(x+(dx/2),y+(dy/(slots+1)*(j+1)),w/2-7,0,Math.PI*2);
        //ctx.fillStyle = guess[j];
        //ctx.fill();
        //ctx.closePath();
    //}
    ////outline selected slot
    //ctx.beginPath();
    //ctx.arc(x+(dx/2),y+(dy/(slots+1)*(selectedSlot+1)),w/2-7,0,Math.PI*2);
    //ctx.strokeStyle = "blue";
    //ctx.lineWidth = 5;
    //ctx.stroke();
    //ctx.closePath();

//}

//const countHits = function (guess,answer) {

//}

//const countBlows = function (guess,answer) {

//}

//const drawPegs = function (turn,hits,blows) {

//}

//const drawBoard = function () {
    ////clear board to start
    //ctx.clearRect(0,0,n,m);

    //let base = n/(attempts+1);
    //let w = base-10; // general width

    //// draw the result pegs
    //for (let i = 0; i < attempts; i++) {
        //ctx.beginPath(); 
        //let x = base*i+5;
        //let y = 5;
        //let dx = base-10;
        //let dy = w;
        //ctx.rect(x,y,dx,dy);
        //ctx.fillStyle = "blue";
        //ctx.fill();
        //ctx.closePath();
        ////draw the circular peg slots in a 2x2 grid
        //for (let j = 0; j < slots; j++) {
            //let pegX = (j & 1) + 1;
            //let pegY = ((j & (1 << 1)) >> 1) + 1;
            //ctx.beginPath();
            //ctx.arc(x + pegX*w/3,y + pegY*w/3,w/9,0,Math.PI*2);
            //ctx.fillStyle = "black";
            //ctx.fill();
            //ctx.closePath();
        //}
    //}

    //// draw the rectangles with slots
    //for (let i = 0; i < attempts; i++) {
        //drawGuess(i,["black","black","black","black"]);
    //}


    //// draw the answer box
    //ctx.beginPath(); 
    //ctx.rect(base*attempts+5,60,w,m/2);
    //ctx.fillStyle = "black";
    //ctx.fill();
    //ctx.closePath();

    //// draw the marble select box
    //drawMarbleSelect(0);
//}


//const run = function () {
    //drawBoard();
    //let turn = 0;
    //let marble = 0;
    //let slot = 0;
    //let guess = ["black","black","black","black"];


    //document.addEventListener(
        //"keydown",
        //(e) => {
            //const keyName = e.key;
            //if (keyName == "ArrowLeft") {
                //if (marble-1 < 0) {
                    //marble = marbleTypes-1;
                //}
                //else {
                    //marble--;
                //}
                //drawMarbleSelect(marble);

            //} 
            //else if (keyName == "ArrowRight") {
                //if (marble+1 >= marbleTypes) {
                    //marble = 0;
                //}
                //else {
                    //marble++;
                //}
                //drawMarbleSelect(marble);

            //}
            //else if (keyName == "ArrowUp") {
                //if (slot-1 < 0) {
                    //slot = slots-1;
                //}
                //else {
                    //slot--;
                //}
                //drawGuess(turn,guess,slot);
            //}
            //else if (keyName == "ArrowDown") {
                //if (slot+1 >= slots) {
                    //slot = 0;
                //}
                //else {
                    //slot++;
                //}
                //drawGuess(turn,guess,slot);

            //}
            //else if (keyName == "Enter") {
                //let hits = countHits();
                //let blows = countBlows();
                //drawPegs(turn,hits,blows);
                //turn++;
                //console.log(`Advancing from turn ${turn-1} to turn ${turn}`);
            //}
        //}
    //);
//}

//run();