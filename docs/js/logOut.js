function Out() {
  swal({
    title: 'Are you sure?',
    text: 'Do you want to log Out',
    icon: 'warning',
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      window.location.href = 'Login.html'
    } else {
    }
  })
}
