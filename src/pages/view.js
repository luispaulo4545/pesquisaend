import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  toast,
  toastConfig,
  Alert,
  Div,
  InputIcon,
  ConfirmButton,
  axios,
  FontAwesomeIcon,
} from "../components";

import Image from "next/image";
import { faPrint } from "@fortawesome/free-solid-svg-icons";

export default function Index() {
  const [total, setTotal] = useState([]);  
  const [um, setUm] = useState([]);
  const [dois, setDois] = useState([]);
  const [tres, setTres] = useState([]);
  const [quatro, setQuatro] = useState([]);
  const [cinco, setCinco] = useState([]);
  const [count, setCount] = useState([]);
  const [questionaries, setQuestionaries] = useState([]);
  const [periodo, setPeriodo] = useState("");
  const history = useRouter();

  useEffect(() => {
    async function loadData() {
      if (periodo == "") {
        const dateNow = new Date();
        var mes = "";

        if (dateNow.getMonth() + 1 < 10) {
          mes = `0${dateNow.getMonth() + 1}`;
        } else {
          mes = `${dateNow.getMonth() + 1}`;
        }
        setPeriodo(`${dateNow.getFullYear()}-${mes}`);
      } else if (periodo !== "") {
        const response = await axios.post("/api/question/visualizar", {
          periodo,
        });
        const response2 = await axios.post("/api/getQuestionaries", {
          periodo,
        });
        setQuestionaries(response2.data);
        setTotal(response.data[5]);
        setUm(response.data[0]);
        setDois(response.data[1]);
        setTres(response.data[2]);
        setQuatro(response.data[3]);
        setCinco(response.data[4]);
        const contador = await axios.post("/api/count/view", { periodo });
        setCount(contador.data);
      }
    }
    loadData();
  }, [periodo]);

  function handlePrint() {
    if (process.browser) {
      window.print();
    }
  }

  return (
    <main id="page-view">
      <Div id="view-content">
        <header>
          <div className="logo">
            <Image src="/logo.svg" width={100} height={100} />
          </div>
          <div className="buttons">
            <input
              type="month"
              value={periodo}
              onChange={(e) => {
                setPeriodo(e.target.value);
              }}
            />
            <button onClick={handlePrint}>
              <FontAwesomeIcon icon={faPrint} />
              <span>Imprimir</span>
            </button>
          </div>
        </header>

        <section className="grid-data">
          <div className="total card-data">
            <h2>Total de {total} avaliações</h2>
            <h2>Total de {count} visualizações</h2>
          </div>

          {[
            { nome: "um", valor: "0-2", icone: "/tristao.svg", dado: um },
            { nome: "dois", valor: "3-4", icone: "/triste.svg", dado: dois },
            { nome: "tres", valor: "5-6", icone: "/neutro.svg", dado: tres },
            { nome: "quatro", valor: "7-8", icone: "/feliz.svg", dado: quatro },
            {
              nome: "cinco",
              valor: "9-10",
              icone: "/apaixonado.svg",
              dado: cinco,
            },
          ].map((card) => (
            <div
              className={card.nome + " card-data"}
              key={card.valor}
              onClick={() => history.push(`/peoples/${card.valor}`)}
            >
              <div className="img">
                <Image src={card.icone} width={100} height={100} />
                <h2>{card.valor}</h2>
              </div>

              <div className="dado">
                <h4>{card.dado}</h4>
                <h3>Avaliações</h3>
              </div>
            </div>
          ))}
        </section>
      </Div>
      <div className="impressao">
        <header>
          <img className="logo-print" src="/logo.svg" />
          <h1>Relatório de Experiência Núcleo de Bariátrica</h1>
        </header>

        <main className="summary">
          <h3>
            Período: {`${periodo.split("-")[1]}/${periodo.split("-")[0]}`}
          </h3>
        </main>

        <main className="summary">
          <h3>Resumo</h3>
          <section className="head">
            <div>0-2</div>
            <div>3-4</div>
            <div>5-6</div>
            <div>7-8</div>
            <div>9-10</div>
            <div>Total</div>
            <div>Visualizações</div>
          </section>
          <section className="body">
            <div>{um}</div>
            <div>{dois}</div>
            <div>{tres}</div>
            <div>{quatro}</div>
            <div>{cinco}</div>
            <div>{total}</div>
            <div>{count}</div>
          </section>
        </main>

        <main className="summary">
          <h3>Pesquisas</h3>
          <section className="head">
            <div className="data">Data</div>
            <div className="data">Hora</div>
            <div>Nome</div>
            <div>E-mail</div>
            <div>Telefone</div>
            <div className="nota">Nota</div>
          </section>
          {questionaries.map((quest, index) => (
            <section key={index} className="body">
              <div className="data">{quest.data}</div>
              <div className="data">{quest.hora}</div>
              <div>{quest.nome}</div>
              <div>{quest.email}</div>
              <div>{quest.telefone}</div>
              <div className="nota">{quest.nota}</div>
            </section>
          ))}
        </main>
        <main className="summary">
          <h3>Comentários</h3>
          <table cellPadding={0} cellSpacing={0}>
            <thead>
              <tr>
                <td className="data">Data</td>
                <td className="data">Hora</td>
                <td className="nome">Nome</td>
                <td>Comentário</td>
              </tr>
            </thead>
            <tbody>
              {questionaries.map(
                (quest, index) =>
                  quest.comentarios !== "N/A" && (
                    <tr key={index} className="comentario">
                      <td className="data">{quest.data}</td>
                      <td className="data">{quest.hora}</td>
                      <td className="nome">{quest.nome}</td>
                      <td>{quest.comentarios}</td>
                    </tr>
                  )
              )}
            </tbody>
          </table>
        </main>
      </div>
    </main>
  );
}
