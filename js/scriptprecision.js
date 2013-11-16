

//funcion que dados 2 puntos, devuelve su ecuacion de la recta mas sus limites
function obtener_ec_recta(coord1,coord2)
{
var ec_recta=new Array();//el array es de la forma [m,n,coord1,coor2]
var m,n;

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
		console.log("Cuanto vale???"+cant_sub_ady);
		for(var j=0;j<cant_sub_ady;j++)//iteramos para cada adyacente
		{
		copiar_arreglo(coord2,_.find(posiciones_prueba, function(pos){ return pos[0]== adyacentes[i][1][j][0]})[1]);//guardamos la posicion del j-esimo adyacente
		console.log(coord1);
		console.log(coord2);
		rectas.push(obtener_ec_recta(coord1,coord2));		
		}
	}
return rectas;
}

function distancia_punto_recta(punto. recta)
{

var m_recta=recta[0];
var n_recta=recta[1];
var distancia;

distancia=Math.abs(m_recta*punto[0]-punto[1]+n_recta)/Math.sqrt(m_recta*m_recta+1);

}


function proyeccion_punto_recta(punto, recta1)
{

var recta1=[];
var recta_aux=[];//Se usa para guardar la pendiente y el coef de posición de la nueva recta que pasa por el punto y es perpendicular con la recta1
var punto=[];//(x,y)
var punto2=[];
//inicializamos los valores de recta1
recta1[0]=1;//pendiente
recta1[1]=0;//coef. de posición

//inicializamos los valores del punto
punto[0]=0;
punto[1]=2;
document.write("Llegue aqui3 :D");
recta_aux[0]=(-1)/recta1[0];
recta_aux[1]=punto[1]+(punto[0]/recta1[0]);
document.write("Llegue aqui :D");

//Calculamos la interseccion de las rectas y lo guardamos en el punto2
punto2[0]=(recta1[1]-recta_aux[1])/(recta_aux[0]-recta1[0]);
punto2[1]=((recta1[1]*recta_aux[0])-(recta_aux[1]*recta1[0]))/(recta_aux[0]-recta1[0]);

document.write("El nuevo punto es ("+punto2[0]+","+punto2[1]+")");

}
