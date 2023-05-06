import { validate as uuidValidate} from 'uuid';
import moment from 'moment';
import FormatUtils from '../utils/formatUtils.js';

export default (orderRepo) => {

  const listOrders = (_, res) => {
    res.send({
      data: orderRepo.listOrders()
    })
  }

  const createOrder = (req, res) => {
    const data = req.body;
  
    if (data.quantity <= 0) {
      return res.status(400).send({
        error: "Quantity must be 1 or more"
      })
    }

    if (!FormatUtils.validateDateFormat(data.orderDate)) {
      return res.status(400).send({
        error: "Bad format date"
      })
    }

    if (data.orderDate <= moment().format("YYYY-MM-DD")) {
      return res.status(400).send({
        error: "You can't create an order in the past"
      })
    }

    const newOrder = orderRepo.createOrder(data)

    if (newOrder.error) {
      return res.status(404).send({
        error: newOrder.error
      })
    }

    return res.status(201).send({
      data: newOrder
    })
  }

  const getOrder = (req, res) => {
    const id = req.params.id;

    if (!uuidValidate(id)) {
      return res.status(400).send({
        error: "L'ID renseigné n'est pas de type UUID"
      })
    }

    const order = orderRepo.getOrder(id);

    if (order) {
      return res.send({
        data: order
      })
    }

    return res.status(404).send({
      error: `Order with id ${id} not found`
    })
  }

  const getOrderByUser = (req, res) => {
    const id = req.params.id 

    if (!uuidValidate(id)) {
      return res.status(400).send({
        error: "L'ID renseigné n'est pas de type UUID"
      })
    }

    const orders = orderRepo.getOrderByUser(id);

    if (orders.error) {
      return res.status(404).send({
        error: orders.error
      })
    }

    if (orders.length === 0) {
      return res.send({
          logInfo: "This user owns 0 order at the moment"
      })
  }

    return res.send({
      data: orders
    });
  }

  const getOrderByRecipe = (req, res) => {
    const id = req.params.id

    if (!uuidValidate(id)) {
      return res.status(400).send({
        error: "L'ID renseigné n'est pas de type UUID"
      })
    }

    const orders = orderRepo.getOrderByRecipe(id)

    if (orders.error) {
      return res.status(404).send({
        error: orders.error
      })
    }

    if (orders.length === 0) {
      return res.send({
          logInfo: "This recipe is attached to 0 order at the moment"
      })
  }

    return res.send({
      data: orders
    });
  }

  const updateOrder = (req, res) => {
    const id = req.params.id
    const data = req.body

    if (!uuidValidate(id)) {
      return res.status(400).send({
        error: "L'ID renseigné n'est pas de type UUID"
      })
    }

    if (data.quantity <= 0) {
      return res.status(400).send({
        error: "Quantity must be 1 or more"
      })
    }

    if (!FormatUtils.validateDateFormat(data.orderDate)) {
      return res.status(400).send({
        error: "Bad format date"
      })
    }

    const order = orderRepo.updateOrder(id, data)

    if (order.error) {
      return res.status(404).send({
        error: order.error
      })
    }

    return res.send({
      data: order
    })
  }

  const deleteOrder = (req, res) => {
    const id = req.params.id

    if (!uuidValidate(id)) {
        return res.status(400).send({
          error: `L'ID renseigné n'est pas de type UUID`
        })      
    }

    const orderToDelete = orderRepo.deleteOrder(id)

    if (orderToDelete.error) {
      return res.status(404).send({
        error: orderToDelete.error
      })
    }

    if (orderToDelete) {
        return res.send({
            meta: {
              _deleted: orderToDelete
            }
        })
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