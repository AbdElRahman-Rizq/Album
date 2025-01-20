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


const Form = ({ title, className, children, onSubmit }) => {

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
    value,
    onChange,
    options,
    selectPlaceholder,
    register,
    registername,
    validationRules,
    errorMessage,
    values,
    setValue,
    type = 'text',
    selectedCode,
}) => {
    return (
        <div className={style.inputContainer}>
            {errorMessage && <span className={style.helperText}>{errorMessage}</span>}
            <div className={options && style.inputWithOptions}>
                {options && (
                    <SelectController
                        options={options}
                        placeholder={selectPlaceholder}
                        name="name-title"
                        values={values}
                        setValue={setValue}
                        onChange={(e) => {
                            const selectedValue = e.target.value;
                            setValue(registername, selectedValue);
                            onChange && onChange(e);
                        }}
                    />
                )}
                <input
                    {...(register && register(registername, validationRules))}
                    type={type}
                    value={selectedCode || value}
                    placeholder={placeholder}
                    onChange={onChange}
                />
            </div>
        </div>
    );
};

const SelectController = ({
    options,
    name,
    placeholder,
    value,
    onChange,
    values,
    setValue,
    registername,
    validationRules,
    errorMessage,
    register,
}) => {
    return (
        <div className={style.inputContainer}>
            {errorMessage && <span className={style.helperText}>{errorMessage}</span>}
            <select
                {...(register && register(registername, validationRules))}
                name={name}
                value={value}
                onChange={(e) => {
                    const selectedValue = e.target.value;
                    onChange && onChange(e);
                    setValue(registername, selectedValue);
                }}
            >
                <option value="" disabled>
                    {placeholder}
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
        </div>
    );
};


const AddListController = ({ placeholder, value = [], onChange }) => {
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
                        <input type="text" placeholder={placeholder} value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
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



const DateTimeController = ({ label, register, registername, defaultValue }) => {
    return (
        <div className={style.inputContainer}>
            <div>
                <label htmlFor={label}>{label}</label>
                <input className="input-date-picker" type="date" name="s" id={label} {...register(registername)} defaultValue={defaultValue} />
            </div>
        </div>
    );
};


const CounterController = ({ label, helperText, initialValue, minValue, maxValue, setValue, registername }) => {
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
                </div>
            </div>
        </div>
    );
};


const TextareaController = ({ placeholder, value, onChange, register, registername, validationRules, errorMessage }) => {
    return (
        <div className={style.inputContainer}>
            {errorMessage && <span className={style.helperText}>{errorMessage}</span>}
            <div>
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

const ButtonController = ({ children, type = "button", isLoading, onClick, main, sub, red, disabled }) => {
    return (
        <div className={style.inputContainer} onClick={onClick}>
            <button
                disabled={disabled}
                type={type}
                style={main ? { backgroundColor: red ? COLORS.MAIN_COLOR.MAIN : COLORS.SECOND_COLOR.MAIN } : sub && { backgroundColor: "transparent", color: red ? COLORS.MAIN_COLOR.MAIN : COLORS.SECOND_COLOR.MAIN, border: `1px solid ${red ? COLORS.MAIN_COLOR.MAIN : COLORS.SECOND_COLOR.MAIN}` }}
            >
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
