const lista = document.querySelector ('.lista')
const carrinho = document.querySelector ('.carrinho_list')
const valores = document.querySelector ('.preco')
const quantidade = document.querySelector ('.quantidade_valor')

function criarCard (produto) {
    let id                  = produto.id
    let nome                = produto.nome
    let preco               = produto.preco
    let secao               = produto.secao
    let categoria           = produto.categoria
    let image               = produto.img
    let componentes         = listaComponente(produto.componentes)
    
    let item            = document.createElement ('li')
    let img             = document.createElement ('img')
    let h3              = document.createElement ('h3')
    let span            = document.createElement ('span')
    let p               = document.createElement ('p')
    let div             = document.createElement ('div')
    let button          = document.createElement ('button')

    componentes.classList = 'componentes'
    item.classList      = 'card'
    img.src             = image
    img.title           = nome
    h3.innerText        = nome
    span.innerText      = secao
    p.innerText         = `$R ${preco}`
    button.innerText    = "Comprar"
    button.id           = id
    
    div.append (p, button)
    item.append (img, h3,span, componentes, div)

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
        return filtrarElementos("Laticinio")
    }
}

function adicionandoNaLista (listaDeProduto){
    lista.innerHTML = ""
    listaDeProduto.forEach((produto) => { let card = criarCard(produto)
    lista.append(card)}) 
}
adicionandoNaLista(produtos)

function filtrarElementos (produto){
    lista.innerHTML = ""
    valorTotal = []
    const filtragem = produtos.filter ((elemento) => {
        
        if(elemento.secao === produto){
            let card = criarCard(elemento)
            
            valorTotal.push(elemento.preco)
            // exibirValor(valorTotal.reduce((a, b) => a + b))
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

let xxx = document.querySelector ('.xxx')
function listaComponente (produto){
    let ol = document.createElement ('ol')
    produto.forEach((element, i) => {
        let li = document.createElement('li')
        li.innerText = element
        ol.append(li)
    });
    return ol
}

function listandoNoCarrinho(itens){
    
    if(listaDeCompras == ""){
        carrinho.innerHTML = `
        <div class="carrinho_vazio">
            <img src="./src/img/Empty-Box-icon.png" alt="carrinho vazio" width="75px">
            <p>Por enquanto não temos produtos no carrinho</p>
        </div>
        `
    }else if(listaComponente != ''){
        carrinho.innerHTML = ""
        itens.forEach((produto) => { let card = criarCard2(produto)
        carrinho.append(card)}) 
    }
}
listandoNoCarrinho(listaDeCompras)
function criarCard2 (produto){
    let nome                = produto.nome
    let preco               = produto.preco
    let secao               = produto.secao
    let image               = produto.img

    let li                  = document.createElement ('li')

    li.innerHTML = `
    <img src="${image}" alt="${nome}">
    <div>
        <h3>${nome}</h3>
        <span>${secao}</span>
        <p>R$ ${preco}</p>
    </div>
    <button>X</button>
    `
    return li
}

lista.addEventListener('click', comprar)

function comprar (event){
    origemClick = event.target
    if(origemClick.tagName === 'BUTTON'){
        for(let i = 0; i < produtos.length; i++){
            if(origemClick.id == produtos[i].id){
                listaDeCompras.push(produtos[i])
            }
        }
        listandoNoCarrinho(listaDeCompras)
        somarValor()
    }
}

carrinho.addEventListener ('click', removerItem)

function removerItem (event){
    origemClick = event.target
    let index
    if(origemClick.tagName == 'BUTTON'){
        
        for(let i = 0; i < listaDeCompras,length; i++){
            if(origemClick.id == listaDeCompras[i].id){
                index = i
            }  
        }
        listaDeCompras.splice(index, 1)
        listandoNoCarrinho(listaDeCompras)
        somarValor()
    }
}

function somarValor(){
    let total = 0
    let quantidadeValor = 0

    for(let i = 0; i < listaDeCompras.length; i++){
        total += Number(listaDeCompras[i].preco)
        quantidadeValor += 1
    }
    quantidade.innerText = `${quantidadeValor}`
    valores.innerText = `R$ ${total}`
}

