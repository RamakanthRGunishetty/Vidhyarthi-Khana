function Pay(event) {
  event.preventDefault()
  const queryString = window.location.search
  const urlParams = new URLSearchParams(queryString)
  const itemName = urlParams.get('item')
  const Price = urlParams.get('price')
  const Name = document.getElementById('user').value
  console.log(Name)

  fetch('/payments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: Name,
      item: itemName,
      price: Price,
    }),
  })
    .then((response) => {
      if (response.ok) {
        console.log('Payment information sent successfully')
      } else {
        console.error('Error sending payment information')
      }
    })
    .catch((error) => {
      console.error('Error sending payment information:', error)
    })

  const inputs = document.querySelectorAll('input')

  const allFilled = Array.from(inputs).every((input) => input.value !== '')

  if (allFilled) {
    swal({
      title: 'Success!',
      text:
        '*Thank you so much for your order*\n We really appreciate and hope that you love your food',
      icon: 'success',
      closeOnClickOutside: false,
    }).then(() => {
      inputs.forEach((input) => (input.value = ''))
    })
  } else {
  }
  document.getElementById('payment-form').submit()
}
