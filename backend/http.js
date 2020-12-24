let router = require('./router');
let fs = require('fs');
const { promisify } = require('util');
const { join } = require('path');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const FILE_PATH = "./data/";
const fileNameContatos = FILE_PATH + "contatos.json";
const fileNameOperadoras = FILE_PATH + "operadoras.json";

let app = router(3001);

let contatos = [
  { id: 1, nome: "Bruno", telefone: "9999-2222", data: new Date(), operadora: { "id": 1, "nome": "Oi", "codigo": 14, "categoria": "Celular", "preco": 2 } },
  { id: 2, nome: "Sandra", telefone: "9999-3333", data: new Date(), operadora: { "id": 1, "nome": "Oi", "codigo": 14, "categoria": "Celular", "preco": 2 } },
  { id: 3, nome: "Mariana", telefone: "9999-9999", data: new Date(), operadora: { "id": 1, "nome": "Oi", "codigo": 14, "categoria": "Celular", "preco": 2 } }
];

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
    const data = JSON.parse(await readFile(fileNameContatos, 'utf8')); 
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
  let contato = req.body;
  try {
    await postContatos(contato);
  } catch (error) {
    console.error(err.message);
  }
  contatos.push(JSON.parse(contato));
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
  const data = JSON.parse(await readFile(fileNameContatos, 'utf8'));
  let contato = JSON.parse(contatoToPost);
  contato = { id: data.nextId++, ...contato };
  contato.operadora = contato.operadora.id;
  data.contatos.push(contato);
  await writeFile(fileNameContatos, JSON.stringify(data, null, 2));
  return contato;
}

// async function postOperadoras(operadoraToPost) {
//   const data = JSON.parse(await readFile(fileNameOperadoras, 'utf8'));
// }

async function getOperadoras() {
  const data = JSON.parse(await readFile(fileNameOperadoras, 'utf8'));
  return data.operadoras;
}

async function getOperadoraId(id) {
  try {
    const data = JSON.parse(await readFile(fileNameOperadoras, 'utf8'));
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


