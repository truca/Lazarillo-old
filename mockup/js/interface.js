function dibujar_piso(piso){
	$("#caja").html("");
	draw = new Object();
	for(index = 0; index < data.pisos.length; index++){
		if(data.svg.pisos[index] && data.svg.pisos[index]["nivel"]==piso){
			draw.regiones = data.svg.pisos[index]["regiones"];
			draw.caminos = data.svg.pisos[index]["caminos"];
		}
	}
	rapha(draw);
}