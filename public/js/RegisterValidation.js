window.onload = function () {
    let form = document.querySelector('#register');
    form.addEventListener('submit', (e) => {
        form.nombre.focus();

        let errors = [];

        let nombre = document.querySelector('#nombre');
        let nick = document.querySelector('#nick');
        let email = document.querySelector('#e-mail');
        let country = document.querySelector('#country');
        let image = document.querySelector('#image');
        let password = document.querySelector('#password');
        let repassword = document.querySelector('#rePassword')

        if (nombre.value == '' || nombre.length < 2) {
            errors.push('Debes completar el nombre campo y debe tener más de 2 caracteres');
            nombre.classList.add('is-invalid');
        } else {
            nombre.classList.add('is-valid');
            nombre.classList.remove('is-invalid');
            form.nick.focus();
        };
        if (nick.value == '') {
            errors.push('El nick o alias no puede estar vacío');
            nick.classList.add('is-invalid');
        } else {
            nick.classList.add('is-valid');
            nick.classList.remove('is-invalid');
            form.email.focus();
        };
        if (email.value == '') {
            errors.push('El campo email no puede estar vacío');
            email.classList.add('is-invalid');
        } else {
            email.classList.add('is-valid');
            email.classList.remove('is-invalid');
            form.country.focus();
        };
        if (country.value == "") {
            errors.push('Debes seleccionar un país ya que no puede estar vacio');
            country.classList.add('is-invalid');
        } else {
            country.classList.add('is-valid');
            country.classList.remove('is-invalid');
            form.image.focus();
        };
        if (image.value == "") {
            errors.push('Debes colorar una imagen de perfil');
            image.classList.add('is-invalid');
        } else {
            image.classList.add('is-valid');
            image.classList.remove('is-invalid');
            form.password.focus();
        };
        if (password.value == '') {
            errors.push('Debes escribir una contraseña');
            password.classList.add('is-invalid');
        } else {
            password.classList.add('is-valid');
            password.classList.remove('is-invalid');
            form.repassword.focus();
        };
        if (repassword.value == '') {
            errors.push('Debes volver a escribir la contraseña');
            repassword.classList.add('is-valid');
        } else {
            repassword.classList.add('is-valid');
            repassword.classList.remove('is-invalid');
        };
        //Aquí controlo que es lo que debo hacer si hay o no errores en el formulario

        if (errors.length > 0) {
            e.preventDefault();

            let ulErrors = document.querySelector('div.errores ul');

            ulErrors.classList.add('push-warning');

            ulErrors.innerHTML = '';
            for (let i = 0; i < errors.length; i++) {
                ulErrors.innerHTML += `<li >  ${errors[i]} </li>`;
            };
        } else {

            form.submit();
        }

    })
}