import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "./Firebase";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { section } from "motion/react-client";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    UName: "",
    Email: "",
    Phone: "",
    Address: "",
    URL: "",
    Password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const isValidUrl = (url) => {
    const regex = /^(https?:\/\/[^\s$.?#].[^\s]*)$/i;
    return regex.test(url);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.UName.trim()) newErrors.UName = "Name is required.";
    if (!formData.Email.trim()) newErrors.Email = "Email is required.";
    if (!formData.Password || formData.Password.length < 6)
      newErrors.Password = "Password must be at least 6 characters.";
    if (!isValidUrl(formData.URL)) newErrors.URL = "Invalid photo URL.";
    if (!formData.Phone.trim()) newErrors.Phone = "Phone number is required.";
    if (!formData.Address.trim()) newErrors.Address = "City is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear errors on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.Email,
        formData.Password
      );
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: formData.UName,
        photoURL: formData.URL,
      });

      await setDoc(doc(db, "users", user.uid), {
        UName: formData.UName,
        UEmail: formData.Email,
        UPhone: formData.Phone,
        UCity: formData.Address,
        UuserId: user.uid,
        photoURL: formData.URL,
      });

      alert("Registration successful!");
      navigate("/");
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
     <section style={{ padding:"10px"}}>
      <div style={styles.container}>
      <h1 style={styles.title}>Register</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        {["UName", "Email", "Phone", "Address", "URL", "Password"].map(
          (field) => (
            <div key={field} style={styles.formGroup}>
              <label>{field === "URL" ? "Photo URL" : field}:</label>
              <input
                type={
                  field === "Password"
                    ? "password"
                    : field === "Email"
                    ? "email"
                    : "text"
                }
                placeholder={`Enter your ${field}`}
                name={field}
                value={formData[field]}
                onChange={handleInputChange}
                required
                style={styles.input}
                aria-label={field}
              />
              {errors[field] && (
                <p style={styles.errorText}>{errors[field]}</p>
              )}
            </div>
          )
        )}
        <button
          type="submit"
          style={{
            ...styles.button,
            backgroundColor: loading ? "#bbb" : "#d9534f",
          }}
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
        <div>
          Already have an account? <Link to="/">Login</Link>
        </div>
      </form>
    </div>
     </section>
  );
}

const styles = {
  container: {
    maxWidth: "450px",
    margin: "50px auto",
    padding: "25px",
    border: "1px solid #ddd",
    borderRadius: "12px",
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
