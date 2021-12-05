const router = require("express").Router();
const productCtrl = require("../controllers/productCtrl");
const auth = require("../middleware/authen");
const authAdmin = require("../middleware/authenAdmin");

router.get("/allproducts", auth, authAdmin, productCtrl.getAllProducts);
router
  .route("/products")
  .get(productCtrl.getProducts)
  .post(auth, authAdmin, productCtrl.createProduct);

router
  .route("/products/:id")
  .delete(auth, authAdmin, productCtrl.deleteProduct)
  .put(auth, authAdmin, productCtrl.updateProduct);

module.exports = router;
