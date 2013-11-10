//////////////////////////////////////////////////////////////////////////////////////////////////
//	FUNCION(PRINCIPAL):	entrega la ruta a seguir, si se desea respetar el orden o si se desea 	//
//						el recorrido optimo														//
//	ENTRADAS:	nombre:	respeta_orden															//
//						tipo:numerico															//
//						Forma: id_nodo															//
//						Descripcion: Es el id del nodo del cual queremos obtener su lista de  	//
//						adyacencia.																//
//				nombre:	ruta																	//
//						tipo:Arreglo															//
//						Forma:[id_nodo1,...id_nodon]											//
//						Descripcion:Guarda todos los id de los nodos que se desean visitar		//
//				nombre:	adyacentes_actual														//
//						tipo:Arreglo															//
//						Forma: [id_nodo,[[id_ady_1,pesos],...[id_ady_n,peso]]]					//
//						Descripcion: Representa la posición actual del usuario, y los nodos 	//
//						adyacentes a su posición, no va	en la lista de nodos.					//
//				nombre:	grafo																	//
//						tipo:Arreglo															//
//						Forma:[[id_nodo_1,[[id_ady_1,pesos],...[id_ady_n,peso]]]				//
//								.																//
//								.																//
//								.																//
//							   [id_nodo_n,[[id_ady_1,pesos],...[id_ady_n,peso]]]]				//
//						Descripcion:Representacion del grafo mediante listas de adyacencia		//
//////////////////////////////////////////////////////////////////////////////////////////////////
function obtener_ruta(respeta_orden,ruta,adyacentes_actual,grafo)
{
if(respeta_orden==1)
	return ruta_estricta(adyacentes_actual,ruta,grafo);
	else if(respeta_orden==0)
		return ruta_optima(adyacentes_actual,ruta,grafo);
		else return -1;
}

//////////////////////////////////////////////////////////////////////////////////////////////////
//	FUNCION(PRINCIPAL): Calcula la ruta a seguir para visitar todos los nodos					//
//						visitando el mas cercano primero.										//
//	ENTRADAS:	nombre:	adyacentes_actual														//
//						tipo:Arreglo															//
//						Forma: [id_nodo,[[id_ady_1,pesos],...[id_ady_n,peso]]]					//
//						Descripcion: Representa la posición actual del usuario, y los nodos 	//
//						adyacentes a su posición, no va	en la lista de nodos.					//
//				nombre:	nodos																	//
//						tipo:Arreglo															//
//						Forma: [id_nodo1,id_nodo2,....,id_nodon]								//
//						Descripcion:Lista de nodos por los cuales se desea pasar.				//
//				nombre:	grafo																	//
//						tipo:Arreglo															//
//						Forma:[[id_nodo_1,[[id_ady_1,pesos],...[id_ady_n,peso]]]				//
//								.																//
//								.																//
//								.																//
//							   [id_nodo_n,[[id_ady_1,pesos],...[id_ady_n,peso]]]]				//
//						Descripcion:Representacion del grafo mediante listas de adyacencia		//
//////////////////////////////////////////////////////////////////////////////////////////////////
function ruta_optima(adyacentes_actual,nodos,grafo)
{
var caminos=new Array();
var adyacentes=new Array();
var ruta=new Array();
ruta[0]=adyacentes_actual[0];//guardamos el id_actual en la primera posicion de la ruta
caminos=caminos=dijkstra(grafo,adyacentes_actual);//calculamos los caminos y los nodos para llegar al actual
	
	while(nodos.length>0)
	{
	unir_rutas(ruta,mas_cercano(nodos,caminos)[2]);//ubicamos el mas cercano y guardamos la ruta
	caminos.length = 0;//vaciamos el arreglo
	copiar_arreglo(adyacentes,lista_adyacentes(ruta[ruta.length-1],grafo));
	caminos=caminos=dijkstra(grafo,adyacentes);
	}
return ruta;
}

