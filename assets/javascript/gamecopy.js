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
	var cloneOfWizards = $('#gallery').clone();
	console.log('cloneOfWizards ', cloneOfWizards);

	var defeatedMsg = '<p>You have been defeated...Game Over. Press Restart to play again</p>';

	var winnerMsg = '<p>You Won!!! Game Over! Press Restart to play again</p>';

	var nextWizardMsg = '<p>You have defeated your enemy. You can select another wizard to continue your training</p>';

	var selectWizMsg = '<p>Select a Wizard to train for battle.</p><p>You must defeat the other 3 to win the Wizard Battle Contest.</p><p></p>';

	var enemiesMsg = '<p> Wizards available to battle </p>';

	var beginMsg = '<p> Let the training begin</p>';

	// initializations and call to clickHandler needed to restart a game
	function restart() {
		// remove attacker, name and hp
		$('div.attacker').empty();
		$('div.defender').empty();
		// remove all wizards in gallery
		$('#gallery').empty();

		//Put 4 images back at top
		$('#gallery').append('<img class="images" src="assets/images/harry300x300.jpg" alt="Harry Potter with his wand" data-index="0" data-name="Harry">');
		$('#gallery').append('<img class="images" src="assets/images/draco300x300.jpg" alt="Draco with his wand" data-index="1" data-name="Draco">');
		$('#gallery').append('<img class="images" src="assets/images/hermione300x300.jpg" alt="Hermione with her wand" data-index="2" data-name="Hermione">');
		$('#gallery').append('<img class="images" src="assets/images/ron300x300.jpg" alt="Ron with his wand" data-index="3" data-name="Ron">');

		//reassign click handler to appended images
		clickHandler();
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
	}

	// called after attacker and defender chosen
	function battle() {
		//update number of times attacker attacks 
		// attacks used to detmine counterAttackPower
		attacks++;
		counterAttackPower = attacks * attackerAP;

		//display updated defender HP using .html
		// .html adds a p element as a child of #dhp
		defenderHP = defenderHP - counterAttackPower;
		$('#dhp').html('<p>hp ' + defenderHP + '</p>');

		//display updated attacker HP using .text
		// .text only changes the text of the p element
		attackerHP = attackerHP - defenderAP;
		$('#ahp').text('hp ' + attackerHP);

		//document.getElementById("gameInfo").innerHTML = '<p> </p>';
		document.getElementById("gameInfo").innerHTML = '<p>You attacked your enemy for ' + counterAttackPower + ' damage</p><p>Your enemy attacked you back for ' + defenderAP + ' damage</p>'; 
		
		if (defenderHP <= 0) {
			document.getElementById('gameInfo').innerHTML= nextWizardMsg;
			$('.defender').empty();
			defenderSelected = false;
			wins++;
			enableAttack = false;
		}
		if (attackerHP <= 0) {
			document.getElementById('gameInfo').innerHTML = defeatedMsg;
			$('.defender').empty();
			$('.attacker').empty();
			enableAttack = false;
			gameOver = true;
		}
		if (wins === 3) {
			document.getElementById('gameInfo').innerHTML = winnerMsg;
			enableAttack = false;
			gameOver = true;
		}
	} //end of battle function

	function clickHandler(){
	//listen for click on wizard
		$('img').on('click', function() {

			if (!attackerSelected) { 
				//no attacker selected yet
				attacker = $(this);
				attackerName = $(this).data('name');
				attackerHP = wizards[attackerName].hp;
				attackerAP = wizards[attackerName].ap;

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
				$('div.attacker').append('<p id="ahp">hp ' + attackerHP + '</p>');
				// set flag that an attacker has been selected
				attackerSelected = true;

			} else {
				if (!defenderSelected) {
					defender = $(this);
					defenderName = $(this).data('name');
					defenderHP = wizards[defenderName].hp;
				    defenderAP = wizards[defenderName].ap;
				    defenderName = wizards[defenderName].name;

					//clone the image
					cloneImg = $(this).clone();
					$(cloneImg).addClass('defender');
					$('div.defender').append(cloneImg);
					$('div.defender').prepend('<p>' + defenderName + '</p');
					//append the HP of the attacker
					$('div.defender').append('<p id="dhp">hp ' + defenderHP + '</p>');
					//add begin message
					$('#gameInfo').html(beginMsg);
					//remove the clicked image
					$(this).remove();
					// if last defender selected then remove Wizards avail message
						if (wins === 2) {
							$('#gallery').empty();
						}
					
					// set flag that an attacker has been selected,
					// enable attack
					defenderSelected = true;
					enableAttack = true;
				};
			};//end of else
		}); //end of on.click
	} // end of clickHadler

	//listen for Restart Button clicked
	$('#restartBtn').on('click', function() {
		restart();	
	});

	//listen for attack button clicked
	$('#attackBtn').on('click', function() {
		if (enableAttack) {
			battle();
		}					
	});

	clickHandler(); // game is setup, call to initiate img.onclick function
}); //end of document.ready
		