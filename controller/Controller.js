
class Controller {

	constructor() {
		
		this.left  = new ButtonInput();
		this.right = new ButtonInput();
		this.up    = new ButtonInput();
		this.down  = new ButtonInput();
		this.esc   = new ButtonInput();

	}

	buttonAction(type, keyCode, stop) {

		let down = (type == "keydown") ? true : false;

		switch (keyCode) {

			case 37: this.left .getInput(down); break;
			case 38: this.up   .getInput(down); break;
			case 39: this.right.getInput(down); break;
			case 40: this.down .getInput(down); break;
			case 27: stop(); break;

		}

	}

}
