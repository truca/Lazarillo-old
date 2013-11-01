function dibujar_piso(piso){
	$("#caja").html("");
	draw = new Object();
	draw.regiones = data.svg.pisos[piso].regiones;
	draw.caminos = data.svg.pisos[piso].caminos;
	rapha(draw);
}