import SubCategoryModel from "../models/subCategory.model.js";

export const addSubCategory = async (request, response) => {
  try {
    const { name, image, category } = request.body;

    if (!name || !image || !category.length) {
      return response.status(400).json({
        message: "Provide name, image, and category",
        error: true,
        success: false
      });
    }

    const payload = { name, image, category };

    const createSubCategory = new SubCategoryModel(payload);
    const save = await createSubCategory.save();

    return response.json({
      message: "Sub Category Created",
      data: save,
      error: false,
      success: true
    });

  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    });
  }
};

export const getSubCategory = async (request, response) => {
  try {
    const data = await SubCategoryModel.find().sort({ createdAt: -1 }).populate('category');
    return response.json({
      message: "Sub Category data",
      data: data,
      error: false,
      success: true
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    });
  }
};

export const updateSubCategory = async (request, response) => {
  try {
    const { _id, name, image, category } = request.body;

    const checkSub = await SubCategoryModel.findById(_id);

    if (!checkSub) {
      return response.status(400).json({
        message: "Check your _id",
        error: true,
        success: false
      });
    }

    const updateSubCategory = await SubCategoryModel.findByIdAndUpdate(_id, {
      name,
      image,
      category
    }, { new: true });

    return response.json({
      message: 'Updated Successfully',
      data: updateSubCategory,
      error: false,
      success: true
    });

  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    });
  }
};

export const deleteSubCategory = async (request, response) => {
  try {
    const { _id } = request.body;
    const deleteSub = await SubCategoryModel.findByIdAndDelete(_id);

    if (!deleteSub) {
      return response.status(400).json({
        message: "Sub Category not found",
        error: true,
        success: false
      });
    }

    return response.json({
      message: "Deleted successfully",
      data: deleteSub,
      error: false,
      success: true
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false
    });
  }
};
