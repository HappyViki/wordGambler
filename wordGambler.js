let points = 100;

document.querySelector(".points").innerText = points;

const getRandomLetters = () => {
	const alphabet = "qwertyuiopasdfghjklzxcvbnm".split("");
	const randomLetters = [];
	const getRandomLetter = () => alphabet[Math.floor(Math.random() * alphabet.length)];
	for (let i = 0; i < 6; i++) {
		randomLetters.push(getRandomLetter());
	}
	return randomLetters;
}
const verifyLettersInWordAreAlsoInRandomLetters = (randomLetters, word) => {
	return word.split("").every(letterInWord => randomLetters.includes(letterInWord));
}

document.querySelector(".letters-container").innerHTML = `<span class="loser"}">${getRandomLetters().join(" ")}</span>`;

const runRound = () => {
	if (points > 0) {
		const randomLetters = getRandomLetters();
		const word = document.querySelector(".word-field").value;
		const isWinner = verifyLettersInWordAreAlsoInRandomLetters(randomLetters, word);

		if (word.length >= 6) {
			points += isWinner ? 20 : -20;
		} else if (word.length >= 4) {
			points += isWinner ? 10 : -10;
		} else if (word.length >= 2) {
			points += isWinner ? 5 : -5;
		} else if (word.length > 0) {
			points += isWinner ? 1 : -1;
		}

		document.querySelector(".points").innerText = points;

		if (points > 0) {
			document.querySelector(".letters-container").innerHTML = `<span class="${isWinner ? "winner" : "loser"}">${randomLetters.join(" ")}</span>`;

		} else {
			document.querySelectorAll(".btn").forEach(btn => btn.classList.toggle('hide'));
		}
	}
}

document.querySelector(".submit-btn").addEventListener("click", () => {
	const word = document.querySelector(".word-field").value;
	if (word.length > 0) {
		runRound();
	} else {
		alert(`How to play:
		1. Type letters into input field
		2. Press "push me" button
		3. Repeat 1. & 2. until you lose
		4. Start over
		5. Repeat 3. & 4. forever
		
You get more points when you use more letters.`);
	}
});

document.querySelector(".restart-btn").addEventListener("click", () => {
	points = 100;
	document.querySelector(".points").innerText = points;
	document.querySelectorAll(".btn").forEach(btn => btn.classList.toggle('hide'));
	document.querySelector(".word-field").value = "";
});