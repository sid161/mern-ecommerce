const Category = require("../models/category");
const { isSignedIn, isAdmin } = require("./auth");

//middleware to get category by id

exports.getCategoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, cate) => {
    if (err) {
      return res.json({
        error: "Category not found in database",
      });
    }
    req.category = cate;
    next();
  });
};

exports.createCategory = (req, res) => {
  const category = new Category(req.body);
  category.save((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "not able to save category in database",
      });
    }
    res.json({ category });
  });
};

// get single category
exports.getCategory = (req, res) => {
  return res.json(req.category);
};

// get All Categories
exports.getAllCategory = (req, res) => {
  Category.find().exec((err, items) => {
    if (err) {
      return res.status(400).json({
        error: "Could not fetch categories",
      });
    }
    res.json(items);
  });
};

// update category

exports.updateCategory = (req, res) => {
  const category = req.category;
  category.name = req.body.name; // here we are updating name

  category.save((err, updatedCategory) => {
    if (err) {
      return res.json({
        error: "Failed to update",
      });
    }
    res.json(updatedCategory);
  });
};

//delete category
exports.removeCategory = (req, res) => {
  const category = req.category;
  category.remove((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "could not delete category",
      });
    }
    res.json({
      message: `${category} succesfully deleted`,
    });
  });
};
