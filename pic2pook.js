class Pic2Pook {

	constructor(_image, _output, _downsampling = 0.5){

		this.image        = _image;
		this.output       = _output;
		this.downnsamping = _downsampling;

		const {
			height,
			width
		} = this.image.getBoundingClientRect();

		this.width         = width;
		this.height        = height;
		this.letters       = ["P","O","O","K","A","G","E"];

		const canvas = document.createElement("canvas");

		canvas.height       = height;
		canvas.width        = width;

		this.output.style.width = `${width / (1 / _downsampling)}ch`;
		this.output.style.transform = `scaleX(${(1/_downsampling) * 2.618})`;
		this.context            = canvas.getContext("2d");

		//maintain context when called in animation frame
		this.draw          = this.draw.bind(this);
	}//constructor


	startDrawLoop(){
		requestAnimationFrame(this.draw);
	}//startDrawLoop
	draw(){
		const {
			image, context, output,
			width, height, downnsamping
		} = this;
		context.drawImage(image, 0, 0, width, height);
		const imageData   = context.getImageData(0, 0, width, height);
		let outputText    = "";

		for(let i = 0, letterIndex=0, r,g,b, outputIndex; i < imageData.data.length; i+=(4 / downnsamping)){
			r = imageData.data[i+0];
			g = imageData.data[i+1];
			b = imageData.data[i+2];

			// console.log(`${r}, ${g}, ${b}`);

			outputIndex = i < 4 ? 0 : (i/4) - 4;
			if(r+g+b < 200){
				outputText += "_"; //this.letters[letterIndex];
			} else {
				outputText += "X";
			}

			letterIndex = letterIndex++ == this.letters.length ? 0 : letterIndex++;
		}
		output.textContent = outputText;
	}//draw


}