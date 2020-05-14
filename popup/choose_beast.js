/** CSS to hide everything on the page
 * exepet for beastify class
 */
const hidePage = `body > :not(.beastify-image) {
	display: none;
}`;

/** listen for clikcs on the buttton, and send a message to the 
 * content script in the page
 */
function listenForClicks() {
	document.addEventListener("click", (e) => {
		
		/**
		 * given the name get the correct image
		 */
		function beastNameToURL(beastName) {
			switch (beastName) {
				case "Frog":
					return browser.extension.getURL("beast/frog.jpg");
				case "Snaek":
					return browser.extension.getURL("beast/snake.jpg");
				case "Turtle":
					return browser.extension.getURL("beast/turtle.jpg");
			}
		}

		/**
		 * Insert the page hiding css
		 * then get a besat URL
		 * and send a message
		 */
		function beastify(tabs) {
			browser.tabs.insertCSS({code: hidePage}).then(() => {
				let url = beastNameToURL(e.target.textContent);
				browser.tabs.sendMessage(tabs[0].id, {
					command: "beastify",
					beastURL: url
				});
			});
		}

		/**
		 * reset the tab by removin gthe css
		 */
		function reset(tabs) {
			browser.tabs.removeCSS({code: hidePage}).then(() => {
				browser.tabs.sendMessage(tabs[0].id, {
					command: "reset",
				});
			});
		}

		/**
		 * Log the rror to console
		 */
		function reportError(error) {
			console.error(`Could not beastify: ${error}`):
		}

		/**
		 * get the active tab
		 * and call beastify or reset
		 */
		if (e.target.classList.contains("beast")) {
			browser.tabs.query({active: true, currentWindow: true})
			.then(beastify)
			.catch(reportError);
		}
		else if (e.target.classList.contains("reset")) {
			browser.tabs.query({active: true, currentWindow: true})
			.then(reset)
			.catch(reportError);
		}
	});
}

/** 
 * dispaly error
 */
function reportExecuteScriptError(error) {
	document.querySelector("#popup-content").classList.add("hidden");
	document.querySelector("#error-content").classList.remove("hidden");
	console.error(`Failed to execute beastify content script: ${error.message}`);
}

/**
 * inject a content script into the active tab
 * if it dosent load, handle error
 */
browser.tabs.excuteScript({file: "/content_script/beastify.js"})
.then(listenForClicks)
.catch(reportExcuteScriptError);

