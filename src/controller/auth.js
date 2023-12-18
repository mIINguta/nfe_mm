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
          emitenteDados.forEach((item) =>{
            if (item.nome == emitente){
              console.log(item);
              acessarNfe(item.cpf, item.senha, item.ins, item.site);
            }

        })
        

        
      }));
}

    async function acessarNfe(cpf, senha, ins, site){



    async function scriptGOV(){
    const nfseGov = 'https://www.nfse.gov.br/EmissorNacional/Login?ReturnUrl=%2fEmissorNacional';
    const browser = await puppeteer.launch({headless:false});
    const page = await browser.newPage();
    await page.goto(nfseGov);
    await page.setViewport({ width: 1366, height: 800 });
    await page.waitForSelector('input[name="Inscricao"]');
    await page.type('input[name="Inscricao"]', `${cpf}`);
    await page.type('input[name="Senha"]', `${senha}`);
      }

      async function scriptBEL(){
        const nfBelford = 'https://nfse.prefeituradebelfordroxo.rj.gov.br/ver20201008/openform.do?sys=NFE&action=openform&formID=8966';
        const browser = await puppeteer.launch({headless:false});
        const page = await browser.newPage();
        await page.goto(nfBelford);
        await page.setViewport({ width: 1366, height: 800 });
        await page.waitForSelector('input[id="WFRInput654495"]');
        await page.type('input[id="WFRInput654495"]', `${cpf}`);
        await page.type('input[id="WFRInput654501"]', `${ins}`);
        await page.type('input[id="WFRInput654496"]', `${senha}`);
      }

      async function scriptAVU(){
        const nfAVU = 'https://www4.fazenda.rj.gov.br/sefaz-dfe-nfae/paginas/preidentificacao.faces';
        const browser = await puppeteer.launch({headless:false});
        const page = await browser.newPage();
        await page.goto(nfAVU);
        await page.setViewport({ width: 0, height: 0, deviceScaleFactor: 1});
        await page.waitForSelector('select[id="tipoRemetenteSelecionadoSemCertificado"]');
        await page.click('select[id="tipoRemetenteSelecionadoSemCertificado"]');
        await page.keyboard.press("ArrowDown");
        await page.keyboard.press("Enter");
        await page.waitForSelector('input[id="nuCNPJ"]');
        await page.type('input[id="nuCNPJ"]', `${cpf}`);
        await page.type('input[id="senhaUsuario"]', `${senha}`);
      }
    
    if (site == "GOV"){
        scriptGOV();
   
  }
    else if(site == "BEL"){
      scriptBEL();
    }
      
      else if(site == "AVU"){
        scriptAVU();
      }
        }
    
}


