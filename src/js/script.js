const lista = document.querySelector ('.lista')
let valorTotal = []
const valores = document.querySelector ('.valorTotal')

function criarCard (produto) {
    nome                = produto.nome
    preco               = produto.preco
    secao               = produto.secao
    categoria           = produto.categoria
    image               = produto.img

    let item = document.createElement ('li')
    item.innerHTML = `
        <img src="${image}" alt="Imagem ${nome}">
        <h3>${nome}</h3>
        <span>${secao}</span>
        <p>R$ ${preco}</p>
    `
    return item
}

const button =document.querySelector ('.filtersContainer')

button.addEventListener ('click', filtrar)

function filtrar (evento) {
    btn = evento.target
    if(btn.innerText === "Todos Produtos"){
        
        return adicionandoNaLista(produtos)
    }else if(btn.innerText === "Hortifruti"){
        return filtrarElementos("Hortifruti")

    }else if(btn.innerText === "Panificadora"){
        return filtrarElementos("Panificadora")

    }else if(btn.innerText === "Laticínios"){
        return filtrarElementos("Laticínio")
    }
}

function adicionandoNaLista (listaDeProduto){
    lista.innerHTML = ""
    valorTotal = []
    listaDeProduto.forEach((produto) => { let card = criarCard(produto)
        valorTotal.push(produto.preco)
    lista.append(card)}) 
    exibirValor(valorTotal.reduce((a, b) => a + b))
    
}
adicionandoNaLista(produtos)

function filtrarElementos (produto){
    lista.innerHTML = ""
    valorTotal = []
    const filtragem = produtos.filter ((elemento) => {
        
        if(elemento.secao === produto){
            let card = criarCard(elemento)
            
            valorTotal.push(elemento.preco)
            exibirValor(valorTotal.reduce((a, b) => a + b))
            return lista.append(card)
        }
    })
    return filtragem
}

const pesquisar = document.querySelector ('.containerBuscaPorNome')
const pesquisaInput = document.querySelector ('.campoBuscaPorNome')
pesquisar.addEventListener ('click', filtrarNome)

function filtrarNome (evento){
    const btnPesquisa = evento.target
    
    if(btnPesquisa.tagName === "IMG" || btnPesquisa.tagName === "BUTTON"){
       filtroNome(produtos, pesquisaInput.value)
       pesquisaInput.value = ""
    }
}

function filtroNome (listaDeProduto, nomeProduto){
    lista.innerHTML = ""
    valorTotal = []
    const produtoNome = listaDeProduto.filter ((elemento) => {
        if(elemento.nome.toLowerCase().includes(nomeProduto.toLowerCase())){
            valorTotal.push(elemento.preco)
            exibirValor(valorTotal.reduce((a, b) => a + b))
            let card = criarCard(elemento)
            return lista.append(card)
        }
    })
    return produtoNome
}

function atualizarValor (){
   let precos = produtos.map((elemento) => {
    return elemento.preco
   })
   return precos
}

// function callbackReduce (a , b){
//     return a + b
// }

// function reduce (){
// const imprimir = valorTotal.reduce((elemento, index,) => {
//     for(let i = 0; i < valorTotal.length; i++){
//         return callbackReduce (elemento, index)
//     }
// })
// return imprimir
// }

function exibirValor (valor){
    valores.innerText = `R$ ${valor}`
}