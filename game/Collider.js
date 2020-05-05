
class Collider {

	constructor() {

		;

	}

	collide(value, object, tileX, tileY, tileSize) {

		switch (value) {
			
			case  1:     this.collidePlatformBottom(object, tileY + tileSize); break;
			case  2:     this.collidePlatformRight (object, tileX + tileSize); break;
			case  3: if (this.collidePlatformRight (object, tileX + tileSize)) return;
						 this.collidePlatformBottom(object, tileY + tileSize); break;
			case  4:     this.collidePlatformTop   (object, tileY           ); break;
			case  5: if (this.collidePlatformTop   (object, tileY           )) return;
				 		 this.collidePlatformBottom(object, tileY + tileSize); break;
			case  6: if (this.collidePlatformTop   (object, tileY           )) return;
						 this.collidePlatformRight (object, tileX + tileSize); break;
			case  7: if (this.collidePlatformTop   (object, tileY           )) return;
					 if (this.collidePlatformRight (object, tileX + tileSize)) return;
						 this.collidePlatformBottom(object, tileY + tileSize); break;
			case  8:	 this.collidePlatformLeft  (object, tileX           ); break;
			case  9: if (this.collidePlatformLeft  (object, tileX           )) return;
						 this.collidePlatformBottom(object, tileY + tileSize); break;
			case 10: if (this.collidePlatformLeft  (object, tileX           )) return;
						 this.collidePlatformRight (object, tileX + tileSize); break;
			case 11: if (this.collidePlatformLeft  (object, tileX           )) return;
					 if (this.collidePlatformRight (object, tileX + tileSize)) return;
						 this.collidePlatformBottom(object, tileY + tileSize); break;
			case 12: if (this.collidePlatformLeft  (object, tileX           )) return;
						 this.collidePlatformTop   (object, tileY           ); break;
			case 13: if (this.collidePlatformLeft  (object, tileX           )) return;
					 if (this.collidePlatformTop   (object, tileY           )) return;
						 this.collidePlatformBottom(object, tileY + tileSize); break;
			case 14: if (this.collidePlatformLeft  (object, tileX           )) return;
					 if (this.collidePlatformTop   (object, tileY           )) return;
						 this.collidePlatformRight (object, tileX + tileSize); break;
			case 15: if (this.collidePlatformLeft  (object, tileX           )) return;
					 if (this.collidePlatformTop   (object, tileY           )) return;
					 if (this.collidePlatformRight (object, tileX + tileSize)) return;
					     this.collidePlatformBottom(object, tileY + tileSize); break;

		}

	}

	collidePlatformLeft(object, tileLeft) {

		if (object.right > tileLeft && object.oldRight <= tileLeft) {

			object.right = tileLeft - 0.001;
			object.velocityX = 0;			

			return true;

		}

		return false;

	}

	collidePlatformTop(object, tileTop) {

		if (object.bottom > tileTop && object.oldBottom <= tileTop) {

			object.bottom = tileTop - 0.001;
			object.velocityY = 0;
			object.jumping   = false;

			return true;

		}

		return false;

	}

	collidePlatformRight(object, tileRight) {

		if (object.left < tileRight && object.oldLeft >= tileRight) {

			object.left = tileRight + 0.001;
			object.velocityX = 0;

			return true;

		}

		return false;

	}

	collidePlatformBottom(object, tileBottom) {

		if (object.top < tileBottom && object.oldTop >= tileBottom) {

			object.top = tileBottom + 0.001;
			object.velocityY = 0;

			return true;

		}

		return false;

	}

}