import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';


export default (User) => {

  function formatDate(date) {
    return moment(date).format('YYYY-MM-DD')
  }

  const date1 = formatDate("19991109") 
  const date2 = formatDate("19810125")
  const date3 = formatDate("19830129")

  let user1 = new User('cef5ee37-15de-4039-8d03-8ecc23d98ecc', 'Grollier', 'Theo', date1, '15 rue de la Grande Motte', '0981234321','test@mail.com')
  let user2 = new User('a70f0f97-8ec0-4d66-8bfc-975357f37a1e', 'Dujardin', 'Jean', date2, '15 rue de la Petite Motte', '0921234321','testj@mail.com')
  let user3 = new User('a2e84855-be23-42fc-81ed-83e807198c9c', 'Henry', 'Thierry', date3, '19 boulevard des Anciens', '0712382910', 'lemail@mail.com')

  const users = [
    user1,
    user2,
    user3
  ]

  const listUsers = () => {
    return users;
  }

  const createUser = (user) => {
    const newUser = new User(
      uuidv4(),
      user.lastName,
      user.firstName,
      user.birthDate,
      user.address,
      user.phone,
      user.email
    )
    users.push(newUser)

    return newUser;
  }

  const updateUser = (id, userData) => {
    let foundUserIdx = -1;
    users.forEach((user, idx) => {
      if (user.id === id) {
        foundUserIdx = idx;
      }
    });

    if (foundUserIdx > -1) {
      users[foundUserIdx] = Object.assign(users[foundUserIdx], userData);
      return users[foundUserIdx];
    }

    return null;
  }

  const getUser = (id) => {
    return users.find(user => user.id === id);
  }

  const deleteUser = (id) => {
    const userIdx = users.findIndex(user => user.id === id);
    if(userIdx >= 0) {
      const deletedUser = users.splice(userIdx, 1)[0];

      return deletedUser;
    }

    return null;
  }

  return {
    listUsers,
    createUser,
    updateUser,
    getUser,
    deleteUser
  }
}

