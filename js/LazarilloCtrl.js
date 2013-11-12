function LazarilloCtrl($scope){

	$scope.siguienteDestino = 1;
	$scope.pisoActual = 0;

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



	$scope.actualizarRuta = function(ruta){
		$scope.ruta = ruta;
		$scope.trayectoria = obtener_ruta(1, $scope.ruta, [-1,[[81,0]]], data.nodos["adyacencia"]);
	}

	$scope.draw = function(){
		draw = {};
		draw.regiones = data.svg.pisos[$scope.pisoActual]["regiones"]; 
		draw.caminos = [];//data.svg.pisos[$scope.pisoActual]["caminos"];
		if($scope.trayectoria != [])
			draw.ruta = ruta_a_posiciones($scope.trayectoria);
		draw.x = 50;
		draw.y = 50;

		rapha(draw);
	}
	

	$scope.tiendas = data.nodos["etiquetas"];

	$scope.trayectoria = [];
	$scope.trayectoria_por_pisos = [];
	$scope.ruta = [];
	$scope.destinos = [];

	$scope.addToRoute =function(){
			array = _.filter($scope.tiendas, function(tienda){
          return tienda.seleccionada && !tienda.agregada;
      });

      _.each(array, function(elem){
      	elem.visitado = false;
      });

      $scope.destinos = $scope.destinos.concat(array);

      aux = [];

      for(index in array){
          aux.push(array[index]["id"]);
      }

      $scope.ruta = $scope.ruta.concat(aux);
      

      for(index in $scope.tiendas ){
          if($scope.tiendas[index].seleccionada == true){
            	$scope.tiendas[index].agregada = true;
          }
      }

      $scope.actualizarRuta($scope.ruta);
      $scope.draw(); 
		}


		$scope.setPosition =function(tienda, seleccionada){
			if (seleccionada) {
				tienda.posicion = $scope.siguienteDestino;
        $scope.siguienteDestino++;
      }
		}

		
		$scope.get_data = function(nombreRecinto){
        data.nombre_recinto = nombreRecinto;
        get_pisos();   
        get_etiquetas();
        get_posiciones();
        get_puntos_transicion();
        get_adyacentes();
     		setTimeout(function(){
     			$scope.draw();
     		}, 5000);  
    }
    $scope.get_data("Universidad");

    $scope.quitarVisitados = function(){
    	$scope.destinos = _.filter($scope.destinos, function(destino){
    		return !destino.visitado;
    	});

			//actualizar tiendas
			tiendas_agregadas = _.where($scope.tiendas, {agregada: true});

			_.each(tiendas_agregadas, function(tienda_agregada){
				tienda_agregada.agregada = false;
				tienda_agregada.seleccionada = false;
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
    	$scope.actualizarRuta(ruta);
    	$scope.draw();
    }
}