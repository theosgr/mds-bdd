import orderRepo from './orderRepo.js';
import recipeRepo from './recipeRepo.js';
import userRepo from './userRepo.js';

export default (model) => ({
  recipeRepo: recipeRepo(model.Recipe),
  userRepo: userRepo(model.User),
  orderRepo: orderRepo(model.Order, model.User, model.Recipe)
});
