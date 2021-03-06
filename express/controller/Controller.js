let express = require('express')
let router = express.Router();

const Service = require('../service/Service');

// Create
router.post("/photosColor", (req, res) => {
    let newPhoto = Service.addPhoto(req.body, 1);
    res.status(200).send(newPhoto);
  });
  
router.post("/photosBW", (req, res) => {
  let newPhoto = Service.addPhoto(req.body, 0);
  res.status(200).send(newPhoto);
});

// Read All
router.get("/photosColor", (req, res) => {   
  const photoList = Service.getAllPhotos(1);
  if (photoList!==undefined && photoList.length!==0) {
      res.status(200).send(photoList);
  } else {
      res.status(204).send('No photo found!');
  }
});

router.get("/photosBW", (req, res) => {   
  const photoList = Service.getAllPhotos(0);
  if (photoList!==undefined && photoList.length!==0) {
      res.status(200).send(photoList);
  } else {
      res.status(204).send('No photo found!');
  }
});

// Update
router.put("/photosColor/:id", (req, res) => {
  let foundPhoto = Service.updatePhoto(req, 1);
  if (foundPhoto!==undefined) res.status(200).send(foundPhoto);
  else res.status(204).send('No photo found!');
});

router.put("/photosBW/:id", (req, res) => {
  let foundPhoto = Service.updatePhoto(req, 0);
  if (foundPhoto!==undefined) res.status(200).send(foundPhoto);
  else res.status(204).send('No photo found!');
});
  
// Delete
router.delete("/photosColor/:id", (req, res) => {
  Service.removePhoto(req.params.id, 1);
  res.status(200).send('Photo deleted!');
});
  
router.delete("/photosBW/:id", (req, res) => {
  Service.removePhoto(req.params.id, 0);
  res.status(200).send('Photo deleted!');
});

module.exports = router;