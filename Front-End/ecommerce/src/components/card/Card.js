import React from "react"
import style from './Card.module.css'
import { GrFormView } from "react-icons/gr"
import { useNavigate } from 'react-router-dom'

const Card = ({ product, id, title, category, price }) => {

  const navigate = useNavigate()

  const handleShowButtonClick = (product, i) => {
    navigate(`/product/${i}`, { state: { product } })
  }

  return (
    <article className={style.productCard} key={id}>
      <div className={style.productCardTitle}>
        <h3 className={style.productCardTitleText}>{title}</h3>
        </div>
      <div className={style.productCardBody}>
        <h4 className={style.productCardCategory}>{category}</h4>
        <div className={style.productCardSubTitle}>
          <h3 className={style.productCardPrice}>{price}</h3>
          <button
            className={style.button}
            type="button"
            onClick={() => handleShowButtonClick(product, id)}
          >
            <GrFormView />
          </button>
        </div>
      </div>
    </article>
  );
};

export default Card;
