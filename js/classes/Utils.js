/**************************************************************************************************
Function : dump()
 * Arguments: The data - array,hash(associative array),object
 *    The level - OPTIONAL
 * Returns  : The textual representation of the array.
 * This function was inspired by the print_r function of PHP.
 * This will accept some data as the argument and return a
 * text that will be a more readable version of the
 * array/hash/object that is given.
 * Docs: http://www.openjs.com/scripts/others/dump_function_php_print_r.php
**************************************************************************************************/
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

/**************************************************************************************************
Fade out effect
**************************************************************************************************/
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

/**************************************************************************************************
Fade in effect
**************************************************************************************************/
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

/**************************************************************************************************
Translate bottom or top an element
**************************************************************************************************/
function translate(elem, shift, speed) {
  oGame.state = "fall";

  var row = parseInt(elem.id.substring(5,6));
  var height = document.getElementById("fruit"+elem.id.substring(5,6)+"_"+elem.id.substring(7,8)).height;
  var top = parseInt(elem.style.top.replace("px", ""));
  var max = row * parseInt(height);
  
  if (top != max) {
    if (top < max) {
      var fade = setInterval(function(){
        elem.style.top = top + shift +"px";
        top = parseInt(elem.style.top.replace("px", ""));
        if(top > max) {
          elem.style.top = max +"px";
          clearInterval(fade);  
          oGame.state = "";
        }
      }, speed / 50);
    } else {
      var fade = setInterval(function(){
        elem.style.top = top - shift +"px";
        top = parseInt(elem.style.top.replace("px", ""));
        if (top < max) {
          elem.style.top = max +"px";
          clearInterval(fade);  
          oGame.state = "";
        }
      }, speed / 50);
    }
  }
}

/**************************************************************************************************
Translate left or right an element
**************************************************************************************************/
function translateX(elem, shift, speed) {
  oGame.state = "fall";

  var col = parseInt(elem.id.substring(7,8));
  var width = document.getElementById("fruit"+elem.id.substring(5,6)+"_"+elem.id.substring(7,8)).width;
  var left = parseInt(elem.style.left.replace("px", ""));
  var max = col * parseInt(width);
  
  if (left != max) {
    if (left < max) {
      var fade = setInterval(function(){
        elem.style.left = left + shift +"px";
        left = parseInt(elem.style.left.replace("px", ""));
        if(left > max) {
          elem.style.left = max +"px";
          clearInterval(fade);  
          oGame.state = "";
        }
      }, speed / 50);
    } else {
      var fade = setInterval(function(){
        elem.style.left = left - shift +"px";
        left = parseInt(elem.style.left.replace("px", ""));
        if (left < max) {
          elem.style.left = max +"px";
          clearInterval(fade);  
          oGame.state = "";
        }
      }, speed / 50);
    }
  }
}

function getFruit(row, col) {
  return document.getElementById('fruit' + row + '_' + col);
};

function isDestroyed(fruit) {
  return (fruit && fruit.src.indexOf("destroy.png") != -1);
};
