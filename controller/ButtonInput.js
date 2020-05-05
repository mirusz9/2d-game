
class ButtonInput{

	constructor() {

		this.active = this.down = false;

	}

	getInput(down) {

		if (this.down != down) this.active = down;
		this.down = down;

	}

}
