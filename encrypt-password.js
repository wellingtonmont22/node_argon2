import argon2 from "argon2";

(async () => {
    const senha = 'd7\OU1806:P='
    try {
        const hash = await argon2.hash(senha);
        console.log(hash)
        if(!await argon2.verify(hash, `${senha}!`, { saltLength: 10 })){
            console.log('Senha incorreta.')
            return
        }
    
        console.log('Senha correta.')
      } catch (err) {
        console.log(err)
      }
})()