const router = require('express').Router();
//todo: import controllers


router.get('/', movieController.getFavorites);
router.get('/search', movieController.getSearch);
router.get('/genres', movieController.getGenres);
router.post('/save', movieController.saveMovie);
router.delete('/delete/:id', movieController.deleteMovie);



module.exports = router;
