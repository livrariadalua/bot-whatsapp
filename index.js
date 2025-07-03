const wppconnect = require('@wppconnect-team/wppconnect');
const atendidos = new Set(); // armazena contatos que já receberam o menu

wppconnect.create().then((client) => {
  client.onMessage((message) => {
    if (!message.isGroupMsg) {
      const menu = `Olá, seja bem-vindo à Toca do Pneu!\n` +
        `Digite o número correspondente ao setor que deseja falar.\n` +
        `Você será direcionado à conversa com o responsável pelo setor.\nObrigado!\n\n` +
        `1 - Vendas\n2 - Compras\n3 - Faturamento\n4 - Financeiro`;

      const contato = message.from;

      // Se ainda não respondeu esse contato, envia o menu
      if (!atendidos.has(contato)) {
        client.sendText(contato, menu);
        atendidos.add(contato);
        return;
      }

      // Se já respondeu, só trata opções
      switch (message.body.trim()) {
        case '1':
          client.sendText(contato, 'Encaminhando para o setor de *Vendas*...');
          client.sendContactVcard(contato, '5531999631668@c.us', 'Vendas Toca do Pneu');
          break;
        case '2':
          client.sendText(contato, 'Encaminhando para o setor de *Compras*...');
          client.sendContactVcard(contato, '5531991128448@c.us', 'Compras Toca do Pneu');
          break;
        case '3':
          client.sendText(contato, 'Encaminhando para o setor de *Faturamento*...');
          client.sendContactVcard(contato, '5531990855238@c.us', 'Faturamento Toca do Pneu');
          break;
        case '4':
          client.sendText(contato, 'Encaminhando para o setor de *Financeiro*...');
          client.sendContactVcard(contato, '5531996538600@c.us', 'Financeiro Toca do Pneu');
          break;
      }
    }
  });
});
