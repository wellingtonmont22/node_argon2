import argon2 from "argon2";

(async () => {
  const hashOptions = {
    timeCost: 5, // Ajuste conforme necessário
    memoryCost: 1024, // Ajuste conforme necessário
    parallelism: 2, // Ajuste conforme necessário
    type: argon2.argon2id, // Use Argon2id, que é uma combinação dos tipos Argon2d e Argon2i
  };
  const senha = "d7OU1806:P=";
  try {
    const hash = await argon2.hash(senha, hashOptions);
    
    if (!validatePassword(senha)) {
      console.log("A senha não atende aos requisitos mínimos.");
      return;
    }

    if (!(await argon2.verify(hash, senha))) {
      console.log("Senha incorreta.");
      return;
    }

    console.log("Senha correta.");
  } catch (err) {
    console.log(err);
  }
})();
// Função para validar a senha
function validatePassword(password) {
  // A senha deve ter pelo menos 8 caracteres, incluindo pelo menos uma letra maiúscula, uma letra minúscula e um número
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  return passwordRegex.test(password);
}