// Variables varias usadas
var pagina_cargada = false; // variable que sirve para el duende para que vea cuando la pagina se cargo
var flag = true; // variable que controla la aparicion de los puntitos de ubicacion manual
var semaforo_geo = true; // variable que activa la geolocalizacion
var semaforo_rec_ubi = true; // variable para activar el recordar ubicacion
var x=document.getElementById("geolocalizacion");
var ubicacion = new Array(); // arreglo que sirve para guardar la ubicacion manual dejada
ubicacion[0] = false;
ubicacion[1] = false;


window.onload = function()
{
    pagina_cargada = true; 
}

function setUbicacion(x,y) //RECORDAR QUE SON 2 UBICACIONES, LA DEL USUARIO Y LA QUE DESEA RECORDAR
{
    data.posicion=[x,y];
    
    //alert(ubicacion);
}

function getUbicacion() // deberia devolver la ultima ubicación
{
    return data.posicion;
}

function recordar_ubi() // funcion que se activa con el boton de georeferencia
{
    if(semaforo_rec_ubi)
    {
        semaforo_rec_ubi = false;   
    }
    else
    {
        semaforo_rec_ubi = true;
    }   
   
}


function rapha(draw)
{
    if (!pagina_cargada) //if de rigor, para comprobar que no se dibuja cuando quiere la cosa, y que no dibuja cualquier cosa
    {
        return 0;
    }
    
    var caminos = draw.caminos;
    var zonass = draw.regiones;
    
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////
        var inDetails = false;
    var container = $("#wrap");
    var ancho=$("#wrap").width();
    var alto= $("#wrap").height();
   
    var foto=new Image();
    foto.src="http://www.tractorverde.cl/Upload/images/uni.png"; //recordar que tienes que obtener el mapa cuando se edita de esta forma, te tiene que llegar como parametro
    
    var anchoimg=foto.width;
    var altoimg=foto.height;
    var caja = Raphael('wrap',anchoimg ,altoimg);
    //var botones_mapa = Raphael('wrap', '5%', '20%');
    var panZoom = caja.panzoom({ initialZoom: 3, initialPosition: { x: 0, y: 0} });
    var isHandling = false;

    panZoom.enable();
    caja.safari();

    var cuadro = caja.rect(0, 0, anchoimg, altoimg).attr({stroke: "black","stroke-width": 1.5});
    
    $("#mapContainer #up").click(function (e) { //zoom in 
        panZoom.zoomIn(1);
        e.preventDefault();
    });

    $("#mapContainer #down").click(function (e) { //zoom out
        panZoom.zoomOut(1);
        e.preventDefault();
    });
    
    $("#others #moveTopLeft").click(function (e) {
        panZoom.pan(1,1);
    });

     function handleDetails() { //ESTA FUNCION SIRVE PARA HACER CLICK, Y EL MUNDO SALDRA ADELANTE
        if (panZoom.isDragging() || isHandling) return;
        isHandling = true;
        var anim, box = this.getBBox();

        if (inDetails) {
            inDetails = false;
            panZoom.enable();
            this.hover(animateOver, animateOut);
            anim = overlay.animate({ 'fill-opacity': 0 }, 300, function () { this.toBack(); isHandling = false; });
            this.animateWith(overlay, anim, {
                transform: ""
            }, 300);
            this.attr("fill", this.data("fill"));
        }
        else {
            inDetails = true;
            panZoom.disable();
            this.unhover(animateOver, animateOut);
            overlay.toFront();
            this.toFront();

            var currPaperPosition = panZoom.getCurrentPosition();
            var currPaperZoom = panZoom.getCurrentZoom();

            var currHeight = r.height * (1 - currPaperZoom * 0.1);

            var zoomDif = (currHeight / 2) / box.height;

            var xdif = currPaperPosition.x - box.x + ((box.width * zoomDif) - box.width) / 2;
            var ydif = (currPaperPosition.y + ((currHeight / 2) - (box.height / 2))) - box.y;


            anim = overlay.animate({ 'fill-opacity': 0.7 }, 300, function () { isHandling = false; });
            this.animateWith(overlay, anim, {
                transform: "t" + xdif + "," + ydif + "s" + zoomDif
            }, 300);
        }
    }

   
    /************************************ Configuracion de los botones de zoom in, nivel y zoom out ************************************************/
  ///  CAMBIAR A DIV LOS BOTONES, ASI TODO QUEDA HERMOSO ////
    camb_niv_izq = caja.path("M 40 60, L 10 60, L 40 42.68, Z").attr({"title": "Bajar Nivel",'opacity': 1, fill: "black", "stroke-width": 1.5});
    camb_niv_der = caja.path("M 60 60, L 90 60, L 60 42.68, Z").attr({"title": "Subir Nivel",'opacity': 1, fill: "black", "stroke-width": 1.5});
    niv = caja.circle(40, 40, 10).attr({fill: "black", "stroke-width": 1.5, "title": "Nivel Actual"});
    
    niv.translate(anchoimg/2 -40,altoimg-70);
    camb_niv_der.translate(anchoimg/2 - 20,altoimg-80);
    camb_niv_izq.translate(anchoimg/2 - 80,altoimg-80);

    var bath = caja.set();
    var fath = caja.set();
    var pos = caja.set();
            
    function perfil_zona(codigo)//funcion que guarda de forma independiente cada zona del mapa
    {
        var zona = caja.path("\""+codigo+"\"");
        ubicacion.clear;
        zona.click(function(e) //reparar esto URGENTE
        {
                    
        });
        bath.push(zona);
        bath.attr({'opacity': .5, fill:"#49796b"});
                
        return ubicacion;
    }

    function perfil_caminos(codigo) //funcion que guarda de forma independiente cada camino del mapa, retorna ubicacion del visitante
    {
        var camino = caja.path("\""+codigo+"\"");
        camino.attr({'opacity': .5, fill:"#5f9ea0"});

        camino.click(function(e)
        {
                   
        });

        fath.push(camino);
        
    }

    function dibujar_camino(arreglo, x_visitante, y_visitante) // Esta funcion dibuja el camino optimo. Se le entrega un arreglo con los nodos a visitar, la posicion x y la posicion y del visitante. Esta funcion retorna la ubicacion del visitante.
    {
        arreglo.unshift([x_visitante,y_visitante]);
        var caminos = [];
        var modo = "M";
        for(var i=0;i<arreglo.length;i++)
        {
            if(i==1)
                 modo = "L"; // El primero es M, el resto son L.
            caminos.push([modo, arreglo[i][0], arreglo[i][1]]); // va agregando cada coordenada al path, cuando termine, tendrá el path de todo el camino
        }
        ruta_optima = caja.path(caminos).attr({stroke: "#c0cd29", "stroke-width": 9, 'fill-opacity': 0.5});
        ruta_optima.click(function(){
        ruta_optima.remove(); // remueve todo
        });
    }


    cuadro.click(function(e) // esta funcion muesta un circulo verde de acuerdo a la posicion donde se haga click
    {
        if(semaforo_rec_ubi)
        {
            var x=e.clientX -document.getElementById("wrap").offsetLeft
            var y=e.clientY -document.getElementById("wrap").offsetTop;
            if(!flag)
            {
                posicion.remove();
                flag=true;
            }

            if(flag)
            {
                posicion = caja.circle(x,y,5).attr({fill: "green"});
                flag = false;
            }
            setUbicacion(x,y);
        }

    });
          

    function mostrar_caminos(caminos)
    {
        for (var i=0; i< caminos.length; i++) //de esta forma se muestran llos caminos
        {
            perfil_caminos(caminos[i]);
            bath.toFront;
        }
    }

    function mostrar_zonas(zonas)
    {
        for (var i=0; i< zonas.length; i++) //de esta forma se muestran llos caminos
        {
            perfil_zona(zonas[i]);
            bath.toFront;
        }
    }


    cuadro.attr({fill: 'url('+foto.src +')'});
    caja.setViewBox(0,0,anchoimg,altoimg, true); 
    mostrar_zonas(zonass);
    mostrar_caminos(caminos);

}

