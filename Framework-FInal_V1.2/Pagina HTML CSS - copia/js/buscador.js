
// Inicialización Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-analytics.js";
const firebaseConfig = {
  apiKey: "AIzaSyBqaM8Q2AqxKX4pnQdwg4AspnOgnQVPGiY",
  authDomain: "carrosapp2022.firebaseapp.com",
  databaseURL: "https://carrosapp2022-default-rtdb.firebaseio.com",
  projectId: "carrosapp2022",
  storageBucket: "carrosapp2022.appspot.com",
  messagingSenderId: "829177501464",
  appId: "1:829177501464:web:4d5727f4182cf3dbbff06d",
  measurementId: "G-DDN2B4KH9R"
};

const app = initializeApp(firebaseConfig);

/// Librerias de Firebase
import { getDatabase, ref, child, onValue, get, set, update, remove }  from "https://www.gstatic.com/firebasejs/10.14.0/firebase-database.js";

const db = getDatabase();

//Añadir datos a Tabla
let buildinglist_OG = [];
let buildinglist = [];
let bno = 0;
let tbody = document.getElementById('tbody1');

///Seleccionar todos los datos de BDD
const selectAllDataOnce = ()=> {
    const dbRef = ref(db);
    get(child(dbRef, 'ListadoInmuebles')).then((snapshot) => {
        buildinglist = [];
        snapshot.forEach(building => {
            buildinglist.push(building.val());
        });
        AddAllRecords();
    })
}

///Seleccionar todos los Datos de BDD en TIEMPO REAL
const selectAllDataRealTime = ()=> {
    const dbRef = ref(db, 'ListadoInmuebles');
    onValue(dbRef, (snapshot) => {
        buildinglist = [];
        snapshot.forEach(building => {
            buildinglist.push(building.val());
        });
        AddAllRecords();
        modalList = buildinglist;
    })
}

///Añadir 1 dato a la tabla
const AddSingleRecord = (Tipo, Ciudad, Precio, N_Hab, N_Bannos, T_Nego) => {
    let trow = document.createElement('tr');
    let td1 = document.createElement('td');
    let td2 = document.createElement('td');
    let td3 = document.createElement('td');
    let td4 = document.createElement('td');
    let td5 = document.createElement('td');
    let td6 = document.createElement('td');
    let td7 = document.createElement('td');
    let td8 = document.createElement('td');

    td1.innerHTML = ++bno;
    td2.innerHTML = Tipo;
    td3.innerHTML = Ciudad;
    td4.innerHTML = Precio;
    td5.innerHTML = N_Hab;
    td6.innerHTML = N_Bannos;
    td7.innerHTML = T_Nego;

    let EditButton = document.createElement('button');
    let DelButton = document.createElement('button');

    EditButton.id = 'edit-' + bno;
    EditButton.className = 'btn btn-primary me-2';
    EditButton.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>';
    EditButton.setAttribute("data-bs-toggle", 'modal');
    EditButton.setAttribute("data-bs-target", '#actionModal');
    EditButton.addEventListener('click', LoadModal);
    
    DelButton.id = 'del-' + bno;
    DelButton.className = 'btn btn-danger me-2';
    DelButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    DelButton.setAttribute("data-bs-toggle", 'modal');
    DelButton.setAttribute("data-bs-target", '#actionModal');
    DelButton.addEventListener('click', LoadModal);

    td8.append(EditButton,DelButton);

    trow.append(td1,td2,td3,td4,td5,td6,td7,td8);
    tbody.append(trow);
}

const AddAllRecords = () => {
    filteredRows = [];
    bno = 0;
    tbody.innerHTML = "";
    buildinglist.forEach(building =>{
        AddSingleRecord(building.Tipo, building.Ciudad, building.Precio, building.N_Hab, building.N_Bannos, building.Tipo_Venta);
    })
}

// Editor de Propiedades
///Referencias
let modXButton = document.getElementById('modXButton');
let actionLabel = document.getElementById('actionLabel');
let actionBtn = document.getElementById('actionBtn');
let modId = document.getElementById('modId');
let modType = document.getElementById('modType');
let modCity = document.getElementById('modCity');
let modPrice = document.getElementById('modPrice');
let modN_hab = document.getElementById('modN_hab');
let modN_bannos = document.getElementById('modN_bannos');
let modT_Nego = document.getElementById('modT_Nego');
let addBtn = document.getElementById('add-0');
let modalList = [];

