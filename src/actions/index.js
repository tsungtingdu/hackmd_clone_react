const signInReq = (data) => ({
  type: "SIGN_IN_REQUEST",
  data,
});

const signInSuccess = (data) => ({
  type: "SIGN_IN_SUCCESS",
  data,
});

const signInError = (data) => ({
  type: "SIGN_IN_ERROR",
  data,
});

const signUpReq = (data) => ({
  type: "SIGN_IN_REQUEST",
  data,
});

const signUpSuccess = (data) => ({
  type: "SIGN_IN_SUCCESS",
  data,
});

const signUpError = (data) => ({
  type: "SIGN_IN_ERROR",
  data,
});

export {
  signInReq,
  signInSuccess,
  signInError,
  signUpReq,
  signUpSuccess,
  signUpError,
};
