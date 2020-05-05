
class Player extends MovingObject {


	constructor(x, y, maxVelocity) {
		super(x, y, 0.875, 0.875, maxVelocity);

		this.color     = "rgba(255, 255, 255)";
		this.jumping   = true;

	}

	jump() {

		if (true) { //!this.jumping) {

			this.jumping    = true;
			this.velocityY -= 6;

		}

	}

	moveLeft() {

		this.velocityX -= 0.25;

	}
	moveRight() {
		
		this.velocityX += 0.25;
	
	}

	update() {

		this.oldX = this.x;
		this.oldY = this.y;

		// Limiting velocity, so tunneling cant happen
		this.x += Math.min(Math.abs(this.velocityX), this.maxVelocity - 0.1) * Math.sign(this.velocityX);
		this.y += Math.min(Math.abs(this.velocityY), this.maxVelocity - 0.1) * Math.sign(this.velocityY);
	
	}

}