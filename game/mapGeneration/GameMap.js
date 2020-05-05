
class GameMap {

	constructor(mapSizeX, mapSizeY, numberOfRooms) {
		
		this.size          = {x: mapSizeX, y: mapSizeY};
		this.numberOfRooms = numberOfRooms;
		this.roomMap       = Accessories.create2DArray(this.size.x, this.size.y, false);
		this.directions    = this.generateDirections(3); // ALl possible moving directions

		this.map;
		this.collisionMap;
		this.graphicsMap;

	}

	removeRegions() {

		let regions = this.getRegions(false);
		regions.sort((a, b) => a.length - b.length);

		let regionToKeep = regions.pop();

		for (let region of regions) {

			for (let tile of region) {

				this.map[tile.x][tile.y] = true;

			}

		}

	}

	getRegions(tileType) {

		let regions  = [];
		let mapFlags = Accessories.create2DArray(this.size.x, this.size.y, false);;

		for (let x = 0; x < this.size.x; x ++) {
			for (let y = 0; y < this.size.y; y ++) {

				if (mapFlags[x][y] == false && this.map[x][y] == tileType) {

					let region = this.getRegionTiles(x, y);

					regions.push(region);

					for (let coord of region) {

						mapFlags[coord.x][coord.y] = true;

					}

				}

			}

		}

		return regions;

	}

	isInMapRange(x, y) {

		return x >= 0 && x < this.size.x && y >= 0 && y < this.size.y;

	}

	getRegionTiles(startX, startY) {

		let tiles    = [];
		let mapFlags = Accessories.create2DArray(this.size.x, this.size.y, false);
		let tileType = this.map[startX][startY];
		let queue    = [];

		queue.push(new Coord(startX, startY));
		mapFlags[startX][startY] = true; // Already looked at that tile


		while(queue.length > 0) {

			let tile = queue.pop();
			tiles.push(tile);

			for (let x = tile.x - 1; x < tile.x + 2; x ++) {
				for (let y = tile.y - 1; y < tile.y + 2; y ++) {

					// in map range & not diagonal & havent been looked at & the same type
					if (this.isInMapRange(x, y) && (x == tile.x || y == tile.y) && mapFlags[x][y] == false && this.map[x][y] == tileType) { 

						mapFlags[x][y] = true;
						queue.push(new Coord(x, y));

					}


				}

			}

		}

		return tiles;

	}

	surroundMapWith(value) {

		// Adding a column of wall to the left and the right side of the map
		this.map.unshift(new Array(this.size.y).fill(value));
		this.map.push(new Array(this.size.y).fill(value));
		this.size.x += 2;

		// Adding a row of wall to the top and the bottom of the map
		for (let x = 0; x < this.size.x; x ++) {

			this.map[x].unshift(value);
			this.map[x].push(value);

		}

		this.size.y += 2;

	}

