import moment from "moment";

const Connection = require("../../server/models/connection");

export default async (req, res) => {
  const { periodo } = req.body;
  try {
    const questionaries = await Connection("questions")
      .select("*")
      .orderBy("question_date", "desc");
    const result = [];

    const periodoSplit = periodo.split("-");

    for (const key in questionaries) {
      var mes = new Date(questionaries[key].question_date).getMonth() + 1;
      var ano = new Date(questionaries[key].question_date).getFullYear();
      if (mes < 10) {
        mes = `0${mes}`;
      } else {
        mes = `${mes}`;
      }

      if (periodoSplit[0] == ano.toString() && periodoSplit[1] == mes) {
        var data = "N/A";
        var hora = "N/A";
        var telefone = "N/A";
        var comentarios = "N/A";

        if (questionaries[key].question_date) {
          if (moment(questionaries[key].question_date).get("dates") < 10) {
            if (
              moment(questionaries[key].question_date).get("months") + 1 <
              10
            ) {
              // Mes e dia com 0 na frente
              data = `0${moment(questionaries[key].question_date).get(
                "dates"
              )}/0${
                moment(questionaries[key].question_date).get("months") + 1
              }/${moment(questionaries[key].question_date).get("Y")}`;
            } else {
              // Só dia com 0 na frente
              data = `0${moment(questionaries[key].question_date).get(
                "dates"
              )}/${
                moment(questionaries[key].question_date).get("months") + 1
              }/${moment(questionaries[key].question_date).get("Y")}`;
            }
          } else if (
            moment(questionaries[key].question_date).get("months") + 1 <
            10
          ) {
            // Só mês com 0 na frente
            data = `${moment(questionaries[key].question_date).get("dates")}/0${
              moment(questionaries[key].question_date).get("months") + 1
            }/${moment(questionaries[key].question_date).get("Y")}`;
          } else {
            // Nenhum dos dois com 0 na frente
            data = `${moment(questionaries[key].question_date).get("dates")}/${
              moment(questionaries[key].question_date).get("months") + 1
            }/${moment(questionaries[key].question_date).get("Y")}`;
          }

          if (
            moment(questionaries[key].question_date).get("hours") >= 3 &&
            moment(questionaries[key].question_date).get("hours") < 10
          ) {
            hora = `0${
              moment(questionaries[key].question_date).get("hours") - 3
            }:${moment(questionaries[key].question_date).get("minutes")}h`;
          } else if (
            moment(questionaries[key].question_date).get("hours") == 2
          ) {
            hora = `23:${moment(questionaries[key].question_date).get(
              "minutes"
            )}h`;
          } else if (
            moment(questionaries[key].question_date).get("hours") == 1
          ) {
            hora = `22:${moment(questionaries[key].question_date).get(
              "minutes"
            )}h`;
          } else if (
            moment(questionaries[key].question_date).get("hours") == 0
          ) {
            hora = `21:${moment(questionaries[key].question_date).get(
              "minutes"
            )}h`;
          } else if (
            moment(questionaries[key].question_date).get("hours") > 9
          ) {
            hora = `${
              moment(questionaries[key].question_date).get("hours") - 3
            }:${moment(questionaries[key].question_date).get("minutes")}h`;
          }
        }

        if (questionaries[key].question_telefone) {
          telefone = questionaries[key].question_telefone;
        }

        if (questionaries[key].question_comentarios) {
          comentarios = questionaries[key].question_comentarios;
        }

        result.push({
          data,
          hora,
          nome: questionaries[key].question_nome,
          email: questionaries[key].question_email,
          telefone,
          nota: questionaries[key].question_nota,
          comentarios: comentarios,
        });
      }
    }

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};
