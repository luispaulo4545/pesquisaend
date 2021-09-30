const Connection = require("../../../server/models/connection");

export default async (req, res) => {
  const { periodo } = req.body;
  try {
    const periodoSplit = periodo.split("-");
    const response = await Connection("questions").select("*");

    var um = 0,
      dois = 0,
      tres = 0,
      quatro = 0,
      cinco = 0,
      total = 0;

    for (const key in response) {
      var mes = new Date(response[key].question_date).getMonth() + 1;
      var ano = new Date(response[key].question_date).getFullYear();
      if (mes < 10) {
        mes = `0${mes}`;
      } else {
        mes = `${mes}`;
      }

      if (periodoSplit[0] == ano.toString() && periodoSplit[1] == mes) {
        total++;
        if (response[key].question_nota == "0-2") {
          um++;
        } else if (response[key].question_nota == "3-4") {
          dois++;
        } else if (response[key].question_nota == "5-6") {
          tres++;
        } else if (response[key].question_nota == "7-8") {
          quatro++;
        } else if (response[key].question_nota == "9-10") {
          cinco++;
        }
      }
    }

    res.status(200).json([um, dois, tres, quatro, cinco, total]);
  } catch (error) {
    res.status(400).json({ error });
  }
};
