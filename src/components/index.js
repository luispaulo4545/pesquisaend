// Componentes Locais //
import Alert from "./Alert";
import Div from "./Div";
import InputIcon from "./InputIcon";
import TextareaIcon from "./TextareaIcon";
import ConfirmButton from "./ConfirmButton";
import Aside from "./Aside";
import Select from "./Select";
import Section from "./Section";
// Componentes Locais //

// Componentes de animação //
import { AnimatePresence, motion } from "framer-motion";
// Componentes de animação //

// Ícones //
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faArrowDown } from "@fortawesome/free-solid-svg-icons";
// Ícones //

import axios from "axios";

// Componente de Alertas //
import { toast } from "react-toastify";
const toastConfig = {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};
// Componente de Alertas //

export {
  AnimatePresence,
  TextareaIcon,
  motion,
  toastConfig,
  toast,
  InputIcon,
  Div,
  Alert,
  ConfirmButton,
  Select,
  FontAwesomeIcon,
  axios,
  faArrowDown,
  faAngleLeft,
  Aside,
  Section,
};
