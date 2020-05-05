
class Display {

	constructor(canvas, camTarget, heightWidthRatio) {

		this.tileSizePx  = 16;
		this.buffer    = document.createElement("canvas").getContext("2d");
		this.context   = canvas.getContext("2d");
		this.camera    = new Camera(camTarget, 32, 32*heightWidthRatio, heightWidthRatio, this.tileSizePx)
		this.tileSheet = new TileSheet(this.tileSizePx, 7, 7);

		this.buffer.canvas.width  = this.camera.width  * this.tileSizePx; 
		this.buffer.canvas.height = this.camera.height * this.tileSizePx;

	}

	drawMap(map) {

		for (let i = Math.floor(this.camera.x); i < Math.floor(this.camera.right)  + 1; i ++) {
			for (let j = Math.floor(this.camera.y); j < Math.floor(this.camera.bottom) + 1; j ++) {

				let coord;

				if (map[i] === undefined) {

					coord = new Coord(1, 1);

				} else {
				
					coord = map[i][j];

				}
				
				if (coord === undefined) {

					coord = new Coord(1, 1);

				}
				let sourceX = coord.x * this.tileSizePx;
				let sourceY = coord.y * this.tileSizePx;
				let destinationX = Math.round((i - this.camera.x) * this.tileSizePx);
				let destinationY = Math.round((j - this.camera.y) * this.tileSizePx);

				this.buffer.drawImage(this.tileSheet.image, sourceX, sourceY, this.tileSizePx, this.tileSizePx, destinationX, destinationY, this.tileSizePx, this.tileSizePx);


				// if (map[i] === undefined) {

				// 	this.buffer.fillStyle = "rgba(20, 20, 20)";					
					
				// } else {

				// 	if (map[i][j] === undefined) {

				// 		this.buffer.fillStyle = "rgba(20, 20, 20)";	

				// 	} else {

				// 		if (map[i][j] == true) {

				// 			this.buffer.fillStyle = "rgba(200, 200, 200)";

				// 		} else if (map[i][j] == false) {

				// 			this.buffer.fillStyle = "rgba(20, 100, 20)";


				// 		} else {

				// 			this.buffer.fillStyle = "rgba(80, 20, 20)";

				// 		}

				// 	}
					
				// }

				// let x = Math.floor((i - this.camera.x) * this.tileSizePx);
				// let y = Math.floor((j - this.camera.y) * this.tileSizePx);
				// this.buffer.fillRect(x, y, this.tileSizePx, this.tileSizePx);

			}

		}

	}

	drawPlayer(player) {

		this.buffer.fillStyle = player.color;

		let x = Math.round((player.x - this.camera.x) * this.tileSizePx);
		let y = Math.round((player.y - this.camera.y) * this.tileSizePx);

		this.buffer.fillRect(x, y, player.width * this.tileSizePx, player.height * this.tileSizePx);

	}

	update() {
	
		this.camera.update();
	
	}

	resize(width, height) {

		if (height / width > this.camera.heightWidthRatio) {
	
			this.context.canvas.height = width * this.camera.heightWidthRatio;
			this.context.canvas.width  = width;
	  
		} else {
	  
			this.context.canvas.height = height;
			this.context.canvas.width  = height / this.camera.heightWidthRatio;
	  
		}
	  
		this.context.imageSmoothingEnabled = false;
		this.buffer.imageSmoothingEnabled = false;

	}

	render() {

		this.context.drawImage(this.buffer.canvas, 0, 0, this.buffer.canvas.width, this.buffer.canvas.height, 0, 0, this.context.canvas.width, this.context.canvas.height); 

	}

}
