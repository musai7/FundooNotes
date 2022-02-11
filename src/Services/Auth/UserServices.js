export const signUp = async (email, password, callback) => {
  try {
    await signUp(email, password);
  } catch (e) {
    console.log(e);
  }
};
