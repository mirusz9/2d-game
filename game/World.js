
class World {

	constructor(seed = new Date().getTime().toString(), friction = 0.8, gravity = 0.5) {
		
		this.mapGenerator = new MapGenerator();
		this.seed         = seed;
		let ret           = this.mapGenerator.generateNewMap(50, 50, 700, this.seed); // 10, 10, 40, this.seed or 50, 50, 700, this.seed
		this.collisionMap = ret[0];
		this.graphicsMap  = ret[1];
		this.collider     = new Collider();
		this.player       = new Player(ret[2].x + 0.01, ret[2].y - 0.01, 1);
		
		this.friction     = friction;
		this.gravity      = gravity;	

	}

	collideObject(object) {

		// Check if inside the boundaries
		if      (object.left   < 0                          ) {object.left   = 0;                                   object.velocityX = 0;}
		else if (object.right  > this.collisionMap.length   ) {object.right  = this.collisionMap.length - 0.001;    object.velocityX = 0;}
		if      (object.top    < 0                          ) {object.top    = 0;                                   object.velocityY = 0;}
		else if (object.bottom > this.collisionMap[0].length) {object.bottom = this.collisionMap[0].length - 0.001; object.velocityY = 0; object.jumping = false;}

		let left, top, right, bottom, value;

		for (let i = 0; i < 2; i ++) {
		// Top left corner
		top    = Math.floor(object.top );
		left   = Math.floor(object.left);
		value  = this.collisionMap[left][top];
		this.collider.collide(value, object, left, top, 1);

		// Top right corner
		top    = Math.floor(object.top  );
		right  = Math.floor(object.right);
		value  = this.collisionMap[right][top];
		this.collider.collide(value, object, right, top, 1);

		// Bottom left corner
		bottom = Math.floor(object.bottom);
		left   = Math.floor(object.left  );
		value  = this.collisionMap[left][bottom];
		this.collider.collide(value, object, left, bottom, 1);

		// Bottom right corner
		bottom = Math.floor(object.bottom);
		right  = Math.floor(object.right );
		value  = this.collisionMap[right][bottom];
		this.collider.collide(value, object, right, bottom, 1);
		}
		
	}

	update() {

		this.player.velocityY += this.gravity;
		this.player.velocityX *= this.friction;
		this.player.velocityY *= this.friction;

		this.player.update();


		this.collideObject(this.player);

	}

}