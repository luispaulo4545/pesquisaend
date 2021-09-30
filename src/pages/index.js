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
  TextareaIcon,
} from "../components";

import Image from "next/image";

export default function Index() {
  // Criando Variáveis //
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");
  const [telefone, setTelefone] = useState("");
  const [motivo, setMotivo] = useState("");

  const [send, setSend] = useState(false);
  const history = useRouter();
  // Criando Variáveis //

  useEffect(() => {
    async function counter() {
      if (send == false) {
        await axios.post("/api/count/criar");
        setSend(true);
      }
    }
    counter();
  }, []);

  async function handleSend(e) {
    e.preventDefault();
    if (nome && email && question) {
      toast.warning("...Enviando", toastConfig);
      try {
        const response = await axios.post("/api/question/enviar", {
          nome,
          email,
          telefone,
          question,
          motivo,
        });
        toast.success("!Obrigado pela sua participação", toastConfig);
        setTimeout(() => {
          history.reload();
        }, 1500);
      } catch (err) {
        toast.error(".Ocorreu um erro, tente novamente", toastConfig); // Emite uma mensagem de erro
      }
    } else {
      toast.error(".Preencha todos os campos", toastConfig); // Emite uma mensagem de erro
    }
  }

  return (
    <main id="page-login">
      <Alert />
      <Div id="login-content">
        <header>
          <div className="logo">
            <Image src="/logo.svg" width={100} height={100} />
          </div>
          <h2>NPS - Avaliando a sua experiência</h2>
        </header>

        <h3 className="text-before">
          <strong>Prezado paciente,</strong>
          Você esteve internado no Hospital da Bahia. Estamos
          buscando saber como foi a sua experiência para melhoria contínua da
          assistência na Instituição.
        </h3>

        <form onSubmit={handleSend}>
          <h3>Nome: *</h3>
          <InputIcon
            className="input-block"
            type="text"
            complete="username"
            onChange={(e) => setNome(e.target.value)}
          />

          <h3>E-mail: *</h3>
          <InputIcon
            className="input-block"
            type="email"
            complete="textContentType"
            onChange={(e) => setEmail(e.target.value)}
          />

          <h3>Telefone: </h3>
          <InputIcon
            className="input-block"
            type="text"
            complete="textContentType"
            onChange={(e) => setTelefone(e.target.value)}
          />
          <h3>
            • Qual a chance de você recomendar o Hospital da Bahia para um
            familiar e/ou amigo?
          </h3>
          <div className="group-radio">
            {[
              { nome: "um", valor: "0-2", src: "/tristao.svg" },
              { nome: "dois", valor: "3-4", src: "/triste.svg" },
              { nome: "tres", valor: "5-6", src: "/neutro.svg" },
              { nome: "quatro", valor: "7-8", src: "/feliz.svg" },
              { nome: "cinco", valor: "9-10", src: "/apaixonado.svg" },
            ].map((radio) => (
              <button
                key={radio.nome}
                type="button"
                valor={radio.valor}
                className={radio.nome}
                value={question}
                onClick={() => setQuestion(radio.valor)}
              >
                <Image
                  className="imageButton"
                  src={radio.src}
                  width={100}
                  height={100}
                />
              </button>
            ))}
          </div>
          <div className="chance">
            <div className="dot"></div>
            <h4 text="Menor chance possível"></h4>
            <div className="dot"></div>
            <h4 text="Maior chance possível"></h4>
            <div className="dot"></div>
          </div>

          <h3 style={{ marginTop: "4rem" }}>
          Descreva aqui motivações/justificativas para a sua nota:
          </h3>
          <TextareaIcon
            className="textarea-block"
            type="text"
            complete="textContentType"
            onChange={(e) => setMotivo(e.target.value)}
          />

          <ConfirmButton text="Enviar" type="submit" />
        </form>
      </Div>
    </main>
  );
}
