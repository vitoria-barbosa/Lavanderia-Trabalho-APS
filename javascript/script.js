const servicos = [];

function visualizarPreco() {
  const select = document.getElementById("servico");
  const opcaoSelecionada = select.options[select.selectedIndex];
  const preco = opcaoSelecionada.getAttribute("data-preco");
  if (preco) {
    document.getElementById("preco").innerText = `Preço: R$ ${preco}`;
  }
}

function adicionarDados() {
  const tipoPeca = document.getElementById("tipo-peca").value;
  const select = document.getElementById("servico");
  const servico = select.value;
  const opcaoSelecionada = select.options[select.selectedIndex];
  const preco = opcaoSelecionada.getAttribute("data-preco");

  const tbody = document.getElementById("tbody");
  const tr = document.createElement("tr");

  [tipoPeca, servico, preco].forEach((texto) => {
    const td = document.createElement("td");
    td.textContent = texto;
    tr.appendChild(td);
  });

  const servicoCriado = {
    peca: tipoPeca,
    servico: servico,
    preco: preco,
  };

  servicos.push(servicoCriado);
  tbody.appendChild(tr);
}

function recibo(event) {
  event.preventDefault();

  const recibo = document.getElementById("recibo");
  recibo.style.display = "block";

  recibo.innerHTML = "";

  const nomeCliente = document.getElementById("nome-cliente").value;
  const telefone = document.getElementById("tel").value;

  const titulo = document.createElement("h2");
  titulo.textContent = "Valor Total:";
  recibo.appendChild(titulo);

  const pNome = document.createElement("p");
  pNome.textContent = `Nome: ${nomeCliente}`;
  recibo.appendChild(pNome);

  const pTel = document.createElement("p");
  pTel.textContent = `Tel: ${telefone}`;
  recibo.appendChild(pTel);

  let total = 0;

  servicos.forEach((servico) => {
    const p = document.createElement("p");
    p.textContent = `${servico.peca} - ${servico.servico}: R$ ${servico.preco}`;
    recibo.appendChild(p);

    total += parseFloat(servico.preco);
  });

  const pTotal = document.createElement("p");

  if (total > 100) {
    total *= 0.9;
    pTotal.textContent = `Total com desconto de 10%: R$ ${total.toFixed(2)}`;
  } else {
    pTotal.textContent = `Total: R$ ${total.toFixed(2)}`;
  }

  pTotal.className = "total";
  recibo.appendChild(pTotal);

  const acoes = document.createElement("div");
  acoes.className = "acoes";

  const cancelar = document.createElement("button");
  cancelar.textContent = "Cancelar Pedido";
  cancelar.className = "button-submit";
  cancelar.style.backgroundColor = "red";
  cancelar.style.color = "white";
  cancelar.onclick = () => {
    recibo.style.display = "none";
    limparPedido();
  };

  const confirmar = document.createElement("button");
  confirmar.textContent = "Confirmar Pedido";
  confirmar.className = "button-submit";
  confirmar.style.backgroundColor = "green";
  confirmar.style.color = "white";
  confirmar.onclick = () => {
    alert("Pedido confirmado!");
    recibo.style.display = "none";
    limparPedido();
  };

  acoes.appendChild(cancelar);
  acoes.appendChild(confirmar);
  recibo.appendChild(acoes);
}

function limparPedido() {
  const tbody = document.getElementById("tbody");
  tbody.innerHTML = "";

  servicos.length = 0;

  document.getElementById("nome-cliente").value = "";
  document.getElementById("tel").value = "";
  document.getElementById("tipo-peca").value = "Roupa Normal";
  document.getElementById("servico").value = "Lavar";
}
