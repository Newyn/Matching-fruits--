function Gem(img, x, y) {
	this.img = img;
	this.x = x;
	this.y = y;
	this.onClick = function() {
		alert("a");
	}
}

Gem.prototype.draw = function() {
	ctx.drawImage(this.img, this.x, this.y, this.img.width, this.img.height);
}

/*Gem.prototype.onClick = function() {
	alert("a");
}*/