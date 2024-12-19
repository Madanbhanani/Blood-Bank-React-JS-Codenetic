import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./Firebase";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";


function Signin() {
  const navigate = useNavigate();
  const [Email, setEmail]=useState("")
  const [Password, setPassword]=useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();

    const auth = getAuth();
    signInWithEmailAndPassword(auth, Email, Password)
    .then((userCredential) => {
     const user = userCredential.user;
        console.log("jhhkjh");

        navigate("/Home")
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  };

  return (
    <div style={styles.container} className="FormContainer">
      <h1 style={{ color: "brown", textAlign:"left" }}>Login</h1>
      <br />
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={Email}
            onChange={(e)=> setEmail(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={Password}
            onChange={(e)=> setPassword(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <br />
        <div>
            Create New Account 
            <Link to="/Signup">| Rigester</Link>
        </div>
        <button type="submit" style={styles.button}>
          Login
        </button>
        <br />
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "400px",
    margin: "50px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    // boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    textAlign: "center",
    // backgroundColor: "#f9f9f9",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
  },
  input: {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "16px",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#d9534f",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",

  },
};

export default Signin;