//////////////////////////////////////////////////////////////////////////////////////////////////
//	FUNCION(PRINCIPAL): Calcula la ruta a seguir para visitar todos los nodos					//
//						respetando orden.														//
//	ENTRADAS:	nombre:	adyacentes_actual														//
//						tipo:Arreglo															//
//						Forma: [id_nodo,[[id_ady_1,pesos],...[id_ady_n,peso]]]					//
//						Descripcion: Representa la posición actual del usuario, y los nodos 	//
//						adyacentes a su posición, no va	en la lista de nodos.					//
//				nombre:	nodos																	//
//						tipo:Arreglo															//
//						Forma: [id_nodo1,id_nodo2,....,id_nodon]								//
//						Descripcion:Lista de nodos por los cuales se desea pasar.				//
//				nombre:	grafo																	//
//						tipo:Arreglo															//
//						Forma:[[id_nodo_1,[[id_ady_1,pesos],...[id_ady_n,peso]]]				//
//								.																//
//								.																//
//								.																//
//							   [id_nodo_n,[[id_ady_1,pesos],...[id_ady_n,peso]]]]				//
//						Descripcion:Representacion del grafo mediante listas de adyacencia		//
//////////////////////////////////////////////////////////////////////////////////////////////////
function ruta_estricta(adyacentes_actual,nodos,grafo)
{
var lista_ady_actual=new Array();
var ruta=new Array();//arreglo para guardar la ruta a seguir
var caminos=new Array();//arreglo para guardar los caminos al actual
var tam=nodos.length-1;
	
	caminos=dijkstra(grafo,adyacentes_actual);//calculamos los caminos y los nodos para llegar al actual
	copiar_arreglo(ruta,caminos[posicion_camino_dijkstra(nodos[0],caminos)][2]);//guardamos la ruta desde el actual al primer elemento
	console.log("GUARDE EL PRIMERO");
	for(var i=0;i<tam;i++)
	{
	lista_ady_actual=lista_adyacentes(nodos[i],grafo);//guardamos la lista de adyacentes al actual
	caminos=dijkstra(grafo,lista_ady_actual);//calculamos los caminos y los nodos para llegar al actual
	unir_rutas(ruta,caminos[posicion_camino_dijkstra(nodos[i+1],caminos)][2]);//encolamos las rutas
	}
	return ruta;
}

//distancia punto punto
function distancia_punto_punto(punto1,punto2)
{
var distancia;

distancia=Math.sqrt((punto1[0]-punto2[0])*(punto1[0]-punto2[0])+(punto1[1]-punto2[1])*(punto1[1]-punto2[1])); 

return distancia;
}

//Obtiene la posición adyacente del nodo actual
function adyacente_actual(coordenadas)
{
var distancia=99999999;
var aux;
var id;
var posicion_nodos=data.obtener_posicion_nodos();//arreglo con los id y las coordenadas de cada nodo
var tam=posicion_nodos.length;
var lista;
	for(var i=0;i<tam;i++)
	{
	aux=distancia_punto_punto(coordenadas,posicion_nodos[i][1]);
		if(aux<distancia)
		{
		distancia=aux;
		id=posicion_nodos[i][0];//guardamos el id cuando se reemplaza
		}	
	}
	lista=[-1,[[id,0]]];
	return lista;
}

//////////////////////////////////////////////////////////////////////////////////////////////////
//	FUNCION(AUXILIAR): 	dado un id_nodo, retorna la lista de adyacentes a ese.					//
//	ENTRADAS:	nombre:	id_nodo																	//
//						tipo:numerico															//
//						Forma: id_nodo															//
//						Descripcion: Es el id del nodo del cual queremos obtener su lista de  	//
//						adyacencia.																//
//				nombre:	grafo																	//
//						tipo:Arreglo															//
//						Forma:[[id_nodo_1,[[id_ady_1,pesos],...[id_ady_n,peso]]]				//
//								.																//
//								.																//
//								.																//
//							   [id_nodo_n,[[id_ady_1,pesos],...[id_ady_n,peso]]]]				//
//						Descripcion:Representacion del grafo mediante listas de adyacencia		//
//////////////////////////////////////////////////////////////////////////////////////////////////
function lista_adyacentes(id_nodo, grafo)
{
var lista=new Array();
var tam=grafo.length;
	for(var i=0;i<tam;i++)
	{
		if(id_nodo==grafo[i][0])
		{
		copiar_arreglo(lista,grafo[i]);
		return lista;
		}
	}
	console.log("arroje error");
}

