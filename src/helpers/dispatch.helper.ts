export default (dispatch, values) =>
  new Promise((resolve, reject) => dispatch({ ...values, resolve, reject }));
