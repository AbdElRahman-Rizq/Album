import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";
import { FaUser, FaEnvelope, FaLock, FaPhone } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import Loading from "../shared/Loading/Loading";
import { api_url } from "@/constants/base_url";
import { countries } from "@/constants/countries";

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
  icon,
  placeholder,
}) => {
  const [innerType, setInnerType] = useState(type);
  const [isFocused, setIsFocused] = useState(false);

  const handleBlur = () => {
    setIsFocused(false);
  };

  const getIcon = () => {
    switch (icon) {
      case 'user':
        return <FaUser />;
      case 'email':
        return <FaEnvelope />;
      case 'lock':
        return <FaLock />;
      case 'phone':
        return <FaPhone />;
      default:
        return null;
    }
  };

  return (
    <div className="TextController">
      <div className="input-container">
        {getIcon() && <span className="input-icon">{getIcon()}</span>}
        <input
          {...register(name)}
          type={innerType}
          id={id}
          placeholder={placeholder || label}
          className={getIcon() ? 'with-icon' : ''}
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
        />
        {type === "password" && (
          <button
            type="button"
            className="show-hide-button"
            onClick={() =>
              setInnerType(innerType === "password" ? "text" : "password")
            }
          >
            {innerType === "password" ? <VscEye /> : <VscEyeClosed />}
          </button>
        )}
      </div>
      {errors[name] && <p className="error-message">{errors[name].message}</p>}
    </div>
  );
};

const CountryCodeController = ({
  id,
  label,
  errors,
  register,
  name,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCountries = countries.filter(country => 
    country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.code.includes(searchTerm)
  );

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setIsOpen(false);
  };

  return (
    <div className="TextController">
      <div className="country-select-container">
        <button
          type="button"
          className="country-select-button"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="country-flag">{selectedCountry.flag}</span>
          <span className="country-code">{selectedCountry.code}</span>
        </button>
        
        {isOpen && (
          <div className="country-dropdown">
            <input
              type="text"
              className="country-search"
              placeholder="Search country..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="country-list">
              {filteredCountries.map((country) => (
                <button
                  key={country.code}
                  type="button"
                  className="country-option"
                  onClick={() => handleCountrySelect(country)}
                >
                  <span className="country-flag">{country.flag}</span>
                  <span className="country-name">{country.name}</span>
                  <span className="country-code">{country.code}</span>
                </button>
              ))}
            </div>
          </div>
        )}
        
        <input
          type="hidden"
          {...register(name)}
          value={selectedCountry.code}
        />
      </div>
      {errors[name] && <p className="error-message">{errors[name].message}</p>}
    </div>
  );
};

const ButtonController = ({ children, type = "button", isLoading, variant }) => {
  return (
    <button 
      className={`button-primary ${variant || ''}`} 
      type={type}
      disabled={isLoading}
    >
      {isLoading ? <Loading /> : children}
    </button>
  );
};

const GoogleButton = () => {
  const handleGoogleLogin = () => {
    window.location.href = `${api_url}auth/googleLogin`;
  };

  return (
    <button 
      type="button"
      onClick={handleGoogleLogin}
      className="google-button"
    >
      <FcGoogle />
      <span>Continue with Google</span>
    </button>
  );
};

const Divider = () => {
  return (
    <div className="divider">
      <span>OR</span>
    </div>
  );
};

AuthForm.TextController = TextController;
AuthForm.ButtonController = ButtonController;
AuthForm.CountryCodeController = CountryCodeController;
AuthForm.GoogleButton = GoogleButton;
AuthForm.Divider = Divider;

export default AuthForm;
