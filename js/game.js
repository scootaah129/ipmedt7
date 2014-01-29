// als scherm wordt geladen
window.onload = function(){

//  canvas	
	window.canvas = document.getElementById("gameCanvas");
	window.canvasContext = canvas.getContext("2d");


	window.startCanvas = document.getElementById('startCanvas');
	window.startCanvasContext = startCanvas.getContext("2d");

//  eind scherm
	window.bg_eindSchermBackgroundImage = new Image();
	bg_eindSchermBackgroundImage.src = "img/game_eindScherm.png";

//  pauze scherm
	window.bg_pauzeSchermBackgroundImage = new Image();
	bg_pauzeSchermBackgroundImage.src = "img/game_pauzeScherm.png";
	//game_pauzeScherm
//  auto
	window.auto = new Image();
	auto.src = "img/carrearend_small.png";


//  posities van de auto
	window.autoLinks = 0;
	window.autoMidden = 1;
	window.autoRechts = 2;

//  auto links x en y
	window.autoLinksx = 110;
	window.autoLinksy = 290;

//  auto midden x en y
	window.autoMiddenx = 295;
	window.autoMiddeny = 290;

//  auto rechts x en y
	window.autoRechtsx = 450;
	window.autoRechtsy = 290;


//  auto in het midden
	window.autoPositie = 1;

//  canvas afmetingen
	window.canvasWidth = 700;
	window.canvasHeight = 393;

//  enemies

//  enemy array
	window.enemyArray = new Array();

//  enemy tijd teller, elke zoveel tijdtellen een nieuw enemy
	window.tijdTeller = 0;
//  enemy sizes
	window.enemyHeight = 100;
	window.enemyWidth = 100;
	//enemyArray[0][1];
//  facebook enemy
	window.enemy_facebook = new Image();
	enemy_facebook.src = "img/enemy_facebook.png";

	window.enemy_whatsapp = new Image();
	enemy_whatsapp.src = "img/enemy_whatsapp.png";

	window.enemy_twitter = new Image();
	enemy_twitter.src = "img/enemy_twitter.png";

	window.enemy_voetbal = new Image();
	enemy_voetbal.src = "img/enemy_voetbal.png";

	window.enemy_sms = new Image();
	enemy_sms.src = "img/enemy_sms.png";


//  enemy soorten array vullen
//  0 = facebook;
	window.enemySoortArray = new Array();

	enemySoortArray.push(enemy_facebook);
	enemySoortArray.push(enemy_whatsapp);
	enemySoortArray.push(enemy_twitter);
	enemySoortArray.push(enemy_voetbal);
	enemySoortArray.push(enemy_sms);


//  als toets word ingedrukt dan keyboardListener functie aanroepen
	window.onkeyup = keyboardListener;

//  canvas game achtergrond plaatje
	window.bg_canvasGameBackgroundImage = new Image();
	bg_canvasGameBackgroundImage.src = "img/game_background2.png";

//  Setinvals
	window.startFunctionsInterval;

//  game status 
//	0 = begin scherm
//  1 = aan het spelen
//  2 = pauze scherm
//  3 = einde scherm
	window.gameStatus = 0;

//  gameProgressie, hoever de speler in het spel is
	window.gameProgressie = 0;

//  start scherm 
	window.bg_canvasStartScreenImage = new Image();
	bg_canvasStartScreenImage.src = "img/startScreen.png";

//  Teken startscherm
	bg_canvasStartScreenImage.onload = function(){
		//drawStartScreen();
		//window.canvas.style.display = 'none';
		startGame();
	}



} // einde window.onload


// als er op play gedrukt wordt start de game en het drawen
function startGame() {

	// set startscherm op display none;
	startCanvas.style.display = 'none';
	canvas.style.display = 'inline';
	startFunctionsInterval = setInterval(gameFunctions, 10);
	gameStatus = 1;

} // einde startgame()

function gameFunctions() {
	//console.log('in de gameFunctions()');
	reDraw();
	collisionDetection();
}

