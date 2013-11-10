function LazarilloCtrl($scope){

	$scope.ajustarTamano = function(){
		$(".wrap").height($("body").height()-60);
	}
	$scope.ajustarTamano();

	$(window).resize(function(){
		$scope.ajustarTamano();
	});

	$scope.togglePI = function(){
		$scope.ajustarTamano();
		$(".screen").addClass("inv");
		$("#pi").removeClass("inv");
	}
	$scope.toggleMapa = function(){
		$scope.ajustarTamano();
		$(".screen").addClass("inv");
		$("#mapa").removeClass("inv");	
	}
	$scope.toggleRuta = function(){
		$scope.ajustarTamano();
		$(".screen").addClass("inv");
		$("#ruta").removeClass("inv");
	}

	$scope.tiendas = data.nodos["etiquetas"];

	$scope.ruta = [];
	$scope.destinos = [];

	$scope.addToRoute =function(){

				//$scope.ruta = [];
        array = _.filter($scope.tiendas, function(tienda){
            return tienda.seleccionada && !tienda.agregada;
        });

        $scope.destinos = $scope.destinos.concat(array);

        console.log($scope.destinos); 

        aux = [];

        for(index in array){
            aux.push(array[index]["id"]);
        }

        $scope.ruta = $scope.ruta.concat(aux);

        console.log($scope.ruta); 

        for(index in $scope.tiendas ){
            if($scope.tiendas[index]["seleccionada"] == true){
                $scope.tiendas[index].agregada = true;
            }
        }  
    }

    $scope.quitarVisitados = function(){
    	$scope.destinos = _.filter($scope.destinos, function(destino){
    		return !destino.visitado;
    	});
    }
}