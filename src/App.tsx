import { useEffect, useState } from "react"
import { FaArrowLeft, FaCreditCard, FaInfo } from "react-icons/fa"
import {  MdInfo } from "react-icons/md"

import Card from "./components/Card"
import Input from "./components/Input"

function App() {
  const [viewportSize, setViewportSize] = useState(0)

  useEffect(() => {
    // Verificando tamanho da viewport
    window.addEventListener('resize', () => {
      const viewportWidth = window.innerWidth
      setViewportSize(viewportWidth)
    })
  }, [])

  return (
    <div className="container">
      <div className={viewportSize <= 800 ? "header" : "aside"}>
        <div className="steps">
            <FaArrowLeft />
            <p className="steps__title">{viewportSize ? "step 2 de 3" : "ALterar forma de pagamento"}</p>
        </div>

        <div className="add__new__card__session">
            <FaCreditCard />
            <p>Adicionar um novo cartão</p>
        </div>
      </div>
      <Card className="card__container">
        <span className="card__container__header__flag">VISA</span>
        <div className="card__container__number">
            <span>0000</span>
            <span>1111</span>
            <span>2222</span>
            <span>3333</span>
        </div>
        <div className="card__container__footer">
            <h1>NOME DO TITULAR</h1>
            <span>13/09</span>
        </div>
      </Card>
      <div className="card__info__content">
        <form className="card__info__content__form">
          <Input className="card__info__content_input__number" type="text" value="" placeholder="Número do cartão" onChange={() => {}} />
          <Input className="card__info__content_input__name" type="text" value="" placeholder="Nome (como está no cartão)" onChange={() => {}} />
          <div>
            <Input className="card__info__content_input__validate" type="text" value="" placeholder="Validade" onChange={() => {}} />

            <span>
              <MdInfo />
              <Input className="card__info__content_input__cvv" type="text" value="" placeholder="Validade" onChange={() => {}} />
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
