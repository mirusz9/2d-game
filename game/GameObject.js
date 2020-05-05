
class GameObject {

	constructor(x, y, width, height) {

		this.x      = x;
		this.y      = y;
		this.width  = width;
		this.height = height;
		
	}

	get bottom ()  { return this.y + this.height;       }
	get centerX()  { return this.x + this.width  * 0.5; }
	get centerY()  { return this.y + this.height * 0.5; }
	get left   ()  { return this.x;                     }
	get right  ()  { return this.x + this.width;        }
	get top    ()  { return this.y;                     }
	set bottom (y) { this.y = y - this.height;          }
	set centerX(x) { this.x = x - this.width  * 0.5;    }
	set centerY(y) { this.y = y - this.height * 0.5;    }
	set left   (x) { this.x = x;                        }
	set right  (x) { this.x = x - this.width;           }
	set top    (y) { this.y = y;                        }

}
