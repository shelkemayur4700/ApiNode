const UPLOADS = [];
{
  /* ------------------file upload-----------------*/
}
const fileupload = (req, res) => {
  //we have to upload file
  console.log(req.body); // prints file name
  console.log(req.files); // prints info relatd ti files.
  res.send({
    message: "File upload sucessy",
  });
};
{
  /*------------------get uploades log-0----------------------------- */
}
const getUploades = (req, res) => {
  //we have to upload file
  res.json({
    data: UPLOADS,
  });
};

module.exports = {
  fileupload,
};
