const listarFTable = document.getElementById('listarfilmes');

document.addEventListener('DOMContentLoaded', async () => {

    const response = await fetch('/api/paginas/');
    const filmes = await response.json();
    listarfilmes(filmes); 

});

const listarfilmes = (filmes) => {

    listarFTable.innerHTML = '';
    filmes.forEach(filme => {
        const tr = document.createElement('tr');

        const td_id = document.createElement('td');
        td_id.textContent = filme.id;
        tr.appendChild(td_id);

        const td_titulo = document.createElement('td');
        td_titulo.textContent = filme.titulo;
        tr.appendChild(td_titulo);

        const td_diretor = document.createElement('td');
        td_diretor.textContent = filme.diretor;
        tr.appendChild(td_diretor);

        const td_aluguel = document.createElement('td');
        td_aluguel.textContent = `R$ ${filme.aluguel.toFixed(2)}`;
        tr.appendChild(td_aluguel);

        const td_ano = document.createElement('td');
        td_ano.textContent = filme.ano;
        td_ano.classList.add('text-center');
        tr.appendChild(td_ano);

        const td_img = document.createElement('td');
        if (filme.poster) {
            const img = document.createElement('img');
            img.src = filme.poster;
            img.alt = filme.titulo;
            img.width = 100; // Definindo o tamanho da imagem
            td_img.appendChild(img);
        }
        tr.appendChild(td_img);

        const td_acao = document.createElement('td');
        let btnEditar = document.createElement('a');
        btnEditar.classList.add('btn', 'btn-success', 'me-3');
        btnEditar.href = `editar.html?id=${filme.id}`;
        btnEditar.textContent = 'Editar';
        td_acao.appendChild(btnEditar);

        let btnExcluir = document.createElement('button');
        btnExcluir.classList.add('btn', 'btn-warning', 'me-3');
        btnExcluir.textContent = 'Revomer';
        btnExcluir.dataset.id = filme.id;
        btnExcluir.dataset.name = filme.titulo;
        td_acao.appendChild(btnExcluir);
        td_acao.classList.add('text-center');


        tr.appendChild(td_acao);

        listarFTable.appendChild(tr);

    });

};

const delFilme = async (id) => {
    await fetch(`/api/paginas/${id}`, {
        method: 'DELETE',
    });

    window.location.href = '/listar'

    exibirfilmes();
};

document.addEventListener('click', (e) => {
    let result = e.target.classList.contains('btn-warning');
    if (result) {
       const id_ex = e.target.getAttribute('data-id');
       const nome_ex = e.target.getAttribute('data-name');
       let ok = confirm(`Tem certeza que deseja excluir o produto: ${nome_ex}?`);
       if (ok) {
        delFilme(id_ex);
       } else {
        exibirfilmes();
       }      
    }
    
});