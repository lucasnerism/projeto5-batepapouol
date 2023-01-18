let user;
let touser = 'Todos';
let typemsg = 'message';
let usuario;

function entrarUser() {
  usuario = {
    name: user
  };
  const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', usuario);
  promise.then(checkUser);
  promise.catch(falhaLogin);
}

function checkUser(dados) {
  if (dados.data === "OK") {
    checkStatus();
    setInterval(checkStatus, 5000);
  }
}

function falhaLogin() {
  user = prompt('Já existe um usuário com esse nome, por favor escolha outro nome');
  entrarUser();
}


function checkStatus() {
  axios.post('https://mock-api.driven.com.br/api/v6/uol/status', usuario);
}

function mensagens() {
  const promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
  promise.then(atualizarMensagens);
}

function atualizarMensagens(dados) {
  const timeline = document.querySelector('lu');

  for (let i = 0; i < dados.data.length; i++) {
    if (dados.data[i].type === 'status') {
      timeline.innerHTML += `<li class="mensagem presenca" data-test="message">
          <p>
            <span class="hora">(${dados.data[i].time}) </span
            ><span class="user">${dados.data[i].from} </span>${dados.data[i].text}
          </p>
        </li>`;
    } else if (dados.data[i].type === 'private_message') {
      timeline.innerHTML += `<li class="mensagem private" data-test="message">
    <p>
      <span class="hora">(${dados.data[i].time}) </span
      ><span class="user">${dados.data[i].from} </span>reservadamente para 
      <span class="user">${dados.data[i].to}: </span>${dados.data[i].text}
    </p>
    </li>`;
    } else {
      timeline.innerHTML += `<li class="mensagem" data-test="message">
    <p>
      <span class="hora">(${dados.data[i].time}) </span
      ><span class="user">${dados.data[i].from} </span>para 
      <span class="user">${dados.data[i].to}: </span>${dados.data[i].text}
    </p>
    </li>`;
    }
  }
  timeline.lastChild.scrollIntoView();
}

function enviarMensagem() {
  const msg = document.querySelector('input').value;
  let mensagem = {
    from: `${user}`,
    to: `${touser}`,
    text: msg,
    type: typemsg
  };
  const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', mensagem);
  promise.then(mensagens);
  promise.catch(erro);
}

function enviarPorEnter(event) {
  let x = event.code;
  if (x === "Enter") {
    enviarMensagem();
  }
}


function erro() {
  window.location.reload();
}

user = prompt('Qual o seu nome?');
entrarUser();
mensagens();
setInterval(mensagens, 3000);