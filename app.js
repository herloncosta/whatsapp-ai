const { Client, LocalAuth } = require('whatsapp-web.js')
const qrcode = require('qrcode-terminal')
const manager = require('./ia')

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    },
})

client.on('qr', qr => {
    qrcode.generate(qr, { small: true })
})

client.on('authenticated', () => {
    console.log('Cliente autenticado!')
})

client.on('message', async message => {
    const mensagem = message.body

    const respostaIA = await manager.process('pt-BR', mensagem)
    const intent = respostaIA.intent

    let respostaWhatsApp

    switch (intent) {
        case 'saudacao':
            respostaWhatsApp = 'Olá! Em que posso ajudar?'
            break
        case 'ajuda':
            respostaWhatsApp =
                'Com certeza! Descreva o seu problema ou dúvida que farei o possível para ajudar.'
            break
        case 'produtos':
            respostaWhatsApp =
                'Confira nosso catálogo em [link para o catálogo]. Temos diversas opções para você!'
            break
        case 'agradecimento':
            respostaWhatsApp = 'De nada! Ficamos felizes em ajudar.'
            break
        case 'despedida':
            respostaWhatsApp = 'Até logo! Tenha um ótimo dia.'
            break
        case 'informacoes_empresa':
            respostaWhatsApp =
                'Você pode encontrar todas as informações sobre nossa empresa em [link para a página de informações].'
            break
        case 'erro':
            respostaWhatsApp =
                'Desculpe, não entendi sua solicitação. Pode reformular?'
            break
        case 'primeiro_atendimento':
            respostaWhatsApp =
                'Por favor, entre em contato com o nosso suporte técnico em [número de telefone ou email].'
            break
        default:
            respostaWhatsApp =
                'Desculpe, não entendi sua solicitação.  Por favor, tente novamente.'
    }

    message.reply(respostaWhatsApp)
})

client.initialize()
