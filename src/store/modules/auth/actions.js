export default {
  async login(context, payload) {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCREDb9Kh9GUIJGNX1dW82_Bkp0wx7eXXc",
      {
        method: "POST",
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        }),
      }
    );
    const res = await response.json();
    if (!response.ok) {
      const error = new Error(res.message || "Failed to authenticate");
      throw error;
    }
    context.commit("setUser", {
      token: res.idToken,
      userId: res.localId,
      tokenExpiration: res.expiresIn,
    });
  },
  async signup(context, payload) {
    const response = await fetch(
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCREDb9Kh9GUIJGNX1dW82_Bkp0wx7eXXc",
      {
        method: "POST",
        body: JSON.stringify({
          email: payload.email,
          password: payload.password,
          returnSecureToken: true,
        }),
      }
    );
    const res = await response.json();
    if (!response.ok) {
      const error = new Error(res.message || "Failed to authenticate");
      throw error;
    }
    context.commit("setUser", {
      token: res.idToken,
      userId: res.localId,
      tokenExpiration: res.expiresIn,
    });
  },
  logout(context) {
    context.commit("setUser", {
      token: null,
      userId: null,
      tokenExpiration: null,
    });
  },
};
