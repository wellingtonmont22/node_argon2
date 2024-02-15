import express from "express";
import sqlite3 from "sqlite3";
import argon2 from 'argon2'

import { argon2Options } from "./configs/index.mjs";
import { validatePassword } from "./shared/validations/index.mjs";

const { Database } = sqlite3.verbose();

const port = process.env.PORT || 3000;

const db = new Database("app.db");

db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL
)`);

const app = express();

app.use(express.json());

app.post("/register", async (req, res) => {
  const {
    name,
    email,
    password
  } = req.body

  if (!validatePassword(password)) {
    return res
      .status(400)
      .json({ mensagem: "A senha não atende aos requisitos mínimos." });
  }
  try {
    const hashPassword = await argon2.hash(password, argon2Options);

    db.run('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [name, email, hashPassword], (err) => {
      if (err) {
        return res.status(500).json({ mensagem: 'Erro durante o registro.' });
      }
      return res.status(201).json({
        message: "Usuário criado com sucesso.",
      });
    });
  } catch (err) {
    return res.status(500).json({ mensagem: "Erro durante o registro do usuário." });
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
      if (err) {
        return err;
      }

      if (!user) {
        return res.status(404).json({ mensagem: 'Usuário não encontrado.' });
      }

      if (!await argon2.verify(user.password, password)) {
        return res.status(401).json({ mensagem: 'Credenciais inválidas.' });
      }

      return res.status(200).json({
        message: "Login realizado com sucesso.",
      });
    });
  } catch (error) {
    return res.status(500).json({ mensagem: 'Erro durante o login.' });
  }
})

app.listen(port, () => console.log(`Server is running in ${port}`));