	createGraphicsMap() { // This function creates a graphics map based on the mapFlags

		this.graphicsMap = Accessories.create2DArray(this.size.x, this.size.y);
		let directions   = this.generateDirections(3);
		
		for (let x = 0; x < this.size.x; x ++) {
			for (let y = 0; y < this.size.y; y ++) {

				if (this.map[x][y] == false) {

					this.graphicsMap[x][y] = new Coord(5, 1);

				} else {

					let neighbors = this.countNeighbors(x, y, directions, this.map, true);

					switch (neighbors) {

						case 0: // 0 walls around tile
							
							this.graphicsMap[x][y] = new Coord(5, 6);

							break;

						case 8: // 8 walls around tile

							this.graphicsMap[x][y] = new Coord(1, 1);

							break;

						case 1: // 1 wall around tile

							if (this.map[x - 1][y]) { // The wall is on the left side

								this.graphicsMap[x][y] = new Coord(4, 6);

							} else if (this.map[x][y - 1]) { // The wall is on the top
							
								this.graphicsMap[x][y] = new Coord(3, 2);

							} else if (this.map[x + 1][y]) { // The wall is on the right side
							
								this.graphicsMap[x][y] = new Coord(2, 6);

							} else if (this.map[x][y + 1]) { // The wall is on the bottom

								this.graphicsMap[x][y] = new Coord(3, 0);

							} else {

								this.graphicsMap[x][y] = new Coord(5, 6)

							}

							break;

						case 2: // 2 walls around tile

							if (this.map[x - 1][y]) { // A wall is on the left side

								if (this.map[x][y - 1]) { // A wall is on the top
								
									this.graphicsMap[x][y] = new Coord(6, 2);
		
								} else if (this.map[x + 1][y]) { // A wall is on the right side
								
									this.graphicsMap[x][y] = new Coord(3, 6);
		
								} else if (this.map[x][y + 1]) { // A wall is on the bottom
		
									this.graphicsMap[x][y] = new Coord(0, 6);
		
								} else {
		
									this.graphicsMap[x][y] = new Coord(4, 6);
		
								}

							} else if (this.map[x][y - 1]) { // A wall is on the top
							
								if (this.map[x + 1][y]) { // A wall is on the right side

									this.graphicsMap[x][y] = new Coord(4, 2);

								} else if (this.map[x][y + 1]) { // A wall is on the bottom

									this.graphicsMap[x][y] = new Coord(3, 1);

								} else {

									this.graphicsMap[x][y] = new Coord(3, 2);

								}

							} else if (this.map[x + 1][y]) { // A wall is on the right side
							
								if (this.map[x][y + 1]) { // A wall is on the bottom

									this.graphicsMap[x][y] = new Coord(4, 0);

								} else {

									this.graphicsMap[x][y] = new Coord(2, 6);

								}

							} else if (this.map[x][y + 1]) { // A wall is on the bottom

								this.graphicsMap[x][y] = new Coord(3, 0);

							} else {

								this.graphicsMap[x][y] = new Coord(5, 6);

							}

							break;

						case 3:

							if (this.map[x - 1][y]) { // A wall is on the left side

								if (this.map[x][y - 1]) { // A wall is on the top

									if (this.map[x - 1][y - 1]) { // A wall is on the top left
									
										this.graphicsMap[x][y] = new Coord(2, 2);
									
									} else if (this.map[x + 1][y]) { // A wall is on the right side
									
										this.graphicsMap[x][y] = new Coord(5, 2);

									} else if (this.map[x][y + 1]) { // A wall is on the bottom
									
										this.graphicsMap[x][y] = new Coord(6, 1);
									
									} else {

										this.graphicsMap[x][y] = new Coord(4, 6);

									}

								} else if (this.map[x + 1][y]) { // A wall is on the right

									if (this.map[x][y + 1]) { // A wall is on the bottom
									
										this.graphicsMap[x][y] = new Coord(5, 0);
									
									} else {

										this.graphicsMap[x][y] = new Coord(3, 6);

									}

								} else if (this.map[x][y + 1]) { // A wall is on the bottom
								
									if (this.map[x - 1][y + 1]) { // A wall is on the bottom left
									
										this.graphicsMap[x][y] = new Coord(2, 0);

									} else {

										this.graphicsMap[x][y] = new Coord(6, 0);

									}

								} else {

									this.graphicsMap[x][y] = new Coord(4, 6);

								}

							} else if (this.map[x][y - 1]) { // A wall is on the top

								if (this.map[x + 1][y]) { // A wall is on the right side

									if (this.map[x + 1][y - 1]) { // A wall is on the top right

										this.graphicsMap[x][y] = new Coord(0, 2);
									
									} else if (this.map[x][y + 1]) { // A wall is on the bottom

										this.graphicsMap[x][y] = new Coord(4, 1);

									} else {
									
										this.graphicsMap[x][y] = new Coord(4, 2);

									}

								} else if (this.map[x][y + 1]) { // A wall is on the bottom

									this.graphicsMap[x][y] = new Coord(3, 1);

								} else {

									this.graphicsMap[x][y] = new Coord(3, 2);

								}

							} else if (this.map[x + 1][y]) { // A wall is on the right side

								if (this.map[x][y + 1]) { // A wall is on the bottom

									if (this.map[x + 1][y + 1]) { // A wall is on the bottom right
									
										this.graphicsMap[x][y] = new Coord(0, 0);

									} else { 

										this.graphicsMap[x][y] = new Coord(4, 0);
									
									}

								} else { 
								
									this.graphicsMap[x][y] = new Coord(2, 6);
								
								}

							} else if (this.map[x][y + 1]) { // A wall is on the bottom

								this.graphicsMap[x][y] = new Coord(3, 0);

							} else {

								this.graphicsMap[x][y] = new Coord(5, 6);

							}
							 
							break;

						case 4: // 4 walls around tile

							if (this.map[x - 1][y]) { // A wall is on the left side

								if (this.map[x][y - 1]) { // A wall is on the top
									
									if (this.map[x + 1][y]) { // A wall is on the right side

										if (this.map[x][y + 1]) { // A wall is on the bottom
										
											this.graphicsMap[x][y] = new Coord(5, 4);
										
										} else if (this.map[x - 1][y - 1]) { // A wall is on the top left
										
											this.graphicsMap[x][y] = new Coord(0, 4);
										
										} else if (this.map[x + 1][y - 1]) { // A wall is on the top right
										
											this.graphicsMap[x][y] = new Coord(1, 4);
										
										} else {

											this.graphicsMap[x][y] = new Coord(5, 2);

										}		

									} else if (this.map[x][y + 1]) { // A wall is on the bottom
									
										if (this.map[x - 1][y - 1]) { // A wall is on the top left
										
											this.graphicsMap[x][y] = new Coord(3, 3);
										
										} else if (this.map[x - 1][y + 1]) { // A wall is on bottom left
										
											this.graphicsMap[x][y] = new Coord(3, 4);
										
										} else {
										
											this.graphicsMap[x][y] = new Coord(6, 1);

										}
									
									} else if (this.map[x - 1][y - 1]) { // A wall is on the top left

										this.graphicsMap[x][y] = new Coord(2, 2);

									} else {

										this.graphicsMap[x][y] = new Coord(6, 2);

									}

								} else if (this.map[x + 1][y]) { // A wall is on the right

									if (this.map[x][y + 1]) { // A wall is on the bottom
									
										if (this.map[x - 1][y + 1]) { // A wall is on the bottom left
										
											this.graphicsMap[x][y] = new Coord(0, 4);
										
										} else if (this.map[x + 1][y + 1]) { // A wall is on the bottom right
										
											this.graphicsMap[x][y] = new Coord(1, 4);
										
										} else {
										
											this.graphicsMap[x][y] = new Coord(5, 0);
										
										}
									
									} else {

										this.graphicsMap[x][y] = new Coord(3, 6);

									}

								} else if (this.map[x][y + 1]) { // A wall is on the bottom
								
									if (this.map[x - 1][y + 1]) { // A wall is on the bottom left
									
										this.graphicsMap[x][y] = new Coord(2, 0);
									
									} else {

										this.graphicsMap[x][y] = new Coord(6, 0);

									}

								} else {

									this.graphicsMap[x][y] = new Coord(4, 6);

								}

							} else if (this.map[x][y - 1]) { // A wall is on the top

								if (this.map[x + 1][y]) { // A wall is on the right side

									if (this.map[x][y + 1]) { // A wall is on the bottom
									
										if (this.map[x + 1][y - 1]) { // A wall is on the top right
										
											this.graphicsMap[x][y] = new Coord(2, 3);

										} else if (this.map[x + 1][y + 1]) { // A wall is on the bottom right
										
											this.graphicsMap[x][y] = new Coord(2, 4);										

										} else {

											this.graphicsMap[x][y] = new Coord(4, 1);

										}
									
									} else if (this.map[x + 1][y - 1]) { // A wall is on the top right
									
										this.graphicsMap[x][y] = new Coord(0, 2);
									
									} else {

										this.graphicsMap[x][y] = new Coord(4, 2);;

									}

								} else if (this.map[x][y + 1]) { // A wall is on the bottom

									this.graphicsMap[x][y] = new Coord(3, 1);


								} else {

									this.graphicsMap[x][y] = new Coord(3, 2);

								}

							} else if (this.map[x + 1][y]) { // A wall is on the right side

								if (this.map[x][y + 1]) { // A wall is on the bottom

									if (this.map[x + 1][y + 1]) { // A wall is on the bottom right
									
										this.graphicsMap[x][y] = new Coord(0, 0);

									} else { 

										this.graphicsMap[x][y] = new Coord(4, 0);
									
									}

								} else {
								
									this.graphicsMap[x][y] = new Coord(2, 6);

								}

							} else if (this.map[x][y + 1]) { // A wall is on the bottom

								this.graphicsMap[x][y] = new Coord(3, 0);

							} else {

								this.graphicsMap[x][y] = new Coord(5, 6);

							}
							
							break;
							
						case 5: // 5 wall around tile (meaning 3 air tiles are around the tile)

							if (!this.map[x - 1][y]) { // Air is on the left side

								if (!this.map[x][y - 1]) { // Air is on the top

									if (!this.map[x + 1][y]) { // Air is on the right side

										this.graphicsMap[x][y] = new Coord(3, 0);

									} else if (!this.map[x][y + 1]) { // Air is on the bottom
									
										this.graphicsMap[x][y] = new Coord(2, 6);
									
									} else if (!this.map[x + 1][y + 1]) { // Air is on the bottom right
									
										this.graphicsMap[x][y] = new Coord(4, 0);

									} else {
									
										this.graphicsMap[x][y] = new Coord(0, 0);
									
									}

								} else if (!this.map[x + 1][y]) { // Air is on the right

									if (!this.map[x][y + 1]) { // Air is on the bottom
										
										this.graphicsMap[x][y] = new Coord(3, 2);

									} else {

										this.graphicsMap[x][y] = new Coord(3, 1);

									}

								} else if (!this.map[x][y + 1]) { // Air is on the bottom
								
									if (!this.map[x + 1][y - 1]) { // Air is on the top right
									
										this.graphicsMap[x][y] = new Coord(4, 2);
									
									} else {

										this.graphicsMap[x][y] = new Coord(0, 2);

									}
								
								} else {

									if (!this.map[x + 1][y - 1]) { // Air is on the top right

										if (!this.map[x + 1][y + 1]) { // Air is on the bottom right

											this.graphicsMap[x][y] = new Coord(4, 1);

										} else {
										
											this.graphicsMap[x][y] = new Coord(2, 4);

										}

									} else if (!this.map[x + 1][y + 1]) { // Air is on the bottom right

										this.graphicsMap[x][y] = new Coord(2, 3);

									} else {
									
										this.graphicsMap[x][y] = new Coord(0, 1);

									}

								}

							} else if (!this.map[x][y - 1]) { // Air is on the top

								if (!this.map[x + 1][y]) { // Air is on the right

									if (!this.map[x][y + 1]) { // Air is on the bottom
									
										this.graphicsMap[x][y] = new Coord(4, 6);
									
									} else if (!this.map[x - 1][y + 1]) { // Air is on the bottom left
									
										this.graphicsMap[x][y] = new Coord(6, 0);
									
									} else {
									
										this.graphicsMap[x][y] = new Coord(2, 0);
									
									}

								} else if (!this.map[x][y + 1]) { // Air is on the bottom

									this.graphicsMap[x][y] = new Coord(3, 6);

								} else if (!this.map[x - 1][y + 1]) { // Air is on the bottom left
								
									if (!this.map[x + 1][y + 1]) { // Air is on the bottom right

										this.graphicsMap[x][y] = new Coord(5, 0);

									} else {

										this.graphicsMap[x][y] = new Coord(1, 3);

									}
								
								} else if (!this.map[x + 1][y + 1]) { // Air is on the bottom right
								
									this.graphicsMap[x][y] = new Coord(0, 3);
								
								} else {

									this.graphicsMap[x][y] = new Coord(1, 0);

								}

							} else if (!this.map[x + 1][y]) { // Air is on the right

								if (!this.map[x][y + 1]) { // Air is on the bottom

									if (!this.map[x - 1][y - 1]) { // Air is on the top left
									
										this.graphicsMap[x][y] = new Coord(6, 2);
									
									} else {
									
										this.graphicsMap[x][y] = new Coord(2, 2);

									}

								} else if (!this.map[x - 1][y - 1]) { // Air is on the top left

									if (!this.map[x - 1][y + 1]) { // Air is on the bottom left

										this.graphicsMap[x][y] = new Coord(6, 1);

									} else {

										this.graphicsMap[x][y] = new Coord(3, 4);

									}

								} else if (!this.map[x - 1][y + 1]) { // Air is on the bottom left

									this.graphicsMap[x][y] = new Coord(3, 3);

								} else {
								
									this.graphicsMap[x][y] = new Coord(2, 1);
								
								}


							} else if (!this.map[x][y + 1]) { // Air is on the bottom

								if (!this.map[x - 1][y - 1]) { // Air is on the top left

									if (!this.map[x + 1][y - 1]) { // Air is on the top right
									
										this.graphicsMap[x][y] = new Coord(5, 2);
									
									} else {
									
										this.graphicsMap[x][y] = new Coord(1, 4);
									
									}

								} else if (!this.map[x + 1][y - 1]) { // Air is on the top right

									this.graphicsMap[x][y] = new Coord(0, 4);

								} else {
								
									this.graphicsMap[x][y] = new Coord(1, 2);

								}

							} else if (!this.map[x - 1][y - 1]) { // Air is on the top left

								if (!this.map[x + 1][y - 1]) { // Air is on the top right

									if (!this.map[x + 1][y + 1]) { // Air is on the bottom right
									
										this.graphicsMap[x][y] = new Coord(0, 6);
									
									} else {
									
										this.graphicsMap[x][y] = new Coord(1, 6);
									
									}

								} else {

									this.graphicsMap[x][y] = new Coord(1, 5);

								}

							} else {

								this.graphicsMap[x][y] = new Coord(0, 5);

							}

						case 6: // 6 walls around tile

							if (!this.map[x - 1][y]) { // Air is on the left side

								if (!this.map[x - 1][y - 1]) { // Air is on the top left

									this.graphicsMap[x][y] = new Coord(0, 1);

								}

							}
							
						
					}

				}

			}
			
		}

	}

