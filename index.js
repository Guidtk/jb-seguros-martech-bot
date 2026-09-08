const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

client.on('qr', (qr) => {
    console.log('Escaneie o QR Code abaixo com o WhatsApp do celular:');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('🤖 Bot de Planos de Saúde (JB Corretora) Ativo e Escutando!');
});

// Alterado para 'message' genérico e adicionado console.log para debug no terminal
client.on('message', async msg => {
    console.log(`[Mensagem Recebida de ${msg.from}]: ${msg.body}`);

    const texto = msg.body.trim().toLowerCase();

    // Responde a saudações ou a qualquer mensagem inicial de apresentação
    if (
        texto === 'oi' || texto === 'olá' || texto === 'ola' || 
        texto === 'menu' || texto === 'inicio' || texto.includes('bom dia') || 
        texto.includes('boa tarde') || texto.includes('boa noite') || texto.includes('plano')
    ) {
        await msg.reply(
`🩺 *PLANOS DE SAÚDE | JB CORRETORA*

Olá! Seja bem-vindo(a). 💙
Estamos aqui para ajudar você a encontrar o plano de saúde ideal para você, sua família ou sua empresa.

Escolha uma opção digitando apenas o número:

1️⃣ Quero fazer uma cotação
2️⃣ Plano de saúde individual/familiar
3️⃣ Plano de saúde empresarial (CNPJ)
4️⃣ Plano de saúde para MEI
5️⃣ Quero comparar planos e valores
6️⃣ Já tenho plano e quero trocar
7️⃣ Odontológico
8️⃣ Já sou cliente / Pós-venda
9️⃣ Segunda via de boleto
🔟 Falar com um consultor`
        );
    } 

    // RESPOSTA 1: COTAÇÃO GERAL
    else if (texto === '1') {
        await msg.reply(
`Perfeito! 💙 Para prepararmos sua cotação, envie:

• Idade de cada pessoa que entrará no plano
• Cidade onde mora
• Se possui CNPJ ou MEI
• Se já possui plano de saúde atualmente

Com essas informações, nossa equipe verificará as melhores opções disponíveis.`
        );
    }

    // RESPOSTA 2: INDIVIDUAL / FAMILIAR
    else if (texto === '2') {
        await msg.reply(
`Vamos encontrar uma opção para você e sua família. 🩺

Informe a idade de cada beneficiário, sua cidade e se atualmente alguém possui plano de saúde.`
        );
    }

    // RESPOSTA 3: EMPRESARIAL - CNPJ
    else if (texto === '3') {
        await msg.reply(
`Temos opções de planos empresariais para diferentes perfis e quantidades de beneficiários. 🏢

Envie:
• CNPJ
• Quantidade de pessoas
• Idades dos beneficiários
• Cidade
• Se a empresa já possui plano atualmente.`
        );
    }

    // RESPOSTA 4: MEI
    else if (texto === '4') {
        await msg.reply(
`Você possui MEI? Temos opções de contratação através do CNPJ. 💙

Envie o CNPJ, sua idade, cidade e quantas pessoas deseja incluir para verificarmos as opções disponíveis e as regras de contratação.`
        );
    }

    // RESPOSTA 5: COMPARAR PLANOS
    else if (texto === '5') {
        await msg.reply(
`Claro! Podemos comparar valores, rede credenciada, acomodação, coparticipação e principais características dos planos disponíveis para o seu perfil.

Envie as idades dos beneficiários, sua cidade e informe se possui CNPJ/MEI.`
        );
    }

    // RESPOSTA 6: TROCAR PLANO
    else if (texto === '6') {
        await msg.reply(
`Já possui plano e está pensando em mudar? Vamos analisar as possibilidades.

Informe:
• Plano atual
• Idades dos beneficiários
• Valor aproximado que paga atualmente
• Motivo pelo qual deseja trocar
• Se possui CNPJ/MEI.`
        );
    }

    // RESPOSTA 7: ODONTOLÓGICO
    else if (texto === '7') {
        await msg.reply(
`Também trabalhamos com planos odontológicos. 🦷

Informe quantas pessoas deseja incluir e se a contratação será para pessoa física ou empresa/CNPJ.`
        );
    }

    // RESPOSTA 8: PÓS-VENDA
    else if (texto === '8') {
        await msg.reply(
`Olá! 💙 Para localizarmos seu atendimento, informe o nome completo do titular e a operadora do seu plano. Depois, conte brevemente o que você precisa.`
        );
    }

    // RESPOSTA 9: SEGUNDA VIA DE BOLETO
    else if (texto === '9') {
        await msg.reply(
`Claro! Informe o nome completo do titular, CPF e operadora do plano para que nossa equipe possa orientar sobre a segunda via do boleto.`
        );
    }

    // RESPOSTA 10: CONSULTOR
    else if (texto === '10') {
        await msg.reply(
`Certo! Seu atendimento será direcionado para um de nossos consultores de saúde.

Deixe seu nome, cidade e um breve resumo do que procura para agilizar o atendimento.`
        );
    }
});

client.initialize();