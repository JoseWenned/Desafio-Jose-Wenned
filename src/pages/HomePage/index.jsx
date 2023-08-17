import { useEffect, useState } from "react"
import { MenuMain, MenuExtra, MenuCombo } from "../../Data/MenuMain"
import Cart from "../../assets/car.png"
import { Modal } from "../../components/Modal"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import style from "../../pages/HomePage/style.module.scss"
import Logo from "../../assets/db.png"

export const Menu = () => {

    const [isModal, setIsModal] = useState(false)
    const [addProduct, setAddProduct] = useState(JSON.parse(localStorage.getItem("cartItems")) || [])
    const [isCount, setIsCount] = useState(JSON.parse(localStorage.getItem("cartItemCount")) || 0)
    const [isValueTotal, setValueTotal] = useState(JSON.parse(localStorage.getItem("cartValueTotal")) || 0)
    const [coffeoOrsandwich, setCoffeoOrSandWich] = useState(false)
    const [paymentMethod, setPaymentMethod] = useState("")

    const handleSomeCount = () => {
        setIsCount(isCount + 1)
    }

    const handleSubCount = () => {
        setIsCount(isCount - 1)
    }

    const openModal = () => {
        setIsModal(true)
    }

    useEffect(() => {

        localStorage.setItem("cartValueTotal", JSON.stringify(isValueTotal))

    }, [isValueTotal])

    useEffect(() => {

        localStorage.setItem("cartItemCount", JSON.stringify(isCount))

    }, [isCount])

    useEffect(() => {

        localStorage.setItem("cartItems", JSON.stringify(addProduct));

    }, [addProduct]);
    
    const handleAddProduct = (product) => {
       
        const itemProduct = addProduct.some((item) => item.id === product.id)

        if(!itemProduct) {

            toast.success("Added to cart", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });

            setAddProduct([...addProduct, product])
            handleSomeCount(1)
            setIsModal(true)
            setValueTotal(isValueTotal => isValueTotal + product.price)

        }else {

            toast.error("Already added to cart", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }

        if(product.name === "Coffeo" || product.name === "Sandwich"){
            setCoffeoOrSandWich(true)
        } 

    }

    const handleremoveProduct = (product) => {
        
        const itemRemove = addProduct.filter((item) => item.id !== product.id)
    
        if(itemRemove.length !== 0) {

            const totalValue = itemRemove.reduce((acc, current) => acc + current.price, 0)
            setValueTotal(totalValue)
        }else {
            setValueTotal(0)
        }

        setAddProduct(itemRemove)
        handleSubCount()
        localStorage.setItem("cartItems", JSON.stringify(itemRemove))

    }

    const removeAll = () => {

        setAddProduct([])
        setIsCount(0)
        setValueTotal(0)

        localStorage.removeItem("cartItems")
        localStorage.removeItem("cartValueTotal")

    }

    const handlePayment = () => {

        if(addProduct.length === 0) {

            toast.warn("Invalid amount!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
                
        } else {

            let totalValue = isValueTotal
            let newTotal = 0

            if(paymentMethod === "") {

                toast.warn("Invalid payment method!", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });

            } else {

                if(paymentMethod === "Money"){
                    newTotal = totalValue - (totalValue *= 0.05)
                }else if(paymentMethod === "Credit") {
                    newTotal = totalValue + (totalValue *= 0.03)
                } else if(paymentMethod === "Debit") {
                    totalValue
                }

                toast.success(`Successful payment Total: R$ ${newTotal.toFixed(2)}!`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    });

                setAddProduct([])
                setValueTotal(0)
                setIsCount(0)
                setPaymentMethod("")
                setIsModal(false)

            }

        }

    }
    
    return(

        <>
            <header className={style.containerHeader}>
             
                <div className={style.containerLogo}>

                    <div className={style.containerImage}>
                        <img src={Logo} alt="Logo"/>
                    </div>

                    <div className={style.containerWelcome}>
                        <h1 className={style.TitleWelcome}>Welcome to the menu</h1>
                    </div>
        
                </div>
                    
                <div className={style.containerCart}>
                    <img onClick={openModal} src={Cart} alt="Shopping Cart"/>
                    <p className={style.count}>{isCount}</p>
                </div>
           
            </header>

            <main className={style.containerMain}>
                <section className={style.containerSection}>
                    <h2 className={style.TitleMenu}>Menu main</h2>

                    <ul>
                        {MenuMain.map(item => (
                            <li className={style.itemCard} key={item.id}>

                                <div className={style.containerInformation}>
                                    <h3 className={style.nameProduct}>{item.name}</h3>
                                    <p className={style.priceProduct}>R$ {item.price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                </div>
                               
                                <div>
                                    <button className={style.buttonAdd} onClick={() =>handleAddProduct(item)} type="submit">Add item</button>
                                </div>
                                
                            </li>
                        ))}
                    </ul>
                </section>

                <section className={style.containerSection}>
                    <h2 className={style.TitleMenu}>Menu combo</h2>

                    <ul>
                        {MenuCombo.map(item => (
                            <li className={style.itemCard} key={item.id}>

                                <div className={style.containerInformation}>
                                    <h3 className={style.nameProduct}>{item.name}</h3>
                                    <p className={style.priceProduct}>R$ {item.price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                </div>
                                
                                <div>
                                    <button className={style.buttonAdd} onClick={() => handleAddProduct(item)} type="submit">Add item</button>
                                </div>
                                
                            </li>
                        ))}
                    </ul>
                </section>

                <section className={style.containerSection}>
                    <h2 className={style.TitleMenu}>Menu extra</h2>

                    <ul>
                        {MenuExtra.map(item => (
                            <li className={style.itemCard} key={item.id}>
                                <div className={style.containerInformation}>
                                    <h3 className={style.nameProduct}>{item.name}</h3>
                                    <p className={style.priceProduct}>R$ {item.price.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                                </div>
                              
                                <div>
                                <button className={style.buttonAdd} onClick={() => {

                                    if(coffeoOrsandwich){
                                        handleAddProduct(item)
                                    }else {

                                        toast.warn("Extra item cannot be ordered without the main one!", {
                                            position: "top-right",
                                            autoClose: 5000,
                                            hideProgressBar: false,
                                            closeOnClick: true,
                                            pauseOnHover: true,
                                            draggable: true,
                                            progress: undefined,
                                            theme: "light",
                                            });

                                    }

                                    }} type="submit">Add item</button>
                                </div>
                               
                            </li>
                        ))}
                    </ul>
                </section>
            </main>

            {isModal &&(
                <Modal  

                    setIsModal={setIsModal}
                    setAddProduct={setAddProduct}
                    addProduct={addProduct}
                    removeAll={removeAll}
                    handleremoveProduct={handleremoveProduct}
                    isValueTotal={isValueTotal}
                    handlePayment={handlePayment}
                    paymentMethod={paymentMethod}
                    setPaymentMethod={setPaymentMethod}

                />
            )}

            <ToastContainer />
        </>

    )
}
