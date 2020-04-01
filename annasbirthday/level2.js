function level2()
{
	var level = {title: "173M B.C."};
	var map = [
	"ggggggrggggp",
	"gggrorgggggg",
	"gtttrtgggttg",
	"gggggggggggg",
	"ggrggtgrgrrg",
	"gggggggggrgg"
	];
	
	// create an empty container
	level.gameContainer = new PIXI.DisplayObjectContainer();
	level.gameContainer.position.x = 0;
	level.gameContainer.position.y = 0;
	
	level.player = PIXI.Sprite.fromCharacter("anna");
	level.player.startPosition = blocksToPoint(4,1);
	level.player.position = level.player.startPosition.clone();
	level.player.reachBlock = function(block)
	{
		if (cellForBlock(map, block.x,block.y).blocking) return false;
		return true;
	}

	var brach = PIXI.Sprite.fromCharacter("brach");
	brach.setPath([new PIXI.Point(0,0), new PIXI.Point(1,1)]);
	brach.dialog = "Happy Birthday Anna! The jurassic period is a bit more evolved, and more dangerous! Watch out for the meat eating allosaurus.";
	brach.collide = function() { this.speak(); }

	var allo1 = PIXI.Sprite.fromCharacter("allo");
	var path = [new PIXI.Point(0,3), new PIXI.Point(0, 5), new PIXI.Point(3, 5), new PIXI.Point(3, 3), new PIXI.Point(6, 3), new PIXI.Point(6, 5), new PIXI.Point(4, 5), new PIXI.Point(4, 3)];
	allo1.setPath(path);
	
	var allo2 = PIXI.Sprite.fromCharacter("allo");
	allo2.setPath(path.reverse());
	
	var allo3 = PIXI.Sprite.fromCharacter("allo");
	allo3.setPath([new PIXI.Point(10,0), new PIXI.Point(10,1), new PIXI.Point(11,1), new PIXI.Point(10,1)]);
	allo1.dialog = allo2.dialog = allo3.dialog = "RAAWR";
	allo1.collide = allo2.collide = allo3.collide = function() { this.speak(); level.player.reset(); }

	var brach2 = PIXI.Sprite.fromCharacter("brach");
	brach2.setPath([new PIXI.Point(6,2)]);
	brach2.dialog = "You made it!";
	brach2.collide = function() { this.speak(); }
	
	level.animatedSprites = [brach, brach2, allo1, allo2, allo3, level.player];
	
	var cupcake = PIXI.Sprite.fromItem("icecream");
	cupcake.position = blocksToPoint(10,5);
	cupcake.dialog = "Just the thing on a hot day!";
	cupcake.collide = function() { this.speak(); this.giveItem("icecream"); this.delete(); }
	
	level.itemSprites = [cupcake];
	level.staticSprites = drawMap(map);
	level.sprites = level.staticSprites.concat(level.itemSprites).concat(level.animatedSprites);
	
	for (var i in level.sprites)
	{
		level.gameContainer.addChild(level.sprites[i]);
	}
	
	return level;
}

function level2b()
{
	var level = {title: ""};
	var map = [
	"rrgggorgggrp",
	"gggrrrggrgrg",
	"grrrgggrrgrg",
	"gggrgrgrgggg",
	"grgggrgrgrrg",
	"gggrgrgggrgg"
	];
	
	// create an empty container
	level.gameContainer = new PIXI.DisplayObjectContainer();
	level.gameContainer.position.x = 0;
	level.gameContainer.position.y = 0;
	
	level.player = PIXI.Sprite.fromCharacter("anna");
	level.player.startPosition = blocksToPoint(4,0);
	level.player.position = level.player.startPosition.clone();
	level.player.reachBlock = function(block)
	{
		if (cellForBlock(map, block.x,block.y).blocking) return false;
		return true;
	}

	var p1 = PIXI.Sprite.fromCharacter("ptera");
	p1.setPath([new PIXI.Point(0,0), new PIXI.Point(11, 5)]);

	var p2 = PIXI.Sprite.fromCharacter("ptera");
	p2.setPath([new PIXI.Point(11, 5), new PIXI.Point(0,0)]);

	var p3 = PIXI.Sprite.fromCharacter("ptera");
	p3.setPath([new PIXI.Point(2, 1), new PIXI.Point(2, 4), new PIXI.Point(8,4), new PIXI.Point(8,1)]);

	var p4 = PIXI.Sprite.fromCharacter("ptera");
	p4.setPath([new PIXI.Point(0, 3), new PIXI.Point(11,3)]);
	
	p1.dialog = p2.dialog = p3.dialog = p4.dialog = "SKREEEE";
	p1.collide = p2.collide = p3.collide = p4.dialog = function() { this.speak(); level.player.reset(); }

	level.animatedSprites = [p1, p2, p3, p4, level.player];
	
	var cupcake = PIXI.Sprite.fromItem("muffin");
	cupcake.position = blocksToPoint(9,0);
	cupcake.dialog = "Just what I needed!";
	cupcake.collide = function() { this.speak(); this.giveItem("muffin"); this.delete(); }
	
	level.itemSprites = [cupcake];
	level.staticSprites = drawMap(map);
	level.sprites = level.staticSprites.concat(level.itemSprites).concat(level.animatedSprites);
	
	for (var i in level.sprites)
	{
		level.gameContainer.addChild(level.sprites[i]);
	}
	
	return level;
}