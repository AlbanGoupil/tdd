export default (Booking, Book, User) =>{
  const bookings = [
    new Booking(
      '1', 
      new Date(2022, 5, 6),
      new Date(2022, 7, 12),
      new Book('9782744005084', 'UML et C++', 'Richard C. Lee, William M. Tepfenhart', 'CampusPress', 'FR', 29.95),
      new User('12a55zeaz4-88az', 'De Monredon', 'Simon', new Date(2000, 9, 25), '13 rue de Vibraye', '0786189288', 'simon@gmail.com'),

    ),

    new Booking(
      '2', 
      new Date(2021, 5, 7), 
      new Date(2021, 7, 13),
      new Book('9782744005084', 'UML et C++', 'Richard C. Lee, William M. Tepfenhart', 'CampusPress', 'FR', 29.95),
      new User('12a55zeaz4-88az', 'De Monredon', 'Simon', new Date(2000, 9, 25), '13 rue de Vibraye', '0786189288', 'simon@gmail.com'),
    ),
  ];
    
  const listBookings = () => {
    return bookings;
  }

  const createBooking = (booking) => {
    bookings.push(new Booking(
      booking.id,
      booking.rentDate,
      booking.returnDate,
      booking.item,
      booking.user
    ))
    return booking
  }

  const findBooking = (id) => {
    return bookings.find(b => b.id === id) || null
  }

  const updateBooking = (id ,booking) => {
    let bookingId = bookings.findIndex(b => b.id === id)

    if(bookingId > -1){
      bookings[bookingId] = new Booking(
        id,
        booking.rentDate,
        booking.returnDate,
        booking.item,
        booking.user
      )
      return bookings[bookingId]
    }
    return null
  }

  const deleteBooking = (id) => {
    let boookingDelete = bookings.findIndex(b => b.id === id)
    if(boookingDelete < 0) return null

    let deletedBooking = bookings.splice(boookingDelete, 1)
    return deletedBooking[0]
  }

  return {
    listBookings,
    createBooking,
    findBooking,
    updateBooking,
    deleteBooking
  };
}