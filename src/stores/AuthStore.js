// Create a new store file called authStore.
// Create the loginUser and signupUser methods in authStore.
// Don't forget to set the Authentication header for axios.
// The endpoints in the backend are:
// POST to https://the-index-api.herokuapp.com/login/
// POST to https://the-index-api.herokuapp.com/signup/
// Connect these methods to the login and signup forms.
// Create an account and log in. The posting forms should now work again.

import { decorate, observable } from "mobx";
import axios from "axios";
import jwt_decode from "jwt-decode";

class AuthStore {
  user = null;

  signup = async (userData, history) => {
    try {
      await axios.post("https://the-index-api.herokuapp.com/signup/", userData);
      history.replace("/");
    } catch (err) {
      console.error(err.response.data);
    }
  };
  checkForToken = () => {
    const token = localStorage.getItem("myToken");
    if (token) {
      const currentTime = Date.now() / 1000;
      const user = jwt_decode(token);
      if (user.exp >= currentTime) {
        this.setUser(token);
      } else {
        this.logout();
      }
    }
  };

  login = async (userData, history) => {
    try {
      const res = await axios.post(
        "https://the-index-api.herokuapp.com/login/",
        userData
      );
      const user = res.data;
      this.setUser(user.token);
      history.replace("/");
    } catch (err) {
      console.error(err.response.data);
    }
  };

  logout = () => {
    this.setUser();
  };

  setUser = token => {
    if (token) {
      localStorage.setItem("myToken", token);
      axios.defaults.headers.common.Authorization = `JWT ${token}`;
      const decodedUser = jwt_decode(token);
      this.user = decodedUser;
    } else {
      delete axios.defaults.headers.common.Authorization;
      localStorage.removeItem("myToken");
      this.user = null;
    }
  };
}

decorate(AuthStore, {
  user: observable
});

const authStore = new AuthStore();
authStore.checkForToken();

export default authStore;
