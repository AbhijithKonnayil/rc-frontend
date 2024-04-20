import { post } from "../lib/api";
class AuthService {

  async login(username, password) {
    try {
      const res = await post(`auth/login/`, { username, password });

      localStorage.setItem('token', res.token);
      localStorage.setItem('userRole', res.userRole);
      console.log('Login successful:', res);
      return res;
    } catch (error) {
      throw error;
    }
  }

  logout() {
    localStorage.removeItem('user');
  }

  getCurrentUser() {
    const user = localStorage.getItem('token');
    if (user) {
      return user;
    }
    return null;
  }

  getToken() {
   return localStorage.getItem('token');
  }
}

export default new AuthService();