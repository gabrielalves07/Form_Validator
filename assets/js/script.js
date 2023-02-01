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
    }

    isValid(){
        let valid = true;

        for(let errorText of this.formulario.querySelectorAll('.div_erro')){
            errorText.remove();
        }

        for(let campo of this.formulario.querySelectorAll('.campo')){
            const label = campo.previousElementSibling;
            // campo vazio
            if(!campo.value){
                this.erro(campo, `campo "${label.innerHTML}" não pode estar vazio`);
                valid = false;
            }
        }
        return valid;
    }

    erro(campo, msg){
        let div = document.createElement('div');
        div.innerHTML = `<p>${msg}</p>`;
        div.classList.add('div_erro');
        campo.insertAdjacentElement('afterend', div);
    }
}

const formulario = new Formulario();