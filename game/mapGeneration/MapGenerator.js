class MapGenerator {
	constructor() {
		this.map;
	}

	generateNewMap(mapSizeX, mapSizeY, numberOfRooms, seed) {
		/*

		The program generates the map in theese steps:

		1. Create an empty 2d array of a given size
		2. Create a given number of rooms by following theese rules:
			- Get a random starting point, and make it part of the map
			- Get a random direction and move there if it is within the borders.
			- If the new location has at least 3 neighbors that are already part of the map,
			  dont move there, but go to a random point on the map, get a new direction and
			  do theese checks again until you get a room that meets the requirements.
		3. Cut off the unused edges off the map
		4. Turn the roommap into a higher resolution map
		5. Fill the empty space with random walls
		6. Smooth the map

		*/

		this.map = new GameMap(mapSizeX, mapSizeY, numberOfRooms);

		Accessories.setSeedRandom(seed);

		let currentNumberOfRooms = 0;
		let currentPosition = new Coord(
			Accessories.random(0, this.map.size.x),
			Accessories.random(0, this.map.size.y)
		); // Random starting position

		let directions = [
			// ALl possible moving directions
			{ xOffset: 1, yOffset: 0 },
			{ xOffset: -1, yOffset: 0 },
			{ xOffset: 0, yOffset: 1 },
			{ xOffset: 0, yOffset: -1 },
		];

		while (currentNumberOfRooms < this.map.numberOfRooms) {
			// Creating all the rooms

			let validDirection = false;

			if (this.map.roomMap[currentPosition.x][currentPosition.y] == false) {
				// Setting current room to be part of the map

				this.map.roomMap[currentPosition.x][currentPosition.y] = true;
				currentNumberOfRooms++;
			}

			while (
				validDirection != true &&
				currentNumberOfRooms < this.map.numberOfRooms
			) {
				// Picking a valid direction and moving the currentPosition there

				let direction = Accessories.random(directions); // Start by picking a random direction

				if (
					// Check if it is within the borders
					currentPosition.x + direction.xOffset >= 0 &&
					currentPosition.x + direction.xOffset < this.map.size.x &&
					currentPosition.y + direction.yOffset >= 0 &&
					currentPosition.y + direction.yOffset < this.map.size.y
				) {
					if (
						this.map.countNeighbors(
							currentPosition.x,
							currentPosition.y,
							directions,
							this.map.roomMap,
							true
						) >= 3
					) {
						// If the current cell has at least 3 neighbors than we pick a new random location

						currentPosition = this.getNewRandomLocation();
					} else {
						// If the current position went through the checks above, we make it part of the map

						validDirection = true;
						currentPosition.x += direction.xOffset;
						currentPosition.y += direction.yOffset;
					}
				}
			}
		}

		this.smooth(); // This contains lots of funtions, only for organization
		this.map.removeRegions(); // Removes all of the regions except for the biggest one
		this.map.cutMapEdges(this.map.map, true);
		this.map.surroundMapWith(true);
		this.map.surroundMapWith(true);

		let playerSpawn = this.map.createCollisionMap();
		console.log(playerSpawn);
		this.map.createGraphicsMap();

		console.log('Generated map with seed: "' + seed + '"');
		return [this.map.collisionMap, this.map.graphicsMap, playerSpawn];
	}

	smoot() {
		console.log(" he");
	}

	smooth() {
		this.map.cutMapEdges(this.map.roomMap, false);
		this.map.createMapFromRoomMap(8); // 8

		this.map.fillMapWithRandom(0.434);
		0.434;
		this.map.smooth(1); // 10

		this.map.fillMapWithRandom(0.1);
		this.map.directions = this.map.generateDirections(5); // 5
		this.map.smooth(1); // 3

		this.map.fillMapWithRandom(0.1);
		this.map.directions = this.map.generateDirections(3);
		this.map.smooth(5);

		// This works
		// this.map.fillRoomMapWithRandom(32, 0.45);
		// this.map.smooth(1); // 1
		// this.map.directions = this.map.generateDirections(3);
		// this.map.smooth(10); // 10
	}

	getNewRandomLocation() {
		// This function picks a random location

		while (true) {
			let x = Accessories.random(0, this.map.size.x);
			let y = Accessories.random(0, this.map.size.y);

			if (this.map.roomMap[x][y]) {
				return new Coord(x, y);
			}
		}
	}
}
