import Trash from "../../assets/trash.png"
import style from "./style.module.scss"

export const Modal = ({ 
    
    setIsModal, 
    addProduct, 
    removeAll, 
    handleremoveProduct, 
    isValueTotal,
    handlePayment,
    paymentMethod,
    setPaymentMethod,

}) => {

    const closeModal = () => {
        setIsModal(false)
    }

    return(
        <>
            <div className={style.overlay}>
                <div className={style.containerModal}>
                    <header className={style.containerHeader}>
                        <h1 className={style.titleCart}>Shopping Cart</h1>
                        <button className={style.closeModal} onClick={closeModal} type="submit">X</button>
                    </header>

                    <main className={style.constainerMain}>
                        {addProduct.length === 0 ? <p className={style.paragraphCart}>There are no items in the shopping cart!</p> :
                            <ul>
                            {addProduct.map((product) => (
                                <li className={style.productCart} key={product.id}>
                                    <h3 className={style.TitleProduct}>{product.name}</h3>
                                    <img onClick={() => handleremoveProduct(product)} src={Trash} alt="trash"/>
                                </li>
                            ))}
                        </ul>
                        }
                    </main>

                    <footer className={style.constainerFooter}>
                        <select className={style.select} value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)}>
                            <option value={""}>Select payment method</option>
                            <option value={"Debit"}>Debt</option>
                            <option value={"Credit"}>Credit - plus 3%</option>
                            <option value={"Money"}>Money - discount 5%</option>
                        </select>

                        <div className={style.containerTotal}>
                            <h3 className={style.titleTotal}>Total</h3>
                            <p className={style.titlePrice}>{isValueTotal.toLocaleString("pt-BR", {style: "currency", currency: "BRL"})}</p>
                        </div>
                       

                        <button className={style.buttonRemoveAll} onClick={removeAll} type="submit">Remove All</button>

                        <button className={style.buttonPay} onClick={() => handlePayment()} type="submit">Pay</button>
                    </footer>
                </div> 
            </div>
        </>
    )

}