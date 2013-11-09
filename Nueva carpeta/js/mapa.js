// Variables varias usadas
var pagina_cargada = false; // variable que sirve para el duende para que vea cuando la pagina se cargo
var flag = true; // variable que controla la aparicion de los puntitos de ubicacion manual
var semaforo_geo = true; // variable que activa la geolocalizacion
var semaforo_rec_ubi = true; // variable para activar el recordar ubicacion
var geo=document.getElementById("geolocalizacion");
var ubicacion = new Array(); // arreglo que sirve para guardar la ubicacion manual dejada
ubicacion[0] = false;
ubicacion[1] = false;

/*
window.onload = function()
{
    pagina_cargada = true; 
}*/

function setUbicacion(x,y) //RECORDAR QUE SON 2 UBICACIONES, LA DEL USUARIO Y LA QUE DESEA RECORDAR
{
    ubicacion[0]=x;
    ubicacion[1]=y;
    //alert(ubicacion);
}

function getUbicacion() // deberia devolver la ultima ubicación
{
    return ubicacion;
}

function recordar_ubi() // funcion que se activa con el boton de georeferencia
{
    if(semaforo_rec_ubi)
    {
        semaforo_rec_ubi= false;   
    }
    else
    {
        semaforo_rec_ubi = true;
    }   
   
}

function rapha()
{/*
    if (!pagina_cargada) //if de rigor, para comprobar que no se dibuja cuando quiere la cosa, y que no dibuja cualquier cosa
    {
        return 0;
    }    */ 
    /*
    var caminos = draw.caminos;
    var zonass = draw.regiones;
    */
	///////////////////////////////////////////////////////////////////////////////////////////////////////////////
    var ancho=$("#wrap").width();
    var alto= $("#wrap").height();
    
    var foto=new Image();
    foto.src="http://www.lazarillo.cl/hito1/upload/images/uni.png"; //recordar que tienes que obtener el mapa cuando se edita de esta forma, te tiene que llegar como parametro
    var anchoimg=foto.width;
    var altoimg=foto.height;
    var caja = Raphael('wrap','100%', '100%');
    //var botones_mapa = Raphael('wrap', '5%', '20%');

    caja.setViewBox(1,1,anchoimg,altoimg, true);
/*
    var svg = document.querySelector("svg");
    svg.removeAttribute("width");
    svg.removeAttribute("height");
*/
    var cuadro = caja.rect(1, 1, anchoimg, altoimg).attr({stroke: "black", fill: 'url('+foto.src +')',"stroke-width": 1.5});
    zoom_in = caja.path("M22.646,19.307c0.96-1.583,1.523-3.435,1.524-5.421C24.169,8.093,19.478,3.401,13.688,3.399C7.897,3.401,3.204,8.093,3.204,13.885c0,5.789,4.693,10.481,10.484,10.481c1.987,0,3.839-0.563,5.422-1.523l7.128,7.127l3.535-3.537L22.646,19.307zM13.688,20.369c-3.582-0.008-6.478-2.904-6.484-6.484c0.006-3.582,2.903-6.478,6.484-6.486c3.579,0.008,6.478,2.904,6.484,6.486C20.165,17.465,17.267,20.361,13.688,20.369zM15.687,9.051h-4v2.833H8.854v4.001h2.833v2.833h4v-2.834h2.832v-3.999h-2.833V9.051z").attr({"title": "Acercarse", 'opacity': 1, fill: "hsb(.6, .75, .75)", "stroke-width": 1.5});

    zoom_out = caja.path("M22.646,19.307c0.96-1.583,1.523-3.435,1.524-5.421C24.169,8.093,19.478,3.401,13.688,3.399C7.897,3.401,3.204,8.093,3.204,13.885c0,5.789,4.693,10.481,10.484,10.481c1.987,0,3.839-0.563,5.422-1.523l7.128,7.127l3.535-3.537L22.646,19.307zM13.688,20.369c-3.582-0.008-6.478-2.904-6.484-6.484c0.006-3.582,2.903-6.478,6.484-6.486c3.579,0.008,6.478,2.904,6.484,6.486C20.165,17.465,17.267,20.361,13.688,20.369zM8.854,11.884v4.001l9.665-0.001v-3.999L8.854,11.884z").attr({"title": "Alejarse",'opacity': 1, fill: "hsb(.6, .75, .75)", "stroke-width": 1.5});
    camb_niv_izq = caja.path("M 40 60, L 10 60, L 40 42.68, Z").attr({"title": "Bajar Nivel",'opacity': 1, fill: "black", "stroke-width": 1.5});
    camb_niv_der = caja.path("M 60 60, L 90 60, L 60 42.68, Z").attr({"title": "subir Nivel",'opacity': 1, fill: "black", "stroke-width": 1.5});
    niv = caja.circle(40, 40, 10).attr({fill: "black", "stroke-width": 1.5});
    
    niv.translate(anchoimg/2 -40,altoimg-70);
    camb_niv_der.translate(anchoimg/2 - 20,altoimg-80);
    camb_niv_izq.translate(anchoimg/2 - 80,altoimg-80);

    zoom_out.translate(1,41);
    zoom_in.translate(1,1);
    zoom_in.toFront;
    zoom_out.toFront;


    //////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
        ruta_optima = caja.path(caminos).attr({stroke: "black", "stroke-width": 2});
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

window.onload = function()
{
    rapha(); 
}