	createCollisionMap() { // This function creates a collision map based on the map
		// There are be 16 different types of collisions

		this.collisionMap = Accessories.create2DArray(this.size.x, this.size.y);
		let playerSpawn;

		let directions = [
			{xOffset:  1, yOffset:  0},
			{xOffset: -1, yOffset:  0},
			{xOffset:  0, yOffset:  1},
			{xOffset:  0, yOffset: -1}
		];

		for (let x = 0; x < this.size.x; x ++) {
			for (let y = 0; y < this.size.y; y ++) {

				if (this.map[x][y] == false) { // Check if block is a wall

					this.collisionMap[x][y] = 0; // Air block have no collision
					playerSpawn = new Coord(x, y);


				} else {

					let neighbors = this.countNeighbors(x, y, directions, this.map, true);

					switch (neighbors) { // l t r b - 1 if there should be collision detection

						case 0: // 0 walls around tile

							this.collisionMap[x][y] = 15;                       // 1111
							break;
						
						case 1: // 1 wall around tile

							if (this.get(this.map, x - 1, y)) {                 // 0111

								this.collisionMap[x][y] = 7;

							} else if (this.get(this.map, x, y - 1)) {          // 1011

								this.collisionMap[x][y] = 11;

							} else if (this.get(this.map, x + 1, y)) {          // 1101

								this.collisionMap[x][y] = 13;

							} else {                                            // 1110

								this.collisionMap[x][y] = 14;

							}
						
							break;

						case 2: // 2 walls around tile

							if (this.get(this.map, x - 1, y)) {

								if (this.get(this.map, x, y - 1)) {             // 0011

									this.collisionMap[x][y] = 3;

								} else if (this.get(this.map, x + 1, y)) {      // 0101

									this.collisionMap[x][y] = 5;

								} else {                                        // 0110

									this.collisionMap[x][y] = 6;

								}

							} else if (this.get(this.map, x, y - 1)) {

								if (this.get(this.map, x + 1, y)) {             // 1001

									this.collisionMap[x][y] = 9;

								} else {                                        // 1010

									this.collisionMap[x][y] = 10;

								}

							} else {                                            // 1100

								this.collisionMap[x][y] = 12;

							}

							break;

						case 3: // 3 walls around tile

							if (!this.get(this.map, x - 1, y)) {        // 1000

								this.collisionMap[x][y] = 8;

							} else if (!this.get(this.map, x, y - 1)) { // 0100

								this.collisionMap[x][y] = 4;

							} else if (!this.get(this.map, x + 1, y)) { // 0010

								this.collisionMap[x][y] = 2;

							} else {                                    // 0001

								this.collisionMap[x][y] = 1;

							}

							break;

						case 4: // 4 walls around tile

							this.collisionMap[x][y] = 0;                // 0000
							break;

					}

				}

			}

		}

		return playerSpawn;

	}

