const Product = require("../model/productModel");

// GET /
exports.showHome = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.render("index", { products, error: null, form: { name: "", price: "", quantity: "" } });
  } catch (err) {
    res.status(500).render("index", { products: [], error: err.message, form: { name: "", price: "", quantity: "" } });
  }
};

// POST /products
exports.createProduct = async (req, res) => {
  try {
    const name = (req.body.name || "").trim();
    const price = Number(req.body.price);
    const quantity = Number(req.body.quantity);

    if (!name) {
      const products = await Product.find().sort({ createdAt: -1 });
      return res.status(400).render("index", {
        products,
        error: "Name is required.",
        form: { name, price: req.body.price || "", quantity: req.body.quantity || "" }
      });
    }

    await Product.create({ name, price, quantity });

    
    return res.redirect("/");
  } catch (err) {
    const products = await Product.find().sort({ createdAt: -1 }).catch(() => []);
    return res.status(400).render("index", {
      products,
      error: err.message,
      form: { name: req.body.name || "", price: req.body.price || "", quantity: req.body.quantity || "" }
    });
  }
};
