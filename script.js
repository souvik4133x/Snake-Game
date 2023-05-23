const gameboard=document.querySelector(".gameboard");
const scoreelement=document.querySelector(".score");
const highscoreelement=document.querySelector(".highscore");
const btn1=document.querySelector(".btn1");
const btn2=document.querySelector(".btn2");
const btn3=document.querySelector(".btn3");
const pa=document.querySelector(".pause");
const controls = document.querySelectorAll(".controls i");
let snakex=5;
let snakey=5;
let foodx=15;
let foody=15;
let velx=0;
let vely=0;
let snakebody=[];
let gameover=false;
var setintervalid;
let score=0;



let highscore=localStorage.getItem("highscore")||0;
highscoreelement.innerHTML=`Highscore:${highscore}`;



const changefood=()=>{

    foodx=Math.floor(Math.random()*23)+1;
    foody=Math.floor(Math.random()*23)+1;

}
const handlegameover=()=>{
    clearInterval(setintervalid);
    alert("GAME OVER ! PRESS OK TO PLAY AGAIN ");
    
    location.reload();
}
const changedirection=(e)=>{
    if(e.key==="ArrowUp" && vely!=1){
        velx=0;
        vely=-1;

    }
    else if(e.key==="ArrowDown" && vely!=-1){
        velx=0;
        vely=1;
        
    }
    else if(e.key==="ArrowLeft" && velx!=1){
        velx=-1;
        vely=0;
        
    }
    else if(e.key==="ArrowRight" && velx!=-1){
        velx=1;
        vely=0;
        
    }
initgame();

}

const initgame=()=>{
    document.addEventListener("keyup",changedirection);
if(gameover){

 return handlegameover();

}
    snakex+=velx;Highscore:
    snakey+=vely;
let html=`<div class="food" style="grid-area:${foody}/${foodx}"></div>`;
if(snakex===foodx && snakey===foody){
    changefood();
    snakebody.push([foodx,foody]);
    score++;
    highscore = score>=highscore?score:highscore;
    localStorage.setItem("highscore",highscore);
    scoreelement.innerHTML=`score:${score}`;
    highscoreelement.innerHTML=`Highscore:${highscore}`;

}

for(let i=snakebody.length-1;i>0;i--){
    snakebody[i]=snakebody[i-1];
}
snakebody[0]=[snakex,snakey];
if(snakex<=0 ||snakex>25 ||snakey<=0||snakey>25){
    gameover=true;
}

for(let i=0;i<snakebody.length;i++){
    html+=`<div class="head" style="grid-area:${snakebody[i][1]}/${snakebody[i][0]}"></div>`;
    if(i!=0 && snakebody[0][1]===snakebody[i][1] && snakebody[0][0]===snakebody[i][0]){
        gameover=true;
    }
}



gameboard.innerHTML=html;

}
function restart(){
    clearInterval(setintervalid);
    location.reload();
}
function pause(){
    alert("PRESS OK TO REWIND THE GAME");
}
changefood();
function easy(){
   let speed=375;
   elo=true;
   pa.removeAttribute("disabled");
   btn1.setAttribute("disabled",true);
   btn2.setAttribute("disabled",true);
   btn3.setAttribute("disabled", true);
   setintervalid=setInterval(initgame,speed);
   controls.forEach(butto => butto.addEventListener("click", () => changedirection({ key: butto.dataset.key })));
}
function medium(){
   
    let speed=150;
    elo=true;
    pa.removeAttribute("disabled");
    btn1.setAttribute("disabled",true);
    btn2.setAttribute("disabled",true);
   btn3.setAttribute("disabled", true);
    setintervalid=setInterval(initgame,speed);
    controls.forEach(butto => butto.addEventListener("click", () => changedirection({ key: butto.dataset.key })));
 }
 function hard(){
    let speed=75;
     elo=true;
    pa.removeAttribute("disabled");
    btn1.setAttribute("disabled",true);
   btn2.setAttribute("disabled", true);
   btn3.setAttribute("disabled", true);
    setintervalid=setInterval(initgame,speed);
    controls.forEach(butto => butto.addEventListener("click", () => changedirection({ key: butto.dataset.key })));
 }