//////////////////////////////////////////////////////////////////////////////////////////////////
//	FUNCION(AUXILIAR): 	Determina la posicion en el arreglo caminos de un id especifico			//
//	ENTRADAS:	nombre:	id_nodo																	//
//						tipo:numerico															//
//						Forma: id_nodo															//
//						Descripcion: Es el id del nodo del cual queremos obtener su lista de  	//
//						adyacencia.																//
//				nombre:	caminos																	//
//						tipo:Arreglo															//
//						Forma:[[validador,peso_camino,[id_nodo1,...id_nodon]]					//
//								.																//
//								.																//
//								.																//
//							   [validador,peso_camino,[id_nodo1,...id_nodon]]]					//
//						Descripcion:Guarda todos los caminos desde un nodo especifico			//
//////////////////////////////////////////////////////////////////////////////////////////////////
function posicion_camino_dijkstra(id_nodo, caminos)
{
var tam=caminos.length;
	for(var i=0;i<tam;i++)
	{
		if(id_nodo==caminos[i][2][caminos[i][2].length-1])
		{
		return i;
		}
	}
return -1;//retorna -1 en caso de que lo no encuentre(USAR PARA VALIDAR DESPUES)
}


//////////////////////////////////////////////////////////////////////////////////////////////////
//	FUNCION(AUXILIAR): 	une dos rutas que tengan igual el final(ruta1) y el inicial(ruta2)		//
//	ENTRADAS:	nombre:	ruta1																	//
//						tipo:Arreglo															//
//						Forma: [id_nodo1,id_nodo2,....,id_nodon]								//
//						Descripcion:Lista de nodos que representan la ruta1						//
//				nombre:	ruta2																	//
//						tipo:Arreglo															//
//						Forma: [id_nodo1,id_nodo2,....,id_nodon]								//
//						Descripcion:Lista de nodos que representan la ruta2						//
//////////////////////////////////////////////////////////////////////////////////////////////////
function unir_rutas(ruta1,ruta2)
{
var inicio=ruta1.length - 1;
var tam=inicio+ruta2.length;//

	for(var i=inicio;i<tam;i++)
	{
	ruta1[i]=ruta2[i-inicio];
	}
}

//////////////////////////////////////////////////////////////////////////////////////////////////
//	FUNCION(AUXILIAR): 	Copia en arreglo1 el arreglo 2											//
//	ENTRADAS:	nombre:	arreglo1																//
//						tipo:Arreglo															//
//						Forma: [elemento1,elemento2,....,elementon]								//
//						Descripcion:Arreglo cualquiera											//
//				nombre:	arreglo2																//
//						tipo:Arreglo															//
//						Forma: [elemento1,elemento2,....,elementon]								//
//						Descripcion:arreglo cualquiera											//
//////////////////////////////////////////////////////////////////////////////////////////////////
function copiar_arreglo(arreglo1,arreglo2)
{
var tam=arreglo2.length;

	for(var i=0;i<tam;i++)
	{
	arreglo1[i]=arreglo2[i];
	}
	return;
}

//Determina cual es el nodo mas cercano y retorna el id_nodo, el peso, el camino y modifica por referencia los pendientes
function mas_cercano(pendientes, caminos)
{
//inicializamos las variables usadas
var camino_nodo=new Array();//[id_nodo,peso,[Camino]];
camino_nodo[2]=new Array();//Aqui guardamos el camino para llegar al menor
var tam=pendientes.length;//variable para controlar el numero de iteraciones
var aux;
var id_menor_actual=pendientes[0];
var indice=0;
var pos_menor_actual=posicion_camino_dijkstra(pendientes[0],caminos);//
//console.log("El menor es "+id_menor_actual+"y esta en la posicion "+pos_menor_actual);
var peso_menor_actual=caminos[pos_menor_actual][1];//Inicializamos con el peso del primero a evaluar
	//console.log("entro al for???"+tam);
	for(var i=1;i<tam;i++)
	{
	//console.log("si entro al for siquiera");
	aux=posicion_camino_dijkstra(pendientes[i],caminos);//determinamos la posicion del camino al elemento por el que queremos pasar
		if(peso_menor_actual>caminos[aux][1])//si el peso es mayor
		{
		//console.log("entre aqui :D");
		id_menor_actual=pendientes[i];//guardamos el id del menor actual
		indice=i;
		peso_menor_actual=caminos[aux][1];//guardamos el peso del menor actual
		pos_menor_actual=aux;//guardamos la posicion del elemento en el arreglo caminos
		}
	}
	//console.log("ya termine :D");
	camino_nodo[0]=id_menor_actual;
	camino_nodo[1]=peso_menor_actual;
	//copiamos el camino correspondiente en el camino_nodo[2]
	aux=caminos[pos_menor_actual][2].length;
	pendientes.splice(indice, 1);//quitamos el elemento de la lista de pendientes
	for(var i=0;i<aux;i++)
	{
	camino_nodo[2][i]=caminos[pos_menor_actual][2][i];
	}
	
return camino_nodo;	
}

