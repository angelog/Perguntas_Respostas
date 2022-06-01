const express = require("express");
const app = express();

// estou dizendo para usar o EJS como view engine
app.set('viwe engine','ejs');
app.use(express.static('public'));

app.get("/",(req,res) => {
    var nome = "Gabriel"
    var lang = "javascript"
    var flag = true
    var produtos = [
        {nome:"queijo", preco:2},
        {nome:"leite",preco:4},
        {nome:"abobora", preco:2.50}
    ]

    res.render("index.ejs",{
        nome: nome,
        lang: lang,
        empresa: "angelo",
        inscritos: 8000,
        flag:flag,
        produtos: produtos
    });
});

app.listen(8181,(erro)=>{
    if(erro){
        console.log("ocorreu um erro !");
    }else{
    console.log("App rodando...");}
});
