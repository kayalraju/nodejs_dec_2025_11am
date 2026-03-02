const Category = require("../models/category");

const SubCategory = require("../models/subcategory");

class LookupController {
  async createCategory(req, res) {
    try {
      const data = await Category.create(req.body);
      return res
        .status(200)
        .json({ message: "category created successfully", data: data });
    } catch (error) {
      console.log(error);
    }
  }

  async getCategory(req, res) {
    try {
      const data = await Category.find();
      return res
        .status(200)
        .json({ message: "category get successfully", data: data });
    } catch (error) {
      console.log(error);
    }
  }

  async createSubCategory(req, res) {
    try {
      const data = await SubCategory.create(req.body);
      return res
        .status(200)
        .json({ message: "sub category created successfully", data: data });
    } catch (error) {
      console.log(error);
    }
  }

  async getSubCategory(req, res) {
    try {
      const data = await SubCategory.aggregate([
        {
          $lookup: {
            from: "categories",
            localField: "categoryId",
            foreignField: "_id",
            as: "category",
          },
        },
        {
            $project: {
                subCategoryNam: 1,
                category: {
                    categoryName: 1
                }
            }
        },
        {
            $unwind: "$category"
        },
       
      ]);
      return res
        .status(200)
        .json({ message: "sub category get successfully", data: data });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new LookupController();