function dijkstra(listas_adyacencia,lista_actual)
{
//console.log("El adyacente actual es:");
//console.log(lista_actual);
//console.log("El grafo actual es:");
//console.log(listas_adyacencia);
var caminos=new Array();//arreglo en que guardaremos todos los caminos para llegar a cada nodo
var vector_pesos=new Array();//Vector auxiliar para revisar los caminos
var tam=listas_adyacencia.length;//guardamos la cantidad de nodos que compararemos
var tam2=lista_actual[1].length;
var pos_actual,aux;
	
//inicializamos el arreglo caminos en cuestion
	for(var i=0;i<tam;i++)
	{	
		caminos[i]=new Array();
		caminos[i][0]=0;//Validador usado para decir si se marco el nodo "No marcado"=0, "Marcado"=1
		caminos[i][1]=99999;//seteamos como 99999 por defecto, indica que no esta conectado directamente
		caminos[i][2]=new Array();//Se crea el arreglo para guardar la lista de nodos del camino
		caminos[i][2][0]=lista_actual[0];//Se indica que se parte desde el nodo actual
		caminos[i][2][1]=listas_adyacencia[i][0];
		
		for(var j=0;j<tam2;j++)//recorremos todas las conexiones con el nodo actual
		{
		if(lista_actual[1][j][0]==listas_adyacencia[i][0])//revisamos cada nodo adyacente al actual y guardamos los costos de ir desde el actual dicho nodo
			{
			caminos[i][1]=lista_actual[1][j][1];
			}
		}
		vector_pesos[i]=caminos[i][1];//inicializamos vector_pesos usado para las iteraciones
	}
	
	
	for(var l=0;l<tam;l++)
	{
			//console.log("Iteracion "+l);
		aux=99999;//variable auxiliar usada para guardar el peso menor
		for(var i=0;i<tam;i++)//identificamos la posicion del menor
			{
				//console.log(vector_pesos[i]+"<"+aux+" && "+caminos[i][0]+"(caminos["+i+"][0])==0");
				//console.log("caminos={"+caminos[0][0]+","+caminos[1][0]+","+caminos[2][0]+","+caminos[3][0]+","+caminos[4][0]+"}");
				//console.log(caminos[1][0]);
				if((vector_pesos[i]<aux) && (caminos[i][0]==0))//si encontramos un peso menor y este no esta marcado
				{
				//console.log("El elememto "+i+" es menor que el actual y es "+vector_pesos[i]);
				aux=vector_pesos[i];
				pos_actual=i;//guardamos la posicion del menor
				}
			}
			//console.log("La posicion actual es "+pos_actual);
			//imprimir_vector(vector_pesos);	
			tam2=(listas_adyacencia[pos_actual][1]).length;//guardamos la cantidad de conexiones adyacentes al nodo por el que pasaremos 
		
		for(var k=0;k<tam2;k++)//recorremos para cada uno de los adyacentes y actualizamos el peso si este es menor que el existente
		{
			//console.log("Conexion "+k);
			for(var j=0;j<tam;j++)//iteramos para pasar por todos los nodos
			{
				//console.log(l+"-"+j+"Nodo actual:"+listas_adyacencia[pos_actual][0]+" Nodo j-esimo:"+listas_adyacencia[j][0]);
				if(listas_adyacencia[j][0]==listas_adyacencia[pos_actual][1][k][0])//si estamos comparando un elemento adyacente al actual
				{
					//console.log(l+"-"+j+"Nodo actual:"+listas_adyacencia[pos_actual][0]+" se compara con el nodo:"+listas_adyacencia[j][0]);
					//console.log(vector_pesos[j]+">"+listas_adyacencia[pos_actual][1][k][1]+"+"+vector_pesos[pos_actual]);
					if(vector_pesos[j]>(listas_adyacencia[pos_actual][1][k][1]+vector_pesos[pos_actual]))//si el peso pasando por el nodo actual es menor que el peso en vector_pesos
					{
					vector_pesos[j]=listas_adyacencia[pos_actual][1][k][1]+vector_pesos[pos_actual];//actualizamos el peso menor
					//imprimir_vector(caminos[j][2]);
					caminos[j][1]=vector_pesos[j];
					aux=caminos[j][2][caminos[j][2].length-1];//guardamos el ultimo elemento del camino
					for(i=0;i<caminos[pos_actual][2].length;i++)					
						caminos[j][2][i]=caminos[pos_actual][2][i];//guardamos el camino al actual
					//imprimir_vector(caminos[j][2]);
					caminos[j][2][caminos[j][2].length]=aux;//ampliamos en 1 el tamaño del arreglo
					//imprimir_vector(caminos[j][2]);
					}
				}
				//console.log("LLEGUE AQUI ITERACION Nro "+j);
			}
		}
		caminos[pos_actual][0]=1;//marcamos que ya pasamos por el menor
	}
		return (caminos);
}

