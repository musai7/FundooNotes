import React, {useState} from 'react';

const useTogglePasswordVisibility = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState('eyeo');
  const [Visible, setVisible] = useState('show');
  const handlePasswordVisibility = () => {
    if (rightIcon === 'eyeo') {
      setRightIcon('eye');
      setVisible('hide');
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === 'eye') {
      setRightIcon('eyeo');
      setVisible('show');
      setPasswordVisibility(!passwordVisibility);
    }
  };

  return {
    passwordVisibility,
    rightIcon,
    handlePasswordVisibility,
    Visible,
  };
};

export default useTogglePasswordVisibility;
