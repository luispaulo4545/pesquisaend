const Connection = require("../../../server/models/connection");

export default async (req, res) => {
  const { periodo } = req.body;
  try {
    const periodoSplit = periodo.split("-");
    const count = await Connection("views").select("*");
    var contador = 0;
    for (const key in count) {
      var mes = new Date(count[key].view_date).getMonth() + 1;
      var ano = new Date(count[key].view_date).getFullYear();
      if (mes < 10) {
        mes = `0${mes}`;
      } else {
        mes = `${mes}`;
      }

      if (periodoSplit[0] == ano.toString() && periodoSplit[1] == mes) {
        contador++;
      }
    }

    res.status(200).json(contador);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};
