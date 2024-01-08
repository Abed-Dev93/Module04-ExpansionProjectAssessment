import React, { useState } from "react"
import style from './CardAdmin.module.css'
import { IoMdCloseCircle } from "react-icons/io"
import { FaRegEdit } from "react-icons/fa"
import { GrFormView } from "react-icons/gr"
import { useNavigate } from "react-router-dom"
import axios from 'axios'

const CardAdmin = ({ product, id, title, category, price }) => {

  const toastNotification = (isSuccess) => {
    const message = isSuccess ? 'Article Deleted Successfully' : 'Deleting Failed'
    const toastType = isSuccess ? toast.success : toast.error

    toastType(message, {
      position: 'top-right',
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    })
  }

  const [products, setProducts] = useState([])
  const navigate = useNavigate()

  const handleShowButtonClick = (product, i) => {
    navigate(`/product/${i}`, { state: { product } })
  }

  const handleEditButtonClick = (i) => {
    navigate(`/updateArticle/${i}`)
  }

  const handleRemoveArticle = async (i) => {
    try {
      const response = await axios.delete(`${process.env.REACT_APP_PATH}products/delete/${i}`)
      const remainedProducts = products.filter((product) => product.id !== i)
      setProducts(remainedProducts)
      toastNotification(true)
    }
    catch(error) {
      console.log(error.message)
      toastNotification(false)
  }
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
            onClick={() => handleEditButtonClick(id)}
          >
            <FaRegEdit />
          </button>
          <button
            className={style.button}
            type="button"
            onClick={() => handleShowButtonClick(product, id)}
          >
            <GrFormView />
          </button>
        </div>
      </div>
      <IoMdCloseCircle
        className={style.closeIcon}
        onClick={() => handleRemoveArticle(id)}
      />
    </article>
  );
};

export default CardAdmin;
