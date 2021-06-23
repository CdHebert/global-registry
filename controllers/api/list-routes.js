const router = require('express').Router();
const { List, Product } = require('../../models');

// The `/api/lists` endpoint


router.get('/', (req, res) => {
  // find all lists
  // be sure to include its associated Products
  List.findAll({
    include: [Product]
  }).then(lists => res.json(lists)).catch(err => res.json(err))
});

router.get('/:id', (req, res) => {
  // find one
  // be sure to include its associated Products
  List.findOne({
    where: {
      id: req.params.id
    },
    include: [Product]
  }).then(lists => res.json(lists)).catch(err => res.json(err))
});

router.post('/', (req, res) => {
  // create
    List.create(req.body).then(lists => res.json(lists)).catch(err => res.json(err))
});

// update list - currently only list name updates but will add Product 
router.put('/:listId', (req, res) => {
  List.update ( req.body, 
     {where: {id: req.params.listId} }
  )
  .then(listData => {
    res.json(listData)
  } )
  .catch(err => res.json(err)) 
 })

  // delete list
  router.delete ("/:listId", async (req, res) => {
    try {
    
      const deleted = await List.destroy({
        where: { id: req.params.listId }
      });
      if (deleted) {
        return res.status(204).send("List deleted");
      }
      // throw new Error("List not found");
    } catch (error) {
      return res.status(500).send(error.message);
    }
  });


module.exports = router;
