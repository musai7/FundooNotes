const InputFieldValidation = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = React.useState('');
  const [errorMessage, setErrorMessege] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [passwordVisibility, setpasswordVisibility] = useState(true);

  const validateEmailOnBlur = () => {
    const emailPattern = new RegExp(
      '^[a-zA-Z0-9]+([-_+.]?[a-zA-Z0-9])*[@]([A-Za-z0-9])+[.][A-Za-z]{2,}([.][A-Za-z]{2,}){0,1}$',
    );
    if (email === null) {
      setErrorMessege('empty Field');
    } else if (!emailPattern.test(email)) {
      setErrorMessege('invalid Email');
    }
    if (emailPattern.test(email)) {
      setErrorMessege('');
    }
  };

  return {validateEmailOnBlur, email, errorMessage, setEmail};
};

export default InputFieldValidation;
