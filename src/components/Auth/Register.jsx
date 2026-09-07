import React, { useState } from 'react'
import API from '../../api/axios';
import { useAuth } from '../../context/AuthContext';


const Register = ({onSwitchToLogin,onSuccess}) => {
    
    const { login } = useAuth();
    const [error, seterror] = useState('')
    const [loading, setloading] = useState(false);
    const [formData, setformData] = useState({
        username: "",
        password: "",
        Email:"",
    });

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            seterror('');
            setloading(true);

            const response = await API.post("/api/auth/register", {
                username: formData.username,
                password: formData.password,
                email:formData.Email
            })

            login(response.data.token);

            onSuccess();

        }
        catch (err) {
            seterror(err.response?.data?.message || "Something went Wrong, Try again later..")
        }
        finally {
            setloading(false);
        }

    }

  return (
      <>
          <div className='register_modal'>
              <h2>Welcome to BingeTix</h2>

              <form onSubmit={handleRegister}>
                  
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

                  <div>
                  <label>Email</label>
                  <input
                      type="email"
                      value={formData.Email}
                      onChange={(e) => setformData({ ...formData, Email: e.target.value })}
                      placeholder="Enter Your Email.."
                  />
                  </div>

                 <button
                      type='submit'
                      disabled={loading}
            
                  >
                      {loading ? 'Signing Up ....' : "Sign Up"}
                  </button> 
                  
              </form>
                  <div>
                      <h2>Already have an Account? </h2>
                      <button onClick={onSwitchToLogin}>LogIn</button>
                  </div>
          </div>
      </>
  )
}

export default Register