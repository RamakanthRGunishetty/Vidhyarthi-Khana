function search() {
  const input = document.getElementById('filter').value.toUpperCase()
  const productContainer = document.getElementById('product-lists')
  console.log(productContainer)
  const cards = productContainer.getElementsByClassName('product')
  console.log(cards)
  for (let i = 0; i < cards.length; i++) {
    let title = cards[i].querySelector('.card-Body h3.card-title')
    console.log(title)

    if (title.innerText.toUpperCase().indexOf(input) > -1) {
      cards[i].style.display = ''
    } else {
      cards[i].style.display = 'none'
    }

  }
}
