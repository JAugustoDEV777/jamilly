import 'dotenv/config'
import { prisma } from '../src/db.js'

async function main() {
  try {
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

    console.log('Usuário criado/atualizado:')
    console.log(JSON.stringify(usuario, null, 2))
  } catch (err) {
    console.error('Erro ao criar usuário deposito:')
    console.error(err)
  } finally {
    await prisma.$disconnect()
  }
}

main()
