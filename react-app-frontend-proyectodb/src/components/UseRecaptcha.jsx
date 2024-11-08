import { useState, useRef, useCallback, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const UseRecaptcha = () => {
  const [captchaToken, setCaptchaToken] = useState("");
  const recaptchaRef = useRef(null);

  const handleRecaptcha = useCallback((token) => {
    console.log("reCAPTCHA token received:", token);
    setCaptchaToken(token || "");
  }, []);

  useEffect(() => {
    const refreshCaptcha = () => {
      if (recaptchaRef.current && captchaToken) {
        recaptchaRef.current.reset();
        setCaptchaToken("");
      }
    };

    const tokenRefreshTimeout = setTimeout(refreshCaptcha, 110000);
    return () => clearTimeout(tokenRefreshTimeout);
  }, [captchaToken]);

  return { captchaToken, recaptchaRef, handleRecaptcha };
};

export default UseRecaptcha;
