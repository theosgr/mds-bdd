import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';


export default (Order, User, Recipe) => {

  function formatDate(date) {
    return moment(date).format('YYYY-MM-DD')
  }

  const recipes = [
    new Recipe(
      'a35ce12d-d52b-4a07-90ad-68e985b779e7',
      'Chausson aux pommes',
      'pommes, pate feuilletée, sucre',
      'faire compote, former chausson, cuire'
    ),
    new Recipe(
      'dc466424-4297-481a-a8de-aa0898852da1',
      'Quiche thon tomate',
      'thon, tomate, pate feuilletée, oeuf, creme',
      'couper thon, tomates, mélanger creme et oeufs, mettre dans moule, cuire'
    ),
    new Recipe(
      'cd38e196-f4fb-4a8a-a2a2-791d9df0c86c',
      'Pates carbonara',
      'spaghetti, jaune oeuf, parmesan, lard',
      'couper lard en lamelles, cuire pates, recuperer jaune oeuf, melanger le tout avec de eau de cuisson'
    )
  ];

  const date1 = formatDate("19991109") 
  const date2 = formatDate("19810125")
  const date3 = formatDate("19830129")
  const dateB = formatDate("19890323")

  let user1 = new User('cef5ee37-15de-4039-8d03-8ecc23d98ecc', 'Grollier', 'Theo', date1, '15 rue de la Grande Motte', '0981234321','test@mail.com')
  let user2 = new User('a70f0f97-8ec0-4d66-8bfc-975357f37a1e', 'Dujardin', 'Jean', date2, '15 rue de la Petite Motte', '0921234321','testj@mail.com')
  let user3 = new User('a2e84855-be23-42fc-81ed-83e807198c9c', 'Henry', 'Thierry', date3, '19 boulevard des Anciens', '0712382910', 'lemail@mail.com')
  let user4 = new User('28a2c102-bbde-4f3f-84b1-a40f689e4a78', 'Nkoulou-Djoko', 'Billy', dateB, '20 impasse des cramptés', '0712342910', 'lemaildenkoulou@mail.com')

  const users = [
    user1,
    user2,
    user3,
    user4
  ]

  const date4 = formatDate("20230218") 
  const date5 = formatDate("20230312")

  const order1 = new Order("375f5512-facd-4cf8-a6c6-3cc8dbf992bc", date4, "a35ce12d-d52b-4a07-90ad-68e985b779e7", "1", "cef5ee37-15de-4039-8d03-8ecc23d98ecc")
  const order2 = new Order("1d2066d3-054a-4193-ac53-a1e9d028db8f", date5, "dc466424-4297-481a-a8de-aa0898852da1", "1", "a70f0f97-8ec0-4d66-8bfc-975357f37a1e")

  const orders = [
    order1,
    order2
  ]

  const listOrders = () => {
    return orders;
  }

  const createOrder = (order) => {
    if(!users.find(user => user.id === order.userId)) {
      return {
          error: "Unknown user"
      }
    }

    if(!recipes.find(recipe => recipe.id === order.recipeId)) {
        return {
            error: "Unknown recipe"
        }
    }

    const newOrder = new Order(
      uuidv4(),
      order.orderDate,
      order.recipeId,
      order.quantity,
      order.userId
    )

    orders.push(newOrder)
    return newOrder
  }

  const getOrder = (id) => {
    return orders.find(o => o.id === id)
  }

  const getOrderByUser = (id) => {
    if (!users.find(user => user.id === id)) {
      return {
        error: "Unknown user"
      }
    }
    
    return orders.filter(o => o.userId === id);
  }

  const getOrderByRecipe = (id) => {
    if (!recipes.find(recipe => recipe.id === id)) {
      return {
        error: "Unknown recipe"
      }
    }

    return orders.filter(o => o.recipeId === id);
  }

  const updateOrder = (id, order) => {
    if (!recipes.find(recipe => recipe.id === order.recipeId)) {
      return {
        error: "Unknown recipe"
      }
    }

    if (!users.find(user => user.id === order.userId)) {
      return {
        error: "Unknown user"
      }
    }
    
    const updatedOrder = orders.find(o => o.id === id)
    if (updatedOrder) {
      updatedOrder.recipeId = order.recipeId
      updatedOrder.orderDate = order.orderDate
      updatedOrder.quantity = order.quantity
      updatedOrder.userId = order.userId
      return updatedOrder
    }

    return {
      error: "Unknown order"
    }
  }

  const deleteOrder = (id) => {
    const deletedOrder = orders.find(o => o.id === id)
        if (deletedOrder) {
          orders.splice(orders.indexOf(deletedOrder), 1)
            return deletedOrder
        }
        return {
          error: `Order with id ${id} not found`
        }
  }

  return {
    listOrders,
    createOrder,
    getOrder,
    getOrderByUser,
    getOrderByRecipe,
    updateOrder,
    deleteOrder
  }
}