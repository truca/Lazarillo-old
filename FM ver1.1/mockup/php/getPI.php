//conexion BD
$con=mysql_connect("localhost","lazarill_select","puppy2013")  or die(mysql_error()); 
mysql_select_db("lazarill_lazarillo", $con) or die(mysql_error());
mysql_query("SET NAMES 'utf8'");

//ejecutar consulta
$query = mysql_query("SELECT FROM Nodos WHERE nombre_recinto");

//pasar consulta a JSON
$jason = json_encode($query);

//cerrar conexion
mysql_close($con);

echo $jason;