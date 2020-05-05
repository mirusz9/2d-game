

window.addEventListener("load", function(event) {

	"use strict";

	let buttonAction = function(event) {
		
		controller.buttonAction(event.type, event.keyCode, engine.stop);

	}

	let render = function() {

		display.drawMap(game.world.graphicsMap);
		display.drawPlayer(game.world.player);
		display.render();

	}

	let update = function() {
		
		if (controller.left.active ) {game.world.player.moveLeft(); }
		if (controller.right.active) {game.world.player.moveRight();}
		if (controller.up.active   ) {game.world.player.jump(); }//controller.up.active = false}

		game.update();
		display.update();

	}

	let resize = function(event) {

		display.resize(document.documentElement.clientWidth, document.documentElement.clientHeight);
		display.render();
	
	  };

	let controller   = new Controller();
	let game         = new Game();
	let display      = new Display(document.querySelector("canvas"), game.world.player, 9 / 16);
	let engine       = new Engine(1000 / 30, update, render);
	

	display.tileSheet.image.addEventListener("load", function(event) {

		resize();
		engine.start();

	}, {once: true});
	
	display.tileSheet.image.src = "./utilities/tileSet.png";

	window.addEventListener("keydown", buttonAction);
	window.addEventListener("keyup"  , buttonAction);
	window.addEventListener("resize" , resize);


	

});
