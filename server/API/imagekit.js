if (process.env.NODE_ENV !== "production") require("dotenv").config();
const ImageKit = require("imagekit");

let imagekit = new ImageKit({
	publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
	privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
	urlEndpoint: "https://ik.imagekit.io/aisyahauliaangelinee",
});

module.exports = imagekit;
