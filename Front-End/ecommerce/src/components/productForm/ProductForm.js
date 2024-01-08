import React, { useState } from 'react'
import style from './ProductForm.module.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const ProductForm = ({ isCreating, isUpdating, id }) => {

    const toastNotification = (isSuccess) => {
        const message = isSuccess ? 'Article Created Successfully' : 'Creation Failed'
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
    
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        description: '',
        price: '',
        supplier: '',
        userId: ''
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name] : value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (isCreating){
                const response = await axios.post(`${process.env.REACT_APP_PATH}product/create`, formData)
                toastNotification(true)
            }
            else if (isUpdating) {
                const response = await axios.patch(`${process.env.REACT_APP_PATH}product/update/${id}`, formData)
                toastNotification(true)
            }
            else
                console.log('No Response!')
        }
        catch(error) {
            console.log(error.message)
            toastNotification(false)
        }
    }

  return (
    <main className={style.createProductContainer}>
      <h1 className={style.createProductTitle}>Create A Product</h1>
      <form className={style.createProductForm} onSubmit={handleSubmit}>
        <div className={`${style.formFloating} ${style.firstInput}`}>
          <input type='text' className={style.formInput} name='title' id='title' placeholder='' value={formData.title} onChange={handleInputChange} />
          <label for='title' className={style.formInputLabel}>Title</label>
        </div>
        <div className={style.formFloating}>
          <input type='text' className={style.formInput} name='category' id='category' placeholder='' value={formData.category} onChange={handleInputChange} />
          <label for='category' className={style.formInputLabel}>Category</label>
        </div>
        <div className={style.formFloatingTextArea}>
          <textarea className={style.formInputTextArea} name='description' id='description' placeholder='' value={formData.description} onChange={handleInputChange} ></textarea>
          <label for='description' className={style.formInputTextAreaLabel}>Description</label>
        </div>
        <div className={style.formFloating}>
          <input type='text' className={style.formInput} name='price' id='price' placeholder='' value={formData.price} onChange={handleInputChange} />
          <label for='price' className={style.formInputLabel}>Price</label>
        </div>
        <div className={style.formFloating}>
          <input type='text' className={style.formInput} name='supplier' id='supplier' placeholder='' value={formData.supplier} onChange={handleInputChange} />
          <label for='supplier' className={style.formInputLabel}>Supplier</label>
        </div>
        <div className={style.formFloating}>
          <input type='text' className={style.formInput} name='userId' id='userId' placeholder='' value={formData.userId} onChange={handleInputChange} />
          <label for='userId' className={style.formInputLabel}>User</label>
        </div>
        {
            isCreating ? <button className={style.formButton} type='submit'>ADD</button> :
                isUpdating ? <button className={style.formButton} type='submit'>Edit</button> : null
        }
      </form>
    </main>
  )
}

export default ProductForm