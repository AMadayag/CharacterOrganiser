import "./Signup.css"

export default function SignUp() {
  return (
    <div className="vertical-container">
      <div className="center-container">
        <div className="login-container">
          <form className="center">
            <div className="container">
              <label htmlFor="uname"><b>Username</b></label>
              <input
                type="text"x
                placeholder="Enter Username"
                name="uname"
                required
              />

                <label htmlFor="psw"><b>Password</b></label>
              <input
                type="password"
                placeholder="Enter Password"
                name="psw"
                required
              />

              <button type="submit">Login</button>
            </div>
          </form>
      </div>
    </div>
    </div>
  );
}