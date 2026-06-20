import { PrismaClient } from '@client'; // ou '@prisma/client' dependendo de como está configurado

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando o seed de usuários...');

  const usuario = await prisma.usuario.upsert({
    where: { email: 'admin@email.com' }, // O Prisma usa o campo único para verificar se já existe
    update: {}, // Se já existir, deixa como está (não altera nada)
    create: {
      nome: 'deposito',
      email: 'deposito@gmail.com',
      senha: 'mimosa1@', // Lembre-se de usar bcrypt depois!
      cargo: 'ADMIN',
    },
  });

  console.log(`Usuário criado ou já existente: ${usuario.nome}`);
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