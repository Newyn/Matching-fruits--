function handleMouseDown(e) {

	if(e.offsetX || e.offsetY) {
        x = e.offsetX;
		y = e.offsetY;
    }
    else if(e.layerX || e.layerY){
        x = e.layerX;
		y = e.layerY;
    } 
	
	var coordsX = Math.floor(x / gemWidth); 
    var coordsY = Math.floor(y / gemHeight); 
	
	alert("Coords = "+coordsX+" - "+coordsY);
}