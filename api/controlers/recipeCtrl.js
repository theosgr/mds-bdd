import { validate as uuidValidate} from 'uuid';

export default (recipeRepo) => {
  const listRecipes = (_, res) => {
    res.send({
      data: recipeRepo.listRecipes()
    });
  };

  const getRecipe = (req, res) => {
    const id = req.params.id;

    if (!uuidValidate(id)) {
      return res.status(400).send({
        error: "L'ID renseigné n'est pas de type UUID"
      })
    }

    const recipe = recipeRepo.findRecipe(id);

    if (recipe) {
      return res.send({
        data: recipe
      });
    }

    res.status(404).send({
      error: `Recipe with id ${id} not found`
    });
  }

  const createRecipe = (req, res) => {
    const recipe = recipeRepo.createRecipe(req.body);
    res.status(201).send({
      data: recipe
    });
  }

  const updateRecipe = (req, res) => {
    const id = req.params.id;

    if (!uuidValidate(id)) {
      return res.status(400).send({
        error: "L'ID renseigné n'est pas de type UUID"
      })
    }

    const recipe = recipeRepo.updateRecipe(id, req.body);

    if (recipe) {
      return res.send({
        data: recipe
      });
    }

    res.status(404).send({
      error: `Recipe with id ${id} not found`
    });
  }

  const deleteRecipe = (req, res) => {
    const id = req.params.id;

    if (!uuidValidate(id)) {
      return res.status(400).send({
        error: "L'ID renseigné n'est pas de type UUID"
      })
    }

    const deletedRecipe = recipeRepo.deleteRecipe(id);

    if (deletedRecipe) {
      return res.send({
        meta: {
          _deleted: deletedRecipe
        }
      });
    }

    res.status(404).send({
      error: `Recipe with id ${id} not found`
    });
  }

  return {
    listRecipes,
    getRecipe,
    createRecipe,
    updateRecipe,
    deleteRecipe,
  };
}
