window.onload = function () {
    let form = document.querySelector('#create-product-form');
    let titulo = document.querySelector('.titulo')
    form.nombre.focus();
    form.addEventListener('submit', (e) => {
        let errors = [];
        let nombre = document.querySelector('#nombre');
        let descripcion = document.querySelector('#descripcion');
        let marca = document.querySelector('#marca');
        let precio = document.querySelector('#precio');
        let stock = document.querySelector('#stock');
        let color = document.querySelector('#color');
        let descuento = document.querySelector('#descuento');
        let categoria_id = document.querySelector('#categoria_id');
        let image = document.getElementById('image-product')
        if (nombre.value == '' || nombre.length < 2) {
            errors.push('El campo nombre no puede estar vacío y debe contener al menos 2 caracteres');
            nombre.classList.add('is-invalid');
        } else {
            nombre.classList.add('is-valid');
            nombre.classList.remove('is-invalid');
            form.descripcion.focus();
        };
        if (descripcion.value == "" || descripcion.length < 20) {
            errors.push('El campo descripción no puede estar vacía ni ser menor a 20 caracteres');
            descripcion.classList.add('is-invalid');
        } else {
            descripcion.classList.add('is-valid');
            descripcion.classList.remove('is-invalid');
            form.marca.focus();
        };
        if (marca.value == "") {
            errors.push('El campo marca no puede estar vacío');
            marca.classList.add('is-invalid');
        } else {
            marca.classList.add('is-valid');
            marca.classList.remove('is-invalid');
            form.precio.focus();
        };
        if (precio.value <= 0) {
            errors.push('El campo precio no puede ser igual o menor a 0');
            precio.classList.add('is-invalid');
        } else {
            precio.classList.add('is-valid');
            precio.classList.remove('is-invalid');
            form.stock.focus();
        };
        if (stock.value <= 0) {
            errors.push('El campo stock no puede ser menor a 0');
            stock.classList.add('is-invalid');
        } else {
            stock.classList.add('is-valid');
            stock.classList.remove('is-invalid');
            form.color.focus();
        };
        if (color.value == '') {
            errors.push('El campo color no puede estar vacío');
            color.classList.add('is-invalid');
        } else {
            color.classList.add('is-valid');
            color.classList.remove('is-invalid');
            form.descuento.focus();
        };
        if (descuento.value > 100) {
            errors.push('El campo descuento no puede ser mayor al 100%');
            descuento.classList.add('is-invalid');
        } else {
            descuento.classList.add('is-valid');
            descuento.classList.remove('is-invalid');
            form.categoria_id.focus();
        };
        if (categoria_id.value == '') {
            errors.push('El campo categoría no puede estar vacío');
            categoria_id.classList.add('is-invalid');
        } else {
            categoria_id.classList.add('is-valid');
            categoria_id.classList.remove('is-invalid');
        };
        if (errors.length > 0) {
            e.preventDefault();
            let ulErrors = document.querySelector('.errores');
            ulErrors.classList.add('alert-warning');
            ulErrors.innerHTML = '';
            titulo.classList.add('titulo-errores')
            titulo.innerHTML = 'Errores'
            for (let i = 0; i < errors.length; i++) {
                ulErrors.innerHTML += `<li >  ${errors[i]} </li>`;
            };
        } else {
            alert('Los cambios fueron realizados')
            form.submit();
        }
    });
}












