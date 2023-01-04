window.onload = function () {
    let form = document.getElementById('login-form');
    let titulo = document.querySelector('.titulo')

    form.email.focus();

    form.addEventListener('submit', (e) => {
        
        let errors = [];

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
        }

        
        if (errors.length > 0) {
            e.preventDefault();

            let listaErrores = document.getElementById('errores');
            

            listaErrores.classList.add('alert-warning');
            listaErrores.innerHTML = '';
            titulo.classList.add('titulo-errores')
            titulo.innerHTML = 'Verifica los errores:'

            for (let i = 0; i < errors.length; i++) {
                listaErrores.innerHTML += `<li>  ${errors[i]} </li>`;
    
            };

        } else {
            form.submit();
        }
    });

}