const numberOfLettersInput = document.getElementById('number-of-letters');
const hasSpacesInputs = document.querySelectorAll('input[name="has-spaces"]');
const lettersInputsContainer = document.getElementById('letters-inputs');
const resultsPanel = document.getElementById('results-panel');
const toCopyInput = document.getElementById('to-copy-input');

var filteredWords = [];

function checkWordSpaces() {
	// Array.from(resultsPanel.children).forEach(btn => btn.removeAttribute('style'));

	Array.from(resultsPanel.children).forEach(btn => {
		if (hasSpacesInputs[0].checked && btn.innerText.match(' ') === null) {
			btn.style.display = 'none';
		} else if (hasSpacesInputs[1].checked && btn.innerText.match(' ') !== null) {
			btn.style.display = 'none';
		} else {
			btn.removeAttribute('style');
		}
	});
}

function showInResultPanel(words) {
	resultsPanel.innerHTML = '';

	words.forEach(word => {
		let btn = document.createElement('button');
		btn.type = 'button';
		btn.innerText = word;
		btn.onclick = function () {
			toCopyInput.value = word;
			toCopyInput.select();
			toCopyInput.setSelectionRange(0, 99999);
			navigator.clipboard.writeText(toCopyInput.value);
		};

		resultsPanel.appendChild(btn);
	});

	checkWordSpaces();
}

function searchInWords() {
	var wordsToSearch = filteredWords;

	Array.from(lettersInputsContainer.children).forEach((input, pos) => {
		let letter = input.value.trim();

		// no letter
		if (letter.length === 0)
			return;

		wordsToSearch = wordsToSearch.filter(word => word.replaceAll(' ', '')[pos] === letter);
	});

	showInResultPanel(wordsToSearch);
}

function addLettersInputs(value) {
	lettersInputsContainer.innerHTML = '';

	// filter size
	filteredWords = WORDS.filter(l => l.replaceAll(' ', '').length === value);

	showInResultPanel(filteredWords);

	for (i = 1; i <= value; i++) {
		let input = document.createElement('input');
		input.maxLength = 1;
		lettersInputsContainer.appendChild(input);
	}

	Array.from(lettersInputsContainer.children).forEach(input => {
		input.oninput = searchInWords
	});
}

numberOfLettersInput.oninput = function () {
	var value = parseInt(numberOfLettersInput.value);

	// reset everything
	if (isNaN(value) || value === 1) {
		filteredWords = [];
		lettersInputsContainer.innerHTML = '';
		resultsPanel.innerHTML = '';
		return;
	}

	addLettersInputs(value);
};

hasSpacesInputs.forEach(input => input.onchange = checkWordSpaces);
