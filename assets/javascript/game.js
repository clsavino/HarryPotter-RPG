$(document).ready(function() {

var	wizards = {
	Harry:{
		'name': 'Harry',
		'jpgFile': "assets/images/harry300x300.jpg",
		'hp' : 175,
		'ap' : 25,
		'counterAttackPower' : 25
	},
	Draco:{
		'name': 'Draco',
		'jpgFile': "assets/images/draco300x300.jpg",
		'hp' : 150,
		'ap' : 20,
		'counterAttackPower' : 20		
	},
	Hermione:{
		'name': 'Hermione',
		'jpgFile': "assets/images/hermione300x300.png",
		'hp' : 125,
		'ap' : 15,
		'counterAttackPower' : 15		
	},
	Ron:{
		'name': 'Ron',
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
	var wizAvail = 3;
	var defender;
	var defenderAP;
	var defenderHP;
	var defenderName;
	var attacker;
	var attackerHP;
	var attackerAP;
	var attackerName;
	var cloneImg;

	var defeatedMsg = '<p>You have been defeated...Game Over. Press Restart to play again</p>';

	var winnerMsg = '<p>You Won!!! Game Over! Press Restart to play again</p>';

	var nextWizardMsg = '<p>You have defeated your enemy. You can select another wizard to continue your training</p>';

	var selectWizMsg = '<p>Select a Wizard to train for battle.</p><p>You must defeat the other 3 to win the Wizard Battle Contest.</p><p></p>';

	var enemiesMsg = '<p> Wizards available to battle </p>';


	// all things to do to restart a game
	function restart() {
		// remove attacker, name and hp
		$('div.attacker').empty();

		// remove all wizards in gallery
		$('#gallery').empty();

		//Put 4 images back at top
		$('#gallery').append('<img class="images" src="assets/images/harry300x300.jpg" alt="Harry Potter with his wand" data-index="0" data-name="Harry">');
		$('#gallery').append('<img class="images" src="assets/images/draco300x300.jpg" alt="Draco with his wand" data-index="1" data-name="Draco">');
		$('#gallery').append('<img class="images" src="assets/images/hermione300x300.jpg" alt="Hermione with her wand" data-index="2" data-name="Hermione">');
		$('#gallery').append('<img class="images" src="assets/images/ron300x300.jpg" alt="Ron with his wand" data-index="3" data-name="Ron">');

		// Set Select Wizard message
		document.getElementById('gameInfo').innerHTML= selectWizMsg;

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

		//document.getElementById("gameInfo").innerHTML = '<p> </p>';
		document.getElementById("gameInfo").innerHTML = '<p>You attacked your enemy for ' + counterAttackPower + ' damage</p><p>Your enemy attacked you back for ' + defenderAP + ' damage</p>'; 
		
		if (defenderHP <= 0) {
			document.getElementById('gameInfo').innerHTML= nextWizardMsg;

			$('div.defender').empty();

			console.log('defender' + defender);
			console.log('defenderHP <=0');

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
		console.log('======================');
	} //end of battle function

	//listen for click on wizard
	$('img').on('click', function() {
		console.log('on.click, attackerSelected ' + attackerSelected);
		console.log('on.click, defenderSelected ' + defenderSelected);
		if (!attackerSelected) { 

			//no attacker selected yet
			attacker = $(this);
			attackerName = $(this).data('name');
			attackerHP = wizards[attackerName].hp;
			attackerAP = wizards[attackerName].ap;
			console.log('attatckerHP ' + attackerHP);
			console.log('attatckerAP ' + attackerAP);
			// Display Wizards avail to battle message
			$('#gallery').append(enemiesMsg).addClass('avail');

			//clone the image, append it to attacker div, remove from gallery			
			cloneImg = $(this).clone();
			$(cloneImg).addClass('attacker');
			$('div.attacker').append(cloneImg);
			$(this).remove(); //remove the image from gallery

			//prepend the name of attacker
			$('div.attacker').prepend('<p>' + attackerName + '</p');
			//append the HP of the attacker
			$('div.attacker').append('<p>hp ' + attackerHP + '</p>');
			// set flag that an attacker has been selected
			attackerSelected = true;

		} else {
			if (!defenderSelected) {
				console.log('defender selected');
				//defender = $(this).data('name');
				defender = $(this);
				defenderName = $(this).data('name');
			    //defenderName = wizards[defender].name;
				console.log('defender ' + defender);
				defenderHP = wizards[defenderName].hp;
			    defenderAP = wizards[defenderName].ap;
			    defenderName = wizards[defenderName].name;
			    console.log('defenderHP ' + defenderHP);
				console.log('defenderAP ' + defenderAP);
				console.log('defender name ' + defenderName);
				//clone the image
				cloneImg = $(this).clone();
				$(cloneImg).addClass('defender');
				$('div.defender').append(cloneImg);

				$('div.defender').prepend('<p>' + defenderName + '</p');
				//append the HP of the attacker
				$('div.defender').append('<p>hp ' + defenderHP + '</p>');

				//remove the clicked image
				$(this).remove();
				// set flag that an attacker has been selected,
				// enable attack
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
		