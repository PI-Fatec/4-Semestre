const express = require("express");
const cors = require("cors");
const admin = require("firebase-admin");
const authRoutes = require("./routes/AuthRoutes");
const dotenv = require("dotenv");

dotenv.config(); // Carrega variáveis do .en

// Verifique se todas variáveis existem
if (
  !process.env.FIREBASE_PROJECT_ID ||
  !process.env.FIREBASE_CLIENT_EMAIL ||
  !process.env.PRIVATE_KEY
) {
  throw new Error('Variáveis de ambiente do Firebase faltando!');
}

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.PRIVATE_KEY.replace(/\\n/g, '\n')
  })
});

console.log("FIREBASE_PROJECT_ID:", process.env.FIREBASE_PROJECT_ID);
console.log("FIREBASE_CLIENT_EMAIL:", process.env.FIREBASE_CLIENT_EMAIL);
console.log("FIREBASE_PRIVATE_KEY:", process.env.PRIVATE_KEY ? "Carregada" : "Não carregada");
admin.auth().listUsers(1)
  .then(() => console.log('Conexão OK!'))
  .catch(err => console.error('Falha na conexão:', err));

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

app.listen(5000, () => console.log("Servidor rodando na porta 5000"));
