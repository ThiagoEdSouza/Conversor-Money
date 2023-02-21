const button = document.getElementById("convert-button") // Cria a variável para o botão conversor
const select = document.getElementById("currency-select")



const convertValues = async () => { // Cria a função assíncrona para conversão dos valores
    const inputReais = document.getElementById('input-real').value // Declara a variável para capturar o valor digitado.
    const realValueText = document.getElementById('real-value-text')
    const currencyValueText = document.getElementById('currency-value-text')

    const data = await fetch("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL").then( response => response.json()) // Biblioteca para acesso da api de cotação dos valores das moedas.

    const dolar = data.USDBRL.high
    const euro = data.EURBRL.high
    const bitcoin = data.BTCBRL.high // Puxando os valores da API.

    realValueText.innerHTML = new Intl.NumberFormat('pt-BR', {
        style: 'currency', currency: 'BRL', // Função para formatar a moeda a ser convertida.
    }).format(inputReais);


    if (select.value === "US$ - Dólar americano") {
        currencyValueText.innerHTML = new Intl.NumberFormat('en-US', {
            style: 'currency', currency: 'USD', // Função para formatar a moeda a ser convertida.
        }).format(inputReais / dolar);
    }

    if(select.value === "€ - Euro") {
        currencyValueText.innerHTML = new Intl.NumberFormat('de-DE', {
            style: 'currency', currency: 'EUR', // Função para formatar a moeda a ser convertida.
        }).format(inputReais / euro);
    }
    
    if(select.value === "Bitcoin") {
        currencyValueText.innerHTML = new Intl.NumberFormat('de-DE', {
            style: 'currency', currency: 'BTC', // Função para formatar a moeda a ser convertida.
        }).format(inputReais / bitcoin);
    
    }
    

};

const changeCurrency = () => { // Função para operar em caso de mudança do select.
    const currencyName = document.getElementById('currency-name') // Chama a variável do nome da moeda.
    const currencyImg = document.getElementById('currency-img') // Chama a variável da imagem da moeda.

    if (select.value === "€ - Euro") { // Em caso de selecionada a moeda Euro.
        currencyName.innerHTML = "Euro" // Altera o nome da moeda.
        currencyImg.src = "./assets/euro.png" //Altera a imagem da moeda.

    } else if (select.value === "Bitcoin") { // Em caso de selecionada a moeda Bitcoin.
        currencyName.innerHTML = "Bitcoin" // Altera o nome da moeda.
        currencyImg.src = "./assets/bitcoin.png" //Altera a imagem da moeda.
    } else if (select.value === "US$ - Dólar americano") { // Em caso de selecionada a moeda Dólar americano.
        currencyName.innerHTML = "Dólar Americano" // Altera o nome da moeda.
        currencyImg.src = "./assets/eua.png" //Altera a imagem da moeda.
    }

    convertValues() //Já chama a função anterior para alterar o valor convertido assim que mudar a moeda.
}

button.addEventListener("click", convertValues)
select.addEventListener("change", changeCurrency)
