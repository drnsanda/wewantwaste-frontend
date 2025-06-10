"use client";
import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import styles from './styles.module.css';

interface IWasteForm {
    address: {
        city: string,
        street: string,
        houseNumber: string,
        postcode?: string
    }
    wasteDetails: {
        types: Array<string>,
        overWeightTypes: Array<string>,
        isPlasterBoardAvailable: boolean,
        plasterBoardPercentage: string,
        skip: {
            id: string,
            title: string,
            description: string,
            yards: number,
            total: number,
            acceptableOnRoad: boolean
        },
        permit: {
            type: "public" | "private"
        },
        date: {
            delivery: string,
            collection: string
        },
        skipPhoto: string
    },
    client: {
        name: string,
        email: string,
        phoneNumber: string
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

    const { register, formState: { errors }, watch, control } = useForm<IWasteForm>();


    // Helper function to check if any errors exist for fields in a section
    const hasSectionError = (fieldNames: string[]) => {
        //@ts-ignore
        return fieldNames.some(fieldName => errors[fieldName]);
    };

    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const permitType = watch('wasteDetails.permit.type');

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    // Watch plasterboard availability to conditionally show percentage dropdown
    const isPlasterBoardAvailable = watch('wasteDetails.isPlasterBoardAvailable');

    // Waste type options
    const wasteTypeOptions = [
        "Construction Waste",
        "Household Waste",
        "Garden Waste",
        "Commercial Waste"
    ];

    // Overweight type options
    const overWeightTypeOptions = [
        "Soil", "Concrete", "Bricks", "Tiles",
        "Sand", "Gravel", "Rubble"
    ];

    // Plasterboard percentage options
    const plasterBoardPercentageOptions = [
        "Under 5%",
        "5-10%",
        "Over 10%"
    ];

    return <>
        <section className={styles?.wrapper}>
            <div className='container mx-auto px-4 py-5'>
                <h1 className={styles?.title}>Great! Please fill out the following information!</h1>
            </div>
            <form className={styles?.formWrapper}>
                <FormAccordion hasError={false} title='1. Delivery Information' isInitiallyVisible={true}>
                    <div className="space-y-4 mb-3">
                        <h3 className="text-lg font-medium text-gray-900">Address</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Postcode (Optional) */}
                            <div className="space-y-1">
                                <label htmlFor="postcode" className="block text-sm font-medium text-gray-700">
                                    Postcode
                                </label>
                                <input
                                    type="text"
                                    id="postcode"
                                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                                    {...register('address.postcode')}
                                />
                                <p className="mt-1 text-xs text-gray-500">Optional</p>
                            </div>

