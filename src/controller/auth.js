const { error } = require('console');
const { response } = require('express');

exports.insert  = (req, res) => {

    const puppeteer = require('puppeteer');
    const {botao, emitente } = req.body;
   
    res.render('../src/pages/index');


if (botao == 'Enviar'){
    const axios = require('axios');
    let emitenteDados;
    axios({
        headers: { Accept: 'text/html, application/json, text/plain, */*' },
        url: 'http://localhost:5050/emitentes',
        method: 'get'
      }).then((response =>{
        emitenteDados = response.data;
        console.log(emitenteDados.cpf);

        acessarNfe(emitenteDados.cpf, emitenteDados.id);
      }));
}

    async function acessarNfe(cpf, id){

    const nfseGov = 'https://www.nfse.gov.br/EmissorNacional/Login?ReturnUrl=%2fEmissorNacional';
    const nfBelford = 'https://nfse.prefeituradebelfordroxo.rj.gov.br/ver20201008/openform.do?sys=NFE&action=openform&formID=8966';
    const browser = await puppeteer.launch({headless:false});

    const page = await browser.newPage();

    await page.goto(nfseGov);
    await page.setViewport({ width: 1366, height: 800 });
    await page.waitForSelector('input[name="Inscricao"]');
    await page.type('input[name="Inscricao"]', `${cpf}`);
    await page.type('input[name="Senha"]', `${id}`);


    
  

};
}


