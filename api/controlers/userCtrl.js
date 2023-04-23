export default (userRepo) => {

  const listUsers = (_, res) => {
    res.send({
      data: userRepo.listUsers()
    })
  }

  const createUser = (req, res) => {
    const data = req.body

    //Check email format 
    if(!data.email.includes('@')){
      return res.status(400).send({
        error: {
          message: 'Email incorrect'
        }
      })
    }
      
    const user = JSON.parse(JSON.stringify(userRepo.createUser(data)))
    res.status(201).send({
      data:user
    })
  }

  const updateUser = (req, res) => {
    const data = req.body
    const id = req.params.id
    
    if(!data.email.includes('@')){
      return res.status(400).send({
        error: {
          message: 'Email incorrect'
        }
      })
    }    
    const user = JSON.parse(JSON.stringify(userRepo.updateUser(id, data)))

    
    if(user){
      return res.send({
        data: user
      })
    }

    res.status(404).send({
      'error': `User ${id} not found`
    })
  }

  const getUser = (req, res) => {
    const id = req.params.id
    const user = JSON.parse(JSON.stringify(userRepo.findUser(id)))

    if(user){
      return res.send({
        data: user
      })
    }

    res.status(404).send({
      'error': `User ${id} not found`
    })

  }

  const deleteUser = (req, res) => {
    const id = req.params.id
    const deletedUser = JSON.parse(JSON.stringify(userRepo.deleteUser(id)))

    if(deletedUser){
      return res.send({
        meta: {
          _deleted: deletedUser
        }
      })
    }

    res.status(404).send({
      'error': `User ${id} not found`
    })
  }

  return {
    listUsers,
    createUser,
    updateUser, 
    getUser,
    deleteUser
  }
}