///Cargar y definir el Formulario
const LoadModal = (event) => {
    var targetId = (event.target.id.length > 1) ? event.target.id : event.target.parentElement.id;

    //Dividir el ID en dos para reconocer modo e identificador
    let string = targetId.split('-');
    let mode = string[0];
    let selectedIndex = string[1] -1;
    console.log(selectedIndex);

    actionBtn.ariaDisabled = true;

    if(mode==='add'){
        actionBtn.className = 'btn btn-lg btn-success';
        actionLabel.innerText = 'Añadir Nuevo Inmueble';
        actionBtn.innerText= 'Añadir';
        actionBtn.addEventListener('click', AddData);

        modId.value = "";
        modType.value = "";
        modCity.value = "";
        modPrice.value = "";
        modN_hab.value = "";
        modN_bannos.value = "";
        modT_Nego.value = "";

        modId.disabled = false;
        modType.disabled = false;
        modCity.disabled = false;
        modPrice.disabled = false;
        modN_hab.disabled = false;
        modN_bannos.disabled = false;
        modT_Nego.disabled = false;
        actionBtn.disabled = false;
    }
    else if(mode==='edit'){
        actionBtn.className = 'btn btn-lg btn-primary';
        actionLabel.innerText = 'Editar Inmueble';
        actionBtn.innerText= 'Editar';
        actionBtn.addEventListener('click', UpdateData);

        modId.value = modalList[selectedIndex].Identificador;
        modType.value = modalList[selectedIndex].Tipo;
        modCity.value = modalList[selectedIndex].Ciudad;
        modPrice.value = modalList[selectedIndex].Precio;
        modN_hab.value = modalList[selectedIndex].N_Hab;
        modN_bannos.value = modalList[selectedIndex].N_Bannos;
        modT_Nego.value = modalList[selectedIndex].Tipo_Venta;

        modId.disabled = true;
        modType.disabled = false;
        modCity.disabled = false;
        modPrice.disabled = false;
        modN_hab.disabled = false;
        modN_bannos.disabled = false;
        modT_Nego.disabled = false;
        actionBtn.disabled = false;
    }
    else if(mode==='del'){
        actionBtn.className = 'btn btn-lg btn-danger';
        actionLabel.innerText = 'Borrar Inmueble';
        actionBtn.innerText= 'BORRAR';
        actionBtn.addEventListener('click', DelData);

        modId.value = modalList[selectedIndex].Identificador;
        modType.value = modalList[selectedIndex].Tipo;
        modCity.value = modalList[selectedIndex].Ciudad;
        modPrice.value = modalList[selectedIndex].Precio;
        modN_hab.value = modalList[selectedIndex].N_Hab;
        modN_bannos.value = modalList[selectedIndex].N_Bannos;
        modT_Nego.value = modalList[selectedIndex].Tipo_Venta;

        modId.disabled = true;
        modType.disabled = true;
        modCity.disabled = true;
        modPrice.disabled = true;
        modN_hab.disabled = true;
        modN_bannos.disabled = true;
        modT_Nego.disabled = true;
        actionBtn.disabled = false;
    }
}

///Actualizar BDD
//Añadir Datos
const AddData = () => {
    actionBtn.disabled = true;
    set(ref(db, 'ListadoInmuebles/' + modId.value), {
        Identificador: modId.value,
        Tipo: modType.value,
        Ciudad: modCity.value,
        Precio: modPrice.value,
        N_Hab: modN_hab.value,
        N_Bannos: modN_bannos.value,
        Tipo_Venta: modT_Nego.value
    }).then(()=>{ modXButton.click(); })
}

//Editar Datos
const UpdateData = () => {
    actionBtn.disabled = true;
    let data = {};
    data['ListadoInmuebles/' + modId.value + '/Tipo'] = modType.value;
    data['ListadoInmuebles/' + modId.value + '/Ciudad'] = modCity.value;
    data['ListadoInmuebles/' + modId.value + '/Precio'] = modPrice.value;
    data['ListadoInmuebles/' + modId.value + '/N_Hab'] = modN_hab.value;
    data['ListadoInmuebles/' + modId.value + '/N_Bannos'] = modN_bannos.value;
    data['ListadoInmuebles/' + modId.value + '/Tipo_Venta'] = modT_Nego.value;
    
    update(ref(db), data).then(()=>{ modXButton.click(); })
}

//Borrar Datos
const DelData = () => {
    actionBtn.disabled = true;
    remove(ref(db, 'ListadoInmuebles/' + modId.value)).then(()=>{ modXButton.click(); })
}

////Tarjetas

