  var fileinput1 = document.getElementById("image1");
  var fileinput2 = document.getElementById("image2");
  var fileinput3 = document.getElementById("image3");
var host_image=null;
var hide_image=null;
var extract_image=null;
var canvas1 = document.getElementById("canvas1");
var canvas2 = document.getElementById("canvas2");
var canvas3 = document.getElementById("canvas3");
var canvas4 = document.getElementById("canvas4");
var canvas5 = document.getElementById("canvas5");
var canvas6 = document.getElementById("canvas6");
var bgwidth = null;
var bgheight = null;
/*
function crop(image,width,height){
    var cropped= new SimpleImage(width,height);
    for(var p of image.values()){
        var x= p.getX();
        var y=p.getY();
        if(x<width && y<height){
            var np=cropped.getPixel(x,y);
            np.setRed(p.getRed());
            np.setGreen(p.getGreen());
            np.setBlue(p.getBlue());
        }
    }
    return cropped;
}
function cropImage(){
  imgcrop=crop(hide_image,host_image.getWidth(),host_image.getHeight());
  imgcrop.drawTo(canvas3);

}
*/
function loadHiddenImage() {
  hide_image = new SimpleImage(fileinput1);
  hide_image.drawTo(canvas1);
  var ctx1 = canvas1.getContext("2d");

  //ctx1.canvas.width = host_image.getWidth();
  //ctx1.canvas.height = host_image.getHeight();
}

function loadHostImage() {
host_image=new SimpleImage(fileinput2);
  host_image.drawTo(canvas2);


}

function imageLoaded(image) {
  if (image == null || !image.complete()) {
    alert(`image not loaded`);
    return false;
  } else {
    return true;
  }
}

function fgDimensions(){
  adjustSize();
  if (imageLoaded(hide_image)) {
      var width = hide_image.getWidth();
      var height = hide_image.getHeight();
      var size = "<"+width + "x" + height+">";
      var d = document.getElementById("fun1");
      d.innerHTML = size;
  }
   bgDimensions();

   if(width==bgwidth && height==bgheight){
     var dd1=document.getElementById("btn1");
     dd1.className="changeColor";
   }

}

function bgDimensions(){
    if (imageLoaded(host_image)) {
     bgwidth =host_image.getWidth();
       bgheight = host_image.getHeight();
      var size = "<"+bgwidth + "x" + bgheight+">";
      var d = document.getElementById("fun2");
      d.innerHTML = size;
  }
}
function adjustSize(){
    hide_image.setSize(host_image.getWidth(),host_image.getHeight());
}

function clearCanvas() {
  var context1 = canvas1.getContext("2d");
  var context2 = canvas2.getContext("2d");
  var context3 = canvas3.getContext("2d");
  context1.clearRect(0, 0, canvas1.width, canvas1.height);
  context2.clearRect(0, 0, canvas1.width, canvas2.height);
  context3.clearRect(0, 0, canvas1.width, canvas3.height);
  var dd2=document.getElementById("btn1");
  dd2.className="btn_1";
}


function clearbits(pixval){
  var x=Math.floor(pixval/16)*16;
  return x;
}
function chop2hide(image){
for(var px of image.values()){
  px.setRed(clearbits(px.getRed()));
  px.setGreen(clearbits(px.getGreen()));
  px.setBlue(clearbits(px.getBlue()));
}
return image;
}

function shiftbits(pixval){
  var x=Math.floor(pixval/16);
  return x;
}

function shifted(image){

  for(var px of image.values()){
    px.setRed(shiftbits(px.getRed()));
    px.setGreen(shiftbits(px.getGreen()));
    px.setBlue(shiftbits(px.getBlue()));
      }
      return image;
}



function combine(show,hide){
var answer=new SimpleImage(show.getWidth(),show.getHeight());
for(var px of answer.values()){
  var x=px.getX();
  var y=px.getY();
  var showPixel=show.getPixel(x,y);
  var hidePixel=hide.getPixel(x,y);
  px.setRed(showPixel.getRed() + hidePixel.getRed());
  px.setGreen(showPixel.getGreen() + hidePixel.getGreen());
  px.setBlue(showPixel.getBlue() + hidePixel.getBlue());
}
return answer;
}

function startOp(){

var start = chop2hide(host_image);
var hide = shifted(hide_image);
hide.drawTo(canvas3);
var ans = combine(start,hide);
ans.drawTo(canvas4);
}


//Extraction Section Start here
    function loadSteganoImage() {
      extract_image=new SimpleImage(fileinput3);
      extract_image.drawTo(canvas5);
    }
    function resetCanvas(){
      var context5 = canvas5.getContext("2d");
      var context6 = canvas6.getContext("2d");
      context5.clearRect(0, 0, canvas5.width, canvas5.height);
      context6.clearRect(0, 0, canvas6.width, canvas6.height);
        }

        function modbits(pixval){
          var x=Math.floor(pixval%16)*16;
          return x;
        }

        function explorebits(image){
        for(var px of image.values()){
          px.setRed(modbits(px.getRed()));
          px.setGreen(modbits(px.getGreen()));
          px.setBlue(modbits(px.getBlue()));
        }
        return image;
        }
        function extractImage(){
          var ans = explorebits(extract_image);
          ans.drawTo(canvas6);
        }
