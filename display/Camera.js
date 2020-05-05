
class Camera extends GameObject {

	constructor(target, width, height, heightWidthRatio, tileSizePx) {
	
		super(0, 0, width, height);

		this.target  = target;
		this.centerX = target.centerX;
		this.centerY = target.centerY;

		this.tileSizePx = tileSizePx;

		this.heightWidthRatio = heightWidthRatio;
		
	}

	update() {

		this.centerX = Math.round(Accessories.lerp(this.centerX, this.target.centerX, 0.3) * this.tileSizePx) / this.tileSizePx;
		this.centerY = Math.round(Accessories.lerp(this.centerY, this.target.centerY, 0.3) * this.tileSizePx) / this.tileSizePx;

	}

}