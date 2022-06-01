const express = require("express");
const boryParser = require('body-parser');
const app = express();
const connection = require("./database/database");
const Pergunta = require('./database/Pergunta');
const Respostas = require('./database/Respostas');
// testando conexão com o banco
connection
    .authenticate()
    .then(() =>{
        console.log("conexão feito com sucesso")
    })
    .catch((msgErro) =>{
        console.log(msgErro)
    })
// estou dizendo para usar o EJS como view engine
app.set('viwe engine','ejs');
app.use(express.static('public'));

app.use(boryParser.urlencoded({extended:false}));
app.use(boryParser.json());

app.get("/",(req,res) => {
    Pergunta.findAll({ raw: true, order:[['id','DESC']]}).then(perguntas =>{
        res.render("index.ejs",{ perguntas: perguntas});
    });
});

app.get("/perguntar",(req,res) => {
    res.render("perguntar.ejs")
});

app.post("/salvarpergunta",(req,res) =>{
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(()=>{res.redirect("/")});
});

app.get("/pergunta/:id",(req,res) =>{
    var id = req.params.id;
    Pergunta.findOne({
        where: {id: id}
    }).then(pergunta =>{
        if (pergunta != undefined){

            Respostas.findAll({
                where:{perguntaId:pergunta.id},
                order:[['id','DESC']]
            }).then(resposta =>{
                res.render("pergunta.ejs",{
                    pergunta: pergunta,
                    respostas:resposta
                });
            }).catch(() =>{ res.redirect("/")})
            
        }else{
            res.redirect("/");
        }
    })
});

app.post("/responder",(req,res) => {
    var resposta = req.body.resposta;
    var perguntaId = req.body.perguntaId;
    
    Respostas.create({
        corpo: resposta,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect("/pergunta/"+perguntaId);
    }).catch(erro =>{
        console.log(erro)
    })

});

app.listen(8181,(erro)=>{
    if(erro){
        console.log("ocorreu um erro !");
    }else{
    console.log("App rodando...");}
});