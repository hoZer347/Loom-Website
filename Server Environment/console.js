// Select necessary DOM elements
const consoleElement = document.getElementById('console');
const commandInput = document.getElementById('command');

// Define supported commands
const commands = {
	help:
	() =>
	{
		return`
			Available commands:<br>
			- help: Displays this help message<br>
			- echo [message]: Repeats the entered message<br>
			- date: Shows the current date and time<br>
			- Vanguards: Opens up the web version of the game I'm working on<br>
			WASD to move around, scroll wheel to zoom in / out, click on characters to move them around<br>
			- Emscripten: Opens a OpenGL WASM Project I'm working on<br>
			Right now it's just a orange square lol<br>`;
	},
	echo: (args) => args.join(' '),
	date: () => new Date().toLocaleString(),
	Vanguards:
	async () =>
	{
		try
		{
			// Fetch the index.html from the base URL
			const response = await fetch(`http://loomhozer.ca/Vanguards WebGL/index.html`);

			if (!response.ok)
				throw new Error("Failed to load Vanguards WebGL.");

			// Get the HTML content of the page
			const htmlContent = await response.text();

			// Open a new tab and load the content
			const newWindow = window.open(`http://loomhozer.ca/Vanguards WebGL/index.html`);
			newWindow.document.write(htmlContent); // Open and render the fetched HTML in a new tab

			return "Vanguards WebGL loaded successfully in a new tab.";
		}
		catch (error)
		{
			return `Error: ${error.message}`;
		};
	},
	Emscripten:
	async () =>
	{
		try
		{
			// Fetch the index.html from the base URL
			const response = await fetch(`http://loomhozer.ca/Emscripten Testing/index.html`);

			if (!response.ok)
				throw new Error("Failed to load Emscripten Testing.");

			// Get the HTML content of the page
			const htmlContent = await response.text();

			// Open a new tab and load the content
			const newWindow = window.open(`http://loomhozer.ca/Emscripten Testing/index.html`);
			newWindow.document.write(htmlContent); // Open and render the fetched HTML in a new tab

			return "Emscripten Testing loaded successfully in a new tab.";
		}
		catch (error)
		{
			return `Error: ${error.message}`;
		};
	}
};

// Function to handle commands
function handleCommand(input) {
	const [cmd, ...args] = input.trim().split(/\s+/); // Split input into command and arguments
	if (commands[cmd]) {
		const result = commands[cmd](args);
		// Return the result as a string
		return typeof result === "string" ? result : Promise.resolve(result);
	}
	return `Unknown command: ${cmd}`;
}

// Event listener for command execution
commandInput.addEventListener('keydown', async (event) => {
	if (event.key === 'Enter') {
		event.preventDefault(); // Prevent any default form behavior
		const inputValue = commandInput.value.trim(); // Get the input value
		if (inputValue) {
			// Display the input
			const inputLine = document.createElement('p');
			inputLine.textContent = `$ ${inputValue}`;
			consoleElement.appendChild(inputLine);

			// Process the input and generate output
			let output = await handleCommand(inputValue);

			// Display the output
			const outputLine = document.createElement('p');
			outputLine.innerHTML = output.replace(/\n/g, "<br>"); // Render output with newlines
			consoleElement.appendChild(outputLine);

			// Clear the input and scroll the console
			commandInput.value = '';
			consoleElement.scrollTop = consoleElement.scrollHeight;
		}
	}
});
