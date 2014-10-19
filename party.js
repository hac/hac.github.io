function party()
{
	var level = {title: "Present Day London"};
	var map = [
	"",
	"",
	"",
	"",
	"gggggggggggg",
	"oggggggggggg"
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

	var party = PIXI.Sprite.fromImage("party.png");
	party.position.x=550;
	party.position.y=100;
	
	level.animatedSprites = [level.player];
		
	level.itemSprites = [party];
	level.staticSprites = drawMap(map);
	level.sprites = level.staticSprites.concat(level.itemSprites).concat(level.animatedSprites);
	
	level.start = function()
	{
		alert("You did it! Time to join your friends and party.")
	}
	
	for (var i in level.sprites)
	{
		level.gameContainer.addChild(level.sprites[i]);
	}
	
	return level;
}