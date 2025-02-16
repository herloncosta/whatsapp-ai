# WhatsApp Bot com Integração de IA

Este projeto é um bot para WhatsApp que utiliza a API de linguagem generativa da Google para responder automaticamente às mensagens recebidas. O bot é construído usando `whatsapp-web.js` para interagir com o WhatsApp Web, `axios` para fazer requisições HTTP para a API da Google e `validator.js` para validar e sanitizar as mensagens recebidas.

## Funcionalidades

- **Receber Mensagens**: O bot escuta mensagens recebidas no WhatsApp.
- **Responder com IA**: Envia a mensagem recebida para a API de linguagem generativa da Google e responde com a resposta gerada.
- **Autenticação Automática**: Usa `LocalAuth` para manter a sessão do WhatsApp Web ativa.

## Pré-requisitos

- Node.js instalado na sua máquina.
- Conta no Google Cloud com acesso à API de linguagem generativa.
- WhatsApp instalado no seu celular para escanear o QR code.

## Instalação

1. **Clone o Repositório**:
   ```bash
   git clone https://github.com/herloncosta/whatsapp-ia.git
   cd whatsapp-ia
   ```

2. **Instale as Dependências**:
   ```bash
   npm install
   ```

3. **Configure as Variáveis de Ambiente**:
   Crie um arquivo `.env` na raiz do projeto e adicione sua chave de API da Google:
   ```
   GEMINI_API_KEY=sua_chave_aqui
   ```

## Uso

1. **Inicie o Bot**:
   ```bash
   node app.js
   ```

2. **Escaneie o QR Code**:
   Um QR code será gerado no terminal. Escaneie-o com o aplicativo WhatsApp no seu celular para conectar.

3. **Envie uma Mensagem**:
   Envie uma mensagem para o número conectado ao bot e receba uma resposta gerada pela IA.

## Estrutura do Projeto

- **app.js**: Contém a configuração e inicialização do cliente do WhatsApp.
- **ia.js**: Contém a função para enviar mensagens para a API da Google e receber a resposta.

## Contribuição

Sinta-se à vontade para contribuir com melhorias, correções de bugs ou novas funcionalidades. Abra uma issue ou envie um pull request!

## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## Contato

Se tiver alguma dúvida ou sugestão, entre em contato com [herlon36@gmail.com](mailto:herlon36@gmail.com).