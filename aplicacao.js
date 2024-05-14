const express = require('express');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: '3306',
  user: 'root',
  password: '',
  database: 'atendimento'
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL: ' + err.stack);
    return;
  }
  console.log('Conexão bem-sucedida com MySQL como ID: ' + connection.threadId);
});

const app = express();
app.use(express.json());

// adicionar um novo registro (CREATE)
app.post('/api/usuarios', (req, res) => {
  const { nome, email } = req.body;
  connection.query('INSERT INTO usuarios (nome, email) VALUES (?, ?)', [nome, email], (err, result) => {
    if (err) {
      res.status(500).send('Erro ao adicionar usuário');
    } else {
      res.status(201).send('Usuário adicionado com sucesso');
    }
  });
});

// obter todos os registros (READ)
app.get('/api/usuarios', (req, res) => {
  connection.query('SELECT * FROM usuarios', (err, rows) => {
    if (err) {
      res.status(500).send('Erro ao obter usuários');
    } else {
      res.json(rows);
    }
  });
});

// atualizar um registro existente (UPDATE)
app.put('/api/usuarios/:id', (req, res) => {
  const { nome, email } = req.body;
  const { id } = req.params;
  connection.query('UPDATE usuarios SET nome = ?, email = ? WHERE id = ?', [nome, email, id], (err, result) => {
    if (err) {
      res.status(500).send('Erro ao atualizar usuário');
    } else {
      res.status(200).send('Usuário atualizado com sucesso');
    }
  });
});

// excluir um registro (DELETE)
app.delete('/api/usuarios/:id', (req, res) => {
  const { id } = req.params;
  connection.query('DELETE FROM usuarios WHERE id = ?', [id], (err, result) => {
    if (err) {
      res.status(500).send('Erro ao excluir usuário');
    } else {
      res.status(200).send('Usuário excluído com sucesso');
    }
  });
});

app.listen(3000, (error) =>{
    if(error){
        console.log("Deu erro");
        return;
    }
    console.log("Funcionou");
});