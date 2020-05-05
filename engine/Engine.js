
class Engine {

	constructor(timeStep, update, render) {

		this.accumulatedTime       = 0;
		this.animationFrameRequest = undefined,
		this.time                  = undefined,
		this.timeStep              = timeStep,
		this.updated               = false;
		this.update                = update;
		this.render                = render;

	}

	run(timeStamp) {

		this.animationFrameRequest = window.requestAnimationFrame(this.handleRun);
	

		this.accumulatedTime += timeStamp - this.time;
		this.time = timeStamp;

		if (this.accumulatedTime >= this.timeStep * 3) { // Safetey

		  this.accumulatedTime = this.timeStep;

		}

		while (this.accumulatedTime >= this.timeStep) {

		  this.accumulatedTime -= this.timeStep;

		  this.update(timeStamp);

		  this.updated = true;

	   	}

		if (this.updated) {

		  this.updated = false;
		  this.render(timeStamp);

		}

	}

	handleRun = (timeStep) => {

		this.run(timeStep);
		
	}

	start() {

		this.accumulatedTime       = this.timeStep;
		this.time                  = window.performance.now();
		this.animationFrameRequest = window.requestAnimationFrame(this.handleRun);

	}

	stop = () => {

		window.cancelAnimationFrame(this.animationFrameRequest); 
		console.log("Engine stopped"); 
		
	}

		

	

}
