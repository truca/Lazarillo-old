<?php
	$con=mysql_connect("localhost","tractorv_lazaro","puppy2013")  or die(mysql_error()); 
	mysql_select_db("tractorv_lazarillo", $con) or die(mysql_error());
	mysql_query("SET NAMES 'utf8'");

	$sql = "select NroNivel, Nombre, IdNodo, COUNT(*) as NroDeEtiquetas, GROUP_CONCAT(DISTINCT Nombre_es ORDER BY Nombre_es ASC SEPARATOR ', ') as Etiquetas from Tags where NombreRecinto='".$_POST['recinto']."' group by IdNodo;";

	$q = mysql_query( $sql ) or die(mysql_error());
	
	$rows = array();
	while($r = mysql_fetch_assoc($q)) {
	    $rows[] = $r;
	}
	print json_encode($rows);

	mysql_close ();
?>