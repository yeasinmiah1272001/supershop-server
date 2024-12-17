import productModels from "../models/productModels.js";
import { v2 as cloudinary } from "cloudinary";
//============================ product add ===============================
//============================ product add ===============================
//============================ product add ===============================
const AddProduct = async (req, res) => {
  try {
    const {
      description,
      rating,
      author,
      offer,
      SKU,
      category,
      oldprice,
      price,
      title,
    } = req.body;
    // console.log(req.body);

    if (!title) {
      return res.send({ success: false, message: "title is required" });
    }

    if (!description) {
      return res.send({ success: false, message: "description is required" });
    }
    if (!price) {
      return res.send({ success: false, message: "price is required" });
    }

    if (!oldprice) {
      return res.send({ success: false, message: "oldprice is required" });
    }

    if (!rating) {
      return res.send({ success: false, message: "rating is required" });
    }

    if (!category) {
      return res.send({ success: false, message: "category is required" });
    }
    if (!offer) {
      return res.send({ success: false, message: "offer is required" });
    }

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    let image = [image1, image2].filter((item) => item !== undefined);
    // console.log("img", image);

    let imageUrls = await Promise.all(
      image.map(async (item) => {
        try {
          let result = await cloudinary.uploader.upload(item.path, {
            resource_type: "image",
          });
          return result.secure_url;
        } catch (error) {
          console.error("Error uploading to Cloudinary:", error);
          throw new Error("Image upload failed");
        }
      })
    );

    const productData = {
      title,
      price: Number(price),
      oldprice: Number(oldprice),
      category,
      author,
      offer: offer === "true" ? true : false,
      description,
      image: imageUrls,
      SKU,
    };

    const product = new productModels(productData);
    // console.log(product);
    await product.save();

    return res.json({ success: true, message: "Product added successfully" });
  } catch (error) {
    console.error("Error adding product:", error);
    return res.json({
      success: false,
      message: "Product addition failed",
      error,
    });
  }
};

//============================ product remove ===============================
//============================ product remove ===============================
//============================ product remove ===============================
const productRemove = async (req, res) => {
  try {
    await productModels.findByIdAndDelete(req.body._id);
    return res.json({ success: true, message: "product remove success" });
  } catch (error) {
    return res.json({
      success: false,
      message: "product remove success fail",
      error,
    });
  }
};

//============================ single product list ===============================
//============================ single product list ===============================
//============================ single product list ===============================
const singleProduct = async (req, res) => {
  try {
    const { _id } = await req.query;
    // console.log("ids", req.query);
    const product = await productModels.findById(_id);
    // console.log("product", product);
    if (!product) {
      return res.json({ success: false, message: "no product found this id" });
    }
    return res.json({
      success: true,
      product,
      message: "single product list success",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "single product list success fail",
      error,
    });
  }
};
//============================ product list ===============================
//============================ product list ===============================
//============================ product list ===============================
const productList = async (req, res) => {
  try {
    const total = await productModels.countDocuments({});
    const product = await productModels.find({});
    return res.json({
      success: true,
      total,
      product,
      message: "product list success",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "product list success fail",
      error,
    });
  }
};

export { productList, productRemove, AddProduct, singleProduct };