///Añadir TODOS los datos a las Tarjetas
const AddAllData_Cards = () => {
    filteredRows = [];
    bno = 0;
    tbody.innerHTML = "";
    buildinglist.forEach(building =>{
        bno++
        AddSingleData_Card(bno,building.Tipo, building.Ciudad, building.Precio, building.N_Hab, building.N_Bannos, building.Tipo_Venta);
    })

    //En este caso se cuenta el número 0 por lo que se añade 1 unidad al contador.
    deleteDuplicate(bno+1);
    bno = 0;
}

///Añadir 1 dato a Tarjeta

///Indice de Variables
//0 city
//1 tipo
//2 Precio
//3 Habitacion
//4 Baño
//5 Tamaño
let cno = 0;
const AddSingleData_Card = (card_no, tipo, ciudad, precio, n_hab, n_bannos) => {
    //Si al llamar ID retorna nulo entonces crea una nueva
    if (!document.getElementById('card_building' + card_no)){
        duplicate();
        console.log("Creada tarjeta nmro: "+ card_no);
    }

    // Actualiza los datos de la tarjeta
    const BuildingCard = document.getElementById("card_building" + card_no).children[1].children;
    BuildingCard[0].innerHTML = ciudad;
    BuildingCard[1].innerHTML = tipo;
    BuildingCard[2].innerHTML = "$ " + precio + " M";
    BuildingCard[3].innerHTML = "• " + n_hab + " Habitaciones";
    BuildingCard[4].innerHTML = "• " + n_bannos + " Baños";
    BuildingCard[5].innerHTML = "• X Tamaño";
}

/////Clonar tarjeta
var i = 0;
function duplicate() {
    var original = document.getElementById('card_building' + i);
    var clone = original.cloneNode(true); // "deep" clone
    clone.id = "card_building" + ++i; // there can only be one element with an ID
    original.parentNode.appendChild(clone);
}

/////Eliminar tarjetas duplicadas sobrantes
var last_Cnumber = 0;
var rest = 0;
function deleteDuplicate(card_number) {
    console.log("card_number: "+ card_number);
    //Se controla la cantidad de tarjetas utilizadas anteriormente, para así sacar la diferencia y deshacernos del sobrante.
    if (card_number < last_Cnumber){
        rest = last_Cnumber - card_number;
        
        console.log(last_Cnumber + " Es menor que " + card_number + " voy a borrar " + rest + " tarjetas");

        //Mientras que el N actual de tarjetas sea menor que el Anterior entonces borrar el excedente.
        for (let cd = card_number; cd < last_Cnumber; cd++) {
            var delcan = document.getElementById('card_building' + (cd));
            delcan.remove();
            console.log("Eliminado tarjeta id: card_building"+ cd);

            //La variable i se reduce para no causar errores de ID al duplicar la tarjeta nuevamente
            i--
        }

    }
    last_Cnumber = card_number;
    console.log("Nuevo last_Cnumber: "+ last_Cnumber)
}


//Buscador
///Inicializar variables
let filteredRows = [];
let searchbar = document.getElementById('searchbar');
let searchbtn = document.getElementById('searchbtn');

////Categorias
let searchcategory = document.getElementById('searchcategory');
let searchcategory_type = document.getElementById('searchcategory_type');
let searchcategory_city = document.getElementById('searchcategory_city');
let searchcategory_sale_type = document.getElementById('searchcategory_sale_type');

///Rango de Precios
const Precio_Checkbox = document.getElementById("check_precios");

let minPrice_I = document.getElementById("min_value_input");
let maxPrice_I = document.getElementById("max_value_input");

///Filtrar Datos con barra de buscador
// const FilterRecords = () => {
//     let searchval = searchbar.value.toLowerCase().trim();
//     filteredRows = buildinglist.filter(e => 
//     e.Tipo.toString().trim().includes(searchval) ||
//     e.Ciudad.toString().trim().includes(searchval) ||
//     e.Precio.toString().trim().includes(searchval) ||
//     e.N_Hab.toString().trim().includes(searchval) ||
//     e.N_Bannos.toString().trim().includes(searchval) 
// );

//     bno = 0;
//     tbody.innerHTML = "";
//     filteredRows.forEach(building =>{
//         AddSingleRecord(building.Tipo, building.Ciudad, building.Precio, building.N_Hab, building.N_Bannos);
//     })

// }

/// Failsafe buscador de Texto vacío
// const SearchEmpty = () => {
//     if(searchbar.value.length < 1)
//         AddAllRecords();
// }

/// Presiona Enter para buscar (Texto)
// const SearchEnter = () => {
//     if(event.keyCode === 13)
//     FilterRecordsByCategory();
// }

