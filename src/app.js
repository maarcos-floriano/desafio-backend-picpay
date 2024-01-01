const express = require("express");
const app = express();
const port = 3000;

// Rota padrão
app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Projeto inicializado na url http://localhost:${port}`);
});