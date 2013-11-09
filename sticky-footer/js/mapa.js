function rapha()
{      
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    var ancho=$(".wrap").width();
    var alto= $(".wrap").height();
    
    var foto=new Image();
    foto.src="http://www.lazarillo.cl/hito1/upload/images/uni.png"; //recordar que tienes que obtener el mapa cuando se edita de esta forma, te tiene que llegar como parametro
    var anchoimg=foto.width;
    var altoimg=foto.height;
    var caja = Raphael('wrap','100%', '90%');

    caja.setViewBox(1,1,anchoimg,altoimg, true);
/*
    var svg = document.querySelector("svg");
    svg.removeAttribute("width");
    svg.removeAttribute("height");
*/
    var cuadro = caja.rect(1, 1, anchoimg, altoimg).attr({stroke: "black", fill: 'url('+foto.src +')',"stroke-width": 1.5});
    //////////////////////////////////////////////////////////////////////////////////////////////////////////////
}


window.onload = function()
        {
            rapha(); 
        }
