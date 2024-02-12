import express from "express";
import sqlite3 from "sqlite3";
import argon2 from 'argon2'

import { argon2Options } from "./configs/index.mjs";
import { validatePassword } from "./shared/validations/index.mjs";

const { Database } = sqlite3.verbose();

const port = process.env.PORT || 3000;

const db = new Database("users.db");

const app = express();
app.use(express.json())

app.post("/register", async (req, res) => {
  if (!validatePassword(req.body.senha)) {
    return res
      .status(400)
      .json({ mensagem: "A senha não atende aos requisitos mínimos." });
  }
  try {
    const hash = await argon2.hash(req.body.senha, argon2Options);
   
  } catch (err) {
    console.log(err);
    return res.status(500).json({ mensagem: "Erro durante o login." });
  }
  return await res.status(201).json({
    message: "Usuário criado com sucesso.",
  });
});

app.post('/login', async (req, res) => {
   // if (!(await argon2.verify(hash, senha))) {
    //   return res.status(401).json({ mensagem: 'Credenciais inválidas.' });
    // }

    return await res.status(201).json({
      message: "Login realizado com sucesso.",
    });
})

app.listen(port, () => console.log(`Server is running in ${port}`));
