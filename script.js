// Criando variáveis para selecionar elementos específicos da página HTML
let imgBox = document.querySelector("#imgBox");
let qrImage = document.querySelector("#qrImage");
let qrText = document.querySelector("#qrText");
let btnBaixar = document.querySelector('#btnBaixar');
let download150 = document.querySelector("#download150");
let download300 = document.querySelector("#download300");
let download600 = document.querySelector("#download600");

// Criação da função principal
function generateQR() {
    // Cria a URL para o QR Code em tamanho 150x150 usando o valor inserido no campo de texto
    let qrURL = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + encodeURIComponent(qrText.value);
    qrImage.src = qrURL;
    
    // Define a imagem do QR Code
    qrImage.onload = function() {
        // Exibe o contêiner(imagem) do QR Code e o botão(Baixar) para abrir o modal de download
        imgBox.classList.remove("d-none");
        btnBaixar.classList.remove("d-none");

        // Configura os botões de download para os diferentes tamanhos
        setupDownloadButton(download150, 150);
        setupDownloadButton(download300, 300);
        setupDownloadButton(download600, 600);
    }

    // Função Auxiliar(download)
    function setupDownloadButton(button, size){
        // Cria a URL para o QR Code no tamanho especificado
        let qrURL = "https://api.qrserver.com/v1/create-qr-code/?size=" + size + "x" + size + "&data=" + encodeURIComponent(qrText.value);
        
        
        fetch(qrURL) // realiza uma requisição HTTP para a URL
          .then(response => response.blob()) // Converte a resposta em um blob
          .then(blob => {
            // Cria uma URL de objeto para o blob
            const url = URL.createObjectURL(blob);
            button.href = url; // Define a URL de objeto como o atributo `href` do botão
  
            // Limpa a URL de objeto após 1 minuto para liberar a memória
            setTimeout(() => {
              URL.revokeObjectURL(url);
            }, 60000); // 1 minuto
          })
          //
          .catch(console.error); // Loga erros, caso haja
      }
}