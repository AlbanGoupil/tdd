export default (User) => {
  const users = [
    new User('12a55zeaz4-88az', 'De Monredon', 'Simon', new Date(2000, 9, 25), '13 rue de Vibraye', '0786189288', 'simon@gmail.com'),
    new User('ajzje4482zea9284z-529a2ze', 'Leroux', 'Valentin', new Date(2001, 7, 22), 'Chateau de glaix Cherreau', '0123456789', 'valou@gmail.com'),
  ]

  const listUsers = () => {
    return users
  }

  const createUser = (user) => {
   users.push(new User(
    user.id,
    user.lastName,
    user.firstName,
    user.birthDate,
    user.address,
    user.phone,
    user.email
   ))
   return user
  }

  const findUser = (id) => {
    return users.find(user => user.id === id) || null
  }

  const updateUser = (id ,user) => {
    let userId = users.findIndex(u => u.id === id)

    if(userId > -1){
      users[userId] = new User(
        id,
        user.lastName,
        user.firstName,
        user.birthDate,
        user.address,
        user.phone,
        user.email
      )
      return users[userId]
    }
    return null
  }

  const deleteUser = (id) => {
    let userToRemove = users.findIndex(u => u.id === id)
    
    if(userToRemove < 0) return null
    
    let deletedUser = users.splice(userToRemove, 1)
    return deletedUser[0]
  }

  return {
    listUsers,
    createUser,
    findUser,
    updateUser,
    deleteUser
  }
}