const SaveLastBuildingList = (buildinglist_append) => {
    buildinglist = buildinglist_append
}

///Filtrar Datos por Categoria
const FilterRecordsByCategory = () => {
    // let searchval = searchbar.value.toLowerCase().trim();
    buildinglist_OG = buildinglist;

    ///Categoria de Tipos
    if(searchcategory_type.value != 'Tipo')
        if(searchcategory_type.value === 'Casa')
            filteredRows = buildinglist.filter(e => e.Tipo === 'Casa'),
            SaveLastBuildingList(filteredRows);

        else if(searchcategory_type.value === 'Apartamento')
            filteredRows = buildinglist.filter(e => e.Tipo === 'Apartamento'),
            SaveLastBuildingList(filteredRows);

        else if(searchcategory_type.value === 'Apartaestudio')
            filteredRows = buildinglist.filter(e => e.Tipo === 'Apartaestudio'),
            SaveLastBuildingList(filteredRows);

    ///Categoria de Ciudades
    if(searchcategory_city.value != 'Ciudad')
        if(searchcategory_city.value === 'Bucaramanga')
            filteredRows = buildinglist.filter(e => e.Ciudad === 'Bucaramanga'),
            SaveLastBuildingList(filteredRows);

        else if(searchcategory_city.value === 'Giron')
            filteredRows = buildinglist.filter(e => e.Ciudad === 'Giron'),
            SaveLastBuildingList(filteredRows);

    ///Categoria de Tipo de Venta
    if(searchcategory_sale_type.value != 'Negocio')
        if(searchcategory_sale_type.value === 'Venta')
            filteredRows = buildinglist.filter(e => e.Tipo_Venta === 'Venta'),
            SaveLastBuildingList(filteredRows);

        else if(searchcategory_sale_type.value === 'Arriendo')
            filteredRows = buildinglist.filter(e => e.Tipo_Venta === 'Arriendo'),
            SaveLastBuildingList(filteredRows);

    //// Si se desea expandir los filtros es simplemente reutilizar el codigo de arriba.

    ///Filtro de Precios
    if(Precio_Checkbox.checked){
        console.log("check");
        
        filteredRows = buildinglist.filter(e => e.Precio >= minPrice_I.value &&  e.Precio <= maxPrice_I.value)
        SaveLastBuildingList(filteredRows);
        //Nota: El intercambio de precios está causando errores, asumo que como son dos scripts diferentes entonces
        // causa problemas, asumo que si combino ambos scripts entonces se arregla ese error al tener la matematica
        // en la misma memoria.

    }

    //Pasar datos filtrados

    //Reiniciar variables
    ///Nota: La variable bno se reutiliza como identificador, nro en tabla, cuantas tarjetas hay
    bno = 0;
    tbody.innerHTML = "";

    //Datos a Tabla
    filteredRows.forEach(building =>{
        AddSingleRecord(building.Tipo, building.Ciudad, building.Precio, building.N_Hab, building.N_Bannos, building.Tipo_Venta);
        modalList = buildinglist;
    })
    buildinglist = buildinglist_OG;
    
    //Datos a Tarjeta
    bno = 0;
    filteredRows.forEach(building => {
        AddSingleData_Card(bno,building.Tipo, building.Ciudad, building.Precio, building.N_Hab, building.N_Bannos);
        bno++
    })
    deleteDuplicate(bno);

    //Antes de reiniciar la variable bno, la guardo en cno para comparar cuantas tarjetas ya tengo creadas, eliminar extras.
    cno = bno;
    bno = 0;

    ///Failsafe Buscar sin escoger categorias
    if(searchcategory_type.value === 'Tipo' && searchcategory_city.value === 'Ciudad' && searchcategory_sale_type.value === 'Negocio'  && Precio_Checkbox.checked === false)
        AddAllData_Cards();

    ///Ejecuto este IF nuevamente para evitar errores con la tabla desapareciendo en la sección Administrativa.
    if(searchcategory_type.value === 'Tipo' && searchcategory_city.value === 'Ciudad' && searchcategory_sale_type.value === 'Negocio'  && Precio_Checkbox.checked === false)
        AddAllRecords();


}

//Eventos
window.addEventListener('load', selectAllDataRealTime);
searchbtn.addEventListener('click', FilterRecordsByCategory);
// searchbar.addEventListener('input', SearchEmpty);
// searchbar.addEventListener('keypress', SearchEnter);
// document.getElementById("clonar").addEventListener ("click", duplicate);
addBtn.addEventListener('click', LoadModal);
