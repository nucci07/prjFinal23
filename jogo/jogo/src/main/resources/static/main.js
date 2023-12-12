
function cadastrarJogo() {
    const name = document.getElementById('name').value;
    const plataform = document.getElementById('plataform').value;
    const imagemFile = document.getElementById('thumbnail').files[0];

    const formData = new FormData();
    formData.append('name', name);
    formData.append('plataform', plataform);
    formData.append('genero', genero);
    formData.append('squadname', squadname);
    formData.append('thumbnail', imagemFile);

    fetch('http://localhost:8080/jogos/create', {
        method: 'POST',
        body: formData,
    })
        .then(response => response.json())
        .then(data => {
            alert('Jogo cadastrado com sucesso!');
            document.getElementById('cadastroForm').reset();
             location.reload();
        })
        .catch(error => {
            console.error('Erro ao cadastrar jogo:', error);
        });
}

function pesquisarJogo() {
    const searchId = document.getElementById('searchId').value;

    fetch(`http://localhost:8080/jogos/${searchId}`)
        .then(response => {
            if (response.status === 404) {
                return Promise.reject('Jogo não encontrado');
                result = 0;
            }
            return response.json();
        })
        .then(data => {
			result = 1;
			document.getElementById('name').value = `${data.name}`;
            document.getElementById('plataform').value = `${data.plataform}`;
            document.getElementById('genero').value = `${data.genero}`;
            document.getElementById('squadname').value = `${data.squadname}`;
            const resultadoPesquisa = document.getElementById('resultadoPesquisa');
            resultadoPesquisa.innerHTML = `
                <h3>ID: ${data.id}</h3>
                <img src="data:thumbnail/jpeg;base64,${data.thumbnail}" alt="thumbnail do Jogo">            
            `;
        })
        .catch(error => {
            console.error('Erro ao pesquisar jogo:', error);
            const resultadoPesquisa = document.getElementById('resultadoPesquisa');
            resultadoPesquisa.innerHTML = 'Jogo não encontrado. Inserir ID válido';
            var timer = window.setTimeout(atualizarPagina, 3000);
        });
}

function excluirJogo() {
    pesquisarJogo();
    if (result == 1) {
        const searchId = document.getElementById('searchId').value;

        fetch(`http://localhost:8080/jogos/${searchId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                if (response.status === 200) {
                    alert('Jogo apagado com sucesso!');
                    document.getElementById('cadastroForm').reset();
                    location.reload();
                } else if (response.status === 404) {
                    alert('ID não encontrado na base de dados. Nenhum jogo foi apagado.');
                } else {
                    alert('Erro ao apagar jogo. Status HTTP: ' + response.status);
                }
            })
            .catch(error => {
                console.error('Erro ao apagar jogo:', error);
            });
    } else {
        alert('ID não encontrado na base de dados. Nenhum jogo foi apagado.');
    }
}