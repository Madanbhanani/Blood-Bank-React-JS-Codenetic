import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "./Firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [UName, setUName] = useState("");
  const [Password, setPassword] = useState("");
  const [Email, setEmail] = useState("");
  const [Phone, setPhone] = useState("");
  const [URL, setURL] = useState("");
  const [Address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [urlError, setUrlError] = useState(""); // State to hold URL validation error

  // Helper function to validate URL format
  const isValidUrl = (url) => {
    const regex = /^(https?:\/\/[^\s$.?#].[^\s]*)$/i;
    return regex.test(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate the URL
    if (!isValidUrl(URL)) {
      setUrlError("Please enter a valid URL for the photo.");
      setLoading(false);
      return;
    } else {
      setUrlError(""); // Clear any previous error
    }

    try {
      // Step 1: Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, Email, Password);
      const user = userCredential.user;

      // Step 2: Update user profile with displayName and photoURL
      await updateProfile(user, {
        displayName: UName,
        photoURL: URL,
      });
      // Step 3: Save user data to Firestore
      await setDoc(doc(db, "users", user.uid), {
        UName,
        UEmail: Email,
        UPhone: Phone,
        UCity: Address,
        UuserId: user.uid,
        photoURL: URL,
      });

      alert("Registration successful!");
      navigate("/"); // Redirect to dashboard or another page
    } catch (error) {
      console.error("Registration Error:", error.message);

      switch (error.code) {
        case "auth/email-already-in-use":
          alert("This email is already registered.");
          break;
        case "auth/weak-password":
          alert("Password must be at least 6 characters.");
          break;
        default:
          alert(`Error: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Register</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label>Name:</label>
          <input
            type="text"
            placeholder="Full Name"
            value={UName}
            onChange={(e) => setUName(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label>Email:</label>
          <input
            type="email"
            placeholder="Enter Email"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label>Phone:</label>
          <input
            type="tel"
            placeholder="Phone Number"
            value={Phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label>City:</label>
          <input
            type="text"
            placeholder="City"
            value={Address}
            onChange={(e) => setAddress(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <div style={styles.formGroup}>
          <label>Photo URL:</label>
          <input
            type="url"
            placeholder="Profile Photo URL"
            value={URL}
            onChange={(e) => setURL(e.target.value)}
            required
            style={styles.input}
          />
          {urlError && <p style={styles.errorText}>{urlError}</p>}
        </div>
        <div style={styles.formGroup}>
          <label>Password:</label>
          <input
            type="password"
            placeholder="Password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
        </div>
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>

        <div>
          You Allready have an account | <Link to="/">Login</Link>
        </div>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "450px",
    margin: "50px auto",
    padding: "30px",
    border: "1px solid #ddd",
    borderRadius: "12px",
    // boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
    // backgroundColor: "#fefefe",
    textAlign: "center",
  },
  title: {
    color: "#d9534f",
    fontSize: "2rem",
    marginBottom: "20px",
    fontWeight: "bold",
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
    fontSize: "1rem",
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#d9534f",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "1.1rem",
    marginTop: "10px",
    transition: "background 0.3s ease",
  },
  errorText: {
    color: "red",
    fontSize: "0.9rem",
    marginTop: "5px",
  },
};

export default Signup;
