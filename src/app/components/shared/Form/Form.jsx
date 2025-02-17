import { useEffect, useRef } from 'react';
import style from "./Form.module.css"
import { FaMinus } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { IoCloseCircle } from "react-icons/io5";
import { SlCloudUpload } from "react-icons/sl";
import { useState } from 'react';

import { COLORS } from '../../../constants/colors';
import Loading from '../Loading/Loading';
import { api_url } from '../../../constants/base_url';
import EmptyNoItems from '../EmptyNoItems';


const Form = ({ title, className, children, onSubmit, icon }) => {

    return (
        <div className={`${style.container} ${className}`}>
            <h1>
                {title}
            </h1>
            <form onSubmit={onSubmit}>{children}</form>
        </div>
    );
};



const TextController = ({
    placeholder,
    register,
    registername,
    validationRules,
    errorMessage,
    value,
    onChange,
    options,
    selectPlaceholder,
    values,
    setValue,
    type = 'text',
    selectedCode,
    icon
}) => {
    return (
        <div className={style.inputContainer}>
            {errorMessage && <span className={style.helperText}>{errorMessage}</span>}
            {options ? (
                <div className={style.inputWithOptions}>
                    <select
                        className={style.countryCodeSelect}
                        onChange={(e) => {
                            const selectedValue = e.target.value;
                            setValue('code', selectedValue);
                            onChange && onChange(e);
                        }}
                    >
                        <option value="" disabled>
                            {selectPlaceholder}
                        </option>
                        {options.map((option, index) => {
                            if (option) {
                                const parts = option.split(" (");
                                if (parts.length === 2) {
                                    const code = parts[1].replace(")", "");
                                    return (
                                        <option key={index} value={code}>
                                            {code}
                                        </option>
                                    );
                                }
                            }
                            return null;
                        })}
                    </select>
                    <div className={style.phoneInputWrapper}>
                        <div className={style.inputWithIcon}>
                            {icon && <span className={style.inputIcon}>{icon}</span>}
                            <input
                                {...(register && register(registername, validationRules))}
                                type={type}
                                value={selectedCode || value}
                                placeholder={placeholder}
                                onChange={onChange}
                                className={style.phoneInput}
                            />
                        </div>
                    </div>
                </div>
            ) : (
                <div className={style.inputWithIcon}>
                    {icon && <span className={style.inputIcon}>{icon}</span>}
                    <input
                        {...(register && register(registername, validationRules))}
                        type={type}
                        value={value}
                        placeholder={placeholder}
                        onChange={onChange}
                    />
                </div>
            )}
        </div>
    );
};

const SelectController = ({
    placeholder,
    options,
    name,
    value,
    onChange,
    setValue,
    registername,
    validationRules,
    errorMessage,
    register,
    icon
}) => {
    return (
        <div className={style.inputContainer}>
            {errorMessage && <span className={style.helperText}>{errorMessage}</span>}
            <div className={style.inputWithIcon}>
                {icon && <span className={style.inputIcon}>{icon}</span>}
                <select
                    {...(register && register(registername, validationRules))}
                    name={name}
                    value={value}
                    onChange={(e) => {
                        const selectedValue = e.target.value;
                        onChange && onChange(e);
                        setValue && setValue(registername, selectedValue);
                    }}
                >
                    <option value="" disabled>
                        {placeholder}
                    </option>
                    {options.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};


const AddListController = ({ placeholder, value = [], onChange, icon }) => {
    const [inputValue, setInputValue] = useState('');

    const handleAddItem = () => {
        if (inputValue.trim()) {
            onChange([inputValue, ...value]);
            setInputValue('');
        }
    };

    const handleDeleteItem = (indexToDelete) => {
        const updatedList = value.filter((_, index) => index !== indexToDelete);
        onChange(updatedList);
    };

    return (
        <>
            <div className={style.inputContainer}>
                <div className={style.listContainer}>
                    <div>
                        <div className={style.inputWithIcon}>
                            {icon && <span className={style.inputIcon}>{icon}</span>}
                            <input type="text" placeholder={placeholder} value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
                        </div>
                        <button type='button' onClick={handleAddItem} className='button-primary'>Add</button>
                    </div>
                    {value.length ?
                        <ul>
                            {value.map((item, index) => (
                                <li key={index}>{item}<IoCloseCircle onClick={() => handleDeleteItem(index)} /></li>
                            ))}
                        </ul>
                        :
                        <EmptyNoItems />
                    }
                </div>
            </div>
        </>
    );
};



const DragAndDropController = ({
    initialValue,
    register,
    registername,
    setValue,
    errors,
    icon
}) => {
    const [image, setImage] = useState(initialValue || null);
    const [error, setError] = useState(null);
    const inputRef = useRef();

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            validateAndSetImage(files[0]);
        }
    };

    const handleFileChange = (e) => {
        const files = e.target.files;
        if (files.length > 0) {
            validateAndSetImage(files[0]);
        }
    };

    const validateAndSetImage = (file) => {
        const validImageTypes = ["image/jpeg", "image/png", "image/gif"];
        const maxFileSizeInKB = 2048; // 2MB in kilobytes

        if (!validImageTypes.includes(file.type)) {
            setError("You must upload an image in (JPEG, PNG, or GIF) extension.");
            setImage(null);
            setValue(registername, null);
        } else if (file.size / 1024 > maxFileSizeInKB) {
            setError("The image must not be greater than 2048 kilobytes.");
            setImage(null);
            setValue(registername, null);
        } else {
            setImage(file);
            setError(null);
            setValue(registername, file);
        }
    };

    useEffect(() => {
        register(registername, {
            required: "You must upload photo first",
        });
    }, [register, registername]);


    return (
        <div className={style.videoContainer}>
            {error || errors[registername] ? (
                <p className={style.helperText}>
                    {error || errors[registername].message}
                </p>
            ) : null}
            {image ? (
                <div className={style.initialValueContainer}>
                    <img
                        src={
                            typeof image === "string"
                                ? image
                                : (image instanceof Blob
                                    ? URL.createObjectURL(image)
                                    : `${api_url}${image[0]}`.slice(0, -4))
                        }
                        alt=""
                    />
                    <IoCloseCircle
                        onClick={() => {
                            setImage(null);
                            setValue(registername, null);
                        }}
                    />
                </div>
            ) : (
                <div
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    className={style.dragAndDrop}
                    style={{
                        borderColor: error || (errors[registername] && COLORS.DANGER),
                    }}
                >
                    {icon && <span className={style.inputIcon}>{icon}</span>}
                    <SlCloudUpload />
                    <p style={{ color: COLORS.DARK_GRAY }}>{"Drag and Drop image"}</p>
                    <p style={{ color: COLORS.DARK_GRAY }}>{"Or"}</p>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        hidden
                        ref={inputRef}
                        accept="image/jpeg, image/png, image/gif"
                    />
                    <button
                        type="button"
                        style={{ color: COLORS.DARK_GRAY, padding: 10, borderRadius: 5 }}
                        onClick={() => inputRef.current.click()}
                    >
                        {"Browse"}
                    </button>
                </div>
            )}

        </div>
    );
};



