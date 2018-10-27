window.addEventListener("load", init);

function init(){

	console.log("init")

	const elements = {
		image: document.getElementById("source"),
		output: document.getElementById("output")
	};

	const pic2pook = new Pic2Pook(elements.image, elements.output);

	pic2pook.startDrawLoop();
}//init