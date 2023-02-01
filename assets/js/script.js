class Formulario{
    constructor(){
        this.formulario = document.querySelector(".form");
        this.eventos();
    }

    eventos(){
        this.formulario.addEventListener("submit", e => {
            this.handleSubmit(e);
        });
    }

    handleSubmit(e){
        e.preventDefault();
        let valid = this.isValid(); // deve retornar true ou false
        if(valid) {
            alert('Formulário enviado');
            this.formulario.submit();
        }
    }

    isValid(){
        // caso alguma posição deste array for avaliada em false o formulário não é enviado.
        let valid = true;

        for(let errorText of this.formulario.querySelectorAll('.div_erro')){
            errorText.remove();
        }

        // campos vazios
        for(let campo of this.formulario.querySelectorAll('.campo')){
            const label = campo.previousElementSibling;
            // campo vazio
            if(!campo.value){
                Formulario.erro(campo, `Campo "${label.innerHTML}" não pode estar vazio`);
                valid = false;
            }
            // validar cpf
            if(campo.classList.contains('cpf')){
                if(Formulario.validacaoCpf(campo) === false) valid = false;
            }
            // validar usuario
            if(campo.classList.contains('user')){
                if(Formulario.validaUser(campo) === false) valid = false;
            }   
        }
        
        // vlidar senhas
        if(Formulario.validaSenha(this.formulario.querySelectorAll('.senha')) === false) valid = false;

        return valid;
    }

    static erro(campo, msg){
        let div = document.createElement('div');
        div.innerHTML = `<p>${msg}</p>`;
        div.classList.add('div_erro');
        campo.insertAdjacentElement('afterend', div);
    }

    static validacaoCpf(campo){
        const validarCpf = new ValidaCPF(campo.value);
        if(validarCpf.valida() === false) Formulario.erro(campo, `CPF inválido`);
        return validarCpf.valida();
    }

    static validaUser(campo){
        let valid = true;
        if(!campo.value.match(/^[a-zA-Z0-9]+$/g)){
            Formulario.erro(campo, `Usuário só poderá conter letras e números`);
            valid = false;
        }

        if(campo.value.length < 3 || campo.value.length > 12){
            Formulario.erro(campo, `Usuário deve conter entre 3 e 12 caractéres`);
            valid = false;
        }
        return valid;
    }

    static validaSenha(arraySenha){
        let valid = true;

        for(let campoSenha of arraySenha){
            if(campoSenha.value.length < 6 || campoSenha.value.length > 12){
                Formulario.erro(campoSenha, `Senha deve conter entre 6 e 12 caractéres`);
                valid = false;
            }
        }
        if(arraySenha[0].value !== arraySenha[1].value){
            Formulario.erro(arraySenha[1], `Senhas não convergem entre em si`);
            valid = false;
        }
        return valid;
    }
}

const formulario = new Formulario();