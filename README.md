# **Projeto [Bate papo Uol](https://lucasnerism.github.io/projeto5-batepapouol/)**

> O site permite uma conversa com outros usuários de forma fácil.

Esse projeto foi desenvolvido para funcionar perfeitamente em **todos os dispositivos moveis**.

Cada passo do desenvolvimento do projeto foi `versionada` no `GitHub`. Vocês podem acompanhar o processo nos `commits` no [repositório do projeto](https://https://github.com/lucasnerism/projeto5-batepapouol).

[O projeto pode ser acessado online aqui <](https://lucasnerism.github.io/projeto5-batepapouol/)

**Neste aplicativo** você pode voltar aos velhos tempos de bater papo com desconhecidos no chat da Uol

## Este projeto é sobre utilização de JavaScript puro e Axios para a implementação de um bate-papo totalmente funcional, inspirado no saudoso Bate-Papo UOL

## ✅ Requisitos

- Geral
    - [ ]  Não utilize nenhuma biblioteca para implementar este projeto (jquery, lodash, react, etc), nem outras linguagens que compilem para JavaScript (TypeScript, Clojure, ELM, etc), somente JavaScript puro.
    - [ ]  Seu projeto deverá ser desenvolvido utilizando Git e GitHub, em um repositório público.
    - [ ]  A cada requisito implementado faça um *commit* com uma mensagem descritiva do que você evoluiu.
- *Layout*
    - [ ]  Aplicar *layout* para mobile, seguindo o Figma. Não é necessário implementar uma versão para *desktop*.
- *Chat*
    - [ ]  Ao entrar na sala, este deve carregar as mensagens do servidor quando o usuário estiver logado e exibi-las conforme *layout* fornecido.
    - [ ]  Existem três tipos de mensagem:
        - Mensagens de status (**Entrou** ou **Saiu** da sala): deve ter o fundo cinza;
        - Mensagens reservadas (**Reservadamente**): deve ter o fundo rosa;
        - Mensagens normais: devem ter o fundo branco.
    - [ ]  A cada três segundos o site deve recarregar as mensagens do servidor para manter sempre atualizado.
    - [ ]  O *chat* deverá ter rolagem automática por padrão, ou seja, sempre que novas mensagens forem adicionadas ao final do *chat* ele deve *scrollar* para o final.       
    - [ ]  As mensagens com **Reservadamente** só devem ser exibidas se o nome do destinatário ou remetente for igual ao nome do usuário que está usando o chat (ou senão ele poderia ver as mensagens reservadas para outras pessoas)
        - **⚠️ Atenção:** Fazer essa filtragem no *front-end* não é uma boa prática, o ideal seria o servidor não fornecer essas mensagens para outras pessoas. Entretanto, manteremos dessa forma por fins didáticos. Combinado? 😁
- Entrada na sala
    - [ ]  Ao entrar no site, o usuário deverá ser perguntado com um `prompt` ****seu lindo nome.
    - [ ]  Após inserção do nome, este deve ser enviado para o servidor pra cadastrar o usuário:
        - Caso o servidor responda com sucesso, o usuário poderá entrar na sala;
        - Caso o servidor responda com erro, deve-se pedir para o usuário digitar outro nome, pois este já está em uso;
    - [ ]  Enquanto o usuário estiver na sala, a cada 5 segundos o site deve avisar ao servidor que o usuário ainda está presente, ou senão será considerado que "Saiu da sala".
- Envio de mensagem
    - [ ]  Ao enviar uma mensagem, esta deve ser enviada para o servidor:
        - Caso o servidor responda com sucesso, você deve obter novamente as mensagens do servidor e atualizar o *chat;*
        - Caso o servidor responda com erro, significa que esse usuário não está mais na sala e a página deve ser atualizada (e com isso voltando pra etapa de pedir o nome).            
    - [ ]  Nesse envio, deve ser informado o remetente, o destinatário e se a mensagem é reservada ou não.
        - Escolher um destinatário e se a mensagem é reservada ou pública é um requisito bônus (ver abaixo). Logo, se você não implementar o bônus, sempre envie destinatário como Todos e a mensagem como pública.
   

## ☑️ Bônus (opcional)

- Participantes ativos
    - [ ]  Ao clicar no ícone superior direito de participantes, o menu lateral deve abrir por cima do chat conforme *layout*. Um fundo escuro semi-transparente deve ficar por cima do *chat*.
    - [ ]  Ao clicar no fundo escuro, o menu lateral deve ser ocultado novamente.
    - [ ]  O site deve obter a lista de participantes assim que entra no chat e deve atualizar a lista a cada dez segundos.
    - [ ]  Ao clicar em uma pessoa ou em público/reservadamente, a opção clicada deve ser marcada com um *check* e as demais desmarcadas.
    - [ ]  Além do check acima, ao trocar esses parâmetros também deve ser alterada a frase que informa o destinatário, que fica embaixo do input de mensagem
- Tela de entrada
    - [ ]  Em vez de um *prompt*, faça uma tela inicial, seguindo o *layout* abaixo:
        - Layout
            
            ![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c9f1d322-f267-4b3a-8a25-b3c67eebae9e/iPhone_8_-_3.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/c9f1d322-f267-4b3a-8a25-b3c67eebae9e/iPhone_8_-_3.png)
            
            ![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/661d24f5-1122-499e-970a-591e2c1b8a6f/iPhone_8_-_4.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/661d24f5-1122-499e-970a-591e2c1b8a6f/iPhone_8_-_4.png)          
    
- Envio com enter
    - [ ]  Faça com que, caso o usuário tecle Enter no campo de mensagem, ela seja enviada (ou seja, deve ter o mesmo comportamento caso o usuário clique no botão de envio).
