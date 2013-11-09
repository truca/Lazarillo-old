function LazarilloCtrl($scope){
	$scope.ruta=false;
	$scope.mapa=true;
	$scope.PI = false;

	$scope.togglePI = function(){
		$scope.ruta=false;
		$scope.mapa=false;
		$scope.PI = true;		
	}
	$scope.toggleMapa = function(){
		$scope.ruta=false;
		$scope.mapa=true;
		$scope.PI = false;		
	}
	$scope.toggleRuta = function(){
		$scope.ruta=true;
		$scope.mapa=false;
		$scope.PI = false;		
	}
}