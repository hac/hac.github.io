function level0()
{
	var level = {title: ""};
	var map = [
	"",
	"",
	"",
	"",
	"gggggggggggg",
	"gggggggggggg"
	];
	
	// create an empty container
	level.gameContainer = new PIXI.DisplayObjectContainer();
	level.gameContainer.position.x = 0;
	level.gameContainer.position.y = 0;
	
	level.player = PIXI.Sprite.fromCharacter("anna");
	level.player.startPosition = blocksToPoint(7,3);
	level.player.position = level.player.startPosition.clone();

	var party = PIXI.Sprite.fromImage("house.png");
	party.position.x=550;
	party.position.y=100;
	
	var present = PIXI.Sprite.fromImage("items/present.png");
	present.position = blocksToPoint(0,5);
	present.collide = function() { goToLevel(currentLevelNumber+1); }
	
	level.animatedSprites = [level.player];
	
	level.itemSprites = [party, present];
	level.staticSprites = drawMap(map);
	level.sprites = level.staticSprites.concat(level.itemSprites).concat(level.animatedSprites);
	
	for (var i in level.sprites)
	{
		level.gameContainer.addChild(level.sprites[i]);
	}
	
	setTimeout(function() {
		alert("When Anna woke up on her birthday, she discovered a mysterious present outside her door.");
		level.player.destination = new PIXI.Point(1,5);
		setTimeout(function() {
			present.setTexture(new PIXI.Texture.fromImage("items/machine.png"));
			setTimeout(function() {
			alert("It was a strange machine.");
			present.setTexture(new PIXI.Texture.fromImage("tiles/p.png"));
			setTimeout(function() {
			alert("The machine made a portal she could enter by using her arrow keys.");
		}, 500);
		}, 500);
		}, 1500);
	}, 50);
	
	return level;
}