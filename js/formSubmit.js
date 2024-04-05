document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('gearForm');
  
    form.addEventListener('submit', function(e) {
      e.preventDefault(); // Impede o comportamento padrão de envio do formulário
  
      // Captura os valores do formulário
      const formData = {
        id: document.getElementById('inputId').value,
        nomePeca: document.getElementById('inputNomePeca').value,
        marca: document.getElementById('inputMarca').value,
        dataAquisicao: document.getElementById('inputDataaquisicao').value,
        quantidade: document.getElementById('inputQuantidade').value,
        preco: document.getElementById('inputPreco').value
      };
      
      console.log(formData)
      // Envia os dados para a API
      fetch('http://localhost:3000/peca', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Converte os dados do formulário para JSON
      })
      .then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        // Aqui você pode adicionar qualquer ação após o sucesso do envio
        alert("Peça adicionada com sucesso");
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    });
  });

  