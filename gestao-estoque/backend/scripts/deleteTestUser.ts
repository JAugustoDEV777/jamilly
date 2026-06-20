import 'dotenv/config'
import { prisma } from '../src/db.js'

async function main() {
  try {
    const result = await prisma.usuario.deleteMany({ where: { nome: 'testuser' } })
    console.log('Resultado da exclusão:', result)
  } catch (err) {
    console.error('Erro ao excluir testuser:', err)
  } finally {
    await prisma.$disconnect()
  }
}

main()
