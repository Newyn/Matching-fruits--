function Gem(img, x, y) {
	this.img = img;
	this.x = x;
	this.y = y;
}

Gem.prototype.draw = function() {
	ctx.drawImage(this.img, this.x, this.y, this.img.width, this.img.height);
}