const Connection = require("../../../server/models/connection");

export default async (req, res) => {
  const { nome, email, question, telefone, motivo } = req.body;

  try {
    const id = await Connection("questions").insert({
      question_nome: nome,
      question_email: email,
      question_telefone: telefone,
      question_nota: question,
      question_motivo: motivo,
    });
    res.status(200).json(id);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};
