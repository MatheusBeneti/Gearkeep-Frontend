document.addEventListener("DOMContentLoaded", function () {
    const searchButton = document.getElementById("searchButton");
    const deleteButton = document.getElementById("deleteButton");
    const updateButton = document.getElementById("updateButton");
    const inputsToDisable = document.querySelectorAll(
      "#searchForm .form-control:not(#inputId), #searchForm button:not(#searchButton)"
    );
  
    searchButton.addEventListener("click", function () {
      const inputId = document.getElementById("inputId").value;
      // Substitua a URL pela sua API real
      fetch(`https://gearkeep-sistema-para-gerenciamento-de-estoque.vercel.app/peca/${inputId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          if (data) {
            console.log("data:", data);
            // Supondo que "data" é o objeto com as informações da peça
            document.getElementById("inputNomePeca").value = data.nomePeca || "";
            document.getElementById("inputMarca").value = data.marca || "";
            document.getElementById("inputDataaquisicao").value =
              data.dataAquisicao || "";
            document.getElementById("inputQuantidade").value =
              data.quantidade || "";
            document.getElementById("inputPreco").value = data.preco || "";
  
            inputsToDisable.forEach((input) => (input.disabled = false));
          } else {
            alert("ID não encontrado.");
            inputsToDisable.forEach((input) => (input.disabled = true));
          }
        })
        .catch((error) => {
          console.error("Erro ao buscar o ID:", error);
        });
    });
  
    updateButton.addEventListener("click", function () {
      const id = document.getElementById("inputId").value;
      const nomePeca = document.getElementById("inputNomePeca").value;
      const marca = document.getElementById("inputMarca").value;
      const dataAquisicao = document.getElementById("inputDataaquisicao").value;
      const quantidade = document.getElementById("inputQuantidade").value;
      const preco = document.getElementById("inputPreco").value;
  
      const data = {
        id: id,
          nomePeca: nomePeca,
          marca: marca,
          dataAquisicao: dataAquisicao,
          quantidade: quantidade,
          preco: preco
      };
      fetch(`https://gearkeep-sistema-para-gerenciamento-de-estoque.vercel.app/peca/${id}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(data => {
          console.log('Atualização bem-sucedida:', data);
          alert('Atualização bem-sucedida');
          
      })
      .catch(error => {
          console.error('Erro durante a atualização:', error);
      });
    });


    deleteButton.addEventListener("click", function () {
      const id = document.getElementById("inputId").value;
      
      fetch(`https://gearkeep-sistema-para-gerenciamento-de-estoque.vercel.app/peca/${id}`, {
          method: 'DELETE'
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.json();
      })
      .then(() => {
          console.log('Exclusão bem-sucedida');
          alert('Exclusão bem-sucedida');
      })
      .catch(error => {
          console.error('Erro durante a exclusão:', error);
      });
    });
  });