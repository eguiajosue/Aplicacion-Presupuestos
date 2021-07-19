const ingresos = [];
const egresos = [];

let cargarApp = () => {
    cargarCabecero();
    cargarIngresos();
    cargarEgresos();
}

let totalIngresos = () => {
    let totalIngreso = 0;
    for (const ingreso of ingresos) {
        totalIngreso += ingreso.valor;
    }
    return totalIngreso;
}

let totalEgresos = () => {
    let totalEgresos = 0;
    for (const egreso of egresos) {
        totalEgresos += egreso.valor;
    }
    return totalEgresos;
}

let cargarCabecero = () => {
    let presupuestoTotal = totalIngresos() - totalEgresos();
    let porcentajeEgreso = totalEgresos() / totalIngresos();

    document.getElementById('presupuesto').innerHTML = formatoMoneda(presupuestoTotal);
    document.getElementById('porcentaje').innerHTML = formatoPorcentaje(porcentajeEgreso);
    document.getElementById('ingresos').innerHTML = formatoMoneda(totalIngresos());
    document.getElementById('egresos').innerHTML = formatoMoneda(totalEgresos());
}

const formatoMoneda = (valor) => {
    return valor.toLocaleString('en-US', {style: 'currency', currency:'USD', minimumFractionDigits: 2});
}

const formatoPorcentaje = (valor) => {
    return valor.toLocaleString('en-US', {style: 'percent', minimumFractionDigits: 2});
}

const cargarIngresos = () => {
    let ingresosHTML = '';
    for (const ingreso of ingresos) {
        ingresosHTML += crearIngresoHTML(ingreso);
    }
    document.getElementById('lista-ingresos').innerHTML = ingresosHTML;
}

const crearIngresoHTML = (ingreso) => {
    let ingresoHTML = `
    <div class="elemento limpiar-estilos">
    <div class="elemento-descripcion">${ingreso.descripcion}</div>
    <div class="derecha limpiar-estilos">
        <div class="elemento-valor">${formatoMoneda(ingreso.valor)}</div>
            <div class="elemento-eliminar">
                <button class="elemento-eliminar--btn">
                    <ion-icon onclick="eliminarIngreso(${ingreso.id})" name="close-circle-outline"></ion-icon>
                </button>
            </div>
        </div>
    </div>
    `;
    return ingresoHTML;
};

const eliminarIngreso = (id) => {
    let indiceEliminar = ingresos.findIndex(ingreso => ingresos.id === id);
    ingresos.splice(indiceEliminar, 1);
    cargarCabecero();
    cargarIngresos();
}

const cargarEgresos = () => {
    let egresoHTML = '';
    for (const egreso of egresos) {
        egresoHTML += crearEgresoHTML(egreso);
    }
    document.getElementById('lista-egresos').innerHTML = egresoHTML;
}

const crearEgresoHTML = (egreso) => {
    let egresoHTML = `
    <div class="elemento limpiar-estilos">
    <div class="elemento-descripcion">${egreso.descripcion}</div>
    <div class="derecha limpiar-estilos">
        <div class="elemento-valor"> - ${formatoMoneda(egreso.valor)}</div>
        <div class="elemento-porcentaje">${formatoPorcentaje(egreso.valor/totalEgresos())}</div>
            <div class="elemento-eliminar">
                <button class="elemento-eliminar--btn">
                    <ion-icon onclick="eliminarEgreso(${egreso.id})" name="close-circle-outline"></ion-icon>
                </button>
            </div>
        </div>
    </div>
    `
    return egresoHTML;
}

const eliminarEgreso = (id) => {
    let indiceEliminar = egresos.findIndex(egreso => egreso.id === id);
    egresos.splice(indiceEliminar, 1);
    cargarCabecero();
    cargarEgresos();
}


const agregarDato = () => {
    let form = document.forms['forma'];
    let tipo = forma['tipo'];
    let descripcion = forma['descripcion'];
    let valor = forma['valor'];

    if (descripcion.value != '' && valor.value != ''){
        if (tipo.value === 'ingreso'){
            ingresos.push( new Ingreso(descripcion.value, Number(valor.value)));
            cargarCabecero();
            cargarIngresos();
        } else if (tipo.value === 'egreso') {
            egresos.push ( new Egreso(descripcion.value, Number(valor.value)));
            cargarCabecero();
            cargarEgresos();
        }
    } else {
        alert('ERROR, los datos no pueden estar vacios')
    }
}