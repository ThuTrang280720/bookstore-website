const Products = require("../models/productModel");

// CRUD with products
const productCtrl = {
  getProducts: async (req, res) => {
    try {
      //console.log(req.query);
      const features = new APIfeatures(Products.find(), req.query)
        .filtering()
        .sorting()
        .paginating();

      const countCalc = new APIfeatures(Products.find(), req.query)
        .filtering()
        .sorting();
      const countTotal = await countCalc.query.count();
      const products = await features.query; //Product.find() if not add features for product page
      res.json({
        totalResult: countTotal,
        result: products.length,
        products,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getAllProducts: async (req, res) => {
    try {
      const allproducts = await Products.find();
      res.json({
        allproducts,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  createProduct: async (req, res) => {
    try {
      const {
        product_id,
        title,
        price,
        content,
        description,
        images,
        category,
        author,
        publisher,
        sold,
        stock,
      } = req.body;
      if (!images) return res.status(400).json({ msg: "No image upload" });

      const product = await Products.findOne({ product_id });
      if (product)
        return res.status(400).json({ msg: "This book is already exist!" });

      const newProduct = new Products({
        product_id,
        title,
        price,
        content,
        description,
        images,
        category,
        author,
        publisher,
        sold,
        stock,
      });
      await newProduct.save();
      res.json({ msg: "Create product successfully!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updateProduct: async (req, res) => {
    try {
      const {
        title,
        price,
        content,
        description,
        images,
        category,
        author,
        publisher,
        sold,
        stock,
      } = req.body;
      if (!images) return res.status(400).json({ msg: "No image upload" });

      await Products.findOneAndUpdate(
        { _id: req.params.id },
        {
          title,
          price,
          content,
          description,
          images,
          category,
          author,
          publisher,
          sold,
          stock,
        }
      );

      res.json({ msg: "Update product successfully!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  deleteProduct: async (req, res) => {
    try {
      await Products.findByIdAndDelete({ _id: req.params.id });
      res.json({ msg: "Delete product in database successfully!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

// Filter, sort and paginate
class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }
  filtering() {
    const queryObj = { ...this.queryString }; //queryString = req.body
    console.log({ before: queryObj });

    const excludedFields = ["page", "sort", "limit", "skipp"];
    excludedFields.forEach((el) => delete queryObj[el]);
    console.log({ after: queryObj });

    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(
      /\b(gte|gt|lt|lte|regex)\b/g,
      (match) => "$" + match
    );

    console.log({ queryObj, queryStr });

    this.query.find(JSON.parse(queryStr));

    return this;
  }
  sorting() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join("");
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort("-createdAt");
    }
    return this;
  }
  paginating() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 9;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    console.log(skip);
    return this;
  }
}

module.exports = productCtrl;