function resumeGame() {
	
}


function keyboardListener(e) {
	// 37 links / 38 omhoog / 39 rechts / 40 beneden / 80 P / 27 ESC / t 84 / y 89

	var code = e.keyCode ? e.keyCode : e.which;
    if (code === 37) { //up key
        if( autoPositie === 1 || autoPositie === 2) {
        	if(gameStatus == 1) {
        		autoPositie--;	
        	}
        } 
    } else if (code === 39) { //down key
        if( autoPositie === 0 || autoPositie === 1) {
        	if(gameStatus == 1) {
        		autoPositie++;	
        	}
        } 
    }

    // P knop gedrukt
    if (code == 80) {
    	// als het al pauze is dan weer resumen
    	if(gameStatus == 2) {
    		gameStatus = 1;
    		resumeGame();
    	} else {
    		gameStatus = 2;
    		drawPauzeScherm();
    	}
    }

    // ESC knop gedrukt
    if(code == 27) {
    	gameStatus = 2;
    }

    if(code == 84) {
    	createEnemy();
    	//console.log('createEnemy()');
    }
    if(code == 89) {

    	console.log(enemyArray[0].row);
    }
};


// teken functies
function reDraw() {

	if(gameStatus == 1) {
		drawGameBackground();
		drawCar();
		drawEnemies();
	}

} // einde redraw()

// tekent auto
function drawCar() {

	// auto links
	if (autoPositie == 0) {

		canvasContext.drawImage(auto, autoLinksx, autoLinksy);

	} // auto midden
	else if (autoPositie == 1) {

		canvasContext.drawImage(auto, autoMiddenx, autoMiddeny);

	} // auto rechts
	else if (autoPositie == 2) {

		canvasContext.drawImage(auto, autoRechtsx, autoRechtsy);
	}

} // einde drawCar();

// maakt nieuwe enemy
function createEnemy() {

	// xPos = x positie / yPos = y positie / scaleFactor = schaalfactor(grootte) / row = welke rijbaan enemy zit / status = status (0 leven, 1 dood/weg)
	enemy = new Object();

	enemy.row =  Math.floor(Math.random()* 3 );
	//enemy.row = 1;


	console.log('enemy.row in create enenmy ' + enemy.row);
	
	// als het straks random is
	enemy.soort = Math.floor( (Math.random()*5) );
	//enemy.soort = 0; // facebook nu

	if(enemy.row == 0) {
		enemy.xPos = 150;
		enemy.yPos = 90; 

	} else if (enemy.row == 1){
		enemy.xPos = 350;
		enemy.yPos = 90; 

	} else if (enemy.row == 2) {
		enemy.xPos = 546;
		enemy.yPos = 90; 

	}

	enemy.scaleFactor = 0.4;
	enemy.levend = true;

	enemyArray.push(enemy);

}


// tekent de enemies
function drawEnemies() {
	
	tijdTeller++;

	if( (tijdTeller % 200) == 0) {

		createEnemy();
	}
	if(gameProgressie == 0) {

		
		for(var i = 0; i < enemyArray.length; i++ ) {
			//console.log('in de drawEnemies() for loop');
			// img, x, y, width, height
			//console.log( 'enemyArray .type ' + enemyArray[i].type  );//enemySoortArray[enemyArray[i].type].src);
			
			// check enemy.levend = true
			if(enemyArray[i].levend) {


				if(enemyArray[i].scaleFactor <= 1 && (tijdTeller % 2) == 0) {

					enemyArray[i].scaleFactor += 0.01;
				}
				if(enemyArray[i].yPos <= 400 ) {
					//volgPad(i);
					enemyArray[i].yPos+=1;
				} // einde if ypos >= 400
				else {
					enemyArray[i].levend = false;
				}

				canvasContext.drawImage( enemySoortArray[enemyArray[i].soort], enemyArray[i].xPos - (enemyWidth*enemyArray[i].scaleFactor / 2), enemyArray[i].yPos, enemyWidth*enemyArray[i].scaleFactor, enemyHeight*enemyArray[i].scaleFactor );

			} // einde if enemy is levend
				
		} // einde for loop;

	} // einde if gameprogressie = 0
	// 
	else if (gameProgressie == 1) {


	} // einde if gameProgessie == 1
	else if (gameProgessie == 2) {


	} // einde if gameProgressie == 3 


} // einde drawEnemies




