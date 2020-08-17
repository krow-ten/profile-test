import React, { useState } from "react";
import loginAPI from "../../api/login";

export default ({ setLoggedInUser }: { setLoggedInUser: Function }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState();

  const submitForm = async () => {
    try {
      const user = await loginAPI({ userName, password });
      setLoggedInUser(user);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  return (
    <>
      <h1>Please Login</h1>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          submitForm();
        }}
      >
        <div>
          <label>
            Username:
            <input
              name="username"
              onChange={(event) => setUserName(event.target.value)}
              value={userName}
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              name="password"
              onChange={(event) => setPassword(event.target.value)}
              type="password"
              value={password}
            />
          </label>
        </div>

        <div>
          <button onClick={submitForm} type="submit">
            Submit
          </button>
        </div>
        {error && (
          <div className="error">
            There was a problem logging in, please try again
          </div>
        )}
      </form>
    </>
  );
};
