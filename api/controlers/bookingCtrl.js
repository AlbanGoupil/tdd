export default (bookingRepo, userRepo, bookRepo) => {

  const listBookings = (_, res) => {
    res.send({
      data: bookingRepo.listBookings()
    })
  }

  const createBooking = (req, res) => {
    const data = req.body

    const user = userRepo.findUser(data.user.id)
    const book = bookRepo.findBook(data.item.isbn13)

    if(book === null){
      return res.status(404).send({
        error: 'Aucun livre ne correspond à l\'identifiant'
      })
    }

    if(user === null){
      return res.status(404).send({
        error: 'Aucun utilisateur ne correspond à l\'identifiant'
      })
    }

    if(data.rentDate ===""){
      return res.status(400).send({
        error: 'Date de location non renseignée'
      })
    }

  
    const booking = JSON.parse(JSON.stringify(bookingRepo.createBooking(data)))
    res.status(201).send({
      data: booking
    })
  }

  const getBooking = (req, res) => {
    const id = req.params.id
    const booking = JSON.parse(JSON.stringify(bookingRepo.findBooking(id)))

    if(booking){
      return res.send({
        data: booking
      })
    }

    res.status(404).send({
      error : "Aucune réservation ne correspond à l'identifiant fourni"
    })
  }

  const updateBooking = (req, res) => {
    const id = req.params.id

    data.user = userRepo.findUser(req.body.user)

    if(req.body.rentDate ===""){
      return res.status(400).send({
        error: 'Date de location non renseignée'
      })
    }
    // check not found user
    if (data.user === null){
      return res.status(404).send({
        error: {
          message: 'Aucun utilisateur ne correspond à l\identifiant'
        }
      })
    }

    if(bookingRepo.findBooking(id) === null){
      res.status(404).send({
        error : "Aucune réservation ne correspond à l'identifiant fourni"
      })
    }
    return res.send({
      data: booking
    })
  }


  const deleteBooking = (req, res) => {
    const id = req.params.id
    const deletedBooking = JSON.parse(JSON.stringify(bookingRepo.deleteBooking(id)))

    if(bookingRepo.findBooking(id) === null){

      res.status(404).send({
        error: "Aucune réservation ne correspond à l'identifiant fourni"
      })
    }
    return res.send({
      meta: {
        _deleted: deletedBooking
      }
    })
  }

  return {
    listBookings, 
    createBooking, 
    updateBooking, 
    getBooking, 
    deleteBooking
  }
}