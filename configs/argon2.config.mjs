import argon2 from "argon2"

const argon2Options = {
    timeCost: process.env.TIME_COST || 5, // Ajuste conforme necessário
    memoryCost: process.env.MEMORY_COST || 1024, // Ajuste conforme necessário
    parallelism: process.env.PARALLELISM || 2, // Ajuste conforme necessário
    type: argon2.argon2id, // Use Argon2id, que é uma combinação dos tipos Argon2d e Argon2i
}

export default argon2Options