	get(array, x, y, wallTile) { // this returns the value of a tile in a 2D map, and checks for walls

		if (wallTile === undefined) {

			wallTile = true;

		}

		if (array[x] === undefined) {

			return wallTile				
			
		}

		if (array[x][y] === undefined) {

			return wallTile

		}

		return array[x][y]

	}

	createMapFromRoomMap(roomSize) {

		this.map = Accessories.create2DArray(this.size.x * roomSize, this.size.y * roomSize);
		this.size.x = this.map.length;
		this.size.y = this.map[0].length;

		for (let x = 0; x < this.size.x; x ++) {
			for (let y = 0; y < this.size.y; y ++) {

				if (this.roomMap[Math.floor(x / roomSize)][Math.floor(y / roomSize)] == false) {

					this.map[x][y] = true;

				} else {

					this.map[x][y] = false;

				}
				
			}

		}


	}

	fillMapWithRandom(fillPercentage) { // Fills the empty spaces randomly

		for (let x = 0; x < this.size.x; x ++) {
			for (let y = 0; y < this.size.y; y ++) {

				if(this.map[x][y] == false) {

					if (Accessories.random(0, 1, true) > fillPercentage) {

						this.map[x][y] = false;

					} else {

						this.map[x][y] = true;

					}
					
				}

			}

		}		

	}

