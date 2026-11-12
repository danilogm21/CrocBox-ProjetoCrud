(function(){ //Caixa 3d interativa gemini
  var stage = document.getElementById('stage');
  var rig = document.getElementById('rig');
  var calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (stage && rig) {
    function toggle(){
      var open = stage.classList.toggle('open');
      stage.setAttribute('aria-pressed', open);
    }
    stage.addEventListener('click', toggle);
    stage.addEventListener('keydown', function(e){
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle();
      }
    });

    /* Inclina a caixa seguindo o cursor */
    if (!calm) {
      stage.addEventListener('pointermove', function(e){
        if (e.pointerType === 'touch') return;
        var r = stage.getBoundingClientRect(),
            dx = (e.clientX - r.left) / r.width - 0.5,
            dy = (e.clientY - r.top) / r.height - 0.5;
        rig.style.setProperty('--ry', (-28 + dx * 30) + 'deg');
        rig.style.setProperty('--rx', (-22 - dy * 16) + 'deg');
      });
      stage.addEventListener('pointerleave', function(){
        rig.style.removeProperty('--ry');
        rig.style.removeProperty('--rx');
      });
    }
  }

  /* Marca automaticamente o link da página atual no menu como active */
  var currentPath = window.location.pathname.split('/').pop();
  if (currentPath) {
    var navLinks = document.querySelectorAll('header a');
    navLinks.forEach(function(link){
      var href = link.getAttribute('href');
      if (href === currentPath) {
        link.classList.add('active');
      } else if (href && !href.startsWith('#')) {
        link.classList.remove('active');
      }
    });
  }
})();

function mascara_telefone()
{
    var telefone = document.getElementById("telefone").value
    console.log(telefone)
    telefone = telefone.slice(0,20)

    var telefone_formatado = document.getElementById("telefone").value
    if (telefone_formatado[0]!="+")
    {
        if (telefone_formatado[0]!=undefined)
        {
            document.getElementById("telefone").value="+"+telefone_formatado[0];
        }
    }

    if (telefone_formatado[3]!=" ")
    {
        if (telefone_formatado[3]!=undefined)
        {
            document.getElementById("telefone").value=telefone_formatado.slice(0,3)+" "+telefone_formatado[3];
        }
    }

    if (telefone_formatado[4]!="(")
    {
        if (telefone_formatado[4]!=undefined)
        {
            document.getElementById("telefone").value=telefone_formatado.slice(0,4)+"("+telefone_formatado[4];
        }
    }

    if (telefone_formatado[7]!=")")
    {
        if (telefone_formatado[7]!=undefined)
            {
                document.getElementById("telefone").value=telefone_formatado.slice(0,7)+")"+telefone_formatado[7];
            }
    }

    if (telefone_formatado[8]!=" ")
    {
        if (telefone_formatado[8]!=undefined)
        {
            document.getElementById("telefone").value=telefone_formatado.slice(0,8)+" "+telefone_formatado[8];
        }
    }

    if (telefone_formatado[10]!=" ")
    {
        if (telefone_formatado[10]!=undefined)
        {
            document.getElementById("telefone").value=telefone_formatado.slice(0,10)+" "+telefone_formatado[10];
        }
    }

    if (telefone_formatado[15]!="-")
    {
        if (telefone_formatado[15]!=undefined)
        {
            document.getElementById("telefone").value=telefone_formatado.slice(0,15)+"-"+telefone_formatado[15];
        }
    }
}

document.addEventListener("DOMContentLoaded", function() {
  const botoesFiltro = document.querySelectorAll('.filtros-pedidos button');
  const listaPedidos = document.querySelectorAll('.card-pedido');

  // Verifica se estamos na página de pedidos antes de executar
  if (botoesFiltro.length > 0) {
    botoesFiltro.forEach(botao => {
      botao.addEventListener('click', function() {
        
        // Remove a classe 'ativo' de todos os botões e adiciona só no que foi clicado
        botoesFiltro.forEach(b => b.classList.remove('ativo'));
        this.classList.add('ativo');

        // Pega o texto do botão clicado para saber qual é o filtro
        const textoFiltro = this.textContent.trim().toLowerCase();

        // Passa por cada pedido escondendo ou mostrando conforme o filtro
        listaPedidos.forEach(pedido => {
          // Se clicou em "Todos", mostra todos os pedidos
          if (textoFiltro === 'todos') {
            pedido.style.display = 'block';
          } 
          // Se clicou em "Em Andamento", mostra apenas os que têm a classe 'preparo'
          else if (textoFiltro === 'em andamento') {
            if (pedido.classList.contains('preparo')) {
              pedido.style.display = 'block';
            } else {
              pedido.style.display = 'none';
            }
          } 
          // Se clicou em "Entregues", mostra apenas os que têm a classe 'entregue'
          else if (textoFiltro === 'entregues') {
            if (pedido.classList.contains('entregue')) {
              pedido.style.display = 'block';
            } else {
              pedido.style.display = 'none';
            }
          }
        });
      });
    });
  }
});

document.addEventListener("DOMContentLoaded", function() {
  const inputbusca = document.getElementById('input-busca');
  if (inputbusca){
    inputbusca.addEventListener('input', function() {
      const termobusca = this.value.toLowerCase().trim();
      const boxes = document.querySelectorAll('.container-boxes > div');

      boxes.forEach(box =>{
        const textobox = box.textContent.toLocaleLowerCase();
        if (textobox.includes(termobusca)){ // Verifica se o texto do card inclui o que foi digitado na busca
          box.style.display = ''; // Mostra o card
        } else {
          box.style.display = 'none'; // Esconde o card se não corresponder
        }
      });
    });
  }
});

