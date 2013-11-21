    data = new Object();
    data.posicion = [500, 450];
    data.estacionamiento = [400, 300];
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
        
    var reg = [];
    function get_pisos(){
        var pisos = {}, regiones=[], caminos=[];
        //conseguir los pisos asociados a el recinto
        
        $.post( "php/niveles_recinto.php", { recinto: data.nombre_recinto }, function(floor){
            pisos = JSON.parse(floor);
            data.pisos = pisos;
        });
        $.post( "php/regiones_nivel.php", { recinto: data.nombre_recinto }, function(figure){
            regiones = JSON.parse(figure)
            
            regiones = _.groupBy(regiones, function(region){ 
                return region.NroNivel; 
            });

            aux = [];

            _.each(regiones, function(region){
                piso = {nivel: region[0]["NroNivel"], regiones: []} 
                _.each(region, function(reg){
                    piso.regiones.push(reg.Region);
                });
                aux.push(piso);
            });
            data.svg.pisos = aux;
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
        data.nodos["adyacencia"].push([parseInt(id_nodo),[]]);
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
        agregar(nodo_a, [parseInt(nodo_b), parseFloat(adyacencia["PesoCamino"])]);
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
                data.nodos["etiquetas"].push({"id":tiendas[index]["IdNodo"], "nombre": tiendas[index]["Nombre"], "categorias": tiendas[index]["Etiquetas"].split(", "), "seleccionada": false, "agregada": false});
            }
        });
    }

    function ruta_a_posiciones(ruta){
        return _.map(ruta, function(punto){
            return posicion_desde_(punto);
        });
    }

    function posicion_desde_(punto){
        if(_.find(data.nodos.posicion, function(pos){return pos[0] == punto;}) != undefined)
            return _.find(data.nodos.posicion, function(pos){return pos[0] == punto;})[1];
        else if(punto == -1)
            return data.posicion;
        else if(punto == -2)
            return data.estacionamiento;
        else
            return;
    }