	generateDirections(size) { // Creates an array of directions

		if (size % 2 != 1) {

			console.log("Size must be an odd number!");
			return;

		}

		let directions = [];

		for (let x = 0; x < size; x ++) {
			for (let y = 0; y < size; y ++) {

				let relX = x - ((size - 1) / 2);
				let relY = y - ((size - 1) / 2);

				if (!(relX == 0 && relY == 0)) {

					directions.push({xOffset: relX, yOffset: relY});

				}

			}

		}
		
		return directions;

	}

	smooth(times) { // Smooths the map

		for (let i = 0; i < times; i++) {

			let newMap = Accessories.create2DArray(this.size.x, this.size.y);

			for (let x = 0; x < this.size.x; x ++) {
				for (let y = 0; y < this.size.y; y ++) {

					let neigbors = this.countNeighbors(x, y, this.directions, this.map, true);

					if (neigbors > this.directions.length / 2) {

						newMap[x][y] = true;

					} else if (neigbors < this.directions.length / 2) {

						newMap[x][y] = false;

					} else {

						newMap[x][y] = this.map[x][y];

					}

				}

			}

			this.map = newMap;

		}

	}
	
	countNeighbors(x, y, directions, array, wallTile) { // Returns how many neighbors have a given location (Walls count as neighbors)

		let neighborCount = 0;

		for (let direction of directions) {

			// if (array[x + direction.xOffset] === undefined) {

			// 	neighborCount ++;

			// } else if (array[x + direction.xOffset][y + direction.yOffset] == wallTile || array[x + direction.xOffset][y + direction.yOffset] === undefined) {

			// 	neighborCount ++;

			// }

			if (this.get(array, x + direction.xOffset, y + direction.yOffset, wallTile) == true) {
				neighborCount ++;
			}

		}

		return neighborCount;

	}

