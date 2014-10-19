// Return the block the sprite should be moving towards.
// If the block has reached it's final destination, return null.
PIXI.Sprite.prototype.nextBlock = function()
{
	if (!this.destination && this.ai)
	{
		this.destination = this.ai();
	}
	
	// This math is done in block increments.
	if (this.destination)
	{	
		var blockPosition = this.position.toBlocks();
				
		var xBlocks = this.destination.x - blockPosition.x;
		var yBlocks = this.destination.y - blockPosition.y;
		var blockDistance = Math.abs(xBlocks) + Math.abs(yBlocks);
		
		var direction;
		var newPosition = blockPosition;
		if (xBlocks && yBlocks)
		{
			if (blockDistance % 2)
			{
				newPosition.x += Math.sign(xBlocks);
			}
			else
			{
				newPosition.y += Math.sign(yBlocks);
			}
		}
		else if (xBlocks)
		{
			newPosition.x += Math.sign(xBlocks);
		}
		else if (yBlocks)
		{
			newPosition.y += Math.sign(yBlocks);
		}
		else
		{
			// We reached the destination.
			this.destination = null;
			newPosition = null;
		}
		
		return newPosition;
	}
}
PIXI.Sprite.prototype.distanceToNextBlock = function()
{
	if (!this.next) return new PIXI.Point(0,0);
	return new PIXI.Point(this.next.x*blockSize - this.position.x, this.next.y*blockSize - this.position.y);
}
PIXI.Sprite.prototype.animate = function()
{
	if (!this.next)
	{
		this.next = this.nextBlock();
	}
	
	if (this.next && this.reachBlock && !this.reachBlock(this.next))
	{
		this.next = null;
	}
	
	// This math is done in pixel increments.
	if (this.next)
	{
		var d = this.distanceToNextBlock();
		var stepSize = this.speed/1000 * blockSize * Math.abs(this.scale.x);
					
		if (d.x != 0)
		{
			var xStep = d.x > 0 ? stepSize : -stepSize;
			
			// Flip the sprite left or right.
			this.scale.x = (d.x > 0 ? -1 : 1) * Math.abs(this.scale.x);
			this.anchor.x = d.x > 0 ? 1 : 0;
			
			if (Math.abs(d.x) > stepSize) this.position.x += xStep;
			else this.position.x = this.next.x*blockSize;
		}
		else if (d.y != 0)
		{
			var yStep = d.y > 0 ? stepSize : -stepSize;
			if (Math.abs(d.y) > stepSize) this.position.y += yStep;
			else this.position.y = this.next.y*blockSize;
		}
		else
		{
			if (pointsEqual(this.next, this.destination))
			{
				this.destination = null;
			}
			this.next = null;
		}
	}
}
PIXI.Sprite.prototype.resetToPosition = function(start)
{
	this.destination = null;
	this.next = null;
	this.position = start;
}
PIXI.Sprite.prototype.move = function(x, y)
{
	this.destination = null
	this.next = this.position.toBlocks();
	this.next.x += x;
	this.next.y += y;
}
PIXI.Sprite.prototype.setPath = function(path)
{
	this.path = path;
	this.ai = function()
	{
		this.nextPathPoint = this.nextPathPoint || 0;
		var point = this.path[this.nextPathPoint];
		this.nextPathPoint = (this.nextPathPoint + 1) % this.path.length;
		
		return point;
	};
	this.position = this.ai().fromBlocks();
	return this;
}
PIXI.Sprite.prototype.isTouchingSprite = function(otherSprite)
{
	var a1 = this.position.toBlocks();
	var a2 = this.next;
	var b1 = otherSprite.position.toBlocks();
	var b2 = otherSprite.next;
	if (pointsEqual(a1, b1) || pointsEqual(a1, b2) || pointsEqual(a2, b1) || pointsEqual(a2, b2))
	{
		return true;
	}
	return false;
}
PIXI.Sprite.prototype.reset = function()
{
	this.resetToPosition(this.startPosition.clone());
}
PIXI.Sprite.prototype.speak = function()
{
	if (!this.lastSpeech || ((new Date()).getTime() - this.lastSpeech) > 5*1000)
	{
		this.lastSpeech = (new Date()).getTime();
		alert(this.dialog);
	}
}
PIXI.Sprite.prototype.giveItem = function(item)
{
	myItems[item] = myItems[item] || 0;
	myItems[item]++;
	
	drawBackpack();
}
PIXI.Sprite.prototype.delete = function()
{
	this.parent.removeChild(this);
	
	var index = currentLevel.itemSprites.indexOf(this);
	if (index > -1) {
	    currentLevel.itemSprites.splice(index, 1);
	}
	
	var index = currentLevel.sprites.indexOf(this);
	if (index > -1) {
	    currentLevel.sprites.splice(index, 1);
	}
}
PIXI.Sprite.fromCharacter = function(name)
{
	var characters = {
		"anna": {
			speed: 100
		},
		"spiny": {
			speed: 5
		},
		"raptor": {
			speed: 80
		},
		"trex": {
			speed: 50
		},
		"longneck": {
			speed: 10
		},
		"trike": {
			speed: 20
		},
		"ptera": {
			speed: 50
		},
		"brach": {
			speed: 10
		},
		"allo": {
			speed: 60
		}
	};
	
	character = PIXI.Sprite.fromImage("");
	character.textureName = name;
	character.speed = characters[name]["speed"];
	character.setTexture(skinForName(character.textureName));
	return character;
}
PIXI.Sprite.fromItem = function(name)
{
	sprite = PIXI.Sprite.fromImage("items/" + name + ".png");
	sprite.scale.x = sprite.scale.y = .5;
	sprite.anchor.x = sprite.anchor.y = -.5;
	return sprite;
}