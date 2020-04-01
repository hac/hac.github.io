function level1()
{
	var level = {title: "250M B.C."};
	var map = [
	"gggggggggtgt",
	"ggtrrrgggggg",
	"gggrggrggggg",
	"pgrggggrrggg",
	"rrrrrggtrggg",
	"gggggggggggg"
	];
	
	// create an empty container
	level.gameContainer = new PIXI.DisplayObjectContainer();
	level.gameContainer.position.x = 0;
	level.gameContainer.position.y = 0;
	
	level.player = PIXI.Sprite.fromCharacter("anna");
	level.player.startPosition = blocksToPoint(0,5);
	level.player.position = level.player.startPosition.clone();
	level.player.reachBlock = function(block)
	{
		if (cellForBlock(map, block.x,block.y).blocking) return false;
		return true;
	}
	
	var spiny1 = PIXI.Sprite.fromCharacter("spiny");
	spiny1.scale.x = spiny1.scale.y = .8;
	spiny1.setPath([new PIXI.Point(4,2), new PIXI.Point(5,2)]);
	spiny1.dialog = "Many happy returns Anna! Keep this card in your backpack.";
	spiny1.collide = function() { this.speak(); this.giveItem("card"); }

	var spiny2 = PIXI.Sprite.fromCharacter("spiny");
	spiny2.scale.x = spiny2.scale.y = .7;
	spiny2.setPath([new PIXI.Point(3,3), new PIXI.Point(5,3)]);
	spiny2.dialog = "Most of the dinosaurs here are quite friendly.";
	spiny2.collide = function() { this.speak(); }

	//spiny.collide = function() { this.player.reset(); };

	var longneck = PIXI.Sprite.fromCharacter("longneck");
	longneck.setPath([new PIXI.Point(3,5), new PIXI.Point(4,5)]);
	longneck.dialog = "Happy Birthday Anna, welcome to the Triassic period! We're so happy you could come. Go see the dimetrodons. They wanted to say hi to you too.";
	longneck.collide = function() { this.speak(); }
	
	var littleneck = PIXI.Sprite.fromCharacter("longneck");
	littleneck.scale.x = littleneck.scale.y = .5;
	littleneck.setPath([new PIXI.Point(8,5), new PIXI.Point(9,5), new PIXI.Point(9,4), new PIXI.Point(10,5)]);
	littleneck.dialog = "Anna! This is for you.";
	littleneck.collide = function() { this.speak(); this.giveItem("candy"); }
	
	var daddylongneck = PIXI.Sprite.fromCharacter("longneck");
	daddylongneck.setPath([new PIXI.Point(10,0)]);
	daddylongneck.dialog = "A pleasure to meet you, Anna. You sure are a long ways from home.";
	daddylongneck.collide = function() { this.speak(); }
	
	level.animatedSprites = [spiny1, spiny2, longneck, littleneck, daddylongneck, level.player];
	
	var glue = PIXI.Sprite.fromItem("cookie");
	glue.position = blocksToPoint(6,0);
	glue.dialog = "Yum!";
	glue.collide = function() { this.speak(); this.giveItem("cookie"); this.delete(); }
	
	level.itemSprites = [glue];
	level.staticSprites = drawMap(map);
	level.sprites = level.staticSprites.concat(level.itemSprites).concat(level.animatedSprites);
	
	for (var i in level.sprites)
	{
		level.gameContainer.addChild(level.sprites[i]);
	}
	
	return level;
}

function level1b()
{
	var level = {title: ""};
	var map = [
	"gttggggggggg",
	"gggggggggggt",
	"ggggggggggpg",
	"oggggggggtgt",
	"gggggggggggg",
	"tttggggggggg"
	];
	
	// create an empty container
	level.gameContainer = new PIXI.DisplayObjectContainer();
	level.gameContainer.position.x = 0;
	level.gameContainer.position.y = 0;
	
	level.player = PIXI.Sprite.fromCharacter("anna");
	level.player.startPosition = blocksToPoint(0,4);
	level.player.position = level.player.startPosition.clone();
	level.player.reachBlock = function(block)
	{
		if (cellForBlock(map, block.x,block.y).blocking) return false;
		return true;
	}

	var s1 = PIXI.Sprite.fromCharacter("spiny").setPath([new PIXI.Point(3,4), new PIXI.Point(9,4)]);
	var s2 = PIXI.Sprite.fromCharacter("spiny").setPath([new PIXI.Point(4,4), new PIXI.Point(9,4), new PIXI.Point(3,4)]);
	var s3 = PIXI.Sprite.fromCharacter("spiny").setPath([new PIXI.Point(5,4), new PIXI.Point(9,4), new PIXI.Point(3,4)]);
	s3.scale.x = s3.scale.y = .7;
	var s4 = PIXI.Sprite.fromCharacter("spiny").setPath([new PIXI.Point(6,5), new PIXI.Point(11,5)]);
	var s5 = PIXI.Sprite.fromCharacter("spiny").setPath([new PIXI.Point(4,5), new PIXI.Point(10,5)]);
	s5.scale.x = s5.scale.y = .7;

	var s6 = PIXI.Sprite.fromCharacter("spiny").setPath([new PIXI.Point(1,1), new PIXI.Point(9,1)]);
	var s7 = PIXI.Sprite.fromCharacter("spiny").setPath([new PIXI.Point(2,1), new PIXI.Point(9,1), new PIXI.Point(1,1)]);
	s7.scale.x = s7.scale.y = .8;
	var s8 = PIXI.Sprite.fromCharacter("spiny").setPath([new PIXI.Point(3,1), new PIXI.Point(9,1), new PIXI.Point(1,1)]);
	s8.scale.x = s8.scale.y = .4;
	var s9 = PIXI.Sprite.fromCharacter("spiny").setPath([new PIXI.Point(3,0), new PIXI.Point(9,0)]);
	var s10 = PIXI.Sprite.fromCharacter("spiny").setPath([new PIXI.Point(4,0), new PIXI.Point(10,0)]);

	level.animatedSprites = [s9, s10, s6, s7, s8, s1, s2, s3, s4, s5, level.player];
	
/*	var glue = PIXI.Sprite.fromItem("glue");
	glue.position = blocksToPoint(6,0);
	glue.dialog = "What this glue doing here in the age of dinosaurs?";
	glue.collide = function() { this.speak(); this.giveItem("glue"); this.delete(); }*/
	
	level.itemSprites = [];
	level.staticSprites = drawMap(map);
	level.sprites = level.staticSprites.concat(level.itemSprites).concat(level.animatedSprites);
	
	for (var i in level.sprites)
	{
		level.gameContainer.addChild(level.sprites[i]);
	}
	
	return level;
}