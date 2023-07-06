import { CreateUserDto, UpdateUserDto, UserDto } from '../dtos/userDto.js'
import { getAllUsers, createUser, getUserById, updateUser } from '../services/user.service.js'

export async function userRegistration(req, res) {
  const userData = req.body;
  try {
    const newUser = await createUser(userData);
    const newUserDto = new CreateUserDto(newUser.mail, newUser.userName, newUser.name, newUser.lastName, newUser.createdDate);
    res.status(201).json({
      id: newUser.idUserUser,
      newUserDto
    });
  } catch (error) {
    if(error.message == 'mail'){
      res.status(400).json({
        message: 'Este mail ya se necuentra en uso'
      })
    }else{
      res.status(500).json({
        message: error.message
      })
    }
  }
}

export async function getUsers(req, res) {
  try {
    const users = await getAllUsers();
    const usersDto = users.map(user => new UserDto(user.mail, user.userName));
    res.status(200).json(usersDto)
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function getUser(req, res) {
  const { idUser } = req.params;
  try {
    const user = await getUserById(idUser);
    if(user){
      const userDto = new UserDto(user.mail, user.userName);
      res.status(200).json(userDto);
    }else{
      res.status(404).json({
        message: 'No se encuentra ningun usuario con ese id'
      }) 
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

export async function userUpdate(req, res) {
  const {idUser} = req.params;
  const user = await getUserById(idUser);
  if(!user){
    return res.status(404).json({
      message: 'No existe ningun usuario con ese id'
    })
  }
  const userData = req.body;
  try {
    const updatedUser = await updateUser(user, userData);
    const updatedUserDto = new UpdateUserDto(updatedUser.mail, updatedUser.userName, updatedUser.name, updatedUser.lastName, updatedUser.updatedDate)
    res.status(200).json(updatedUserDto)
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}



