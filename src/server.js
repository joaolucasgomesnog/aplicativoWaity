import express from "express";
import {router} from './Services/routes'

var cors = require('cors')
const app = express();

app.use(express.json())
app.use(cors({
    origin: "*", // Permite apenas solicitações deste domínio
    methods: "GET,PUT,POST,DELETE", // Métodos permitidos
    optionsSuccessStatus: 204 // Define o status de sucesso para preflight requests para 204
}))


app.use(router)

app.get("/", (req, res) => {
    return res.json({ hello: 'world' })
})
app.listen(3030, () => console.log('server listening on port 3030'))
