function Out() {
  swal({
    title: 'Are you sure?',
    text: 'Do you want to Sign Out',
    icon: 'warning',
    buttons: true,
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      window.location.href = 'Sign_up.html'
    } else {
    }
  })
}
