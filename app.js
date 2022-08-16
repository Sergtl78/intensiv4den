let productService
const cartService = new CartService()
const htmlService = new HTMLService()

const productsContainer = document.getElementById('products')
const cartContainer = document.getElementById('cart')
const filterInput = document.getElementById('filter')
const btnCart = document.getElementById('btncart')
const backdrop = document.getElementById('backdrop')

filterInput.addEventListener('input', (event) => {
  const value = event.target.value

  const filteredProducts = productService.filterBy(value)

  renderProducts(filteredProducts)
})

productsContainer.addEventListener('click', (event) => {
  const id = event.target.dataset.id
    ? event.target.dataset.id
    : event.target.closest('li')?.dataset.id

  if (id) {
    cartService.add(productService.getById(+id))
    renderCart()
    openCart()
  }
})

cartContainer.addEventListener('click', (event) => {
  const type = event.target?.dataset.type

  const id = event.target?.dataset.id
  switch (type) {
    case 'clear':
      cartService.clear()
      renderCart()

      break
    case 'remove':
      cartService.remove(id)
      renderCart()
      break
  }
})

function renderProducts(products) {
  productsContainer.innerHTML = htmlService.paintProducts(products)
}

function renderCart() {
  cartContainer.innerHTML = htmlService.paintCart(cartService.getInfo())
}

async function startApplication() {
  renderCart()
  try {
    const response = await fetch('https://fakestoreapi.com/products')
    const data = await response.json()

    productService = new ProductService(data)

    renderProducts(productService.products)
  } catch (e) {
    productsContainer.innerHTML = htmlService.paintError(e)
  }
}

btnCart.addEventListener('click', openCart)
backdrop.addEventListener('click', closeCart)

function openCart() {
  cart.classList.add('open')
  backdrop.classList.add('open')
}
function closeCart() {
  cart.classList.remove('open')
  backdrop.classList.remove('open')
}

startApplication()
