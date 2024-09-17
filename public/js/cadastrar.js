const cadastro = document.getElementById('cadastro');

let titulo = document.getElementById('titulo');
let diretor = document.getElementById('diretor');
let classificacao = document.getElementById('classificacao');
let ano = document.getElementById('ano');
let aluguel = document.getElementById('aluguel');
let poster = document.getElementById('poster');


cadastro.addEventListener('submit', async (e) => {
    
    e.preventDefault();

    const carregarDados = new FormData();
    carregarDados.append('titulo', titulo.value);
    carregarDados.append('diretor', diretor.value);
    carregarDados.append('ano', ano.value); 
    carregarDados.append('aluguel', aluguel.value);
    carregarDados.append('poster', poster.files[0]); 

   


    await fetch('/api/paginas', {
        method: 'POST',
        body: carregarDados,
    });

    window.location.href = '/admin';

});
