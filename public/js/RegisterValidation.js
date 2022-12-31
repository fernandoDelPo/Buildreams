window.onload = function(){

//------DESDE AQUÍ CONTINUE CON LAS VALIDACIONES DEL FORMULARIO -------//   
    form.addEventListener('submit', (e) => {
        let form = document.querySelector('.create-form');
        form.nombre.focus();
        
        let errors = [];

        let nombre = document.querySelector('#nombre');
        let nick = document.querySelector('#nick');
        let email = document.querySelector('#e-mail');
        let country = document.querySelector('#country');
        let image = document.querySelector('#image');
        let password = document.querySelector('#password');
        let repassword = document.querySelector('#repassword')
        
        if (nombre.value == '') {
            errors.alert('Debes completar el campo.');
            nombre.classList.add('is-invalid');
        } else {
            nombre.classList.add('is-valid');
            nombre.classList.remove('is-invalid');
            form.nick.focus();
        };
        if (nick.value == '') {
            errors.alert('El nick no puede estar vacío');
            nick.classList.add('is-invalid');
        } else {
            nick.classList.add('is-valid');
            nick.classList.remove('is-invalid');
            form.email.focus();
        };
        if (email.value == '') {
            errors.alert('El campo enail no puede estar vacío');
            email.classList.add('is-invalid');
        } else {
            email.classList.add('is-valid');
            email.classList.remove('is-invalid');
            form.country.focus();
        };
        if (country.value == "") {
            errors.alert('El campo país no puede estar vacio');
            country.classList.add('is-invalid');
        } else {
            country.classList.add('is-valid');
            country.classList.remove('is-invalid');
            form.image.focus();
        };
        if (image.value == "") {
            errors.alert('Se debe colocar una imagen');
            image.classList.add('is-invalid');
        } else {
            image.classList.add('is-valid');
            image.classList.remove('is-invalid');
            form.password.focus();
        };
        if (password.value == '') {
            errors.alert('El campo titulo no puede estar vacío');
            password.classList.add('is-invalid');
        } else {
            password.classList.add('is-valid');
            password.classList.remove('is-invalid');
            form.repassword.focus();
        };
        if (repassword.value == '') {
            errors.alert('El campo titulo no puede estar vacío');
            repassword.classList.add('is-valid');
        } else {
            repassword.classList.add('is-valid');
            repassword.classList.remove('is-invalid');
        };
          //Aquí controlo que es lo que debo hacer si hay o no errores en el formulario

        if (errors.length > 0) {
            e.preventDefault();
            let ulErrors = document.querySelector('.errores');
            ulErrors.classList.add('alert-warning');
            ulErrors.innerHTML = '';
            for (let i = 0; i < errors.length; i++) {
                ulErrors.innerHTML += `<li >  ${errors[i]} </li>`;
            };
        }else{
            alert('La validación fué exitosa')
            form.submit();
        }
        })
}