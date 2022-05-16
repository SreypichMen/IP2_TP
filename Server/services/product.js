const { products } = require("../models/product")

const create = async(params, imagefile, req, res) => {
        const { name, item } = params;
        const imageFile = imagefile;
        // console.log(name, item);
        // console.log("/n", imageFile.path);

        try {
            const newProduct = {
                name: name,
                imageURL: imageFile.filename,
                item: item
            }
            const createProduct = await products.create(newProduct);
            return res.status(200).json({ status: "true", message: "Product create successfull", data: createProduct });
        } catch (error) {
            return res.status(400).json({ status: "false", message: error });
        }
    }
    // const productAll = async(req, res) => {
    //     try {
    //         const productShop = await products.aggregate([{
    //             $lookup: {
    //                 from: "prices",
    //                 localField: "_id",
    //                 foreignField: "product",
    //                 as: "shop"
    //             }
    //         }])
    //         return res.json({ status: "true", message: "Product", data: productShop });
    //     } catch (error) {
    //         return res.status(400).json({ status: "false", error: error })
    //     }
    // }
const productAll = async(req, res) => {
    try {
        const productShop = await products.aggregate([{
            $lookup: {
                from: "prices",
                localField: "_id",
                foreignField: "product",
                as: "shop"
            }
        }])
        return res.json({ status: "true", message: "Product", data: productShop });
    } catch (error) {
        return res.status(400).json({ status: "false", error: error })
    }
}
const productEach = async(params, req, res) => {
    try {
        const { _id } = params;
        const productShop = await products.aggregate([{
            $lookup: {
                from: "prices",
                localField: "_id",
                foreignField: "product",
                as: "shop"
            }
        }])
        const searchIndex = productShop.findIndex((product) => product._id == _id);
        // console.log(productShop[searchIndex]);

        return res.json({ status: "true", message: "Product", data: productShop[searchIndex] });
    } catch (error) {
        return res.status(400).json({ status: "false", error: error })
    }
}
const productInEachItem = async(params, req, res) => {
    const { itemId } = params;
    try {
        // const productByItem = await products.find({ item: itemId });
        const productShop = await products.aggregate([{
                $lookup: {
                    from: "prices",
                    localField: "_id",
                    foreignField: "product",
                    as: "shop"
                }
            }])
            // var numofPro = [];
        var num = 0;
        const product = [];
        // const searchIndex = productShop.findIndex((product) => product.item == itemId);
        // console.log(searchIndex);
        for (var i = 0; i < productShop.length; i++) {
            if (productShop[i].item == itemId) {
                // numofPro[num] = i;
                product[num] = productShop[i];
                num++;
            }

        }
        // console.log(product);
        return res.status(200).json({ status: "true", message: "Products", data: product });
    } catch (error) {
        return res.status(400).json({ status: "false", message: error });
    }
}

const productById = async(params, req, res) => {
    const { id } = params;
    try {
        const productById = await products.findById({ _id: id });
        if (productById) {
            return res.status(200).json({ status: "true", message: "Product", data: productById });
        } else {
            throw "Product's name not found"
        }
    } catch (error) {
        return res.status(400).json({ status: "false", message: error });
    }
}

const removeById = async(params, req, res) => {
    const { _id } = params;
    try {
        await products.findByIdAndDelete({ _id: _id });
        return res.status(200).json({ status: "true", message: "Product delete successful" });
    } catch (error) {
        return res.status(400).json({ status: "false", message: error });
    }
}

const update = async(params, req, res) => {
    const { _id, name, imageURL, item } = params;
    try {
        const productById = await products.findByIdAndUpdate(_id, {
            name: name,
            imageURL: imageURL,
            item: item
        });
        if (productById) {
            return res.status(200).json({ status: "true", message: "Product update successful", data: productById });
        } else {
            throw "Product's name not found"
        }
    } catch (error) {
        return res.status(400).json({ status: "false", message: error });
    }
}

module.exports = {
    create,
    productAll,
    productEach,
    productInEachItem,
    productById,
    removeById,
    update
}