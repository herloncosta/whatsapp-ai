const { NlpManager } = require('node-nlp')
const { readDataDir } = require('./processamento-arquivos.js')

const manager = new NlpManager({ languages: ['pt-BR'] })
readDataDir(manager)
;(async () => {
    await manager.train()
    manager.save('./model.json')
})()

module.exports = manager
