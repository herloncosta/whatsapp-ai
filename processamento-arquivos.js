const fs = require('node:fs')
const path = require('node:path')

const DATA_DIR = './dados-treinamento'
const files = fs.readdirSync(DATA_DIR)

function parseFileToLines(filePath, manager) {
    const content = fs.readFileSync(filePath, 'utf-8')
    for (const line of content.split('\n')) {
        const [input, intent] = line.split(';')
        if (input && intent) {
            manager.addDocument('pt-BR ', input, intent)
            console.log('TRAINING pt-BR', input.trim(), intent.trim())
        }
    }
}

function readDataDir(manager) {
    for (const file of files) {
        const filePath = path.join(DATA_DIR, file)
        parseFileToLines(filePath, manager)
    }
}

module.exports = { readDataDir }
