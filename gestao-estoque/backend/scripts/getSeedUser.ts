import 'dotenv/config'
import { prisma } from '../src/db.js'

async function main() {
  // Lista todos os usuários para diagnosticar seed
  const usuarios = await prisma.usuario.findMany({ orderBy: { id: 'asc' } })

  if (!usuarios || usuarios.length === 0) {
    console.log('Nenhum usuário encontrado no banco.')
    return
  }

  console.log(`Encontrados ${usuarios.length} usuário(s):`)
  console.log(JSON.stringify(usuarios, null, 2))
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
