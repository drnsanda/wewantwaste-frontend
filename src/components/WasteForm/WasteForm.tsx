"use client";
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './styles.module.css';

interface IWasteForm {
    address:{
        city:string,
        street:string,
        houseNumber:string,
        postcode?:string
    }
    wasteDetails:{
        types:Array<string>,
        overWeightTypes:Array<string>,
        isPlasterBoardAvailable:boolean,
        plasterBoardPercentage:string,
        skip:{
            id:string,
            title:string,
            description:string,
            yards:number,
            total:number,
            acceptableOnRoad:boolean
        },
        permit:{
            type:"public"|"private"
        },
        date:{
            delivery:string,
            collection:string
        },
        client:{
            name:string,
            email:string,
            phoneNumber:string
        }
    }
  
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

    const { register, formState: { errors } } = useForm();


    // Helper function to check if any errors exist for fields in a section
    const hasSectionError = (fieldNames: string[]) => {
        return fieldNames.some(fieldName => errors[fieldName]);
    };

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