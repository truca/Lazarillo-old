<?php
	$con=mysql_connect("localhost","tractorv_lazaro","puppy2013")  or die(mysql_error()); 
	mysql_select_db("tractorv_lazarillo", $con) or die(mysql_error());
	mysql_query("SET NAMES 'utf8'");

	$sql = "SELECT IdNodo, NroNivel FROM Nodos WHERE TipoPT !=  '' AND Recinto =  'Universidad1'";// ".$_POST["recintos"]."

	$q = mysql_query( $sql ) or die(mysql_error());

	//echo $q;
	
	$rows = array();
	while($r = mysql_fetch_assoc($q)) {
	    $rows[] = $r;
	}
	print json_encode($rows);

	mysql_close ();
?>