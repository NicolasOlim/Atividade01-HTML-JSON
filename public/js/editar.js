const form_edit = document.getElementById('editar_filme');
const url = new URLSearchParams(window.location.search);
const id_url = url.get('id');

let titulo = document.getElementById('titulo');
let diretor = document.getElementById('diretor');
let ano = document.getElementById('ano');
let aluguel = document.getElementById('aluguel');
let capa = document.getElementById('poster');

document.addEventListener('DOMContentLoaded', async () => {  

    const response = await fetch('api/paginas');
    const filmes = await response.json();
    const filme = filmes.find(filme => filme.id == id_url);

    if (filme) {
        id.value = filme.id;
        titulo.value = filme.titulo;
        diretor.value = filme.diretor;
        ano.value = filme.ano;
        aluguel.value = filme.aluguel; 
    } else {
        alert("Filme não encontrado!!");
        window.location.href = '/listar';
    }

});

form_edit.addEventListener('submit', async (e) => {

    e.preventDefault();

    const att_dados = new FormData();

    att_dados.append('titulo', titulo.value);
    att_dados.append('diretor', diretor.value);
    att_dados.append('ano', ano.value);
    att_dados.append('aluguel', aluguel.value);
    
    // Caso seja adicionado uma nova imagem
    if (img_prod.files.length > 0) {
        att_dados.append('poster', capa.files[0]);
    }

    await fetch(`/api/paginas/${id.value}`, {
        method: 'PUT',
        body: att_dados,
    });

    alert("Filme editado com sucesso!!");
    window.location.href = '/listar';

});