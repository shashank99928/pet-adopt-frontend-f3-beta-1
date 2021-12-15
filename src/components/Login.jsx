import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {Button,Form} from 'react-bootstrap';

function Login() {
    const navigate = useNavigate();
    const [user,setUser] = useState({email: '', password:''});

    function handleChange(e){
        const name = e.target.name;
        const value = e.target.value;

        setUser({...user, [name]:value});
    }

    async function handleLogin(e){
        e.preventDefault();

        const {email, password} = user;

        const res = await fetch(
            "/signin",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({email, password})
            }            
        )

        const data = await res.json();
        console.log(data);

        if(data.message === 'User logged in successfully'){
            window.alert("Login Successful!!");
            navigate("/home")
        }
        else{
            window.alert("Login failed");
        }
    }

    return (
    <div className="login">
      <div class="container">
        <div class="row align-items-center my-5">
          <div class="col-lg-7">
            <img
              class="img-fluid rounded mb-4 mb-lg-0"
              src="http://placehold.it/900x400"
              alt=""
            />
          </div>
          <div class="col-lg-5">
            <h1 class="font-weight-light">Login</h1>
        <Form>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control name='email' value={user.email} onChange={handleChange} type="email" placeholder="Enter email" />
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control name='password' value={user.password} onChange={handleChange} type="password" placeholder="Password" />
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicCheckbox">
    <Form.Check type="checkbox" label="Check me out" />
  </Form.Group>
  <Button variant="primary" onClick={handleLogin}>Login</Button>
  <Button variant="primary" onClick={() => navigate("/signup")}>Sign Up</Button>
</Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
