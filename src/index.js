//importa os modulos http e express
const http = require('http');
const express = require('express');
//contri um objeto express
const app = express();
//importa o body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());

//configura a porta do servidor e o colocar em execucao
const porta = 3000;
app.set('port', porta);
const server = http.createServer(app);
server.listen(3000);

let idLivro = 1;

let livros = [
    {
        id: 1,
        titulo: "Livro ISBN",
        descricao: "International Standard Book Number",
        edicao: "1 Edicao",
        autor: "Wikipédia",
        isbn: "978-3-16-148410-0"
    }
]

//GET
app.get("/livros", (req, res, next) => {
    return res.status(200).json(livros);
});

//CREATE
app.post("/livros", (req, res, next) => {
    const livro = req.body;

    if(isNaN(livro.isbn)){
        return res.status(400).json({msg: `isbn deve ser numero`});
    }

    livros.push({
        id: idLivro += 1,
        titulo: livro.titulo,
        descricao: livro.descricao,
        edicao: livro.edicao,
        autor: livro.autor,
        isbn: livro.isbn
    });

    return res.status(201).json(livros);
});

// PUT
app.put("/livros/:id", (req, res, next) => {
    const { id } = req.params;
    const { titulo, descricao, edicao, autor, isbn } = req.body;

    const index = livros.findIndex( e => {
        return e.id === Number(id);
    });

    livros[index] = {
        id: Number(id),
        titulo,
        descricao,
        edicao,
        autor,
        isbn
    }

    return res.status(204).end();
});

// DELETE
app.delete("/livros/:id", (req, res, next) => {
    const { id } = req.params;
    
    const index = livros.findIndex( e => {
        return e.id === Number(id);
    });

    livros.splice(index, 1);

    return res.status(200).json(livros);
});