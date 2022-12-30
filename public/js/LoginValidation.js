window.onload = function(){

    form.addEventListener('submit', (e) =>{
        let form = document.querySelector('.login-form');

        let errors = [];

        let email = document.querySelector('#e-mail');
        let password = document.querySelector('#password');

        if (email.value == '') {
            errors.push('Debes ingresar un email para logearte');

        };

        if (password.value == '') {
            errors.push('Debes ingresar la contraseña correspondiente para logearte');

        };

        if (errors.length > 0) {
            e.preventDefault();

            let ulErrors = document.querySelector('div.errores ul');

            ulErrors.classList.add('alert-warning');

            for (let i = 0; i < errors.length; i++) {
                ulErrors.innerHTML += `<li>  ${errors[i]} </li>`;
            };

        }else{
            alert('La validación fué exitosa')

            form.submit();
        }
    })


}