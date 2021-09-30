const Connection = require("../../../server/models/connection");

export default async (req, res) => {
  try {
    await Connection("views").insert({});
    res.status(200).json("foi");
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};
