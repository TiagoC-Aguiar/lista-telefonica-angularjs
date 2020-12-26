let router = require('./router');
let fs = require('fs');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const FILE_PATH = "./data/";
const fileNameContatos = FILE_PATH + "contatos.json";
const fileNameOperadoras = FILE_PATH + "operadoras.json";

let app = router(3001);

app.interceptor(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.interceptor(function (req, res, next) {
  res.setHeader('Content-Type', 'application/json;charset=UTF-8');
  next();
});

app.get('/operadoras', async function (req, res) {
  res.write(JSON.stringify(await getOperadoras()));
  res.end();
});

app.get('/contatos', async function (req, res) {
  try {
    const data = await lerArquivo(fileNameContatos);
    const contatos = await Promise.all(data.contatos.map(async (contato) => {
      contato.operadora = await getOperadoraId(contato.operadora);
      return contato;
    }));

    res.write(JSON.stringify(contatos));
  } catch (error) {
    console.error(`Erro ao buscar contatos: ${error.message}`);
  }
  res.end();

});

app.post('/contatos', async function (req, res) {
  try {
    let contato = req.body;
    await postContatos(contato);
  } catch (error) {
    console.error(error.message);
  }
  res.end();
});

app.post('/operadoras', async function (req, res) {
  try {
    let operadora = req.body;
    await postOperadoras(operadora);
  } catch (error) {
    console.error(error.message);
  }
  res.end();
});

app.post('/file', function (req, res) {
  console.log(req.body);
  res.end();
});

app.options('/file', function (req, res) {
  res.end();
});

app.options('/contatos', function (req, res) {
  res.end();
});

async function postContatos(contatoToPost) {
  const data = await lerArquivo(fileNameContatos);
  let contato = JSON.parse(contatoToPost);
  contato = { id: data.nextId++, ...contato };
  contato.operadora = contato.operadora.id;
  data.contatos.push(contato);
  await writeFile(fileNameContatos, JSON.stringify(data, null, 2));
  return contato;
}

async function postOperadoras(operadoraToPost) {
  const data = await lerArquivo(fileNameOperadoras);
  let operadora = JSON.parse(operadoraToPost);
  operadora = { id: data.nextId++, ...operadora };
  data.operadoras.push(operadora);
  await writeFile(fileNameOperadoras, JSON.stringify(data, null, 2));
  return operadora;
}

async function getOperadoras() {
  const data = await lerArquivo(fileNameOperadoras);
  return data.operadoras;
}

async function getOperadoraId(id) {
  try {
    const data = await lerArquivo(fileNameOperadoras);
    const operadora = data.operadoras.find(operadora => {
      return operadora.id === id;
    });
    if (operadora) {
      return operadora;
    }
    return null;
  } catch (error) {
    console.error(`Erro ao buscar operadora pelo id: ${id}`);
    return;
  }
}

async function lerArquivo(arquivo) {
  return JSON.parse(await readFile(arquivo, 'utf8'));
}
