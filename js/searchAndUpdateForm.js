document.addEventListener('DOMContentLoaded', function () {
    const searchButton = document.getElementById('searchButton');
    const inputsToDisable = document.querySelectorAll('#searchForm .form-control:not(#inputId), #searchForm button:not(#searchButton)');

    searchButton.addEventListener('click', function() {
        const inputId = document.getElementById('inputId').value;
        // Substitua a URL pela sua API real
        fetch(`http://localhost:3000/peca/${inputId}`, )
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (data) {

                    console.log('data:', data);
                    // Supondo que "data" é o objeto com as informações da peça
                    document.getElementById('inputNomePeca').value = data.nomePeca || '';
                    document.getElementById('inputMarca').value = data.marca || '';
                    document.getElementById('inputDataaquisicao').value = data.dataAquisicao || '';
                    document.getElementById('inputQuantidade').value = data.quantidade || '';
                    document.getElementById('inputPreco').value = data.preco || '';

                    inputsToDisable.forEach(input => input.disabled = false);
                } else {
                    alert('ID não encontrado.');
                    inputsToDisable.forEach(input => input.disabled = true);
                }
            })
            .catch(error => {
                console.error('Erro ao buscar o ID:', error);
            });
    });
});
