let codigo = document.getElementById('codigo')
let produto = document.getElementById('produto')
let marca = document.getElementById('marca')
let modelo = document.getElementById('modelo')
let valor = document.getElementById('valor')
let quantidade = document.getElementById('quantidade')
let res = document.getElementById('res')
let lista = document.getElementById('listaSelect')
let cadastros = [ ] //vetor que irá guardar os objetos "novoCadastro"

function excluirSelecionado(){
   if(lista.length == 0){
      window.alert('Não há ítens a serem apagados.');
   }else{
      const select = document.forms.myForm.listaSelect;
      select.remove(select.selectedIndex);
   }
}

function finalizar() {
   // Recupera os dados armazenados no localStorage
   const dadosAntigosString = localStorage.getItem('meuArray');
   
   // Verifica se existem dados armazenados
   if (dadosAntigosString) {
     // Se existirem, converte a string JSON em um array e mescla com o novo array
     const dadosAntigos = JSON.parse(dadosAntigosString);
     cadastros = [...dadosAntigos, ...cadastros];
   }
   
   // Transforma o array mesclado em uma string JSON
   const arrayString = JSON.stringify(cadastros);
   
   // Armazena a string JSON no localStorage
   localStorage.setItem('meuArray', arrayString);
   
   // Limpa o array original
   cadastros.length = 0;
   reinicia()
   excluirTodos()
}

function listarEstoque() {
   if(typeof(Storage) !== "undefined"){
       let produtos = localStorage.getItem("produtos");
       document.write("<h1>Estoque:</h1>")
       if (produtos == null)
           document.write("<h3>Ainda não há nenhum item no estoque</h3>");
           else{
               produtos = JSON.parse(produtos);
               produtos.forEach(produto => {
                   document.write("<ul>");
                   document.write("<li>Nome do produto: "+produto.nome+"</li>");
                   document.write("<li>Código do produto:"+produto.codigo+"</li>");
                   document.write("<li>Quantidade no estoque:" +produto.quantidade+"</li>");
                   document.write("</ul>");
               })
           }
   }
   else alert("A versão do seu navegador é muito antiga. Poe isso, não será possível visualizar o estoque!")
}

function limparLocalStorage() {
   localStorage.clear();
}

function excluirTodos() {
   if(lista.length == 0){
      window.alert('Não há ítens a serem apagados.');
   }else{
      const select = document.forms.myForm.listaSelect;
      while (select.length > 0) {
      select.remove(0);
      }
   }
}

 function incluir(){
   if (codigo.value != '' && produto.value != ''  &&  marca.value != '' &&  valor.value >=1 && quantidade.value >=1)
   {  
      let novoCadastro = {  //criação de um objeto com as características dos produtos
         codigoPRDT: codigo.value,
         nomePRDT: produto.value,
         marcaPRDT: marca.value,
         modeloPRDT: modelo.value,
         valorPRDT: valor.value,
         quantidadePRDT: quantidade.value,
      };

      cadastros.push(novoCadastro) // o objeto é adicionado ao array cada vez que clica-se no botão incluir, e assim, enviar ao localstorage, ou banco de dados, via JSON
      
      let itemadicionado = document.createElement('option')
      itemadicionado.text = `Cdg: ${codigo.value} ; Prdt: ${produto.value} ;  Mrc: ${marca.value} Mdl: ${modelo.value} ; Vlr: R$${valor.value} ; Qtd: ${quantidade.value}`

      lista.appendChild(itemadicionado)
      reinicia()
   }
}

function reinicia(){
   produto.value = ''
   codigo.value = ''
   marca.value = ''
   modelo.value = ''
   valor.value = ''
   quantidade.value = ''
   codigo.focus()
}