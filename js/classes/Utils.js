function dump(arr,level) {
  var dumped_text = "";
  if(!level) level = 0;

  //The padding given at the beginning of the line.
  var level_padding = "";
  for(var j=0;j<level+1;j++) level_padding += "    ";

  if(typeof(arr) == 'object') { //Array/Hashes/Objects
    for(var item in arr) {
      var value = arr[item];

      if(typeof(value) == 'object') { //If it is an array,
        dumped_text += level_padding + "'" + item + "' ...\n";
        dumped_text += dump(value,level+1);
      } else {
        dumped_text += level_padding + "'" + item + "' => \"" + value + "\"\n";
      }
    }
  } else { //Stings/Chars/Numbers etc.
    dumped_text = "===>"+arr+"<===("+typeof(arr)+")";
  }
  return dumped_text;
}

function fadeOut(elem, speed){
  if(!elem.style.opacity){
    elem.style.opacity = 1;
  }
  var fade = setInterval(function(){
    elem.style.opacity -= .02;
    if(elem.style.opacity < 0){
      clearInterval(fade);
      if (elem.id == "launch-screen") {
        elem.style.display = "none";
        oMenu.initialize();
      } else {
        elem.src = listFruitImages[8];
      }
    }
  }, speed / 50);
}

function fadeIn(elem, speed){
  if(!elem.style.opacity){
    elem.style.opacity = 0.01;
    elem.style.display = "block";
  }
  var fade = setInterval(function(){
    elem.style.opacity = elem.style.opacity * 1.10;
    if(elem.style.opacity > 1){
      clearInterval(fade);
    }
  }, speed / 50);
}

function translate(elem, shift, max, speed) {
  console.log(parseInt(elem.style.top.substring(0,3)), max);
  var fade = setInterval(function(){
    elem.style.top = parseInt(elem.style.top.substring(0,3)) + shift +"px";
    if(parseInt(elem.style.top.substring(0,3)) > parseInt(max.substring(0,3))){
      clearInterval(fade);
    }
   
  }, speed / 50);
}
/**************************************************************************************************
Get all elements with the className property set to "cl"
**************************************************************************************************/
document.getElementsByClassName = function(cl) {
  var retnode = [];
  var myclass = new RegExp('\\b'+cl+'\\b');
  var elem = this.getElementsByTagName('*');
  for (var i = 0; i < elem.length; i++) {
    var classes = elem[i].className;
    if (myclass.test(classes)) {
      retnode.push(elem[i]);
      }
  }
  return retnode;
};
