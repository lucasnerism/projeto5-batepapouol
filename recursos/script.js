let user;
let touser = 'Todos';
let typemsg = 'message';
let usuario;



function mensagens() {
  const promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
  promise.then(atualizarMensagens);
  promise.catch(erro);
}

function atualizarMensagens(dados) {
  const timeline = document.querySelector('lu');

  for (let i = 0; i < dados.data.length; i++) {
    if (dados.data[i].type === 'status') {
      timeline.innerHTML += `<li class="mensagem presenca">
          <p>
            <span class="hora">(${dados.data[i].time}) </span
            ><span class="user">${dados.data[i].from} </span>${dados.data[i].text}
          </p>
        </li>`;
    } else if (dados.data[i].type === 'private_message') {
      timeline.innerHTML += `<div class="mensagem private">
    <p>
      <span class="hora">(${dados.data[i].time}) </span
      ><span class="user">${dados.data[i].from} </span>reservadamente para 
      <span class="user">${dados.data[i].to}: </span>${dados.data[i].text}
    </p>
    </div>`;
    } else {
      timeline.innerHTML += `<div class="mensagem private">
    <p>
      <span class="hora">(${dados.data[i].time}) </span
      ><span class="user">${dados.data[i].from} </span>para 
      <span class="user">${dados.data[i].to}: </span>${dados.data[i].text}
    </p>
    </div>`;
    }
  }
  timeline.lastChild.scrollIntoView();
}

function erro() {
  window.location.reload();
}



mensagens();
setInterval(mensagens, 300);