document.addEventListener("DOMContentLoaded", function(){//tema claro e escuro 
  const btnTema = document.getElementById('btn-tema');
  const temaSalvo = localStorage.getItem('tema_crocbox');
  
  if (temaSalvo === 'claro'){
    document.body.classList.add('light-mode');
  }
  
  if (btnTema){
    btnTema.addEventListener('click', function(){
      document.body.classList.toggle('light-mode');
      
      if (document.body.classList.contains('light-mode')){
        localStorage.setItem('tema_crocbox', 'claro');
      } else {
        localStorage.setItem('tema_crocbox', 'escuro');
      }
    });
  }
});

//Claude pagina de pedidos
// Tabela de produtos baseada no banco de dados CrocBox
const BOXES = {
  solo: { id: 1, nome: "Solo Box", descricao: "Tiras de frango crocantes, batata rústica e 1 molho.", preco: 24.90 },
  duo: { id: 2, nome: "Duo Box", descricao: "Coxas e sobrecoxas empanadas, batata rústica e 2 molhos.", preco: 44.90 },
  mega: { id: 3, nome: "Mega Box", descricao: "Frango picotado, batata rústica e 4 molhos.", preco: 79.90 },
  burguer: { id: 4, nome: "Burguer Box", descricao: "Burger de frango crocante, queijo, tomate, batata e refrigerante.", preco: 32.90 }
};

let boxSelecionada = BOXES.solo;
let qtdBox = 1;

document.addEventListener("DOMContentLoaded", () => {
  carregarBoxDaURL();
  configurarEventos();
  atualizarValores();
});

// Pega o parametro ?box= da URL (ex: pedir.html?box=mega)
function carregarBoxDaURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const tipoBox = urlParams.get("box");

  if (tipoBox && BOXES[tipoBox]) {
    boxSelecionada = BOXES[tipoBox];
  }

  document.getElementById("titulo-box").innerText = boxSelecionada.nome.toUpperCase();
  document.getElementById("descricao-box").innerText = boxSelecionada.descricao;
  document.getElementById("nome-resumo").innerText = boxSelecionada.nome;
  document.getElementById("preco-box").innerText = `R$ ${boxSelecionada.preco.toFixed(2).replace(".", ",")}`;
}

function configurarEventos() {
  // Alterar quantidade principal da Box
  document.getElementById("btn-menos").addEventListener("click", () => {
    if (qtdBox > 1) {
      qtdBox--;
      document.getElementById("quantidade").innerText = qtdBox;
      atualizarValores();
    }
  });

  document.getElementById("btn-mais").addEventListener("click", () => {
    qtdBox++;
    document.getElementById("quantidade").innerText = qtdBox;
    atualizarValores();
  });

  // Alterar quantidade de adicionais (+ e -)
  document.querySelectorAll(".btn-aumentar-extra").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const span = e.target.parentElement.querySelector(".qtd-extra");
      span.innerText = parseInt(span.innerText) + 1;
      atualizarValores();
    });
  });

  document.querySelectorAll(".btn-diminuir-extra").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const span = e.target.parentElement.querySelector(".qtd-extra");
      const val = parseInt(span.innerText);
      if (val > 0) {
        span.innerText = val - 1;
        atualizarValores();
      }
    });
  });

  // Botão para disparar o download do JSON
  document.getElementById("btn-baixar-json").addEventListener("click", gerarEBaixarJSON);
}

function calcularTotalAdicionais() {
  let totalAdicionais = 0;
  document.querySelectorAll(".linha-extra").forEach(linha => {
    const preco = parseFloat(linha.getAttribute("data-preco"));
    const qtd = parseInt(linha.querySelector(".qtd-extra").innerText);
    totalAdicionais += preco * qtd;
  });
  return totalAdicionais;
}

function atualizarValores() {
  const valorAdicionais = calcularTotalAdicionais();
  const totalGeral = (boxSelecionada.preco * qtdBox) + valorAdicionais;

  document.getElementById("valor-adicionais").innerText = `R$ ${valorAdicionais.toFixed(2).replace(".", ",")}`;
  document.getElementById("total-valor").innerText = `R$ ${totalGeral.toFixed(2).replace(".", ",")}`;
}

// Gera e faz download do arquivo JSON pronto para importar no C#
function gerarEBaixarJSON() {
  const itensPedido = [];
  
  // 1. Adiciona a Box escolhida
  itensPedido.push({
    produto_id: boxSelecionada.id,
    nome_Produto: boxSelecionada.nome,
    quantidade: qtdBox,
    preco_unidade: boxSelecionada.preco
  });

  // 2. Adiciona os adicionais selecionados (se houver)
  document.querySelectorAll(".linha-extra").forEach(linha => {
    const id = parseInt(linha.getAttribute("data-id"));
    const nome = linha.getAttribute("data-nome");
    const preco = parseFloat(linha.getAttribute("data-preco"));
    const qtd = parseInt(linha.querySelector(".qtd-extra").innerText);

    if (qtd > 0) {
      itensPedido.push({
        produto_id: id,
        nome_Produto: nome,
        quantidade: qtd,
        preco_unidade: preco
      });
    }
  });

  const totalGeral = (boxSelecionada.preco * qtdBox) + calcularTotalAdicionais();

  // Estrutura compativel com o PedidoSite do C#
  const dadosPedido = [
    {
      usuario_id: 1,
      valor_Total: parseFloat(totalGeral.toFixed(2)),
      status_Pedido: "Pendente",
      itens: itensPedido
    }
  ];

  // Dispara o download no navegador
  const jsonStr = JSON.stringify(dadosPedido, null, 4);
  const blob = new Blob([jsonStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `pedido_${boxSelecionada.nome.toLowerCase().replace(" ", "")}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  document.getElementById("aviso").innerText = "JSON baixado com sucesso! Agora importe no C#.";
}