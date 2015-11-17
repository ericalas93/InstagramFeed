function drawing() {
	let canvas = document.getElementById('starrynight');
	let canvasContext = canvas.getContext('2d');
	let xMax = canvas.width = window.screen.availWidth;
	let yMax = canvas.height = window.screen.availHeight;
	
	let hmTimes = Math.round(xMax + yMax);	
	
	for(let i=0; i<=hmTimes; i++) {
		let randomX = Math.floor( ( Math.random() * xMax ) + 1 );
		let randomY = Math.floor( ( Math.random() * yMax ) + 1 );
		let randomSize = Math.floor( ( Math.random() * 2 ) + 1 );
		let randomOpacityOne = Math.floor( ( Math.random() * 9 ) + 1 );
		let randomOpacityTwo = Math.floor( ( Math.random() * 9 ) + 1 );
		let randomHue = Math.floor( ( Math.random() * 360 ) + 1 );
		
		if( randomSize > 1 ) {
			canvasContext.shadowBlur = Math.floor( ( Math.random() * 15 ) + 5 );
			canvasContext.shadowColor = "white";
		}
		canvasContext.fillStyle = `hsla(${randomHue}, 30%, 80%, .${randomOpacityOne+randomOpacityTwo})`;
		canvasContext.fillRect(randomX, randomY, randomSize, randomSize);
	}

}

export {drawing};