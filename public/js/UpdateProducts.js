window.onload = function () {

    let form = document.querySelector('#form-update-product');
    let titulo = document.querySelector('.titulo')


    form.nombre.focus();
    form.addEventListener('submit', (e) => {

        let errors = [];

        let nombre = document.getElementById('nombre');
        let errorNombre = document.getElementById('errorNombre')

        if (nombre.value == '' || nombre.length < 2) {
            errorNombre.classList.add("mostrar");
            errorNombre.classList.remove("ocultar");
            errorNombre.innerHTML = "El campo nombre no puede estar vacío y debe contener al menos 2 caracteres"

            errors.push('El campo nombre no puede estar vacío y debe contener al menos 2 caracteres');
            nombre.classList.add('is-invalid');
        } else {
            errorNombre.classList.remove('mostrar');
            errorNombre.classList.add('ocultar');

            nombre.classList.add('is-valid');
            nombre.classList.remove('is-invalid');
            form.descripcion.focus();
        };


        let descripcion = document.querySelector('#descripcion');
        let errorDescripcion = document.getElementById('errorDescripcion')

        if (descripcion.value == "" || descripcion.length < 20) {
            errorDescripcion.classList.add("mostrar");
            errorDescripcion.classList.remove("ocultar");
            errorDescripcion.innerHTML = "El campo descripción no puede estar vacío ni ser menor a 20 caracteres"

            errors.push('El campo descripción no puede estar vacío ni ser menor a 20 caracteres');
            descripcion.classList.add('is-invalid');
        } else {
            errorDescripcion.classList.remove('mostrar');
            errorDescripcion.classList.add('ocultar');

            descripcion.classList.add('is-valid');
            descripcion.classList.remove('is-invalid');
            form.marca.focus();
        };


        let marca = document.querySelector('#marca');
        let errorMarca = document.getElementById('errorMarca')

        if (marca.value == "") {
            errorMarca.classList.add("mostrar");
            errorMarca.classList.remove("ocultar");
            errorMarca.innerHTML = "El campo marca no puede estar vacío"

            errors.push('El campo marca no puede estar vacío');
            marca.classList.add('is-invalid');
        } else {
            errorMarca.classList.remove('mostrar');
            errorMarca.classList.add('ocultar');

            marca.classList.add('is-valid');
            marca.classList.remove('is-invalid');
            form.precio.focus();
        };


        let precio = document.querySelector('#precio');
        let errorPrecio = document.getElementById('errorPrecio')

        if (precio.value <= 0) {
            errorPrecio.classList.add("mostrar");
            errorPrecio.classList.remove("ocultar");
            errorPrecio.innerHTML = "El campo precio no puede ser igual o menor a 0"

            errors.push('El campo precio no puede ser igual o menor a 0');
            precio.classList.add('is-invalid');
        } else {
            errorPrecio.classList.remove('mostrar');
            errorPrecio.classList.add('ocultar');

            precio.classList.add('is-valid');
            precio.classList.remove('is-invalid');
            form.stock.focus();
        };


        let stock = document.querySelector('#stock');
        let errorStock = document.getElementById('errorStock')

        if (stock.value <= 0) {
            errorStock.classList.add("mostrar");
            errorStock.classList.remove("ocultar");
            errorStock.innerHTML = "El campo stock no puede ser 0 o menor"


            errors.push('El campo stock no puede ser 0 o menor');
            stock.classList.add('is-invalid');
        } else {
            errorStock.classList.remove('mostrar');
            errorStock.classList.add('ocultar');


            stock.classList.add('is-valid');
            stock.classList.remove('is-invalid');
            form.color.focus();
        };


        let color = document.querySelector('#color');
        let errorColor = document.getElementById('errorColor')

        if (color.value == '') {
            errorColor.classList.add("mostrar");
            errorColor.classList.remove("ocultar");
            errorColor.innerHTML = "El campo stock no puede estar vacío"



            errors.push('El campo color no puede estar vacío');
            color.classList.add('is-invalid');
        } else {
            errorColor.classList.remove('mostrar');
            errorColor.classList.add('ocultar');


            color.classList.add('is-valid');
            color.classList.remove('is-invalid');
            form.descuento.focus();
        };


        let descuento = document.querySelector('#descuento');
        let errorDescuento = document.getElementById('errorDescuento')

        if (descuento.value > 100) {
            errorDescuento.classList.add("mostrar");
            errorDescuento.classList.remove("ocultar");
            errorDescuento.innerHTML = "El campo descuento no puede ser mayor al 100%"


            errors.push('El campo descuento no puede ser mayor al 100%');
            descuento.classList.add('is-invalid');
        } else {
            errorDescuento.classList.remove('mostrar');
            errorDescuento.classList.add('ocultar');

            descuento.classList.add('is-valid');
            descuento.classList.remove('is-invalid');
            form.categoria_id.focus();
        };


        let categoria_id = document.querySelector('#categoria_id');
        let errorCategoria = document.getElementById('errorCategoria')

        if (categoria_id.value == '') {
            errorCategoria.classList.add("mostrar");
            errorCategoria.classList.remove("ocultar");
            errorCategoria.innerHTML = "El campo categoría no puede estar vacío"


            errors.push('El campo categoría no puede estar vacío');
            categoria_id.classList.add('is-invalid');
        } else {
            errorCategoria.classList.remove('mostrar');
            errorCategoria.classList.add('ocultar');

            categoria_id.classList.add('is-valid');
            categoria_id.classList.remove('is-invalid');
            form.image.focus();
        };


        let image = document.getElementById('image-product')
        var filePath = document.getElementById('image-product').value;
        let errorImage = document.getElementById("errorImage");
        var extensionesPermitidas = /(.jpg|.jpeg|.png|.gif)$/i;
        if (!extensionesPermitidas.exec(filePath) && image.value != '') {
            errorImage.classList.add("mostrar");
            errorImage.classList.remove("ocultar");
            errorImage.innerHTML = "Las extensiones permitidas son: .jpeg .jpg .png .gif";

            errors.push('Las extensiones permitidas son: .jpeg .jpg .png .gif');
            image.classList.add('is-invalid');
            image.focus();
        } else {
            errorImage.classList.remove("mostrar");
            errorImage.classList.add("ocultar");

            image.classList.add('is-valid');
            image.classList.remove('is-invalid');
        }


        if (errors.length > 0) {
            e.preventDefault();
            let listaErrores = document.querySelector('.errores');
            listaErrores.classList.add('alert-warning');
            listaErrores.innerHTML = '';
            titulo.classList.add('titulo-errores')
            titulo.innerHTML = 'Verifica los errores:'
            
            for (let i = 0; i < errors.length; i++) {
                listaErrores.innerHTML += `<li >  ${errors[i]} </li>`;
            };


        } else {
            alert('Los cambios fueron realizados')
            form.submit();
        }

    });


}