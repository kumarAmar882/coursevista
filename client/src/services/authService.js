class AuthService {
  static async login(credentials) {
    try {
      const { username, email, password } = credentials;
      const usernameOrEmail = username || email; // Use either username or email, not both
  
      const response = await fetch('http://localhost:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          usernameOrEmail,
          password,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Invalid credentials');
      }
  
      const data = await response.json();
      this.setAuthToken(data.token);
      return data;
    } catch (error) {
      throw error;
    }
  }
  

  static async signup(userData) {
    try {
      const response = await fetch('http://localhost:3001/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('User already exists');
      }

      const data = await response.json();
      this.setAuthToken(data.token);
      return data;
    } catch (error) {
      throw error;
    }
  }

  static async resetPassword(email, token = null, newPassword = null) {
    try {
      const endpoint = token
        ? 'http://localhost:3001/api/reset-password'
        : 'http://localhost:3001/api/request-password-reset';

      const body = token ? { email, token, newPassword } : { email };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error('Error resetting password');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }


  static setAuthToken(token) {
    localStorage.setItem('authToken', token);
  }

  static getAuthToken() {
    return localStorage.getItem('authToken');
  }

  static removeAuthToken() {
    localStorage.removeItem('authToken');
  }
}

export default AuthService;
