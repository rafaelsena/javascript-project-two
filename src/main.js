/**
 * @author Rafael Sena <rafaelsena@gmail.com>
 * @version 0.0.1
 * @description simple example of GitHub REST API query and reply rendering
 */


/** GitHub REST API basic setting */
import api from './api'

/** App class. */
class App{

    /**
     * Create the app and set basic params.
    */
    constructor(){
        this.repositorios = [];
        this.formulario = document.querySelector('form');
        this.lista = document.querySelector(".list-group");
        this.registrarEventos();
    }
    /**
     * Trigger the repo adding when the form is submitted.
    */
    registrarEventos(){
        this.formulario.onsubmit = (evento) => this.adicionarRepositorio(evento);
    }

    /**
     * Add new repo assyncronously 
     * @param {event} evento 
     */
    async adicionarRepositorio(evento){

        //avoid the submission of the page (default actions is not taken)
        evento.preventDefault();

        let input = document.querySelector('#repositorio').value;
        
        //show loading message
        this.apresentarBuscando(input)

        //try to get the repo's info 
        try{
            let response = await api.get(`/repos/${input}`);

            let { name, description, html_url, owner: {avatar_url} } = response.data;
        
            this.repositorios.push({
                nome: name,
                descricao: description,
                avatar_url: avatar_url,
                link: html_url,
            });

            //renders the new data
            this.renderizarTela();

        // if the attempt fails, show error message
        } catch(erro){
            let er = this.lista.querySelector('.list-group-item-danger');
            if (er !== null){
                this.lista.removeChild(er);
            }

            this.lista.removeChild(document.querySelector('.list-group-item-warning'));
            let li = document.createElement('li');
            li.setAttribute('class', 'list-group-item list-group-item-danger');

            let txtErro = document.createTextNode(`O repositório ${input} não existe.`);

            li.appendChild(txtErro);
            this.lista.appendChild(li);
        }
    }

    /**
     * Render a loading message
     * @param {string} input 
     */
    apresentarBuscando(input){        
        let li = document.createElement('li');
        li.setAttribute('class', 'list-group-item list-group-item-warning');

        let txtBuscando = document.createTextNode(`Aguarde, buscando repositório ${input}...`);
        
        li.appendChild(txtBuscando);
        this.lista.appendChild(li);
    }

    /**
     * Render the page (firt load and uploads)
     */
    renderizarTela(){
        //clean content to avoid to show old data
        this.lista.innerHTML = '';
       
        //set the html for each repo
        this.repositorios.forEach(repositorio => {
            let li = document.createElement('li');
            li.setAttribute('class', 'list-group-item list-group-item-action');

            let img = document.createElement('img');
            img.setAttribute('src', repositorio.avatar_url);

            li.appendChild(img);
            
            let strong = document.createElement('strong');
            let txtNome = document.createTextNode(repositorio.nome);
            strong.appendChild(txtNome);
            li.appendChild(strong);
           
            let p = document.createElement('p');
            let txtDescricao = document.createTextNode(repositorio.descricao);
            p.appendChild(txtDescricao);
            li.appendChild(p);
        
            let a = document.createElement('a');
            a.setAttribute('target', '_blank');
            a.setAttribute('href', repositorio.link);
            let txtA = document.createTextNode('Acessar');
            a.appendChild(txtA);
            li.appendChild(a);
           
            this.lista.appendChild(li);
            
            this.formulario.querySelector('input[id=repositorio]').value = '';           
            this.formulario.querySelector('input[id=repositorio]').focus();
        });
    }
}


//stat a new app
new App();
