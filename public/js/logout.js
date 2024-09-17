const logout = document.getElementById('logout');

logout.addEventListener('click', async (e) => {
    e.preventDefault(); // Evita comportamento padrão do link ou botão, se houver

    try {
        const response = await fetch('/api/auth/logout', { method: 'POST' });
        
        // Verifica se a resposta foi bem-sucedida
        if (response.ok) {
            const result = await response.json();
            alert(result.message); // Mostra a mensagem de sucesso
            window.location.href = '/'; // Redireciona para o índice
        } else {
            // Se a resposta não foi bem-sucedida, mostra uma mensagem de erro
            const error = await response.json();
            alert(`Erro: ${error.message || 'Erro desconhecido'}`);
        }
    } catch (error) {
        // Captura e exibe erros de rede ou outros problemas
        alert(`Erro ao tentar fazer logout: ${error.message}`);
    }
});
