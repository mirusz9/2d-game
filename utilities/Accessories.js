
class Accessories {

	static random(min, max, doNotRound) {

		if (min instanceof Array) {

			return min[this.random(0, min.length)];

		} else {

			if (doNotRound != true) {

				return Math.floor(Math.random() * (max - min) + min);
				
			}
	
			return Math.random() * (max - min) + min;

		}

	}

	static setSeedRandom(seed) {

		Math.seedrandom(seed);

	}

	static create2DArray(d1, d2, value) {

		let arr = [];

		if (value != undefined) {

			for (let i = 0; i < d1; i++) {

				arr.push(new Array(d2).fill(value));

			}

			return arr;

		}

		for (let i = 0; i < d1; i++) {

			arr.push(new Array(d2));

		}

		return arr;

	}

	static lerp(start, end, time) {

		return (end - start) * time + start;

	}

}
