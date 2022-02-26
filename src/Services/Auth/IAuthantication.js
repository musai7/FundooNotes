import {SignUpAuth} from './Authantication';
export const SignUp = async (userName, email, password, callback) => {
  try {
    const responce = await SignUpAuth(userName, email, password);
    if (responce) {
      console.log('allready have a account');
      callback();
    }
  } catch (error) {
    console.log(error);
  }
};
