$(document).ready(function () {
	$('#myModal').show();
	const cards = [
		{ name: 'Circle', value: '&#9898;' },
		{ name: 'Square', value: '&#9744;' },
		{ name: 'Start', value: '&#9734;' },
		{ name: 'Plus', value: '&plus;' },
		{ name: 'Waves', value: '&#8779' },
		{ name: 'Circle', value: '&#9898;' },
		{ name: 'Square', value: '&#9744;' },
		{ name: 'Start', value: '&#9734;' },
		{ name: 'Plus', value: '&plus;' },
		{ name: 'Waves', value: '&#8779' },
		{ name: 'Circle', value: '&#9898;' },
		{ name: 'Square', value: '&#9744;' },
		{ name: 'Start', value: '&#9734;' },
		{ name: 'Plus', value: '&plus;' },
		{ name: 'Waves', value: '&#8779' },
		{ name: 'Circle', value: '&#9898;' },
		{ name: 'Square', value: '&#9744;' },
		{ name: 'Start', value: '&#9734;' },
		{ name: 'Plus', value: '&plus;' },
		{ name: 'Waves', value: '&#8779' },
		{ name: 'Circle', value: '&#9898;' },
		{ name: 'Square', value: '&#9744;' },
		{ name: 'Start', value: '&#9734;' },
		{ name: 'Plus', value: '&plus;' },
		{ name: 'Waves', value: '&#8779' },
		{ name: 'Circle', value: '&#9898;' },
		{ name: 'Square', value: '&#9744;' },
		{ name: 'Start', value: '&#9734;' },
		{ name: 'Plus', value: '&plus;' },
		{ name: 'Waves', value: '&#8779' }
	];

	const SpeechRecognition =
		window.SpeechRecognition || window.webkitSpeechRecognition;

	const recognition = new SpeechRecognition();
	let speech = new SpeechSynthesisUtterance();

	let count = 0;
	let correctAnswers = 0;
	let userGuess = '';
	let randomCardIndex = 1;
	let card;

	$('#start').click(() => speak());
	/**
	 * on result is call after the speech ends
	 * @param {} event  is the object receive after recognition start
	 */
	recognition.onresult = function (event) {
		userGuess = event.results[0][0].transcript.toLowerCase();
		let cardName = cards[randomCardIndex].name.toLocaleLowerCase();
		if (userGuess) {
			$('.back-card').hide();
			$('.front-card').show();
			count++;
			if (count < 25) {
				setTimeout(function () {
					nextCard();
				}, 3000);
			}
		}
		// console.log('inside ', count);
		if (userGuess === cardName) {
			correctAnswers++;
		}
		if (count === 25) {
			displayModal(correctAnswers);
		}
	};

	function speak() {
		speech.text = `This is a ESP game, I am going to put to the test your censory power, 
			when you are ready say out loud either a Circle, a Start, a Waves, Plus or Square. Good Luck`;
		speech.pitch = '0.5';
		speech.rate = '1';
		randomShuffleCard();
		window.speechSynthesis.speak(speech);
		startRecognition();
	}
	/**
	 * nextCard fetch the next car available.
	 */
	function nextCard() {
		$('.front-card').hide();
		randomShuffleCard();
		speech.text = 'How about this one?';
		window.speechSynthesis.speak(speech);
	}
	/**
	 * start recognition went the speech ends.
	 */
	function startRecognition() {
		speech.onend = function (e) {
			recognition.start();
		};
	}

	/**
	 * randomShuffleCard is incharge of randoming and shuffling the erray using
	 * lodash methods shuffle and random
	 */
	function randomShuffleCard() {
		let shuffleCards = _.shuffle(cards);
		randomCardIndex = _.random(0, shuffleCards.length);
		if (!cards[randomCardIndex].value) {
			card = 1;
		}
		card = cards[randomCardIndex].value;
		if (cards[randomCardIndex].name === 'Waves') {
			$('.front-card').html(`<span class="symbol rotate">${card}</span>`);
			$('.front-card').hide();
		} else {
			$('.front-card').html(`<span class="symbol">${card}</span>`);
			$('.front-card').hide();
		}
	}

	/**Congratulation Modal */
	/**
	 * Display the modal by calling the modal usind the Id mainModal
	 * @param {*} correctAnswers is the number of hits need it to activate the modal
	 */
	function displayModal(correctAnswers) {
		let modalCongratulate;

		if (correctAnswers >= 11) {
			modalCongratulate = `<div class="modal-dialog modal-dialog-centered">
		<h1>Congratulation You got ${correctAnswers} answers! </div>`;
			$('.modal-body').append(modalCongratulate);
			$('#mainModal').modal('show');
		} else {
			modalCongratulate = `<div class="modal-dialog modal-dialog-centered">
			<h1>Sorry you got ${correctAnswers} answers, better luck next time </div>`;
			$('.modal-body').append(modalCongratulate);
			$('#mainModal').modal('show');
		}
	}
});
