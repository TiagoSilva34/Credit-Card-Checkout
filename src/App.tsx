import { useEffect, useState } from "react"
import { FaArrowLeft, FaCreditCard, FaCheck } from "react-icons/fa"
import {  MdInfo } from "react-icons/md"
import Card from "./components/Card"
import Input from "./components/Input"
import "./styles/App.scss"

function App() {
  const [viewportSize, setViewportSize] = useState(0)

  useEffect(() => {
    const viewportWidth = window.innerWidth
    setViewportSize(viewportWidth)

    // Verificando tamanho da viewport
    window.addEventListener('resize', () => {
      const viewportWidth = window.innerWidth
      setViewportSize(viewportWidth)
    })
  }, [])

  return (
    <div className="container">
      <div className={viewportSize <= 800 ? "container__header" : "container__aside"}>
        <div className="steps">
            <span className="steps__icon">
              <FaArrowLeft />
            </span>
            <p className="steps__title">{viewportSize <= 800 ? "step 2 de 3" : "Alterar forma de pagamento"}</p>
        </div>

        <div className="add__new__card__session">
          <span className="add__new__card__icon">
            <FaCreditCard />
          </span>
          <p className="add__new__card__title">Adicionar um novo cartão</p>
        </div>
      </div>
      <Card className="card__container">
        <div>
          <span className="card__container__header__flag">VISA</span>
          <div className="card__container__number">
              <span>0000</span>
              <span>1111</span>
              <span>2222</span>
              <span>3333</span>
          </div>
          <div className="card__container__footer">
              <h1 className="card__container__footer__name">NOME DO TITULAR</h1>
              <span className="card__container__footer__validate">13/09</span>
          </div>
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
        <form className="card__info__content__form">
          <Input className="card__info__content_input__number" type="text" value="" placeholder="Número do cartão" onChange={() => {}} />
          <Input className="card__info__content_input__name" type="text" value="" placeholder="Nome (como está no cartão)" onChange={() => {}} />
          <div>
            <Input className="card__info__content_input__validate" type="text" value="" placeholder="Validade" onChange={() => {}} />

            <span>
              <MdInfo />
              <Input className="card__info__content_input__cvv" type="text" value="" placeholder="CVV" onChange={() => {}} />
            </span>
          </div>

          <div className="card__info__content__btn-add-new-card">
            <button>add card</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default App
