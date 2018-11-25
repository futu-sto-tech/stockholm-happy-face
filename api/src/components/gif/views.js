const { GifController } = require("./controller");

const controller = new GifController();

exports.getSearchGif = async (req, res) => {
  const query = req.query.query;

  if (!query)
    return res.status(404).json({ message: "Supply query parameter" });

  const images = await controller.search(query);
  res.json({ images });
};
