<?php
$allowedExts = array("gif", "jpeg", "jpg", "png");
$extension = end(explode(".", $_FILES["file"]["name"]));

echo $_FILES["file"]["type"];

if ((($_FILES["file"]["type"] == "image/gif")
|| ($_FILES["file"]["type"] == "image/jpeg")
|| ($_FILES["file"]["type"] == "image/jpg")
|| ($_FILES["file"]["type"] == "image/pjpeg")
|| ($_FILES["file"]["type"] == "image/x-png")
|| ($_FILES["file"]["type"] == "image/png"))
&& in_array($extension, $allowedExts))
  {
  if ($_FILES["file"]["error"] > 0)
    {
    echo "Return Code: " . $_FILES["file"]["error"] . "<br>";
    }
  else
    {
    //echo "Upload: " . $_FILES["file"]["name"] . "<br>";
    //echo "Type: " . $_FILES["file"]["type"] . "<br>";
    //echo "Size: " . ($_FILES["file"]["size"] / 1024) . " kB<br>";
    //echo "Temp file: " . $_FILES["file"]["tmp_name"] . "<br>";

    if (file_exists("upload/" . $_FILES["file"]["name"]))
      {
      echo $_FILES["file"]["name"] . " already exists. ";
      }
    else
      {
      move_uploaded_file($_FILES["file"]["tmp_name"],
      "upload/" . $_FILES["file"]["name"]);
      //echo "Stored in: " . "upload/" . $_FILES["file"]["name"];
      echo "<img id='mapa' class='puntos' src='upload/".$_FILES["file"]["name"]."' />";
      }
    }
  }
else
  {
  echo "Invalid file";
  }
?>
<script type="text/javascript" src="js/jquery-1.9.0.js"></script>
<script src="js/jquery-ui.js"></script>
<script type="text/javascript">
  var cantPuntos=0;
  var puntosImagen=[];
  var puntosPagina=[];

  //$(".drag").draggable({containment: $("#mapa")})

  $(".puntos").click(function(e){
    if(cantPuntos==0){
      puntosImagen.push([e.offsetX,e.offsetY]);
      puntosPagina.push([e.pageX,e.pageY]);
      marcador(0);
      cantPuntos++;
    }
    else if(cantPuntos==1){
      puntosImagen.push([e.offsetX,e.offsetY]);
      puntosPagina.push([e.pageX,e.pageY]);
      marcador(1);
      cantPuntos++;
    }
    else{
      puntosImagen[0]=puntosImagen[1];
      puntosImagen[1]=[e.offsetX,e.offsetY];
      puntosPagina[0]=puntosPagina[1];
      marcador(0);
      puntosPagina[1]=[e.pageX,e.pageY];
      marcador(1);
      cantPuntos++;
    }

    function marcador(num){
      $("#marker"+num).css("display", "inline");
      $("#marker"+num).css("top", puntosPagina[num][1]-32);
      $("#marker"+num).css("left", puntosPagina[num][0]-16);
    }
  });
</script>
<img id="marker0" class="drag" src="img/marker.png" style="display: none; position: absolute;"/>
<img id="marker1" class="drag" src="img/marker.png" style="display: none; position: absolute;"/>