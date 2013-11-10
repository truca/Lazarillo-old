function LazarilloCtrl($scope){

	$scope.siguienteDestino = 1;

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
			for(index in $scope.tiendas ){
          if($scope.tiendas[index].seleccionada == true){
            	$scope.tiendas[index].agregada = true;
          }
      } 

			array = _.filter($scope.tiendas, function(tienda){
          return tienda.seleccionada;
      });

      //console.log(array);

      array = _.sortBy(array, function(tienda){
      	return tienda.posicion*-1;
      })

      //console.log(array);

      $scope.destinos = $scope.destinos.concat(array);

      aux = [];

      for(index in array){
          aux.push(array[index]["id"]);
      }

      $scope.ruta = $scope.ruta.concat(aux); 
		}


		$scope.setPosition =function(){

				for(index in $scope.tiendas ){
          if($scope.tiendas[index].seleccionada == true){
            //$scope.tiendas[index].agregada = true;
            $scope.tiendas[index].posicion = $scope.siguienteDestino;
            $scope.siguienteDestino++;
          }
        }
    }

    $scope.quitarVisitados = function(){
    	//console.log($scope.tiendas);

			$scope.destinos = _.filter($scope.destinos, function(destino){
    		return !destino.visitado;
    	});

			//actualizar tiendas
			tiendas_agregadas = _.where($scope.tiendas, {agregada: true});

			_.each(tiendas_agregadas, function(tienda_agregada){
				if(_.where($scope.destinos, {id: tienda_agregada.id}).length > 0){
					tienda_agregada.agregada = false;
					tienda_agregada.seleccionada = false;
				}
			});

			_.each(tiendas_agregadas, function(tienda_agregada){
				console.log(_.where($scope.destinos, {id: tienda_agregada.id}));
				if(_.where($scope.destinos, {id: tienda_agregada.id}).length > 0){
					tienda_agregada.agregada = true;
					tienda_agregada.seleccionada = true;
				}
			});

    	//actualizar ruta
    	var ruta = [];
    	_.each($scope.destinos, function(destino){
    		ruta.push(destino.id)
    	});
    	$scope.ruta = ruta;
    	//console.log($scope.tiendas);
    }
}