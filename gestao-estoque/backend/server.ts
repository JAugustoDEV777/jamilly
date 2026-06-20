import 'dotenv/config'
import app from './src/app'

const port = Number(process.env.PORT ?? 4000)

app.listen(port, () => {
  console.log(`Backend rodando em http://localhost:${port}`)
})