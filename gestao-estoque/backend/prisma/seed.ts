import { prisma } from '../src/db.js'

async function main() {
  console.log('Iniciando o seed de usuários...');

  const usuario = await prisma.usuario.upsert({
    where: { email: 'deposito@gmail.com' },
    update: {},
    create: {
      nome: 'deposito',
      email: 'deposito@gmail.com',
      senha: 'mimosa1@',
      cargo: 'ADMIN',
    },
  })

  console.log(`Usuário criado ou já existente: ${usuario.nome}`)
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });