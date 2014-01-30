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

	window.autoPos = new Object();

//  posities van de auto
	window.autoLinks = 0;
	window.autoMidden = 1;
	window.autoRechts = 2;

//  auto links x en y
	window.autoLinksx = 90;
	window.autoLinksy = 290;

//  auto midden x en y
	window.autoMiddenx = 295;
	window.autoMiddeny = 290;

//  auto rechts x en y
	window.autoRechtsx = 500;
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
	window.seconden = 0;
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

//  enemy messages
	
	window.enemyMessage_1 = new Image(); 
	enemyMessage_1.src = "img/enemy_whatsapp_message_1.png";

	window.enemyMessage_2 = new Image(); 
	enemyMessage_2.src = "img/enemy_livescore_1.png";

	window.enemyMessage_3 = new Image(); 
	enemyMessage_3.src = "img/enemy_livescore_2.png";

	window.enemyMessage_4 = new Image(); 
	enemyMessage_4.src = "img/enemy_livescore_3.png";

	window.enemyMessage_5 = new Image(); 
	enemyMessage_5.src = "img/enemy_livescore_4.png";

	window.enemyMessage_6 = new Image(); 
	enemyMessage_6.src = "img/enemy_livescore_6.png";

	window.enemyMessage_7 = new Image(); 
	enemyMessage_7.src = "img/enemy_livescore_7.png";	


// geluid

	window.message_geluid = new Audio("audio/geluid.mp3"); // buffers automatically when created

//  enemy message array 

	window.currentMessage = 0;
	window.currentMessageDrawing = false;
	window.messageY = 0;
	window.messageX = 0;

	window.messageHeight  = 219;
	window.messageWidth = 591;

	window.messageActive = false;
	window.messageActivesec = 0;
	window.enemyMessages = new Array();

	enemyMessages.push(enemyMessage_1);
	enemyMessages.push(enemyMessage_2);
	enemyMessages.push(enemyMessage_3);
	enemyMessages.push(enemyMessage_4);
	enemyMessages.push(enemyMessage_5);
	enemyMessages.push(enemyMessage_6);
	enemyMessages.push(enemyMessage_7);

	window.autoSpeed = 110;
	window.currentSecSpeed = 0;
	window.badSpeed = false;
	window.speedPressed = false;
//  vullen 	


//  als toets word ingedrukt dan keyboardListener functie aanroepen
	window.onkeydown = keyboardListenerKeydown;
	window.onkeyup = keyboardListenerKeyUp;

	window.onkeypress = keyboardListenerKeyPress;


//  canvas game achtergrond plaatje
	window.bg_canvasGameBackgroundImage = new Image();
	bg_canvasGameBackgroundImage.src = "img/game_background2.png";

//  Setinvals
	window.startFunctionsInterval;
	window.tijdSecondenInterval;

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
		drawStartScreen();
		window.canvas.style.display = 'none';
		gameStatus = 0;
		//startGame();
	}

} // einde window.onload

// als je af ben en opnieuw begint alles op 0 zetten en weer starten
function restartGame() {
	
	startCanvas.style.display = 'none';
	canvas.style.display = 'inline';

	gameStatus = 1;
	enemyArray.length = 0;
	currentMessage = 0;
	autoPositie = 1;
	tijdTeller = 0;
	gameProgressie = 0;	
	messageY = 401;
	messageX = 57;
	seconden = 0;
	autoSpeed = 110;
	startFunctionsInterval = setInterval(gameFunctions, 25);
	tijdSecondenInterval = setInterval(everySecond, 1000);




}

function endGame() {

	gameStatus = 3;
	window.clearInterval(startFunctionsInterval);
	window.clearInterval(tijdSecondenInterval);

	drawEindScherm();

}

function gameFunctions() {

	if(gameStatus == 1) {
		tijdTeller++;
		reDraw();
		collisionDetection();
		checkSpeed();
	}
}

function resumeGame() {
	
}

function collisionDetection() {


	for(var i = 0; i < enemyArray.length; i++ ) {

		if( enemyArray[i].levend) {

			if (enemyArray[i].yPos < autoPos.yPos + 30) {
			// if als er botsing is
				if(  enemyArray[i].yPos + enemyArray[i].scaleFactor*enemyHeight  >= autoPos.yPos  && enemyArray[i].xPos <= (autoPos.xPos + 61) && enemyArray[i].xPos + (enemyArray[i].scaleFactor * enemyWidth) >= (autoPos.xPos + 61)  ) {
		        	console.log("collision");
					endGame();
				} // als er botsing is geweest
			}

		} // einde if levend

	} // einde for loop

} // einde collisiondetection()

