const Connection = require("../../../server/models/connection");

export default async (req, res) => {
  const { id } = req.body;
  try {
    const response = await Connection("questions")
      .select("*")
      .where("question_nota", id);

    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error });
  }
};