//////////////////////////////////////////////////////////////////////////////////////////////////
//	FUNCION(AUXILIAR): 	Imprime un vector por pantalla											//
//	ENTRADAS:	nombre:	Vector																	//
//						tipo:Arreglo															//
//						Forma: [elemento1,elemento2,....,elementon]								//
//						Descripcion:Arreglo cualquiera											//
//////////////////////////////////////////////////////////////////////////////////////////////////
function imprimir_vector(vector)
{
var tam=vector.length;
var texto;

texto="Vector[TAM:"+tam+"]={";
	for(var i=0;i<tam-1;i++)
	{
		texto=texto+vector[i]+",";
	}
texto=texto+vector[i]+"}";

console.log(texto);
}

//*****retorna el id del nodo mas cercano a las coordenadas señaladas
function nodo_distancia_menor(coord,grafo_posiciones)
{
var tam=grafo.length;
var id_nodo=grafo_posiciones[0][0];//guardamos el id del primer elemento del grafo
var menor=distancia_punto_punto(grafo_posiciones[0][1],coord);//guardamos la distancia del punto actual al primer elemento del grafo
var aux;
	for(var i=1; i<tam; i++)
	{
	aux=distancia_punto_punto(grafo_posiciones[i][1],coord);//guardamos la distancia del punto actual al i-esimo elemento del grafo
		if(aux<menor)
			{
			menor=aux;
			id_nodo=grafo_posiciones[i][0];//guardamos el id del i-esimo elemento del grafo
			}	
	}
	return id_nodo;
}
//*****Grafo auxiliar que incluye el pi
function grafo_pi(grafo,grafo_posiciones,coord)
{
var id_nodo=nodo_distancia_menor(coord,grafo_posiciones);//guardamos el id del nodo mas cercando al pi
var tam=grafo.length;
var subtam;//variable usada para copiar las listas de adyacencia
var grafo_aux=new Array();

	for(var i=0;i<tam;i++)
	{
	grafo_aux[i]=new Array();
	grafo_aux[i][0]=grafo[i][0];//guardamos el id actual
	subtam=grafo[i][1].length;//guardamos la cantidad de adyacentes
	grafo_aux[i][1]=new Array();
		for(var j=0;i<subtam;j++)//copiamos todos los adyacentes al nodo actual
		{
		grafo_aux[i][1][j]=new Array();
		copiar_arreglo(grafo_aux[i][1][j],grafo[i][1][j]);//copiamos el j-esimo adyacente al i-esimo adyacente del grafo
		}
		if(id_nodo==grafo_aux[i][0])//si este es el nodo adyacente mas cercando a la posicion 
			{
			grafo_aux[i][1][grafo_aux[i][1].length][0]=-2;//ID del punto ingresado por el usuario, es generico
			grafo_aux[i][1][grafo_aux[i][1].length][1]=0;//Peso para ir del nodo al punto ingresado por el usuario, no es relevante
			}
	}
	return grafo_aux;
}
//****retorna la distancia entre 2 puntos

function distancia_punto_punto(coord1,coord2)
{
return Math.sqrt(Math.pow(coord1[0]-coord2[0])+Math.pow(coord1[1]-coord2[1]));
}

//****Retorna la ruta al estacionamiento (sin parsear
function volver_estacionamiento(coord_punto,adyacentes_actual,grafo,grafo_posiciones)
{
var id=nodo_distancia_menor(coord_punto,grafo_posiciones);
	return obtener_ruta(1,[id],adyacentes_actual,grafo_pi(grafo,grafo_posiciones,coord_punto));
}