	cutMapEdges(map, wallTile) {

		let bools = [false, true];

		for (let bool of bools) { // Removes whitespace from the four edges of the map;

			while (this.checkEmptyFromSides(bool, map, wallTile)) { // Checks if array has no rooms (the parameter 'bool' represents fromRight)

				if (bool) { // If fromRight, remove the right side of the array

					map.pop();

				} else { // Remove the left side

					map.shift();

				}

				this.size.x --;

			}

			while (this.checkEmptyFromTopBottom(bool, map, wallTile)) { // Removes whitespace from the top and bottom of the map

				if (bool) {  // Remove from bottom

					for (let i = 0; i < map.length; i ++) {

						map[i].pop();

					}

				} else { // Remove from top

					for (let i = 0; i < map.length; i ++) {

						map[i].shift();

					}

				}

				this.size.y --;

			}
			
		}

	}

	checkEmptyFromSides(fromRight, map, wallTile) { // Returns if the array on the side is empty or not

		let index = 0;

		if (fromRight) {

			index = map.length - 1;

		}

		return map[index].every(function(element) {

			return element == wallTile;

		})

	}

	checkEmptyFromTopBottom(fromBottom, map, wallTile) { // Returns if the top or bottom of the map is empty or not

		let index = 0;

		if (fromBottom) {

			index = map[0].length - 1;

		}

		return map.every(function(element) {
			
			return element[index] == wallTile;

		})

	}

}