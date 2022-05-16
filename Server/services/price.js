const { prices } = require("../models/price")

const createPrice = async(params, req, res) => {
    const { product, price, source } = params;
    try {
        const newPrice = {
            product: product,
            price: price,
            source: source
        }
        const createPrice = await prices.create(newPrice);
        //write Price to DB
        return res.status(200).json({ status: "true", message: "Price create successfull", data: createPrice });
    } catch (error) {
        return res.status(400).json({ status: "false", message: error });

    }
}

const deletePrice = async(params, req, res) => {
    const { id } = params;
    try {
        await prices.findByIdAndDelete({ _id: id });
        return res.status(200).json({ status: "true", message: "Price delete successfull" });
    } catch (error) {
        return res.status(400).json({ status: "false", message: error });
    }
}

const findAllPrice = async(req, res) => {
    try {
        const findAllPrice = await prices.find({});
        return res.status(200).json({ status: "true", message: "All price data", data: findAllPrice });

    } catch (error) {
        return res.status(400).json({ status: "false", message: error });
    }
}

const updatePrice = async(params, req, res) => {
    try {
        const { _id, product, price, source } = params;
        await prices.findByIdAndUpdate(_id, { product: product, price: price, source: source })
        return res.status(200).json({ status: "true", message: "Price update successful" });
    } catch (error) {
        return res.status(400).json({ status: "false", message: error });
    }
}
module.exports = {
    createPrice,
    findAllPrice,
    deletePrice,
    updatePrice,
}