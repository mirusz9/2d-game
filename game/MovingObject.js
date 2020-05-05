
class MovingObject extends GameObject {

	constructor(x, y, width, height, maxVelocity) {
		
		super(x, y, width, height);

		this.jumping     = false;
		this.maxVelocity = maxVelocity;
		this.velocityX   = 0;
		this.velocityY   = 0;
		this.oldX        = x;
		this.oldY        = y;

	}

	get oldBottom ()  { return this.oldY + this.height;       }
	get oldCenterX()  { return this.oldX + this.width  * 0.5; }
	get oldCenterY()  { return this.oldY + this.height * 0.5; }
	get oldLeft   ()  { return this.oldX;                     }
	get oldRight  ()  { return this.oldX + this.width;        }
	get oldTop    ()  { return this.oldY;                     }
	set oldBottom (y) { this.oldY = y    - this.height;       }
	set oldCenterX(x) { this.oldX = x    - this.width  * 0.5; }
	set oldCenterY(y) { this.oldY = y    - this.height * 0.5; }
	set oldLeft   (x) { this.oldX = x;                        }
	set oldRight  (x) { this.oldX = x    - this.width;        }
	set oldTop    (y) { this.oldY = y;                        }

}