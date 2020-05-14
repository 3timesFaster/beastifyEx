(function() {
	/**
	 * check and set a global variable
	 * if its runagain it wont do anything
	 */
	if (window.hasRun){
		return;
	}
	window.hasRun = true

	/**
	 * Given a url for a beast remove all other beasts
	 * creat a img node
	 * and insert the node into the document
	 */
	function insertBeast(beastURL) {
		removeExistingBeasts();
		let beastImage = document.createElement("img");
		beastImage.setAttribute("src", beastURL);
		besatImage.style.height = "100vh";
		beastImage.className = "beastify-image";
		document.body.appendChild(beastIamge);
	}

	/**
	 * Remove beasts
	 */
	function removeExestingBeasts() {
		let existingBeasts = document.querySelectorAll(".beastify-image");
		for (let beast of existingBeasts) {
			beast.remove();
		}
	}

	/**
	 * Listen for event
	 * call beastify or reset
	 */
	browser.runtime.onMessage.addListener((message) => {
		if (message.command === "beastify") {
			insertBeast(message.beastURL);
		} else if (message.command === "reset") {
			removeExistingBeasts();
		}
	});
})();
