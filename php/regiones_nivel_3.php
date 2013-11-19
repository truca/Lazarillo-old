<?php
	$con=mysql_connect("localhost","tractorv_lazaro","puppy2013")  or die(mysql_error()); 
	mysql_select_db("tractorv_lazarillo", $con) or die(mysql_error());
	mysql_query("SET NAMES 'utf8'");

	$sql = "select Region from Nodos where Recinto = '".$_POST["recinto"]."' and TipoPI != '' and IdNivel in (select IdNivel from Nivel where NombreRecinto = '".$_POST["recinto"]."' and NroNivel = ".$_POST["nivel"].")";

	$q = mysql_query( $sql ) or die(mysql_error());
	
	$rows = array();
	while($r = mysql_fetch_assoc($q)) {
	    $rows[] = $r;
	}
	print json_encode($rows);

	mysql_close ();
?>