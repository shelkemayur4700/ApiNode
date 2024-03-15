const { v4: uuidv4 } = require("uuid");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "dakybuitw",
  api_key: "666144995281515",
  api_secret: "FFw4nhpFZ0Ntun29GgKxXyTBcAU",
});

const UploadtoCloudinary = (path) => {
  return new Promise((res, rej) => {
    cloudinary.uploader
      .upload(path, { public_id: uuidv4() })
      .then((data) => res(data.secure_url))
      .catch((err) => rej(err));
  });
};

module.exports = { UploadtoCloudinary };
