let codigo = document.getElementById('codigo');
let produto = document.getElementById('produto');
let marca = document.getElementById('marca');
let modelo = document.getElementById('modelo');
let valor = document.getElementById('valor');
let quantidade = document.getElementById('quantidade');
let res = document.getElementById('res');
let lista = document.getElementById('listaSelect');
let cadastros = [];

function buscarProduto() {
   const codigoPesquisa = document.getElementById('codigo').value;
   if (codigoPesquisa) {
     autocompleteCodigo(codigoPesquisa);
   } else {
     alert('Por favor, preencha o campo "Código" antes de pesquisar.');
   }
 }
 
 function autocompleteCodigo(codigoPesquisa) {
   const produtoEncontrado = findProdutoByCodigo(codigoPesquisa);
   if (produtoEncontrado) {
     preencherCampos(produtoEncontrado);
   } else {
    document.getElementById('produto').value = '';
    document.getElementById('marca').value = '';
    document.getElementById('modelo').value = '';
    document.getElementById('quantidade').value = '';
    document.getElementById('valor').value = '';
    document.getElementById('produto').focus();
   }
 }
 
 function findProdutoByCodigo(codigoPesquisa) {
   const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
   return produtos.find((produto) => produto.codigoPRDT === codigoPesquisa);
 }
 
 function preencherCampos(produto) {
   document.getElementById('codigo').value = produto.codigoPRDT;
   document.getElementById('produto').value = produto.nomePRDT;
   document.getElementById('marca').value = produto.marcaPRDT;
   document.getElementById('modelo').value = produto.modeloPRDT;
   document.getElementById('valor').focus();
 }
 

 function incluir() {
   // Verificar se todos os campos foram preenchidos
   if (codigo.value === '' || produto.value === '' || marca.value === '' || valor.value === '' || quantidade.value === '') {
     alert('Preencha todos os campos antes de incluir um novo produto.');
     return;
   }
   
   // Verificar se o valor e a quantidade são maiores que 0
   if (valor.value <= 0 || quantidade.value <= 0) {
     alert('O valor e a quantidade devem ser maiores que 0.');
     return;
   }
 
   // Criando objeto que representa o novo produto
   let novoCadastro = {
     codigoPRDT: codigo.value,
     nomePRDT: produto.value,
     marcaPRDT: marca.value,
     modeloPRDT: modelo.value,
     valorPRDT: valor.value,
     quantidadePRDT: quantidade.value,
   };
 
   // Adicionando o objeto ao vetor de cadastros
   cadastros.push(novoCadastro);
 
   // Criando elemento <option> e adicionando ao select
   let itemadicionado = document.createElement('option');
   itemadicionado.text = `Cdg: ${codigo.value} ; Prdt: ${produto.value} ;  Mrc: ${marca.value} Mdl: ${modelo.value} ; Vlr: R$${valor.value} ; Qtd: ${quantidade.value}`;
   lista.appendChild(itemadicionado);
 
   // Resetando campos do formulário
   reinicia();
 }
 

function finalizar() {
   if (cadastros.length === 0) {
     window.alert('Não há produtos para cadastrar!');
     return;
   }
 
  // Recupera os dados armazenados no localStorage
  const dadosAntigosString = localStorage.getItem('produtos');

  // Verifica se existem dados armazenados
  if (dadosAntigosString) {
    // Se existirem, converte a string JSON em um array e mescla com o novo array
    const dadosAntigos = JSON.parse(dadosAntigosString);
    cadastros = [...dadosAntigos, ...cadastros];
  }

  // Transforma o array mesclado em uma string JSON
  const arrayString = JSON.stringify(cadastros);

  // Armazena a string JSON no localStorage
  localStorage.setItem('produtos', arrayString);

  // Limpa o array original
  cadastros.length = 0;
  window.alert('Todos os produtos foram cadastrados com sucesso!')
  reinicia();
  excluirTodos();
}

function listarEstoque() {
  if (typeof Storage !== 'undefined') {
    let produtos = localStorage.getItem('produtos');
    document.write('<h1>Estoque:</h1>');
    if (produtos == null) document.write('<h3>Ainda não há nenhum item no estoque</h3>');
    else {
      produtos = JSON.parse(produtos);
      produtos.forEach(produto => {
        document.write('<ul>');
        document.write('<li>Nome do produto: ' + produto.nome + '</li>');
        document.write('<li>Código do produto:' + produto.codigo + '</li>');
        document.write('<li>Quantidade no estoque:' + produto.quantidade + '</li>');
        document.write('</ul>');
      });
    }
  } else alert('A versão do seu navegador é muito antiga. Por isso, não será possível visualizar o estoque!');
}

function excluirTodos() {
   if(lista.length == 0){
      window.alert('Não há ítens a serem apagados.');
   }else{
      const select = document.forms.myForm.listaSelect;
      while (select.length > 0) {
        select.remove(0);
      }
      cadastros.splice(0, cadastros.length); // Limpando o vetor "cadastros"
   }
}

function excluirSelecionado(){
   if(lista.length == 0){
      window.alert('Não há ítens a serem apagados.');
   }else{
      const select = document.forms.myForm.listaSelect;
      select.remove(select.selectedIndex);
      cadastros.splice(select.selectedIndex, 1); // Removendo o item selecionado do vetor "cadastros"
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
   cadastros.splice(0, cadastros.length); // Limpando o vetor "cadastros"
}

 