                            {/* City */}
                            <div className="space-y-1">
                                <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                                    City*
                                </label>
                                <input
                                    type="text"
                                    id="city"
                                    className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border ${errors.address?.city ? 'border-red-500' : ''
                                        }`}
                                    {...register('address.city', { required: 'City is required' })}
                                />
                                {errors.address?.city && (
                                    <p className="mt-1 text-sm text-red-600">{errors.address.city.message}</p>
                                )}
                            </div>

                            {/* House Number */}
                            <div className="space-y-1">
                                <label htmlFor="houseNumber" className="block text-sm font-medium text-gray-700">
                                    House Number*
                                </label>
                                <input
                                    type="text"
                                    id="houseNumber"
                                    className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border ${errors.address?.houseNumber ? 'border-red-500' : ''
                                        }`}
                                    {...register('address.houseNumber', { required: 'House number is required' })}
                                />
                                {errors.address?.houseNumber && (
                                    <p className="mt-1 text-sm text-red-600">{errors.address.houseNumber.message}</p>
                                )}
                            </div>

                            {/* Street Address */}
                            <div className="space-y-1">
                                <label htmlFor="street" className="block text-sm font-medium text-gray-700">
                                    Street Address*
                                </label>
                                <input
                                    type="text"
                                    id="street"
                                    className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border ${errors.address?.street ? 'border-red-500' : ''
                                        }`}
                                    {...register('address.street', { required: 'Street address is required' })}
                                />
                                {errors.address?.street && (
                                    <p className="mt-1 text-sm text-red-600">{errors.address.street.message}</p>
                                )}
                            </div>


                        </div>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium text-gray-900">Client</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Full Name */}
                            <div className="space-y-1">
                                <label htmlFor="clientName" className="block text-sm font-medium text-gray-700">
                                    Full Name*
                                </label>
                                <input
                                    type="text"
                                    id="clientName"
                                    className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border ${errors.client?.name ? 'border-red-500' : ''
                                        }`}
                                    {...register('client.name', { required: 'Full name is required' })}
                                />
                                {errors.client?.name && (
                                    <p className="mt-1 text-sm text-red-600">{errors.client.name.message}</p>
                                )}
                            </div>

                            {/* Email */}
                            <div className="space-y-1">
                                <label htmlFor="clientEmail" className="block text-sm font-medium text-gray-700">
                                    Email Address*
                                </label>
                                <input
                                    type="email"
                                    id="clientEmail"
                                    className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border ${errors.client?.email ? 'border-red-500' : ''
                                        }`}
                                    {...register('client.email', {
                                        required: 'Email is required',
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: 'Invalid email address'
                                        }
                                    })}
                                />
                                {errors.client?.email && (
                                    <p className="mt-1 text-sm text-red-600">{errors.client.email.message}</p>
                                )}
                            </div>

                            {/* Phone Number */}
                            <div className="space-y-1">
                                <label htmlFor="clientPhone" className="block text-sm font-medium text-gray-700">
                                    Phone Number*
                                </label>
                                <input
                                    type="tel"
                                    id="clientPhone"
                                    className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border ${errors.client?.phoneNumber ? 'border-red-500' : ''
                                        }`}
                                    {...register('client.phoneNumber', {
                                        required: 'Phone number is required',
                                        pattern: {
                                            value: /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/,
                                            message: 'Invalid phone number'
                                        }
                                    })}
                                />
                                {errors.client?.phoneNumber && (
                                    <p className="mt-1 text-sm text-red-600">{errors.client.phoneNumber.message}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </FormAccordion>
                <FormAccordion hasError={false} title='2. Waste Details' >
                    <div className="space-y-6">

                        {/* Waste Types Checkboxes */}
                        <div className="space-y-2">
                            <h4 className="text-sm font-medium text-gray-700">Types of Waste*</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {wasteTypeOptions.map((option) => (
                                    <div key={option} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id={`wasteType-${option}`}
                                            value={option}
                                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                            {...register('wasteDetails.types')}
                                        />
                                        <label htmlFor={`wasteType-${option}`} className="ml-2 block text-sm text-gray-700">
                                            {option}
                                        </label>
                                    </div>
                                ))}
                            </div>
                            {errors.wasteDetails?.types && (
                                <p className="mt-1 text-sm text-red-600">{errors.wasteDetails.types.message}</p>
                            )}
                        </div>

                        {/* Overweight Types Checkboxes */}
                        <div className="space-y-2">
                            <h4 className="text-sm font-medium text-gray-700">Overweight Types (if any)</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                {overWeightTypeOptions.map((option) => (
                                    <div key={option} className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id={`overWeightType-${option}`}
                                            value={option}
                                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                            {...register('wasteDetails.overWeightTypes')}
                                        />
                                        <label htmlFor={`overWeightType-${option}`} className="ml-2 block text-sm text-gray-700">
                                            {option}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Plasterboard Section */}
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="plasterBoardAvailable"
                                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    {...register('wasteDetails.isPlasterBoardAvailable')}
                                />
                                <label htmlFor="plasterBoardAvailable" className="ml-2 block text-sm font-medium text-gray-700">
                                    Contains Plasterboard
                                </label>
                            </div>

                            {/* Conditional Plasterboard Percentage Dropdown */}
                            {isPlasterBoardAvailable && (
                                <div className="ml-6 space-y-1">
                                    <label htmlFor="plasterBoardPercentage" className="block text-sm font-medium text-gray-700">
                                        Plasterboard Percentage*
                                    </label>
                                    <select
                                        id="plasterBoardPercentage"
                                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                                        {...register('wasteDetails.plasterBoardPercentage', {
                                            required: isPlasterBoardAvailable ? 'Percentage is required when plasterboard is present' : false
                                        })}
                                    >
                                        <option value="">Select percentage...</option>
                                        {plasterBoardPercentageOptions.map((option) => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.wasteDetails?.plasterBoardPercentage && (
                                        <p className="mt-1 text-sm text-red-600">{errors.wasteDetails.plasterBoardPercentage.message}</p>
                                    )}
                                </div>
                            )}
                            <div className="space-y-6 mt-6">
                                
                                {/* Permit Type Selection */}
                                <div className="space-y-2">
                                    <label htmlFor="permitType" className="block text-sm font-medium text-gray-700">
                                        Permit Type*
                                    </label>
                                    <Controller
                                        name="wasteDetails.permit.type"
                                        control={control}
                                        defaultValue="public"
                                        render={({ field }) => (
                                            <select
                                                id="permitType"
                                                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
                                                {...field}
                                            >
                                                <option value="public">Public Highway</option>
                                                <option value="private">Private Property</option>
                                            </select>
                                        )}
                                    />
                                    <p className="mt-1 text-sm text-gray-500">
                                        {permitType === 'public'
                                            ? 'A permit will be required for placement on public property'
                                            : 'No permit needed for private property'}
                                    </p>
                                </div>

                                {/* Skip Placement Photo Upload */}
                                <div className="space-y-2">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Skip Placement Photo*
                                    </label>
                                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                        <div className="space-y-1 text-center">
                                            {previewImage ? (
                                                <div className="mt-2">
                                                    <img
                                                        src={previewImage}
                                                        alt="Skip placement preview"
                                                        className="mx-auto h-40 object-contain"
                                                    />
                                                    <button
                                                        type="button"
                                                        onClick={() => setPreviewImage(null)}
                                                        className="mt-2 text-sm text-red-600 hover:text-red-500"
                                                    >
                                                        Remove Image
                                                    </button>
                                                </div>
                                            ) : (
                                                <>
                                                    <svg
                                                        className="mx-auto h-12 w-12 text-gray-400"
                                                        stroke="currentColor"
                                                        fill="none"
                                                        viewBox="0 0 48 48"
                                                        aria-hidden="true"
                                                    >
                                                        <path
                                                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                                            strokeWidth={2}
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        />
                                                    </svg>
                                                    <div className="flex text-sm text-gray-600">
                                                        <label
                                                            htmlFor="skipPhoto"
                                                            className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
                                                        >
                                                            <span>Upload a file</span>
                                                            <input
                                                                id="skipPhoto"
                                                                type="file"
                                                                accept="image/*"
                                                                className="sr-only"
                                                                {...register('wasteDetails.skipPhoto', {
                                                                    required: 'Skip placement photo is required',
                                                                })}
                                                                onChange={handleFileChange}
                                                            />
                                                        </label>
                                                        <p className="pl-1">or drag and drop</p>
                                                    </div>
                                                    <p className="text-xs text-gray-500">
                                                        PNG, JPG, GIF up to 5MB
                                                    </p>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    {errors.wasteDetails?.skipPhoto && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.wasteDetails.skipPhoto.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
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