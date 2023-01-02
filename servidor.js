import express, { json, urlencoded } from 'express';
import cors from 'cors';
const app = express();

// Configuración del servidor
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(json({ limit: '50mb' }));

const PORT = process.env.PORT || 3000;


app.post('/peerIds', (req, res) => {
    console.log(req.body);
    res.send('ok');
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

