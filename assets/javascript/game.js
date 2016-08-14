$(document).ready(function() {

var	wizards = {
	harry:{
		'name': 'harry',
		'jpgFile': "assets/images/harry300x300.jpg",
		'hp' : 175,
		'ap' : 25,
		'counterAttackPower' : 25
	},
	draco:{
		'name': 'draco',
		'jpgFile': "assets/images/draco300x300.jpg",
		'hp' : 150,
		'ap' : 20,
		'counterAttackPower' : 20		
	},
	hermione:{
		'name': 'hermione',
		'jpgFile': "assets/images/hermione300x300.png",
		'hp' : 125,
		'ap' : 15,
		'counterAttackPower' : 15		
	},
	ron:{
		'name': 'ron',
		'jpgFile': "assets/images/ron300x300.jpg",
		'hp' : 100,
		'ap' : 10,
		'counterAttackPower' : 10
	}	
	};//End of wizards 

	var gameOver = false;
	var attackerSelected = false;
	var defenderSelected = false;
	var defenderBeaten = false; 
	var attacks = 0;
	var wins = 0;
	var enableAttack = false;
	var attackerSelected = false;
	var defenderSelected = false;
	var wizIndex = 0;
	var attacker = "";
	var defender = "";
	var defenderAP;
	var defenderHP;
	var defenderName;
	var attackerHP;
	var attackerAP;
	var attackerName;
	var cloneImg;

	var defeatedMsg = '<p>You have been defeated...Game Over. Press Restart to play again</p>';

	var winnerMsg = '<p>You Won!!! Game Over! Press Restart to play again</p>';

	var nextWizardMsg = '<p>You have defeated your enemy. You can select another wizard to continue your training</p>';

	var selectWizMsg = '<p>Select a Wizard to train for battle.</p><p>You must defeat the other 3 to win the Wizard Battle Contest.</p><p></p>';

	// move the attacker to the attacker location
	function removeAttacker(){
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
		removeAttacker();
		//Put 4 images back at top
		//$('.wizard-wrapper').show();
		moveWizards();

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
		enableAttack = false;

		console.log('restart function called');
	}

	function battle() {
		console.log('battle function called');

		//update number of times attacker attacks 
		// attacks used to detmine counterAttackPower
		attacks++;
		console.log('attacks = ' + attacks);

		counterAttackPower = attacks * attackerAP;
		console.log('counterAttackPower ' + counterAttackPower);

		//display updated defender HP
		defenderHP = defenderHP - counterAttackPower;
		console.log('defenderHP ' + defenderHP);

		//display updated attacker HP
		attackerHP = attackerHP - defenderAP;
		console.log('defenderAP ' + defenderAP);
		console.log('attackerHP ' + attackerHP);
		console.log('======================');
		//document.getElementById("gameInfo").innerHTML = '<p> </p>';
		document.getElementById("gameInfo").innerHTML = '<p>You attacked your enemy for ' + counterAttackPower + ' damage</p><p>Your enemy attacked you back for ' + defenderAP + ' damage</p>'; 
		
		if (defenderHP <= 0) {
			document.getElementById('gameInfo').innerHTML= nextWizardMsg;
			removeEnemy();
			defenderSelected = false;
			wins++;
			enableAttack = false;
			console.log('wins ' + wins);
			console.log('enableAttack ' + enableAttack);
		}
		if (attackerHP <= 0) {
			document.getElementById('gameInfo').innerHTML = defeatedMsg;
			enableAttack = false;
		}
		if (wins === 3) {
			document.getElementById('gameInfo').innerHTML = winnerMsg;
			enableAttack = false;
		}

	} //end of battle function

	//listen for click on wizard
	$('img').on('click', function() {
		if (!attackerSelected) { 
			console.log('attacker selected');
			//no attacker selected yet
			attacker = $(this).data('name');
			attackerHP = wizards[attacker].hp;
			attackerAP = wizards[attacker].ap;
			attackerName = wizards[attacker].name;
			console.log('attacker ' + attacker);
			//clone the image
			cloneImg = $(this).clone();
			//insert the clone
			$(cloneImg).insertAfter('#box2');
			$('#box2').append(cloneImg);
			//prepend the name of defender
			$(cloneImg).prepend('<p>' + attackerName + '</p');
			//append the HP of the defender
			$(cloneImg).append('<p>HP ' + attackerHP + '</p>');	
			//remove the image
			$(this).remove();

			moveWizards();
			attackerSelected = true;

		} else {
			if (!defenderSelected) {
				console.log('defender selected');
				defender = $(this).data('name');
				console.log('defender ' + defender);
				defenderHP = wizards[defender].hp;
			    defenderAP = wizards[defender].ap;
			    defenderName = wizards[defender].name;
				//clone the image
				cloneImg = $(this).clone();
				//insert the clone
				$('cloneImg').insertAfter('#box3');
				$('#box3').append(cloneImg);

				//prepend the name of defender
				$(cloneImg).prepend('<p>' + defenderName + '</p');
				//append the HP of the defender
				$(cloneImg).append('<p>HP ' + defenderHP + '</p>');	
				//remove the clicked image
				$(this).remove();

				defenderSelected = true;
				enableAttack = true;
				console.log('enableAttack ' + enableAttack);
				
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
		console.log('enableAttack ' + enableAttack);
		if (enableAttack = true) {
			battle();
		}
					
	});


}); //end of document.ready
		