const boxes=document.querySelectorAll(".box");
const current=document.querySelector(".current");
const newgamebtn=document.querySelector(".btn");

let currentplayer;
let gamegrid;

const winnningpositions=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]

];

//function to initialise the game i.e how the game ui looks like before the game START;
function initgame(){
    currentplayer="X";
    gamegrid=["","","","","","","","",""];
    boxes.forEach((box,index)=>{
box.innerText="";
boxes[index].style.pointerEvents = "all";


//we have to remove the green color when the gamne is over i.e when we restart the game then previous 
//game win hone par jo green color aayega usse remove karna hoga to ye init game wale function me hi karenge;

//one more thing is missing, initialise box with css properties again
box.classList = `box box${index+1}`;


    });
//classlist is used to remove or add a particular class to an element
newgamebtn.classList.remove("active");
//backtics ke andar jaise likhenge waise hi likhayega

//initially hamara current class jo hai usme current player-x likha rahna chahiye to jab hamara game phir se initialise hoga 
//to hamara current player-x rahana chahiye so ham initgame function me backtic ke andar current player-${currentplayer} karenge; currentplayer ko x se initialise kiya hai
current.innerText = `Current Player - ${currentplayer}`;
}
initgame();


function swapTurn() {
    if(currentplayer === "X") {
        currentplayer = "O";
    }
    else {
        currentplayer = "X";
    }
    //UI Update
    current.innerText = `Current Player - ${currentplayer}`;
}

//function to update current player value ro x or o if the game is completed and adding grin color from the  win class defined in css;


function checkGameOver() {
    let answer = "";

    winnningpositions.forEach((position) => {
        //all 3 boxes should be non-empty and exactly same in value
        if( (gamegrid[position[0]] !== "" || gamegrid[position[1]] !== "" || gamegrid[position[2]] !== "") 
            && (gamegrid[position[0]] === gamegrid[position[1]] ) && (gamegrid[position[1]] === gamegrid[position[2]])) {

                //check if winner is X
                if(gamegrid[position[0]] === "X") 
                    answer = "X";
                else {
                    answer = "O";
                } 
                    

                //disable pointer events
                boxes.forEach((box) => {
                    box.style.pointerEvents = "none";
                })

                //now we know X/O is a winner
                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");
            }
    });




//it means we have a winner
if(answer !== "" ) {

    //agar winner mil jayega to current player-x ki jagah hame winner player -x or o likhna hai jo ki answer me store 
    //hoga ki X jeeta hai ya O
    current.innerText = `Winner player - ${answer}`;
   newgamebtn.classList.add("active");
   return;
}

//We know, NO Winner Found, let's check whether there is tie
let fillCount = 0;
gamegrid.forEach((box) => {
    if(box !== "" )
        fillCount++;
});

//board is Filled, game is TIE
if(fillCount === 9) {
    current.innerText = "Game Tied !";
    newgamebtn.classList.add("active");
}

}


//function to write x or o while clicking i.e while clicking current player ki value box me aayegi below function se;
function handleClick(index) {
    if(gamegrid[index] === "" ) {
        boxes[index].innerText = currentplayer;
        gamegrid[index] = currentplayer;
        boxes[index].style.pointerEvents = "none";
        //swap karo turn ko
        swapTurn();
        //check koi jeet toh nahi gya
        checkGameOver();
    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});
newgamebtn.addEventListener("click", initgame);