function keyboardListenerKeydown(e) {
	// 37 links / 38 omhoog / 39 rechts / 40 beneden / 80 P / 27 ESC / t 84 / y 89

	var code = e.keyCode ? e.keyCode : e.which;

	if(gameStatus == 1) {
	    if (code === 37) { //key left
	        if(autoPositie === 0) {

	        	endGame();
	        	console.log("teveel naar lnks");
	        }
	        if( autoPositie === 1 || autoPositie === 2) {
	    		autoPositie--;	
	        } 

	    } else if (code === 39) { //key right

	        if(autoPositie === 2) {
	        	console.log("teveel naar rechts");
	        	endGame();
	        }
	        if( autoPositie === 0 || autoPositie === 1) {
        		autoPositie++;	
        	}
	   	}

	   	if(code == 38) {

	   		autoSpeed++;
	   		speedPressed = true;
	   	}
	   	else if(code == 40) {

	   		if(autoSpeed > 0) {
	   			autoSpeed--;
	   			speedPressed = true
	   		}
	   	}
	   	else {
			
			speedPressed = false
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

    	endGame();
    	restartGame();
    }

    // T knop ingedrukt
    if(code == 84) {
    	if(gameStatus == 3) {
    	createEnemy(); }
    }
    // Y knop ingedrukt
    if(code == 89) {

    }
} // einde 

function keyboardListenerKeyUp(e) {
	var code = e.keyCode ? e.keyCode : e.which;

   	if(code == 38 || code == 40) {
   		speedPressed = false;
		console.log("key up " + speedPressed);
   	}

}

function keyboardListenerKeyPress(e) {
	alert();
	console.log(e);
}


// teken functies
function reDraw() {

	canvasContext.clearRect(0, 0, canvasWidth, canvasHeight);
	drawGameBackground();
	drawCar();
	drawEnemies();
	drawMessages();
	drawSpeed();

} // einde redraw()

// tekent auto
function drawCar() {

	// auto links
	if (autoPositie == 0) {
		autoPos.xPos = autoLinksx;
		autoPos.yPos = autoLinksy;

	} // auto midden
	else if (autoPositie == 1) {
		autoPos.xPos = autoMiddenx;
		autoPos.yPos = autoMiddeny;

	} // auto rechts
	else if (autoPositie == 2) {
		autoPos.xPos = autoRechtsx;
		autoPos.yPos = autoRechtsy;
	}
	
	canvasContext.drawImage(auto, autoPos.xPos, autoPos.yPos);
} // einde drawCar();

// maakt nieuwe enemy
function createEnemy(row) {

	// xPos = x positie / yPos = y positie / scaleFactor = schaalfactor(grootte) / row = welke rijbaan enemy zit / status = status (0 leven, 1 dood/weg)
	enemy = new Object();

	enemy.row = row;

	// als het straks random is
	enemy.soort = Math.floor( (Math.random()*5) );
	//enemy.soort = 0; // facebook nu

	if(enemy.row == 0) {
		enemy.xPos = 150;
		enemy.yPos = 60; 

	} else if (enemy.row == 1){
		enemy.xPos = 350;
		enemy.yPos = 60; 

	} else if (enemy.row == 2) {
		enemy.xPos = 546;
		enemy.yPos = 60; 

	}

	enemy.speed = 1;

	enemy.scaleFactor = 0.5;
	enemy.levend = true;

	enemyArray.push(enemy);

}

// tekent de enemies
function drawEnemies() {
	
	if(gameStatus == 1) {


		for(var i = 0; i < enemyArray.length; i++ ) {
			
			// check enemy.levend = true
			if(enemyArray[i].levend) {

				if(enemyArray[i].scaleFactor < 1) {

					enemyArray[i].scaleFactor += 0.01; 
				}

				if(enemyArray[i].yPos <= 400 ) {
					//volgPad(i);
					//console.log('enemy speed ' + enemyArray[0].xPos); 
					if( enemyArray[i].yPos % 30 == 0 ) {
					//enemyArray[i].yPos == 20 ||enemyArray[i].yPos == 40 || enemyArray[i].yPos == 80 || enemyArray[i].yPos == 100 || enemyArray[i].yPos == 120 || enemyArray[i].yPos == 150 || enemyArray[i].yPos == 175 || enemyArray[i].yPos == 200 || enemyArray[i].yPos == 250 || enemyArray[i].yPos == 300) {

						enemyArray[i].speed++;
					}

					if(enemyArray[i].row == 0 ) {//|| enemyArray[i].row == 2) {

						if( enemyArray[i].yPos % 10 == 0 ) {
						//enemyArray[i].yPos == 20 ||enemyArray[i].yPos == 40 || enemyArray[i].yPos == 80 || enemyArray[i].yPos == 100 || enemyArray[i].yPos == 120 || enemyArray[i].yPos == 150 || enemyArray[i].yPos == 175 || enemyArray[i].yPos == 200 || enemyArray[i].yPos == 250 || enemyArray[i].yPos == 300) {

							enemyArray[i].xPos--;
						}
					}

					enemyArray[i].yPos+= enemyArray[i].speed;
				} // einde if ypos >= 400
				else {

					enemyArray[i].levend = false;
					//enemyArray.splice(i, 1);
				}

				canvasContext.drawImage( enemySoortArray[enemyArray[i].soort], enemyArray[i].xPos - (enemyWidth*enemyArray[i].scaleFactor / 2), enemyArray[i].yPos, enemyWidth*enemyArray[i].scaleFactor, enemyHeight*enemyArray[i].scaleFactor );

			} // einde if enemy is levend
				
		} // einde for loop;
	} // eidne if gamestatus

} // einde drawEnemies


// tekent het startscherm
function drawStartScreen() {

	startCanvasContext.clearRect(0, 0, canvasWidth, canvasHeight);
	startCanvasContext.drawImage(bg_canvasStartScreenImage, 0, 0);

} // einde drawstartscreen

// tekent achtergrond
function drawGameBackground() {
	//console.log('in de drawGameBackground()');

	canvasContext.drawImage(bg_canvasGameBackgroundImage, 0, 0);

} // einde drawgamebackground();

// tekent pauze scherm 
function drawPauzeScherm() {

	if(gameStatus == 2) {
		canvasContext.clearRect(0, 0, canvasWidth, canvasHeight);
		canvasContext.drawImage(bg_pauzeSchermBackgroundImage, 0, 0);
	}

} // einde drawpauzescherm()

// tekent pauze scherm 
function drawEindScherm() {

	if(gameStatus == 3) {
		canvasContext.clearRect(0, 0, canvasWidth, canvasHeight);
		canvasContext.drawImage(bg_eindSchermBackgroundImage, 0, 0);
		canvasContext.font="16px Arial";
		canvasContext.fillText("Je hebt " + seconden + " seconden gereden",44,210);
	}

} // einde drawpauzescherm()

// tekent de berichtjes

function drawMessages() {

	if(gameStatus == 1) {

		if( currentMessageDrawing && messageActive) {

			if(messageY >= 280 && currentMessageDrawing) {
				messageY -= 8;

			}

			canvasContext.drawImage(enemyMessages[currentMessage], messageX, messageY, messageWidth, messageHeight);

		} // einde if secopnden
		else {
			if(messageY <= 400 && currentMessageDrawing) {

				messageY += 5;
				canvasContext.drawImage(enemyMessages[currentMessage], messageX, messageY , messageWidth, messageHeight);

			}
			else {

				messageY = 400;
				currentMessageDrawing = false;
			}
		}

	} // einde if gamestatus == 1 

}

function drawSpeed() {

	canvasContext.font="26px Arial";
	canvasContext.fillText(autoSpeed,300,30);
}

function everySecond() {
	spawnEnemies();
	secondenPlusPlus();
}

function secondenPlusPlus() {

	if(gameStatus == 1) {

		if(seconden % 6 == 0 && seconden > 3) {
			if(seconden > 6) {
				currentMessage++;
			}
			playMusic();
			messageActivesec = seconden;

			messageActive = true;
			currentMessageDrawing = true;

		}

		if(messageActive && seconden == messageActivesec + 2)
		{
			messageActive = false;

		}

		if(badSpeed) {

			currentSecSpeed++;
		}

		seconden++;

	} // einde if gamestatus

} // einden secondeplusplus

function playMusic() {
	
	message_geluid.play();

}

function checkSpeed() {

	if(gameStatus == 1 ) {

		if(autoSpeed < 100 || autoSpeed > 120 ) {

			badSpeed = true;
		}

		if ( autoSpeed > 100 && autoSpeed < 120  ) {
			console.log(badSpeed);
			badSpeed = false;
			currentSecSpeed = 0;
		}

		if(currentSecSpeed > 2) {
        	console.log("currentSecSpeed");
			endGame();
		}

		if(tijdTeller % 3 == 0 && !speedPressed) {

			if(autoSpeed > 0) {
				autoSpeed--;
			}
		}

	} // einde if gamestatus == 1
} // einde check speed

function spawnEnemies() {

	if(gameStatus == 1) {
		if(seconden % 1 == 0) {
			var  randomnummer = Math.floor( (Math.random()*4) );
			switch (randomnummer)
			{
			case 0:
			  createEnemy(0);
			  createEnemy(1);
			  break;
			case 1:
			  createEnemy(1);
			  createEnemy(2);
			  break;
			case 2:
			  createEnemy(0);
			  createEnemy(2);
			  break;
			case 3:
			  createEnemy(1);
			  break;
			case 4:
			  createEnemy(0);
			  break;
			} // einde switch
		} // einde if seconden % 1 
	} // einde if gamestatus == 1 
} // einde spawnEnemies