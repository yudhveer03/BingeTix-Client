import React, { useState } from 'react'
import API from "../../api/axios";
import { useAuth } from '../../context/AuthContext';


const Login = ({onSwitchToRegister,onSuccess}) => {

    const { login } = useAuth();
    const [error, seterror] = useState('');
    const [loading, setloading] = useState(false);
    const [formData, setformData] = useState({
        username: "",
        password: "",
    });

    const handleLogin = async (e) => {
        e.preventDefault();

        try {

            seterror('');
            setloading(true);

            const response = await API.post("/api/auth/login", {
                username: formData.username,
                password: formData.password,
            });

            login(response.data.token);

            onSuccess();

        }   
        catch(err) {
            seterror(err.response?.data?.message || "Invalid Username or Password. Try Again..")
        }
        finally {
            setloading(false);
        }
    }

  return (
      <>
          <div className='login_modal'>
              <h2>Login to Your Account</h2>
            
                {error && (
                    <p style={{ color: "#ef4444", textAlign: "center", marginBottom: "15px", fontWeight: "bold" }}>
                        {error}
                    </p>
                )}
              <form onSubmit={handleLogin} >
                  <div>
                  <label>Username</label>
                  <input
                      type="text"
                      value={formData.username}
                      onChange={(e) => setformData({ ...formData, username: e.target.value })}
                      placeholder='Enter You Username'
                      />
                  </div>
                  
                <div>
                  <label>Password</label>
                  <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => setformData({ ...formData, password: e.target.value })}
                      placeholder='********'
                  />
                  </div>
                  
                  <button
                      type='submit'
                      disabled={loading}
                  >
                      {loading ? 'Signing In ....' : "Sign In"}
                </button>
              </form>

              <div>
                  <h2>
                      New To BingeTix? 
                  </h2>
                 <button onClick={onSwitchToRegister}>Create Account</button>
              </div>
        </div>

    </>
)
}

export default Login