const DateTimeController = ({ label, register, registername, defaultValue, icon }) => {
    // Calculate the minimum date (3 days from now)
    const minDate = (() => {
        const date = new Date();
        date.setDate(date.getDate() + 4);
        return date.toISOString().split('T')[0];
    })();

    return (
        <div className={style.dateInputWrapper}>
            <label>{label}</label>
            <div className={style.inputWithIcon}>
                {icon && <span className={style.inputIcon}>{icon}</span>}
                <input
                    type="date"
                    {...register(registername)}
                    defaultValue={defaultValue}
                    min={minDate}
                />
            </div>
        </div>
    );
};


const CounterController = ({ label, helperText, initialValue, minValue, maxValue, setValue, registername, icon }) => {
    const [counter, setCounter] = useState(initialValue);

    useEffect(() => {
        setValue(registername, counter);
    }, [counter, registername, setValue])

    const increase = () => {
        setCounter(counter + 1);
    };

    const decrease = () => {
        if (counter > 0) {
            setCounter(counter - 1);
        }
    };

    return (
        <div className={style.inputContainer}>
            <div className={style.counterContainer}>
                <div>
                    <p>{label}</p>
                    <p>{helperText}</p>
                </div>
                <div className={style.controls}>
                    <button type='button' className="decrease" onClick={decrease} disabled={counter === minValue} style={{ cursor: counter === minValue && "not-allowed" }}>
                        <FaMinus />
                    </button>
                    <div className="counter">{counter}</div>
                    <button type='button' className="increase" onClick={increase} disabled={counter === maxValue} style={{ cursor: counter === maxValue && "not-allowed" }}>
                        <FaPlus />
                    </button>
                    {icon && <span className={style.inputIcon}>{icon}</span>}
                </div>
            </div>
        </div>
    );
};


const TextareaController = ({ placeholder, value, onChange, register, registername, validationRules, errorMessage, icon }) => {
    return (
        <div className={style.inputContainer}>
            {errorMessage && <span className={style.helperText}>{errorMessage}</span>}
            <div className={style.inputWithIcon}>
                {icon && <span className={style.inputIcon}>{icon}</span>}
                <textarea
                    {...register(registername, validationRules)}
                    value={value}
                    placeholder={placeholder}
                    onChange={onChange}
                />
            </div>
        </div>
    );
};

const ButtonController = ({ children, type = "button", isLoading, onClick, main, sub, red, disabled, icon }) => {
    return (
        <div className={style.inputContainer} onClick={onClick}>
            <button
                disabled={disabled}
                type={type}
                style={main ? { backgroundColor: red ? COLORS.MAIN_COLOR.MAIN : COLORS.SECOND_COLOR.MAIN } : sub && { backgroundColor: "transparent", color: red ? COLORS.MAIN_COLOR.MAIN : COLORS.SECOND_COLOR.MAIN, border: `1px solid ${red ? COLORS.MAIN_COLOR.MAIN : COLORS.SECOND_COLOR.MAIN}` }}
            >
                {icon && <span className={style.inputIcon}>{icon}</span>}
                {isLoading ? <Loading /> : children}
            </button>
        </div>
    );
};


Form.TextController = TextController;
Form.DragAndDropController = DragAndDropController;
Form.SelectController = SelectController;
Form.AddListController = AddListController;
Form.DateTimeController = DateTimeController;
Form.CounterController = CounterController;
Form.TextareaController = TextareaController;
Form.ButtonController = ButtonController;
export default Form;
