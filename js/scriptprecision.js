//funcion que dados 2 puntos, devuelve su ecuacion de la recta mas sus limites
function obtener_ec_recta(punto1,punto2)
{
var ec_recta=new Array();//el array es de la forma [m,n,coord1,coor2]
var m,n;
var coord1=new Array();
copiar_arreglo(coord1,punto1);
var coord2=new Array();
copiar_arreglo(coord2,punto2);
//obtiene la pendiente
m = ((coord2[1]-coord1[1])/(coord2[0]-coord1[0]));
	//obtiene el coef de posicion
n = (coord2[1] - (m*coord2[0]));
ec_recta.push(m);
ec_recta.push(n);
	if(coord1[0]<coord2[0])//ordenamos en funcion del parametro x
	{
	ec_recta.push(coord1);
	ec_recta.push(coord2);
	}
	else 
	{
	ec_recta.push(coord2);
	ec_recta.push(coord1);
	}
	return ec_recta;
}


function generar_rectas(adyacentes,posiciones)
{
var rectas=new Array();
var coord1=new Array();
var coord2=new Array();

var cant_adyacentes=adyacentes.length;
var cant_sub_ady;

	for(var i=0;i<cant_adyacentes;i++)
	{
		cant_sub_ady=adyacentes[i][1].length;//guardamos el total de conexiones que tiene el adyacente actual 
		copiar_arreglo(coord1,_.find(posiciones_prueba, function(pos){ return pos[0]== adyacentes[i][0]})[1]);//guardamos la posicion del actual en coord1
		//console.log("rectas a generar:"+cant_sub_ady);
		for(var j=0;j<cant_sub_ady;j++)//iteramos para cada adyacente
		{
		copiar_arreglo(coord2,_.find(posiciones_prueba, function(pos){ return pos[0]== adyacentes[i][1][j][0]})[1]);//guardamos la posicion del j-esimo adyacente
		rectas.push(obtener_ec_recta(coord1,coord2));		
		}
	}
return rectas;
}

function distancia_punto_recta(punto, recta)
{

var m_recta=recta[0];
var n_recta=recta[1];
var distancia;

distancia=Math.abs(m_recta*punto[0]-punto[1]+n_recta)/Math.sqrt(m_recta*m_recta+1);

}

function distancia_punto_punto(punto1,punto2)
{
var distancia;
distancia=Math.sqrt(Math.pow(punto1[0]-punto2[0],2)+Math.pow(punto1[1]-punto2[1],2));
return distancia;
}


function proyeccion_punto_recta(punto, recta1)
{

var recta_aux=[];//Se usa para guardar la pendiente y el coef de posición de la nueva recta que pasa por el punto y es perpendicular con la recta1
var punto2=[];

//console.log("recta1: Pendiente:"+recta1[0]+", Coef. Pos:"+recta1[1]);
recta_aux[0]=(-1)/recta1[0];
recta_aux[1]=punto[1]+(punto[0]/recta1[0]);

//Calculamos la interseccion de las rectas y lo guardamos en el punto2
punto2[0]=(recta1[1]-recta_aux[1])/(recta_aux[0]-recta1[0]);
punto2[1]=((recta1[1]*recta_aux[0])-(recta_aux[1]*recta1[0]))/(recta_aux[0]-recta1[0]);
//console.log("Para el punto:");
//console.log(punto);
//console.log("Sobre la recta");
//console.log(recta1);
//console.log("La proyeccion es:");
//console.log(punto2);
return(punto2)
}

//determina si una coordenada esta dentro de un radio
function pertenece_radio(punto,punto_centro,radio)
{
if (distancia_punto_punto(punto,punto_centro)<radio)
	return true;
else return false;
}

//necesito conocer el piso de cada nodo
function ajustar_punto(punto,piso,grafo,posiciones)
{
var sub_grafo=grafo;//guardar en subgrafo el grafo correspondiente despues
var posiciones_radio=posiciones;//guardar en posiciones_radio el posiciones correspondiente a los puntos de camino que corresponda

var coord=new Array();
var coord_minimo=new Array();
var distancia_minima=999999;
var distancia;
var rectas=new Array();
rectas=generar_rectas(sub_grafo,posiciones);
var tam_rectas=rectas.length;
var tam_posiciones=posiciones_radio.length;
	console.log(rectas);
	//comparamos la distancia del punto a cada recta del plano
	for(var i=0;i<tam_rectas;i++)
	{
	coord=proyeccion_punto_recta(punto,rectas[i]);//guardamos la proyeccion del punto sobre la recta
	//console.log("si "+coord[0]+">="+rectas[i][2][0]+" && "+coord[0]+"<="+rectas[i][3][0]);
	if(coord[0]>=rectas[i][2][0] && coord[0]<=rectas[i][3][0])//vemos si la proyeccion esta dentro de los limites de la recta
		{
		//console.log("ENTRE IF coordenadas!!!");
		distancia=distancia_punto_punto(punto,coord);//guardamos la distancia entre el punto y la proyeccion
			if(distancia_minima>distancia)//si la distancia al punto es menor que la distancia minima anterior reemplaza la distancia minima y guarda la proyeccion
			{
			//console.log("ENTRE IF DISTANCIA!!!");
			distancia_minima=distancia;
			coord_minimo[0]=coord[0];
			coord_minimo[1]=coord[1];
			}
		}
	}
	
	//comparamos cada radio
	for(var i=0;i<tam_posiciones;i++)
	{
		if(pertenece_radio(punto,posiciones_radio[i][1],1))//Aqui modificamos el radio, que por ahora es fijo
		{
		coord_minimo[0]=posiciones_radio[i][1][0];
		coord_minimo[1]=posiciones_radio[i][1][1];
		}
	}
	return coord_minimo;
}
