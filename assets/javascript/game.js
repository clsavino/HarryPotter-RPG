$(document).ready(function() {

var	wizards = [
	{
		'name': 'harry',
		'jpgFile': "assets/images/harry300x300.jpg",
		'hp' : 200,
		'ap' : 30,
		'counterAttackPower' : 30
	},
	{
		'name': 'draco',
		'jpgFile': "assets/images/draco300x300.jpg",
		'hp' : 150,
		'ap' : 25,
		'counterAttackPower' : 25		
	},
	{
		'name': 'hermione',
		'jpgFile': "assets/images/hermione300x300.png",
		'hp' : 125,
		'ap' : 20,
		'counterAttackPower' : 20		
	},
	{
		'name': 'ron',
		'jpgFile': "assets/images/ron300x300.jpg",
		'hp' : 100,
		'ap' : 10,
		'counterAttackPower' : 10	
	}];//End of wizards array

	var gameOver = false;
	var attackerSelected = false;
	var defenderSelected = false;
	var defenderBeaten = false; 
	var attacks = 0;
	var wins = 0;
	var disableAttackBtn = true;
	var setupDone = true;
	var counterAttackPower = 10;
	var attackerSelected = false;
	var defenderSelected = false;
	var defenderAP = 10;
	var defenderHP = 100;
	var attackerHP = 100;
	var attackerAP = 10;
	var wizIndex = 0;

	var yourAttackMsg = '<p>You attacked your enemy for ' + counterAttackPower + ' damage</p><p>Your enemy attacked you back for ' + defenderAP + ' damage</p>';

	var defeatedMsg = '<p>You have been defeated...Game Over. Press Restart to play again</p>';

	var winnerMsg = '<p>You Won!!! Game Over! Press Restart to play again</p>';

	var nextWizardMsg = '<p>You have defeated your enemy. You can select another wizard to continue your training</p>';

	var selectWizMsg = '<p>Select a Wizard to train for battle.</p><p>You must defeat the other 3 to win the Wizard Battle Contest.</p><p></p>';

	function battle() {
		console.log('battle function called');
		// Attack button has been clicked
		//update number of times attacker attacks 
		//used to detmine counterAttackPower
		attacks++;
		console.log('attacks = ' + attacks);
		counterAttackPower = attacks * wizards[wizIndex].ap;
		console.log('counterAttackPower ' + counterAttackPower);
		//display updated defender HP
		defenderHP = defenderHP - counterAttackPower;
		console.log('defenderHP ' + defenderHP);
		//display updated attacker HP
		attackerHP = attackerHP - defenderAP;
		console.log('attackerHP ' + attackerHP);
		//document.getElementById("gameInfo").innerHTML = '<p> </p>';
		document.getElementById("gameInfo").innerHTML = yourAttackMsg; 
		
		if (defenderHP <= 0) {
			document.getElementById('gameInfo').innerHTML= nextWizardMsg;
			removeEnemy();
			defenderSelected = false;
			wins++;
			disableAttackBtn = true;
		}
		if (attackerHP <= 0) {
			document.getElementById('gameInfo').innerHTML = defeatedMsg;
			disableAttackBtn = true;
		}
		if (wins === 3) {
			document.getElementById('gameInfo').innerHTML = winnerMsg;
		}

		//
	}

	// move the attacker to the attacker location
	function moveAttacker(){
		console.log('moveAttacker function called');
	}
	// move the Defender to the defender location
	function moveDefender(){
		console.log('moveDefender function called');
	}
	//move 3 wizards to the "enemy" location
	function moveEnemies(){
		console.log('moveEnemies function called');
	}
	// move the 4 wizards to the top of the page 
	// to start or restart a game
	function moveWizards(){
		console.log('moveWizards function called');
	}
	// remove the enemy when he has lost the round
	function removeEnemy(){
		console.log('removeEnemy function called');
	}
	// all things to do to restart a game
	function restart() {
		// remove attacker
		moveAttacker();
		//Put 4 images back at top
		//$('.wizard-wrapper').show();
		moveWizards();
		// reset AP for all characters
		wizards[0].counterAttackPower = 40;
		wizards[1].counterAttackPower = 25;
		wizards[2].counterAttackPower = 20;
		wizards[3].counterAttackPower = 10;
		// Set Select Wizard message
		document.getElementById('gameInfo').innerHTML= nextWizardMsg;

		//reset game values
		wins = 0;
		attacks = 0;
		gameOver = false;
		attackerSelected = false;
		defenderSelected = false;
		defenderBeaten = false;
		setupDone = true;
		disableAttackBtn = true;

		console.log('restart function called');
	}

	//listen for click on wizard
	$('img').on('click', function() {
		if (!attackerSelected) { 
			console.log('attacker selected');
		//no attacker selected yet
			//get attacker's info using jQuery
			// attacker = one clicked
			// attackerHP = wizard[index].hp
			// attackerAP = wizard[index].ap
			moveAttacker();
			moveWizards();
			attackerSelected = true;

		} else {
			if (!defenderSelected) {
				console.log('defender selected');
				//get defender's info 
				//defender = one clicked
				//defenderHP = wizard[index].hp
				//defenderAP = wizard[index].ap
				moveDefender();
				defenderSelected = true;
				disableAttackBtn = false;
				
			};
		};//end of else
	});

	//listen for Restart Button clicked
	$('#restartBtn').on('click', function() {
		console.log('restart btn clicked');
		restart();
		
	});

	//listen for attack button clicked
	$('#attackBtn').on('click', function() {
		console.log('attack button clicked');
		battle();
			
	});


}); //end of document.ready
		