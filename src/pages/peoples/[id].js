import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Div, axios } from "../../components";
import Image from "next/image";

export default function Index() {
  const [dados, setDados] = useState([]);
  const history = useRouter();
  const { id } = history.query;
  useEffect(() => {
    async function loadData() {
      const response = await axios.post("/api/question/individual", { id });

      setDados(response.data);
    }
    if (id) {
      loadData();
    }
  }, [id]);

  return (
    <main id="page-view">
      <Div id="view-content">
        <header>
          <div className="logo">
            <Image src="/logo.svg" width={100} height={100} />
          </div>
        </header>

        <section className="grid-data">
          <div className="total card-people">
            <h2>
              Total de {dados.length} avaliações de {id}
            </h2>
          </div>

          {dados.map((card) => (
            <div
              className="card-people"
              key={card.question_id}
              onClick={(e) => {
                var copiar = document.getElementById("id" + card.question_id);
                copiar.select();
                copiar.setSelectionRange(0, 99999);
                document.execCommand("copy");
              }}
            >
              <p>
                <strong>Nome: </strong>
                {card.question_nome}
              </p>
              <p>
                <strong>E-mail: </strong>
                <span>{card.question_email}</span>
                <input
                  value={card.question_email}
                  style={{ display: "none" }}
                  id={"id" + card.question_id}
                />
              </p>
              <p>
                <strong>Telefone: </strong>
                <span>{card.question_telefone}</span>
                <input
                  value={card.question_email}
                  style={{ display: "none" }}
                  id={"id" + card.question_id}
                />
              </p>
              <p>
                <strong>Motivo: </strong>
                <span>{card.question_motivo}</span>
                <input
                  value={card.question_motivo}
                  style={{ display: "none" }}
                  id={"id" + card.question_id}
                />
              </p>
            </div>
          ))}
        </section>
      </Div>
    </main>
  );
}
