const input = document.getElementById("inputLine")
const pantalla = document.getElementById("pantalla") 
const consola = document.getElementById("cons") 
const date = document.getElementById("date")


 


date.innerHTML = new Date().toDateString()

input.addEventListener("keydown",(event) => {
    if(event.key === "Enter"){
        addToLine(event.target.value)
        commandSelector(event.target.value)
        input.value =""
        input.scrollIntoView({block:'start'})
    }


});


function commandSelector(elemento){

    const lElemento = elemento.toUpperCase()
    switch(lElemento){
        case "USD": 
            showRate(lElemento);
            break
        case "EUR": 
            showRate(lElemento);
            break
        case "GBP": 
            showRate(lElemento);
            break
        case "CLEAR": 
            clearConsole();
            break
        case "HELP":
            openHelp()
            break
        default:
            if(elemento !== ""){
                errorMsg(elemento);
            }  
    }
}


// Llama a  fetch 
function showRate(elem){
    
    fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
        .then(response => response.json())
        .then(data => printValue(data,elem)) 


}

function printValue(data,curr){

    const exchange = document.getElementById("exchange").cloneNode(true)
    exchange.classList.remove("hidden")
    exchange.innerHTML = `1 BTC = ${data.bpi[curr].rate_float} ${curr}`
    pantalla.appendChild(exchange)
    console.log(data)

}

function addToLine(text){

    const inputClone = document.getElementById("promptClone").cloneNode(true)
    inputClone.classList.remove("hidden")
    inputClone.getElementsByClassName("inputClone")[0].innerHTML = text
    pantalla.appendChild(inputClone)

}

function openHelp(){

    const helpClone = document.getElementById("help").cloneNode(true)
    helpClone.classList.remove("hidden")
    pantalla.appendChild(helpClone)

}

function errorMsg(elemento){

    const mensaje=   `<span class="danger"> error: ${elemento} not a command  </span> `
    addToLine(mensaje)

}

function clearConsole(){

    pantalla.innerHTML = ""

}