// tekent het startscherm
function drawStartScreen() {

	startCanvasContext.clearRect(0, 0, canvasWidth, canvasHeight);
	startCanvasContext.drawImage(bg_canvasStartScreenImage, 0, 0);

} // einde drawstartscreen

// tekent achtergrond
function drawGameBackground() {
	//console.log('in de drawGameBackground()');
	canvasContext.clearRect(0, 0, canvasWidth, canvasHeight);
	canvasContext.drawImage(bg_canvasGameBackgroundImage, 0, 0);

} // einde drawgamebackground();

// tekent pauze scherm 
function drawPauzeScherm() {

	if(gameStatus == 2) {
		canvasContext.clearRect(0, 0, canvasWidth, canvasHeight);
		canvasContext.drawImage(bg_pauzeSchermBackgroundImage, 0, 0);
	}

} // einde drawpauzescherm()





// dump code niet meer nodig misschien handig


// laat enemies het juiste pad volgen
/*function volgPad(a) {
	console.log(a);
	var y = enemyArray[a].yPos;
			console.log(y);	
	if( enemyArray[a].row == 1) {
		if ( (y % 4) == 0 && y < 290) {	

		if( y == 90 || y == 95 || y == 100 || y == 105 || y == 110 || y == 115 || y == 120 || y == 125 || y == 130 || y == 135 || 
			y == 140 || y == 145 || y == 150 || y == 155 || y == 160 || y == 165 || y == 170 || y == 175 || y == 180 || y == 190 || y == 195 || y == 200 ||
			y == 205 || y == 210 || y == 215 || y == 220 || y == 225 || y == 230 || y == 235 || y == 240 || y == 245 || y == 250 || y == 255 || y == 260 || 
			y == 265 || y == 270 || )  {


			enemyArray[a].xPos -= 1;
		} // einde if xpos ==
	} // einde if row =- 1 
} // einde volgpad*/


/*
function setupGame() {

	alert('gameCanvas');
    var gameCanvas = document.getElementById("gameCanvas");
    //avatar image    
    setInterval(handleTick, 25);

    var avatarImage = new Image();
    avatarImage.src = "avatar.png";


    avatarImage.onload = function () {
	    //gameCanvas.getContext("2d").drawImage(avatarImage, Math.random() * 100, Math.random() * 100);
	    gameCanvas.addEventListener("mousemove", handleMouseMomement);
	}

}	*/
 
/*function handleMouseMomement(mouseEvent) {

	avatarX = mouseEvent.offsetX;
    avatarY = mouseEvent.offsetY;

}
*/

/*function handleTick() {

    enemyY += 5;

    //gameCanvas.getContext("2d").clearRect(0, 0, width, height);
	var gameCanvas = document.getElementById("gameCanvas");

	var avatarImage = new Image();
	 
	avatarImage.src = "avatar.png";

	// clear scherm
	
	avatarImage.onload = function() {
		//gameCanvas.getContext("2d").clearRect(0, 0, width, height);
		gameCanvas.getContext("2d").drawImage(avatarImage, avatarX, avatarY);
	}

	    //enemy image
    var enemyImage = new Image();
    enemyImage.src = "enemy.png";

	enemyImage.onload = function() {

		if(enemyY >= 400) {
			gameCanvas.getContext("2d").drawImage(enemyImage,  250, 0 ) ;
			enemyY = 0;

		} // einde if
		else {
			gameCanvas.getContext("2d").drawImage(enemyImage,  250, enemyY) ;		

		} // einde end
	} // eine enemy.onload function

}*/