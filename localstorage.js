window.addEventListener("load",function(){
  // deaclaracion de las variables HTML
  var inputnombre = document.getElementById("inputNombre");
  var inputfecha = document.getElementById("inputFecha");
  var inputruc = document.getElementById("inputRuc");
  var inputcantidad = document.getElementById("inputCantidad");
  var inputdescripcion = document.getElementById("inputDescripcion");
  var selectcategoria = document.getElementById("selectCategoria");
  var inputpunitario = document.getElementById("inputUnitario");
  var buttonagregar = document.getElementById("buttonAgregar");
  var tabla = document.getElementById("tabla");
  

  // creando el modelo de un objeto factura que sera usado en el localstorage
  var factura={
    nombre:'',
    ruc:'',
    fecha:'',
    productos:[]
  };

  // funcion para traer el obejto factura del localstorage
  // si en el localstorage no  ahy objeto la var factura se queda vacia
  function ConstruirFactura(){
    let stringFacturaStorage = localStorage.getItem("factura");
    // validando si la factura existe o no
    // si existe nos devuelve string
    if(stringFacturaStorage){
      // convierto el string de la factura del astorage
      // a un objeto JSON
      let jsonfacturastorage = JSON.parse(stringFacturaStorage);
      factura=jsonfacturastorage;
      dibujarTablaConStorage();
    }else{ //si no existe nos retorna null
      console.log("no hay");
    }
  }

  function dibujarTablaConStorage(){
    for (let i = 0; i < factura.productos.length; i++) {
      let tr = document.createElement("tr");
      let nro = document.createElement("td");
      nro.innerHTML = i+1;
      let ncant = document.createElement("td");
      ncant.innerHTML = factura.productos[i].cantidad;
      let descri = document.createElement("td");
      descri.innerHTML = factura.productos[i].descripcion;
      let puni =document.createElement("td");
      puni.innerHTML=factura.productos[i].punitario;
      let pto = document.createElement("td");
      pto.innerHTML = factura.productos[i].pstotal;
      var boton = document.createElement("button");
      boton.innerHTML="Borrar";
      boton.setAttribute("pos",i+1);
      boton.addEventListener("click",function(evento){
        let posicion=evento.target.getAttribute("pos");
        factura.productos.splice(posicion-1,1)
        localStorage.setItem("factura",JSON.stringify(factura));
        window.location.reload();
      });

      tr.appendChild(nro);
      tr.appendChild(ncant);
      tr.appendChild(descri);
      tr.appendChild(puni);
      tr.appendChild(pto);
      tr.appendChild(boton);

      tabla.appendChild(tr);

    }
  };
  var botonn = document.getElementById("botonn")
  function eliminarfila(){
    for (let i = 0; i < factura.productos.length; i++);
    botonn
   }

  // evento click del programa
  buttonagregar.addEventListener("click",function(){
    let detalle={
      cantidad:inputcantidad.value,
      descripcion:inputdescripcion.value,
      categoria:selectcategoria.value,
      punitario:inputpunitario.value,
      pstotal:(inputcantidad.value*inputpunitario.value)
    };
    // creadno el <tr></tr> de la tabla 
    let tr = document.createElement("tr");
    // guardmos en un arreglo llamado trActuales
    // todos lo tr que tiene la yabla actual
    let trActuales=document.querySelectorAll("table tr");
    
    // creadno 5 <td></td>
    let Nro=document.createElement("td");
    Nro.innerHTML=trActuales.length;

    let Cant=document.createElement("td");
    Cant.innerHTML=detalle.cantidad;

    let Descrip=document.createElement("td");
    Descrip.innerHTML=detalle.descripcion;

    let PUnitario=document.createElement("td");
    PUnitario.innerHTML=detalle.punitario;

    let PTotal=document.createElement("td");
    PTotal.innerHTML=detalle.pstotal;

    let boton = document.createElement("button");
    boton.id="botonn"
    boton.innerHTML="Borrar";

    tr.appendChild(Nro);
    tr.appendChild(Cant);
    tr.appendChild(Descrip);
    tr.appendChild(PUnitario);
    tr.appendChild(PTotal);
    tr.appendChild(boton);

    tabla.appendChild(tr);

    factura.productos.push(detalle);

    localStorage.setItem("factura", JSON.stringify(factura));
  });

  // console.log(botonn);


  ConstruirFactura();



});