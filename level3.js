function level3()
{
	var level = {title: "84M B.C."};
	var map = [
	"tggggggggggg",
	"grggggggrggg",
	"prgggggroggg",
	"grggggggrggg",
	"gggggggggggg",
	"gggggggggggg"
	];
	
	// create an empty container
	level.gameContainer = new PIXI.DisplayObjectContainer();
	level.gameContainer.position.x = 0;
	level.gameContainer.position.y = 0;
	
	level.player = PIXI.Sprite.fromCharacter("anna");
	level.player.startPosition = blocksToPoint(8,2);
	level.player.position = level.player.startPosition.clone();
	level.player.reachBlock = function(block)
	{
		if (cellForBlock(map, block.x,block.y).blocking) return false;
		return true;
	}

	var trike = PIXI.Sprite.fromCharacter("trike");
	trike.setPath([new PIXI.Point(11,3), new PIXI.Point(10,3)]);
	trike.dialog = "Hi Anna! Welcome to the cretaceous period, home to the most diverse dinosaurs and many meatosauruses.";
	trike.collide = function() { this.speak(); }

	var trike2 = PIXI.Sprite.fromCharacter("trike");
	trike2.setPath([new PIXI.Point(10,5), new PIXI.Point(11,5)]);
	trike2.dialog = "Look out for hungry velociraptors and the mighty t-rex!";
	trike2.collide = function() { this.speak(); }

	var r1 = PIXI.Sprite.fromCharacter("raptor");
	r1.setPath([new PIXI.Point(8,0), new PIXI.Point(7,0), new PIXI.Point(7,1)]);
	var r2 = PIXI.Sprite.fromCharacter("raptor");
	r2.setPath([new PIXI.Point(7,5), new PIXI.Point(7,3)]);
	var r3 = PIXI.Sprite.fromCharacter("raptor");
	r3.setPath([new PIXI.Point(3,4), new PIXI.Point(3,5)]);
	var r4 = PIXI.Sprite.fromCharacter("raptor");
	r4.setPath([new PIXI.Point(3,0), new PIXI.Point(3,3)]);
	var r5 = PIXI.Sprite.fromCharacter("raptor");
	r5.setPath([new PIXI.Point(4,3), new PIXI.Point(6,3)]);
	var r6 = PIXI.Sprite.fromCharacter("raptor");
	r6.setPath([new PIXI.Point(6,1), new PIXI.Point(4,1)]);
	var trex = PIXI.Sprite.fromCharacter("trex");
	trex.setPath([new PIXI.Point(0,4), new PIXI.Point(1,5)]);
	r1.dialog = r2.dialog = r3.dialog = r4.dialog = r5.dialog = r6.dialog = "AAAAAAAH";
	trex.dialog = "Gotcha! Happy Birthday, but try again.";
	r1.collide = r2.collide = r3.collide = r4.collide = r5.collide = r6.collide = trex.collide = function() { this.speak(); level.player.reset(); }
	
	level.animatedSprites = [trike, trike2, r1, r2, r3, r4, r5, r6, trex, level.player];
	
	var cupcake = PIXI.Sprite.fromItem("muffin");
	cupcake.position = blocksToPoint(10,5);
	cupcake.dialog = "That hits the spot!";
	cupcake.collide = function() { this.speak(); this.giveItem("muffin"); this.delete(); }
	
	level.itemSprites = [];
	level.staticSprites = drawMap(map);
	level.sprites = level.staticSprites.concat(level.itemSprites).concat(level.animatedSprites);
	
	for (var i in level.sprites)
	{
		level.gameContainer.addChild(level.sprites[i]);
	}
	
	return level;
}