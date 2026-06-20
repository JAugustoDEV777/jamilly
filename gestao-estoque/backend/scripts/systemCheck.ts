async function request(url: string, options: RequestInit = {}) {
  const res = await fetch(url, options)
  const body = await res.text()
  let parsed: unknown
  try {
    parsed = body ? JSON.parse(body) : null
  } catch {
    parsed = body
  }
  return { status: res.status, ok: res.ok, body: parsed }
}

async function main() {
  const base = 'http://localhost:4000'
  console.log('1) Health check...')
  const health = await request(`${base}/api/health`)
  console.log(JSON.stringify(health, null, 2))
  if (!health.ok) throw new Error('Health check failed')

  console.log('2) Login check...')
  const login = await request(`${base}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nome: 'deposito', senha: 'mimosa1@' }),
  })
  console.log(JSON.stringify(login, null, 2))
  if (!login.ok) throw new Error('Login check failed')

  console.log('3) Create smoke product...')
  const productBody = {
    nome: 'SMOKE_TEST_PRODUTO_FULL',
    unidadesPorPack: 1,
    qtdAtual: 5,
    qtdMinima: 1,
    qtdMaxima: 100,
    custoDeCompra: 1.5,
    precoDeVenda: 3.0,
    categoria: 'SmokeTestFull',
  }
  const product = await request(`${base}/api/produtos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productBody),
  })
  console.log('Create product response status:', product.status)
  if (!product.ok || !product.body || typeof product.body !== 'object' || !('id' in (product.body as any))) {
    throw new Error('Create product failed')
  }
  const productId = (product.body as any).id
  console.log('Created product id:', productId)

  console.log('4) Create smoke movement...')
  const movementBody = {
    produtoId: productId,
    quantidade: 3,
    precoVendaUnitario: 5,
    tipo: 'entrada',
    lucroEstimado: 0,
    destinoCliente: 'SmokeClient',
    conferenteResponsavel: 'SmokeTester',
  }
  const movement = await request(`${base}/api/movimentacoes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(movementBody),
  })
  console.log('Create movement response status:', movement.status)
  if (!movement.ok || !movement.body || typeof movement.body !== 'object' || !('id' in (movement.body as any))) {
    throw new Error('Create movement failed')
  }
  const movementId = (movement.body as any).id
  console.log('Created movement id:', movementId)

  console.log('5) Verify product quantity updated...')
  const productsAfter = await request(`${base}/api/produtos`)
  console.log('Fetched products after movement, status:', productsAfter.status)
  if (!productsAfter.ok || !Array.isArray(productsAfter.body)) {
    throw new Error('Fetching products after movement failed')
  }
  const updatedProduct = (productsAfter.body as any[]).find((p) => p.id === productId)
  if (!updatedProduct) {
    throw new Error('Created product not found after movement')
  }
  if (updatedProduct.qtdAtual !== 8) {
    throw new Error(`Expected qtdAtual 8 after entrada, got ${updatedProduct.qtdAtual}`)
  }
  console.log('Product qty correct after movement:', updatedProduct.qtdAtual)

  console.log('6) Delete movement...')
  const deleteMovement = await request(`${base}/api/movimentacoes/${movementId}`, {
    method: 'DELETE',
  })
  console.log('Delete movement status:', deleteMovement.status)
  if (deleteMovement.status !== 204) {
    throw new Error('Deleting movement failed')
  }

  console.log('7) Verify quantity reverted...')
  const productsFinal = await request(`${base}/api/produtos`)
  const revertedProduct = (productsFinal.body as any[]).find((p) => p.id === productId)
  if (!revertedProduct) {
    throw new Error('Created product not found after deleting movement')
  }
  if (revertedProduct.qtdAtual !== 5) {
    throw new Error(`Expected qtdAtual 5 after deleting movement, got ${revertedProduct.qtdAtual}`)
  }
  console.log('Product qty reverted correctly:', revertedProduct.qtdAtual)

  console.log('8) Delete smoke product...')
  const deleteProduct = await request(`${base}/api/produtos/${productId}`, {
    method: 'DELETE',
  })
  console.log('Delete product status:', deleteProduct.status)
  if (deleteProduct.status !== 204) {
    throw new Error('Deleting product failed')
  }

  console.log('System check completed successfully.')
}

main().catch((err) => {
  console.error('System check failed:', err)
  process.exit(1)
})