function obtener_geo() // funcion que se activa con el boton de georeferencia
{
    if(semaforo_geo)
    {
        if (navigator.geolocation)
        {
            setTimeout("navigator.geolocation.getCurrentPosition(mostrar, fallo)"); //Llamar a la funcion 1 vez
            semaforo_geo= false;
        }    
    }
    else
    {
        semaforo_geo = true;
    }   
   
}

var x=document.getElementById("geolocalizacion");

function fallo() //esta funcion se usa para decir que el browser no soporta la geolocalizacion 
{
    x.innerHTML="El navegador no soporta la API de geolocalizacion";
}

 
function mostrar(posicion) //esta funcion obtiene la geolocalizacón, esta sacada del prototipo 2, por lo que demas necesita modificaciones
{
    latitud=posicion.coords.latitude%1; //Trabajar con decimales para obtener minutos y segundos
    longitud=posicion.coords.longitude%1;
         
    console.log("Latitud: " + posicion.coords.latitude + "\nLongitud: " + posicion.coords.longitude);

    segundosLatitud = ((latitud*60)%1)*60; //Transformar a segundos
    segundosLongitud = ((longitud*60)%1)*60; 

    console.log("segundosLatitud" +segundosLatitud + " , segundosLongitud" + segundosLongitud);

    ejeX=segundosLongitud - (-14.02320000002419); //desplazar icono en eje x
    ejeY=(-21.667199999988043) - segundosLatitud; //desplazar icono eje y
    console.log(ejeX + "  "+ejeY);

    posicionLatitud=((ejeX)/(10.02320000002419/661)-12)+"px"; //Conversion entre segundos y pixeles de la imagen
    posicionLongitud=((ejeY)/(9.3328/602)-40)+"px";
/*
    icono.style.left=posicionLatitud; //cambiar posicion segun nuevas coordenadas
    icono.style.top=posicionLongitud; */
}
/*
window.onload = function()
{
    rapha(); 
}*/
