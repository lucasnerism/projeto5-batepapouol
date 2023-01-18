let user;
let touser = 'Todos';
let typemsg = 'message';
let usuario;
const elemento = document.querySelector('.enviandoPara');

function entrarUser() {
  user = document.querySelector('.tela-login input').value;
  usuario = {
    name: user
  };
  const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', usuario);
  promise.then(checkUser);
  promise.catch(falhaLogin);
  document.querySelector('.tela-login button').style.display = "none";
  document.querySelector('.tela-login input').style.display = "none";
  document.querySelector('.carregando').classList.remove("escondido");
}

function checkUser(dados) {
  checkStatus();
  setInterval(checkStatus, 5000);
  atualizarLista();
  setInterval(atualizarLista, 10000);
  mensagens();
  setInterval(mensagens, 3000);
  document.querySelector('.tela-login').classList.add('escondido');
}

function falhaLogin() {
  user = document.querySelector('.tela-login input').value;
  document.querySelector('.tela-login p').innerHTML = 'Já existe um usuário com esse nome, por favor escolha outro nome';
  document.querySelector('.tela-login button').style.display = "initial";
  document.querySelector('.tela-login input').style.display = "initial";
  document.querySelector('.carregando').classList.add("escondido");
}

function checkStatus() {
  axios.post('https://mock-api.driven.com.br/api/v6/uol/status', usuario);
}

function mensagens() {
  const promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
  promise.then(atualizarMensagens);
}

function atualizarMensagens(dados) {
  const timeline = document.querySelector('main > lu');
  timeline.innerHTML = "";
  for (let i = 0; i < dados.data.length; i++) {
    if (dados.data[i].type === 'status') {
      timeline.innerHTML += `<li class="mensagem presenca" data-test="message">
          <p>
            <span class="hora">(${dados.data[i].time}) </span
            ><span class="user">${dados.data[i].from} </span>${dados.data[i].text}
          </p>
        </li>`;
    } else if (dados.data[i].type === 'private_message' && (dados.data[i].from === user || dados.data[i].to === user)) {
      timeline.innerHTML += `<li class="mensagem private" data-test="message">
    <p>
      <span class="hora">(${dados.data[i].time}) </span
      ><span class="user">${dados.data[i].from} </span>reservadamente para 
      <span class="user">${dados.data[i].to}: </span>${dados.data[i].text}
    </p>
    </li>`;
    } else if (dados.data[i].type === 'message') {
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
  let msg = document.querySelector('footer input').value;
  let mensagem = {
    from: user,
    to: touser,
    text: msg,
    type: typemsg
  };
  const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', mensagem);
  promise.then(mensagens);
  promise.catch(erro);
  document.querySelector('footer input').value = '';
}

function enviarPorEnter(event, tipo) {
  let x = event.which;
  if (x === 13 && tipo === "msg") {
    enviarMensagem();
  } else if (x === 13 && tipo === "login") {
    entrarUser();
  }
}


function erro() {
  window.location.reload();
}

function mostrarMenu() {
  document.querySelector('.overlay').classList.toggle("escondido");

}

function atualizarLista() {
  const usuarios = axios.get('https://mock-api.driven.com.br/api/v6/uol/participants');
  usuarios.then(listaUsers);
  usuarios.catch(erro);
}

function ativar(esse, tipo) {
  document.querySelector(`.${tipo} .ativo`).classList.remove('ativo');
  esse.classList.add('ativo');
  touser = document.querySelector('.contato .ativo p').innerHTML;
  visibilidade(document.querySelector('.visibilidade .ativo p').innerHTML);
  if (typemsg === "private_message") {
    elemento.innerHTML = `Enviando para ${touser} (reservadamente)`;
  } else {
    elemento.innerHTML = "";
  }
}

function visibilidade(tipo) {
  if (tipo === "Reservadamente") {
    typemsg = 'private_message';
  } else {
    typemsg = 'message';
  }
}


function listaUsers(dados) {
  const lista = document.querySelector('nav lu');
  lista.innerHTML = `<li class="ativo" onclick="ativar(this, 'contato')" data-test="all">
  <div><ion-icon name="people"></ion-icon><p>Todos</p></div>
  <ion-icon name="checkmark-outline" data-test="check"></ion-icon>
</li >`;
  for (let i = 0; i < dados.data.length; i++) {
    lista.innerHTML += `<li onclick="ativar(this, 'contato')" data-test="participant"><div><ion-icon name="person-circle"></ion-icon><p>${dados.data[i].name}</p></div><ion-icon
    name="checkmark-outline" data-test="check"
  ></ion-icon></li>`;
  }
}

document.querySelector('nav').onclick = function () {
  event.stopPropagation();
};
