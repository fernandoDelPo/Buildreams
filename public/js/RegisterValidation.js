window.onload = function(){
    let titulo = document.querySelector('.register');
    titulo.classList.add('Registrarse');

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
            errors.push('Debes completar el campo.');
            nombre.classList.add('es inválido');
        } else {
            nombre.classList.add('es válido');
            nombre.classList.remove('es inválido');
            form.nick.focus();
        };
        if (nick.value == '') {
            errors.push('El nick no puede estar vacío');
            nick.classList.add('es inválido');
        } else {
            nick.classList.add('es válido');
            nick.classList.remove('es inválido');
            form.email.focus();
        };
        if (email.value == '') {
            errors.push('El campo enail no puede estar vacío');
            email.classList.add('es inválido');
        } else {
            email.classList.add('es válido');
            email.classList.remove('es inválido');
            form.country.focus();
        };
        if (country.value == "") {
            errors.push('El campo país no puede estar vacio');
            country.classList.add('es inválido');
        } else {
            country.classList.add('es válido');
            country.classList.remove('es inválido');
            form.image.focus();
        };
        if (image.value == "") {
            errors.push('Se debe colocar una imagen');
            image.classList.add('es invalido');
        } else {
            image.classList.add('es valido');
            image.classList.remove('es invalido');
            form.password.focus();
        };
        if (password.value == '') {
            errors.push('El campo titulo no puede estar vacío');
            password.classList.add('es inválido');
        } else {
            password.classList.add('es válido');
            password.classList.remove('es inválido');
            form.repassword.focus();
        };
        if (repassword.value == '') {
            errors.push('El campo titulo no puede estar vacío');
            repassword.classList.add('es válido');
        } else {
            repassword.classList.add('es válido');
            repassword.classList.remove('es inválido');
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