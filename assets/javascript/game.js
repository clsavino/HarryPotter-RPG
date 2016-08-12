window.onload = function() {

var	wizards : [
	{
		'name': 'harry',
		'jpgFile': "assets/images/harry300x300.jpg",
		'hp' : 200,
		'ap' : 40,
		'counterAttackPower' : 40
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
	var hits = 0;
	var wins = 0;
	var disableAttackBtn = true;
	var setupDone = true;
	var counterAttackPower = 10;

	function battle() {

	}

	function moveAttacker(){

	}

	function moveDefender(){

	}

	function moveEnemies(){

	}

	function moveWizards(){

	}

	function restart() {
		//Put 4 images back at top
		//$('.wizard-wrapper').show();
		moveWizards();
		// reset AP for all characters
		wizards[0].counterAttackPower = 40;
		wizards[1].counterAttackPower = 25;
		wizards[2].counterAttackPower = 20;
		wizards[3].counterAttackPower = 10;

		//reset game values
		wins = 0;
		hits = 0;
		gameOver = false;
		attackerSelected = false;
		defenderSelected = false;
		defenderBeaten = false;
		setupDone = true;
		disableAttackBtn = true;
	}


	$(document).ready(function() {
		
		$('img').on('click', function() {
			if (!attackerSelected) {
				moveAttacker();
				moveEnemies();
				attackerSelected = true;
			} else {
				if (!defenderSelected) {
					defenderSelected = true;
					moveDefender();
				};
			};//end of else




	}); //end of document.ready