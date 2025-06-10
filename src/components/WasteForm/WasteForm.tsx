"use client";
import { useEffect, useState } from 'react';
import styles from './styles.module.css';

interface IWasteForm {

}
type FormAccordion = {
    hasError: boolean;
    title: string;
    children: any;
    isInitiallyVisible?: boolean;
}
const FormAccordion = ({ children, hasError, isInitiallyVisible, title }: FormAccordion) => {

    const [isVisible, setIsVisible] = useState<boolean>(false);
    useEffect(() => {
        setIsVisible(isInitiallyVisible || false);
    }, []);

    return (<>
        <div className={`${styles?.accordionWrapper} ${hasError ? styles?.danger : ""}`}>
            <div onClick={() => { setIsVisible(!isVisible) }} className={styles?.accordionHeader}>
                <h2 className={styles?.accordionTitle}>{title}</h2>
                <span className={`${styles?.accordionIndicatorIcon} ${isVisible ? styles?.active : ""}`}></span>
            </div>
            <div className={`${styles?.accordionBody} ${isVisible ? styles?.active : ""}`}>
                {children}
            </div>
        </div>

    </>)

}
const WasteForm = () => {
    return <>
        <section className={styles?.wrapper}>
            <div className='container mx-auto px-4 py-5'>
                <h1 className={styles?.title}>Great! Please fill out the following information!</h1>
            </div>
            <form className={styles?.formWrapper}>
                <FormAccordion hasError={false} title='1. Delivery Information' isInitiallyVisible={true}>
                    <p>BODY</p>
                </FormAccordion>
                <FormAccordion hasError={false} title='2. Waste Details' >
                    <p>BODY</p>
                </FormAccordion>
                <FormAccordion hasError={true} title='3. Date' >
                    <p>BODY</p>
                </FormAccordion>
            </form>
            <div className="requestActionBtnWrapper">
                <button type='button' className="requestActionBtn">Proceed to Payment</button>
            </div>
        </section>

    </>
};

export default WasteForm;