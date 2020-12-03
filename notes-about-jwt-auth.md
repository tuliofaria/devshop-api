- JWT:
  - Refresh Token:
    - Long-lived: tempo de vida maior: 10h
    - Não serve para acessar recursos
    - Gerar um novo access token
    - Bloqueio pelo BD
    - Mostrar usuários: sessões que ele tem aberto
  - Access Token:
    - Short-lived: tempo de vida curto: 1h
    - Checar se ele não foi violado (tempered)
    - Expirado
    - auto-contido


    - sticky session
