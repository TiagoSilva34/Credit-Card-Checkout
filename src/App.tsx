import { useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaCreditCard,
  FaCheck,
  FaCcMastercard,
  FaCcVisa,
} from "react-icons/fa";
import { MdInfo } from "react-icons/md";
import Card from "./components/Card";
import Input from "./components/Input";
import Cards from "react-credit-cards-2";
import {
  validateCardDate,
  validateCardName,
  validateCardNumber,
  validateCVVSize,
  validateOnlyNumeric,
} from "./utils/validate";
import Modal from "./components/modal";
import Button from "./components/Button";
import useModal from "./hooks/useModal";
import "./styles/App.scss";
import "react-credit-cards-2/dist/es/styles-compiled.css";

function App() {
  const [numberErrorMessage, setNumberErrorMessage] = useState<string>("");
  const [cvvErrorMessage, setCvvErrorMessage] = useState<string>("");
  const [validateErrorMessage, setValidateErrorMessage] = useState<string>("");
  const [viewportSize, setViewportSize] = useState(window.innerWidth);
  const [flag, setFlag] = useState<string>("");
  const [counter, setCounter] = useState(0);
  const [showAnimate, setShowAnimate] = useState("");
  const [alertCard, setAlertCard] = useState("");
  const { show, setShow, toggleModal } = useModal();
  const [state, setState] = useState({
    number: "",
    validate: "",
    cvv: "",
    name: "",
    focus: undefined,
  });

  const handleCardFlag = (issuer: any) => {
    if (validateCardNumber(state.number))
      setFlag(issuer.issuer);
    else setFlag("");
  };

  const handleInputChange = (evt: any) => {
    let { name, value } = evt.target;

    if (name === "number" || name === "cvv") {
      value = validateOnlyNumeric(value);
    }

    if (name === "name") {
      value = validateCardName(value)
    }

    if (name === "validate") {
      value = validateCardDate(value);
    }

    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (evt: any) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
  };

  const handleCheckCardData = () => {
    const errors = {
      number: "",
      cvv: "",
      validate: "",
    };

    const numberIsValid = validateCardNumber(state.number);
    if (!numberIsValid) {
      errors.number = "Número do cartão inválido!";
    }

    if (!validateCVVSize(state.cvv)) {
      errors.cvv = "Code do cartão inválido! Exemplo correto (000)";
    }

    const validateRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    const validateIsValid = validateRegex.test(state.validate);
    if (!validateIsValid) {
      errors.validate = "Validate do cartão inválida! Exemplo correto (MM/AA)";
    }

    if (errors.number) setNumberErrorMessage(errors.number);

    if (errors.cvv) setCvvErrorMessage(errors.cvv);

    if (errors.validate) setValidateErrorMessage(errors.validate);

    if (validateIsValid && validateCVVSize(state.cvv) && numberIsValid) {
      toggleModal();
      localStorage.setItem("clentCardData", JSON.stringify(state));
    } else {
      setAlertCard("alert__class");
    }
  };

  const validCardColor = () => {
    const numberIsValid = validateCardNumber(state.number);
    const validateRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;
    const validateIsValid = validateRegex.test(state.validate);

    if (numberIsValid) setNumberErrorMessage("");

    if (validateIsValid) setValidateErrorMessage("");

    if (validateCVVSize(state.cvv)) setCvvErrorMessage("");

    if (validateIsValid && validateCVVSize(state.cvv) && numberIsValid) {
      setAlertCard("");
      setShowAnimate("rotate");
    } else {
      setShowAnimate("");
    }
  };

  useEffect(() => {
    validCardColor();
  }, [state.number, state.cvv, state.validate]);

  useEffect(() => {
    setShow(show);

    if (show) {
      let count = 0;
      setInterval(() => {
        count++;
        setCounter(count);
        if (count === 3) {
          setState({
            number: "",
            validate: "",
            cvv: "",
            name: "",
            focus: undefined,
          });
          setShow(false);
        }
      }, 1000);
    }
  }, [show]);

  useEffect(() => {
    // Verificando tamanho da viewport
    window.addEventListener("resize", () => {
      const viewportWidth = window.innerWidth;
      setViewportSize(viewportWidth);
    });
  }, [viewportSize]);

  return (
    <div className="container">
      {show && (
        <Modal className="overlay">
          <div className="overlay__modal__container">
            <div>
              <span>
                <FaCheck />
              </span>
              <span className="overlay__modal__container__title">
                Cartão cadastrdo com sucesso
              </span>
            </div>
            <p className="overlay__modal__container__counter">
              Redirecionando para a página de pagamento: {counter}...
            </p>
          </div>
        </Modal>
      )}
      <div
        className={
          viewportSize <= 800 ? "container__header" : "container__aside"
        }
      >
        <div className="steps">
          <span className="steps__icon">
            <FaArrowLeft />
          </span>
          <p className="steps__title">
            {viewportSize <= 800 ? "step 2 de 3" : "Alterar forma de pagamento"}
          </p>
        </div>

        <div className="add__new__card__session">
          <span className="add__new__card__icon">
            <FaCreditCard />
          </span>
          <p className="add__new__card__title">Adicionar um novo cartão</p>
        </div>
      </div>
      <Card
        className={
          validateCVVSize(state.cvv) && showAnimate === "rotate"
            ? "animate-rotate card__container"
            : "card__container"
        }
      >
        <div
          className={
            flag
              ? `card__container__filled ${alertCard}`
              : `card__container__empty ${alertCard}`
          }
        >
          {validateCVVSize(state.cvv) && showAnimate === "rotate" && (
            <>
              <div className="card__container__black__tape"></div>
              <div
                className={
                  validateCVVSize(state.cvv)
                    ? "animate-rotate-reverse card__container__cvv__info"
                    : "card__container__cvv__info"
                }
              >
                <span>CVV {state.cvv}</span>
              </div>
            </>
          )}

          {showAnimate === "" && (
            <>
              <span className="card__container__header__flag">
                {flag === "visa" && <FaCcVisa />}
                {flag === "mastercard" && <FaCcMastercard />}
              </span>
              <div className="card__container__number">
                <span>
                  {state.number !== "" ? state.number.slice(0, 4) : "****"}
                </span>
                <span>
                  {state.number !== "" ? state.number.slice(4, 8) : "****"}
                </span>
                <span>
                  {state.number !== "" ? state.number.slice(8, 12) : "****"}
                </span>
                <span>
                  {state.number !== "" ? state.number.slice(12, 17) : "****"}
                </span>
              </div>
              <div className="card__container__footer">
                <h1 className="card__container__footer__name">
                  {state.name !== "" ? state.name : "NOME DO TITULAR"}
                </h1>
                <span className="card__container__footer__validate">
                  {state.validate !== "" ? state.validate : "00/00"}
                </span>
              </div>
            </>
          )}
        </div>
      </Card>
      <div className="card__info__content">
        {viewportSize > 800 && (
          <div className="card__info__content__status">
            <ul>
              <li>
                <span className="card__info__content__status__active">
                  <FaCheck />
                </span>
                <span>Carrinho</span>
              </li>
              <li>
                <span>2</span>
                <span>Pagamento</span>
              </li>
              <li>
                <span>3</span>
                <span>Confirmação</span>
              </li>
            </ul>
          </div>
        )}
        <Cards
          number={state.number}
          expiry={state.validate}
          cvc={state.cvv}
          name={state.name}
          focused={state.focus}
          callback={handleCardFlag}
        />

        <form
          className="card__info__content__form"
          onSubmit={handleCheckCardData}
        >
          <span>
            <Input
              maxLength={16}
              name="number"
              className="card__info__content_input__number"
              type="text"
              value={state.number}
              placeholder="Número do cartão"
              onChange={handleInputChange}
              onFocus={handleInputFocus}
            />
            {numberErrorMessage !== "" && (
              <p className="error-message">{numberErrorMessage}</p>
            )}
          </span>
          <Input
            name="name"
            className="card__info__content_input__name"
            type="text"
            value={state.name}
            placeholder="Nome (como está no cartão)"
            onChange={handleInputChange}
            onFocus={handleInputFocus}
          />
          <div>
            <span>
              <Input
                maxLength={5}
                name="validate"
                className="card__info__content_input__validate"
                type="text"
                value={state.validate}
                placeholder="Validade"
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
              {validateErrorMessage && (
                <p className="error-message">{validateErrorMessage}</p>
              )}
            </span>

            <span>
              <MdInfo />
              <Input
                maxLength={3}
                name="cvv"
                className="card__info__content_input__cvv"
                type="text"
                value={state.cvv}
                placeholder="CVV"
                onChange={handleInputChange}
                onFocus={handleInputFocus}
              />
              {cvvErrorMessage !== "" && (
                <p className="error-message">{cvvErrorMessage}</p>
              )}
            </span>
          </div>

          <div className="card__info__content__btn-add-new-card">
            <Button
              onClick={handleCheckCardData}
              className=""
              style={{ backgroundColor: Object.values(state).includes("") ? "#cecece" : "" }}
              type="button"
              disabled={Object.values(state).includes("") ? true : false}
            >
              add card
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
