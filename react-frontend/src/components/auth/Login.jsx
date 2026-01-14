import "./Login.css";

export default function Login() {
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
        <div className="sign-up">Sign Up!</div>
      </div>
    </div>
    </div>
  );
}
