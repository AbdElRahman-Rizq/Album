import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";

import { useState } from "react";
import Loading from "../shared/Loading/Loading";

const AuthForm = ({ children, onSubmit }) => {
  return (
    <div className="login-form">
      <form onSubmit={onSubmit}>{children}</form>
    </div>
  );
};

const TextController = ({
  id,
  label,
  type = "text",
  errors,
  register,
  name,
}) => {
  const [innerType, setInnerType] = useState(type);
  const [isFocused, setIsFocused] = useState(false);

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <div
      className={`form-group ${type === "password" && "password-form-group"}`}
    >
      <label
        htmlFor={id}
        style={{
          color: errors[name] ? "#EE3D3D" : isFocused && "#2c75ba",
        }}
      >
        {label}
      </label>

      {errors[name] && <p className="errorMessage">{errors[name].message}</p>}

      <div
        style={{
          borderColor: errors[name]
            ? "#EE3D3D"
            : isFocused
            ? "#2c75ba"
            : "#d9d9d9",
        }}
      >
        <input
          {...register(name)}
          type={innerType}
          id={id}
          className="validate"
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
          style={{
            borderColor: errors[name]
              ? "#EE3D3D"
              : isFocused
              ? "#2c75ba"
              : "#d9d9d9",
          }}
        />
        {type === "password" && (
          <div
            className="showHide"
            onClick={() =>
              setInnerType(innerType === "password" ? "text" : "password")
            }
            style={{
              color: errors[name]
                ? "#EE3D3D"
                : isFocused
                ? "#2c75ba"
                : "#d9d9d9",
            }}
          >
            {innerType === "password" ? <VscEye /> : <VscEyeClosed />}
          </div>
        )}
      </div>
    </div>
  );
};

const ButtonController = ({ children, type = "button", isLoading }) => {
  return (
    <div className="form-group">
      <button className="button-primary" style={{ width: "100%" }} type={type}>
        {isLoading ? <Loading /> : children}
      </button>
    </div>
  );
};

AuthForm.TextController = TextController;
AuthForm.ButtonController = ButtonController;
export default AuthForm;
