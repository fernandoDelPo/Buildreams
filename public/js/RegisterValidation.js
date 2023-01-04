window.onload = function () {

    let form = document.getElementById('reg-form');
    let titulo = document.querySelector('.titulo');
    
      
    
    form.addEventListener('submit', (e) => {
        form.nombre.focus();

        let errors = [];

        let nombre = document.querySelector('#nombre');
        let errorNombre = document.getElementById('errorNombre');

        if (nombre.value == '' || nombre.value.length < 2) {
            errorNombre.classList.add('mostrar')
            errorNombre.classList.remove('ocultar')
            errorNombre.innerHTML = 'Debes ingresar un nombre para registrarte y debe contener 2 o más caracteres'

            errors.push('Debes ingresar un nombre para registrarte y debe contener 2 o más caracteres');
            nombre.classList.add('is-invalid');
        } else {
            errorNombre.classList.remove('mostrar');
            errorNombre.classList.add('ocultar');

            nombre.classList.add('is-valid');
            nombre.classList.remove('is-invalid');
            form.nick.focus();
        };

        let nick = document.querySelector('#nick');
        let nickError = document.getElementById('errorNick');

        if (nick.value == '') {
            errorNick.classList.add('mostrar')
            errorNick.classList.remove('ocultar')
            errorNick.innerHTML = 'Debes ingresar un alias para registrarte'

            errors.push('Debes ingresar un alias para registrarte');
            nick.classList.add('is-invalid');
        } else {
            errorNick.classList.remove('mostrar');
            errorNick.classList.add('ocultar');

            nick.classList.add('is-valid');
            nick.classList.remove('is-invalid');
            form.email.focus();
        };


        let email = document.querySelector('#e-mail');
        let errorEmail = document.getElementById('errorEmail')

        const caracteresEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)+\.\S+/.test(email.value)

        if (email.value == '') {
            errorEmail.classList.add('mostrar')
            errorEmail.classList.remove('ocultar')
            errorEmail.innerHTML = 'Debes ingresar un email para logearte'

            errors.push('Debes ingresar un email para logearte');
            email.classList.add('is-invalid');


        } else if (!caracteresEmail) {
            errorEmail.classList.add('mostrar')
            errorEmail.classList.remove('ocultar')
            errorEmail.innerHTML = 'El formato ingresado no se corresponde con un e-mail'

            errors.push('El formato ingresado no se corresponde con un e-mail');
            email.classList.add('is-invalid');
            email.classList.remove('is-valid');


        } else {
            errorEmail.classList.remove('mostrar')
            errorEmail.classList.add('ocultar')

            email.classList.add('is-valid');
            email.classList.remove('is-invalid');
            form.password.focus();
        };


        let country = document.querySelector('#country');
        let errorCountry = document.getElementById('errorCountry');

        if (country.value == "") {
            errorCountry.classList.add("mostrar");
            errorCountry.classList.remove("ocultar");
            errorCountry.innerHTML = "El campo país no puede estar vacio"


            errors.push('El campo país no puede estar vacio');
            country.classList.add('is-invalid');
        } else {
            errorCountry.classList.remove('mostrar');
            errorCountry.classList.add('ocultar');


            country.classList.add('is-valid');
            country.classList.remove('is-invalid');
            form.image.focus();
        };


        let image = document.getElementById('image')
        let filePath = document.getElementById('image').value;
        let errorImage = document.getElementById("errorImage");
        let extensionesPermitidas = /(.jpg|.jpeg|.png|.gif)$/i;
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
            form.password.focus();
        }

        let password = document.getElementById('password');
        let errorPassword = document.getElementById('errorPassword')
        const caracteresPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/.test(password.value)
        if (password == '') {
            errorPassword.classList.add("mostrar");
            errorPassword.classList.remove("ocultar");
            errorPassword.innerHTML = "Debes ingresar la contraseña correspondiente para logearte"


            errors.push('Debes ingresar la contraseña correspondiente para logearte');
            password.classList.add('is-invalid');


        } else if (password.length < 8) {
            errorPassword.classList.add("mostrar");
            errorPassword.classList.remove("ocultar");
            errorPassword.innerHTML = "Debe contener al menos un número, mayúsculas y minúsculas, mínimo 8 o más caracteres"

            errors.push('La contraseña debe contener al menos un número, mayúsculas y minúsculas, mínimo 8 o más caracteres');
            password.classList.add('is-invalid');
            password.classList.remove('is-valid');


        } else if (!caracteresPassword) {
            errorPassword.classList.add("mostrar");
            errorPassword.classList.remove("ocultar");
            errorPassword.innerHTML = "Debe contener al menos un número, mayúsculas y minúsculas, mínimo 8 o más caracteres"

            errors.push('La contraseña debe contener al menos un número, mayúsculas y minúsculas, mínimo 8 o más caracteres');
            password.classList.add('is-invalid');
            password.classList.remove('is-valid');

        } else {
            errorPassword.classList.remove('mostrar');
            errorPassword.classList.add('ocultar');

            password.classList.add('is-valid');
            password.classList.remove('is-invalid');
            form.rePassword.focus();
        };


    
        let rePassword = document.getElementById('rePassword');
        let errorRePassword = document.getElementById('errorRePassword');

        if (rePassword.value !== password.value) {
            errorRePassword.classList.add('mostrar')
            errorRePassword.classList.remove('ocultar')
            errorRePassword.innerHTML = 'Las contraseñas no coinciden'

            errors.push('La contraseña debe contener al menos un número, mayúsculas y minúsculas, mínimo 8 o más caracteres');
            rePassword.classList.add('is-invalid');
            rePassword.classList.remove('is-valid');
        } else {
            errorRePassword.classList.remove('mostrar')
            errorRePassword.classList.add('ocultar')

            rePassword.classList.add('is-valid');
            rePassword.classList.remove('is-invalid');
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
            form.submit();
        }
    })
}