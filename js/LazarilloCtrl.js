function LazarilloCtrl($scope){

	$scope.trayectoria = [];
	$scope.ruta = [];
	$scope.ruta_secundaria = [-2];
	$scope.destinos = [];
	$scope.siguienteDestino = 1;
	$scope.pisoActual = 0;
	$scope.tiendas = [];
	$scope.categorias = [];

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

	$scope.toggleRutas = function(){
		ruta_aux = $scope.ruta;
		$scope.ruta = $scope.ruta_secundaria;
		$scope.ruta_secundaria = ruta_aux;

		$scope.actualizarRuta($scope.ruta);
		$scope.draw();
	}

	$scope.actualizarRuta = function(ruta){
		if(ruta.length > 0){
			$scope.ruta = ruta;
			if($scope.ruta[0] == -2 && $scope.ruta.length == 1)
				trayectoria = volver_estacionamiento(data.estacionamiento, [-1,[[132,0]]], data.nodos["adyacencia"], data.nodos["posicion"]);
			else
				trayectoria = obtener_ruta(1, [$scope.ruta[0]], [-1,[[132,0]]], data.nodos["adyacencia"]);
			$scope.trayectoria = dividir_pisos(data.pisos[$scope.pisoActual],trayectoria,data.nodos["PT"]);
		}
		else
			$scope.trayectoria = [];
	}

	$scope.draw = function(){
		draw = {};
		draw.regiones = data.svg.pisos[$scope.pisoActual]["regiones"]; 
		$("#wrap").html("");
		draw.caminos = [];//data.svg.pisos[$scope.pisoActual]["caminos"];
		if($scope.trayectoria.length > 0)
			draw.ruta = ruta_a_posiciones(ruta_al_siguiente($scope.ruta[0], $scope.trayectoria));
		else 
			draw.ruta = [];
		rapha(draw);
	}
	
	setTimeout(function() {
		$scope.tiendas = data.nodos["etiquetas"];
		_.each($scope.tiendas, function(tienda){
			$scope.categorias = _.union($scope.categorias, tienda.categorias);
		});
	}, 2000);

	$scope.addToRoute =function(){
			array = _.filter($scope.tiendas, function(tienda){
          return tienda.seleccionada && !tienda.agregada;
      });

      _.each(array, function(elem){
      	elem.visitado = false;
      });

      array = _.sortBy(array, function(elem){
				return elem.posicion;
			});

      $scope.destinos = $scope.destinos.concat(array);

      aux = [];

      for(index in array){
          aux.push(array[index]["id"]);
      }

      aux = _.map(aux, function(au){
      	return parseInt(au);
      });

      console.log(aux);

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
     		var draw_mapa = setInterval(function(){
     			$scope.draw();
     			clearInterval(draw_mapa);
     		}, 500);  
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

			$scope.destinos = _.sortBy($scope.destinos, function(destino){
				return destino.posicion;
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