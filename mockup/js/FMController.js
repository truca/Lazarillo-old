function RutasCtrl($scope){

    data.nodos['adyacencia'] = [
                                [1 , [ [3 ,5], [2 ,1] ]],
                                [2 , [ [4 ,4], [3 ,2] ]],
                                [3 , [ [6 ,6], [4 ,4] ]],
                                [4 , [ [10,3], [5 ,2] ]],
                                [5 , [ [8 ,6], [6 ,3] ]],
                                [6 , [ [2 ,4], [7 ,4] ]],
                                [7 , [ [5 ,5], [8 ,1] ]],
                                [8 , [ [3 ,7], [9 ,1] ]],
                                [9 , [ [7 ,2], [10,4] ]],
                                [10, [ [2 ,3], [11,3] ]],
                                [11, [ [14,4], [12,2] ]],
                                [12, [ [5 ,1], [13,4] ]],
                                [13, [ [9 ,6], [14,4] ]],
                                [14, [ [7 ,3], [15,2] ]],
                                [15, [ [13,4], [1 ,4] ]],
                            ];

    $scope.piso = -1;

    setTimeout(function(){
        //while(data.svg.pisos[0] === undefined){}
        $scope.piso = parseInt(data.svg.pisos[0]["nivel"]);    
        dibujar_piso($scope.piso);  
        data.piso_actual = $scope.piso;
    }, 5000);
    

    data.obtener_etiquetas_nodos = function(){
        return data.nodos['etiquetas'];
    }

    data.obtener_grafo = function(){
        return data.nodos['adyacencia'];
    }

    data.obtener_posicion_nodos = function(){
        return data.nodos["posicion"]
    }

    //console.log("print: "+data.obtener_etiquetas_nodos());


    $scope.tiendas = data.obtener_etiquetas_nodos();

    $scope.destinos = [];
    $scope.ruta = [];

    $scope.addToRoute =function(){
        array = _.filter($scope.tiendas, function(tienda){
            return tienda.seleccionada && !tienda.changed;
        });

        $scope.destinos = $scope.destinos.concat(array);


        aux = [];

        for(index in array){
            aux.push(array[index]["id"]);
        }

        $scope.ruta = $scope.ruta.concat(aux);

        console.log($scope.ruta); 

        for(index in $scope.tiendas ){
            if($scope.tiendas[index]["seleccionada"] == true){
                $scope.tiendas[index].changed = true;
            }
        }  
    }

    $scope.cleanAndReturn = function(){
        for(index in $scope.tiendas ){
            $scope.tiendas[index]["seleccionada"] = false;
            $scope.tiendas[index]["changed"] = false;
        }

        activarPantalla("ruta");
    }

    ids_to_positions = function(ids){
        positions = [];

        for(index in ids){
            positions.push(id_to_position(ids[index]));
        }

        return positions;
    }

    id_to_position = function(id){
        for(index in data.nodos['posicion']){
            if(data.nodos['posicion'][index][0] == id){
                return data.nodos['posicion'][index][1];
            }
        }
    }


    getShortestPath = function(){
        posicion_visitante = [1,0];//getUbicacion();
        if( posicion_visitante )
            return obtener_ruta(1, $scope.ruta, adyacente_actual(posicion_visitante), data.obtener_grafo());
        else
            return false;
    }

    $scope.delete = function ( idx ) {
        var destino_to_delete = $scope.destinos[idx];
        $scope.destinos.splice(idx, 1);
        $scope.ruta.splice(idx, 1);
    };
}
