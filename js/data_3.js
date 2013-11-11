data = new Object();
    data.nombre_recinto = "Universidad1";
    data.piso_actual = "0";
    data.pisos = [];
    data.nodos = {};
    data.nodos["etiquetas"] = [];
    data.nodos["posicion"] = [];
    //agregar variable al final de adyacencia, booleano de si es es PT
    data.nodos["adyacencia"] = [];
    data.nodos["PT"] = [];
    data.svg = new Object();
    data.svg.pisos = [];
    data.ready = false;
    data.geolocalizar = false;


    function get_posiciones(){
            var nodos = [], reg =[];
            //conseguir los pisos asociados a el recinto
            $.post( "php/nodos_posicion.php", { recinto: data.nombre_recinto }, function(info){
                nodos = JSON.parse(info);
                for(index in nodos)
                {
                    data.nodos["posicion"].push([nodos[index]["IdNodo"],[nodos[index]["X"],nodos[index]["Y"]]]);
                }
        });
    }

    function toggle_geolocalizar(){
        if(data.geolocalizar) data.geolocalizar = false;
        else data.geolocalizar = true;
    }
        
    function get_pisos(){
        var pisos = {}, regiones=[], caminos=[];
        //conseguir los pisos asociados a el recinto
        
        $.post( "php/niveles_recinto.php", { recinto: data.nombre_recinto }, function(floor){
            
            pisos = JSON.parse(floor);


            for(index = 0; index < pisos.length; index++){
                piso = pisos[index]["NroNivel"];
                $.post( "php/regiones_nivel.php", { recinto: data.nombre_recinto, nivel: piso }, function(figure){
                    regiones = JSON.parse(figure);
                    $.post( "php/caminos_nivel.php", { recinto: data.nombre_recinto, nivel: piso }, function(path){
                        caminos = JSON.parse(path);
                        var reg = [], cam = [];
                        for(index_reg in regiones){
                            reg.push(regiones[index_reg]["Region"]);
                        }
                        for(index_cam in caminos){
                            cam.push(caminos[index_cam]["StringPath"]);
                        }
                        data.svg.pisos.push({"nivel": piso,"regiones": reg,"caminos": cam});
                        respondido = true;
                    });
                });
            }  
            data.pisos = pisos;
        });
    }

    function existe(id_nodo){
        var existe = false;
        for(index in data.nodos["adyacencia"])
            if(data.nodos["adyacencia"][index][0]==id_nodo)
                existe = true;
        return existe;
    }

    function agregar_nodo(id_nodo){
        data.nodos["adyacencia"].push([id_nodo,[]])
    }

    function agregar(id_nodo, camino){
        for(index in data.nodos["adyacencia"])
            if(data.nodos["adyacencia"][index][0]==id_nodo)
                data.nodos["adyacencia"][index][1].push(camino);
    }

    function agregar_adyacencia(adyacencia){
        nodo_a = adyacencia["IdNodoA"], nodo_b = adyacencia["IdNodoB"];
        //verificar existencia de ambos nodos, sino agregar
        if(!existe(nodo_a))
            agregar_nodo(nodo_a);

        if(!existe(nodo_b))
            agregar_nodo(nodo_b);
        
        //buscar tipo de adyacencia
        agregar(nodo_a, [nodo_b, adyacencia["PesoCamino"]]);
    }

    function get_adyacentes(){
        arreglo = [], aux = [];
        $.post( "php/nodos_adyacencia.php", { recinto: data.nombre_recinto }, function(info){
            tiendas = JSON.parse(info);

            for(index in tiendas){
                agregar_adyacencia(tiendas[index]);
            }
        });
    }

    function get_puntos_transicion(){
        $.post( "php/PT_pisos.php", { recinto: data.nombre_recinto }, function(info){
            tiendas = JSON.parse(info);
            data.nodos['PT'] = [];
            for(index in tiendas)
                data.nodos['PT'].push({"id": tiendas[index].IdNodo, "nivel": tiendas[index].NroNivel});
        });
    }

    function get_etiquetas(){
        arreglo = [], aux = [];
        $.post( "php/recintos_con_tags_json.php", { recinto: data.nombre_recinto }, function(info){
            tiendas = JSON.parse(info);

            for(index in tiendas){
                data.nodos["etiquetas"].push({"id":tiendas[index]["IdNodo"], "nombre": tiendas[index]["Nombre"], "categorias": tiendas[index]["Etiquetas"], "seleccionada": false, "agregada": false});
            }
        });
    }

    function get_data(nombreRecinto){
        data.nombre_recinto = nombreRecinto;
        get_pisos();   
        get_etiquetas();
        get_posiciones();
        get_puntos_transicion();
        get_adyacentes();
        data.ready = true;
    }

    

    $(function(){
        get_data("Universidad");
    });