const express = require('express');
const fs = require('fs');
const router = express.Router();
const {isAuthenticated } = require('../middleware/authMiddleware');
const path = require('path');
const multer = require('multer');

const DATA_PATH = './data/dados.json';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        // Renomeando o arquivo de imagem ( imagem.jpg => 1749373949.jpg)
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

const lerDados = () => {
    return JSON.parse(fs.readFileSync(DATA_PATH, 'utf-8'));
}

const escreverDados = (data) => {
    fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2), 'utf-8');
}

/* Rota para acessar as paginas atraves de autentificação*/
router.get('/admin', isAuthenticated ,(req, res) => {
    res.sendFile(path.join(__dirname, '../public', '/admin.html'))
});

router.get('/listar', isAuthenticated , (req, res) => {
    res.sendFile(path.join(__dirname, '../public', '/listar.html'))
});

router.get('/cadastrar', isAuthenticated , (req, res) => {
    res.sendFile(path.join(__dirname, '../public', '/cadastrar.html'))
});


/* rota para acessar dados do JSON produtos / index*/
router.get('/', (req, res) => {
    const data = lerDados();
    res.json(data);
});

router.post('/', upload.single('poster'), (req, res) => {
    const data = lerDados();
    const novoDado = {
        id: Date.now(),
            titulo: req.body.titulo,
            diretor: req.body.diretor,
            ano: req.body.ano,
            aluguel: Number(req.body.aluguel),
            poster: req.file ? `/uploads/${req.file.filename}` : null
        };
    data.push(novoDado);
    escreverDados(data);
    res.json(novoDado);
});

router.put('/:id', upload.single('poster'), (req, res) => {
    const data = lerDados();
    const id_edit = Number(req.params.id);
    const index = data.findIndex(filme => filme.id === id_edit);

    if (index !== -1) {
        const filme_edit = data[index];

        filme_edit.titulo = req.body.titulo || filme_edit.titulo;
        filme_edit.diretor = req.body.diretor || filme_edit.diretor;
        filme_edit.ano = req.body.ano || filme_edit.ano;
        filme_edit.aluguel = Number(req.body.aluguel) || filme_edit.aluguel;
        
        console.log(req.file);

        // Substituir a imagem se uma nova for enviada
        if (req.file) {
            // Excluir a imagem antiga, se houver
            if (filme_edit.poster) {
                const img_antiga = path.join(__dirname, '..', filme_edit.poster);
                fs.unlink(img_antiga, (erro) => {
                    if (erro) {
                        console.error("Erro ao tentar excluir a imagem antiga!", erro);
                    } else {
                        console.log("Imagem antiga excluída com sucesso!", img_antiga);
                    }
                });
            } 
            // Atualizar o caminho da nova imagem
            filme_edit.poster = `/uploads/${req.file.filename}`;
        } 
        // Atualiza o produto no Json
        data[index] = filme_edit;
        escreverDados(data);
        res.json(filme_edit);
    } else {
        res.status(404).send({message: 'Erro ao tentar atualizar o produto!'});
    }

});

router.delete('/:id', (req, res) => {
    const data = lerDados();
    const id_del = Number(req.params.id);
    const filtro = data.filter(filme => filme.id !== id_del);
    const idx = data.findIndex(filme => filme.id == id_del);

 
    if (data.length !== filtro.length) {
        const img_del = data[idx];

        // Se tiver uma imagem associada ela será excluida
        if (img_del.img_produto) {
            const imagePath = path.join(__dirname, '..', img_del.img_produto);
            fs.unlink(imagePath, (erro) => {
                if (erro) {
                    console.error("Erro ao tentar excluir a imagem antiga!", erro);
                } else {
                    console.log("Imagem antiga excluída com sucesso!", imagePath);
                }
            });

        escreverDados(filtro);
        res.json({message: 'Produto Excluído com Sucesso!'});
    } else {
        res.status(404).send({message: 'Erro ao tentar excluir o produto!'});
    } 

}});

module.exports = router;