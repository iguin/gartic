// (function () {
const styles = `
#container {
	position: fixed;
	top: 0;
	right: 0;
	z-index: 100;
	width: 400px;
	height: 100vh;
	background-color: #FFF;
	overflow: auto;
	padding: 20px;
}
#container .empty h2 {
	font-size: 20px;
	font-weight: 700px;
	color: #333;
	font-family: sans-serif;
}
#container .word-preview {
	list-style: none;
	margin: 0;
	padding: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 30px;
	gap: 5px;
	margin-bottom: 30px;
}
#container .words-buttons {
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	gap: 10px;
}
#container .words-buttons button {
	padding: 5px;
}
`;
const emptyHTML = `
	<div class="empty">
		<h2>Aguardando dica...</h2>
	</div>
`;

const appHTML = document.createElement("div");
appHTML.innerHTML = `
    <style>${styles}</style>
    <div id="container">
			${emptyHTML}
		</div>
		<input type="text" class="hide" id="the-copy-input">
`;

document.body.appendChild(appHTML);

const theCopyInput = document.getElementById("the-copy-input");

function fncDica() {

	var container = document.getElementById("container");

	if (dica.children === 0) {
		container.innerHTML = emptyHTML;
		return;
	}

	var word_length = dica.childElementCount;

	if (word_length === 0) {
		container.innerHTML = emptyHTML;
		return;
	}

	var has_space = dica.querySelector(".espaco") ? true : false;
	var words_found = WORDS.filter(word => word.length === word_length);

	if (has_space) {
		words_found = words_found.filter(word => word.indexOf(' ') !== -1);
	}

	var html = "<ul class='word-preview'>";

	[...dica.children].forEach((el, pos) => {
		let is_space = el.classList.contains("espaco");

		let letter = is_space
			? " "
			: el.innerText.trim().toLowerCase();

		if (letter.length === 0) {
			html += "<li>_</li>";
			return;
		}

		html += `<li>${is_space ? "&nbsp;" : letter}</li>`;

		words_found = words_found.filter(word => word[pos] === letter);
	});

	html += "</ul><div class='words-buttons'></div>";

	container.innerHTML = html;

	var buttonsContainer = container.querySelector(".words-buttons");

	words_found.forEach(word => {
		var btn = document.createElement("button");
		btn.type = "button";
		btn.innerHTML = word;
		btn.onclick = () => {
			theCopyInput.value = word;
			theCopyInput.select();
			theCopyInput.setSelectionRange(0, 99999);
			navigator.clipboard.writeText(theCopyInput.value);
		};

		buttonsContainer.appendChild(btn);
	});

}

const dica = document.querySelector("div#dica .dicaTxt > div");
const observer = new MutationObserver(fncDica);

observer.observe(dica, {
	childList: true,
	subtree: true,
});

fncDica();

// })();