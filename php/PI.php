<?php
	$con=mysql_connect("localhost","tractorv_lazaro","puppy2013")  or die(mysql_error()); 
	mysql_select_db("tractorv_lazarillo", $con) or die(mysql_error());
	mysql_query("SET NAMES 'utf8'");

	$sql = "select c.IdNodoA, IdNodoB, Direccion, IF(c.Peso = -1 ,(SQRT(POWER((select X from Nodo where IdNodo = c.IdNodoB)-(select X from Nodo where IdNodo = c.IdNodoA),2)+POWER((select Y from Nodo where IdNodo = c.IdNodoB)-(select Y from Nodo where IdNodo = c.IdNodoA),2))),0) as PesoCamino from Camino c where IdNodoA in (select IdNodo from Nodo where IdNivel in (select IdNivel from Nivel where NombreRecinto = 'Universidad Federico Santa María, Sede San Joaquín' and NroNivel = 1))";

	$q = mysql_query( $sql ) or die(mysql_error());
	
	$rows = array();
	while($r = mysql_fetch_assoc($q)) {
	    $rows[] = $r;
	}
	print json_encode($rows);

	mysql_close ();
?>