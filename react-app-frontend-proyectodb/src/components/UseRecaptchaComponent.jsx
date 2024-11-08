import React from "react";
import ReCAPTCHA from "react-google-recaptcha";

const UseRecaptchaComponent = ({ handleRecaptcha, recaptchaRef }) => {
  return (
    <ReCAPTCHA
      ref={recaptchaRef}
      sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
      onChange={handleRecaptcha}
    />
  );
};

export default UseRecaptchaComponent;
