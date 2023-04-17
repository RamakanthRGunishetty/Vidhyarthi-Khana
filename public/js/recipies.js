let preveiwContainer = document.querySelector('.products-preview')
let previewBox = preveiwContainer.querySelectorAll('.preview')
let Search = document.getElementById('search')

document.querySelectorAll('.products-container .product').forEach((product) => {
  product.onclick = () => {
    preveiwContainer.style.display = 'flex'
    let name = product.getAttribute('data-name')
    previewBox.forEach((preview) => {
      let target = preview.getAttribute('data-target')
      if (name == target) {
        preview.classList.add('active')
        Search.style.display = 'none'
      }
    })
  }
})

previewBox.forEach((close) => {
  close.querySelector('.fa-times').onclick = () => {
    close.classList.remove('active')
    preveiwContainer.style.display = 'none'
    Search.style.display = ''
  }
})
