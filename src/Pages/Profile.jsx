import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { NavbarExp,Footer } from "./Componets/Componets";
import { Navigate } from "react-router-dom";

function CurrentUserProfile() {
  const [user, setUser] = useState(null);
  const [editable, setEditable] = useState(false); // Toggle modal visibility
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
 
   const Navigate =useNavigate();
   
  const auth = getAuth();
  const db = getFirestore();

  // Fetch user data from Auth and Firestore
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setName(currentUser.displayName || "");
        setPhotoURL(currentUser.photoURL || "https://via.placeholder.com/150");

        // Fetch additional user data from Firestore
        const userDoc = doc(db, "users", currentUser.uid);
        const userData = await getDoc(userDoc);

        if (userData.exists()) {
          const data = userData.data();
          setPhone(data.UPhone || "");
          setAddress(data.UCity || "");
          setBloodGroup(data.UBloodGroup || "N/A");
        }
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [auth, db]);

  // Handle sign out
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      alert("Signed out successfully.");
      Navigate('/')
    } catch (error) {
      console.error("Sign out error:", error.message);
    }
  };

  // Update profile in Firebase Auth and Firestore
  const handleProfileUpdate = async () => {
    if (!user) return;
    try {
      // Update Firebase Auth profile
      await updateProfile(auth.currentUser, {
        displayName: name,
        
      });

      // Update Firestore user document
      const userDoc = doc(db, "users", user.uid);
      await setDoc(
        userDoc,
        {
          UPhone: phone,
          UCity: address,
          UBloodGroup: bloodGroup,
          photoURL: photoURL,
        },
        { merge: true } // Prevent overwriting existing fields
      );

      alert("Profile updated successfully!");
      setEditable(false); // Close modal
    } catch (error) {
      console.error("Update Error:", error.message);
      alert(`Error: ${error.message}`);
    }

  };

  console.log(photoURL)

  return (
    <>
      <NavbarExp />
      <section style={styles.container}>
        {user ? (
          <div style={styles.card} className="card_Profile">
            {/* Profile Display */}
            <div style={styles.profileTop} className="profileTop">

              <img
                src={photoURL}
                alt="Profile"
                style={styles.profileImage}
              />
              <h3 style={styles.profileName} >
                {user.displayName || "Anonymous Donor"}
              </h3>
              <p style={styles.role}>Blood Donor</p>
            </div>

            <div style={styles.details} className="details">
              <p>
                <strong>Email:</strong> {user.email || "N/A"}
              </p>
              <p>
                <strong>Phone:</strong> {phone || "N/A"}
              </p>
              <p>
                <strong>Address:</strong> {address || "N/A"}
              </p>
              <p>
                <strong>Blood Group:</strong>{" "}
                <span style={styles.bloodGroup}>{bloodGroup || "N/A"}</span>
              </p>
              <button
                onClick={() => setEditable(true)}
                style={styles.button}
              >
                Edit Profile
              </button>
              <button onClick={handleSignOut} style={styles.button}>
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <p style={styles.noUser}>No user is currently signed in.</p>
        )}

        {/* Modal for Editing Profile */}
        {editable && (
          <div style={styles.modalOverlay}>
            <div style={styles.modal}>
              <button
                style={styles.closeButton}
                onClick={() => setEditable(false)}
              >
                &times;
              </button> 
              <h3 style={{color:"#d9534f"}}>Edit Profile</h3>
              <div style={styles.formGroup}>
                <label>Name:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label>Photo URL:</label>
                <input
                  type="url"
                  value={photoURL}
                  onChange={(e) => setPhotoURL(e.target.value)}
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label>Phone:</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label>Address:</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  style={styles.input}
                />
              </div>
              <div style={styles.formGroup}>
                <label>Blood Group:</label>
                <input
                  type="text"
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value)}
                  style={styles.input}
                />
              </div>
              <button
                onClick={handleProfileUpdate}
                style={styles.button}
              >
                Update Profile
              </button>
            </div>
          </div>
        )}
      </section>
      <Footer />
    </>
  );
}

// Styles
const styles = {
  container: {
    padding: " 20px",
    textAlign: "center",
  },
  title: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  card: {
    backgroundColor: "#f9f9f9",
    borderRadius: "10px",
    padding: "20px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    textAlign:"left",
    display:"flex",
  },
  profileTop: {
    display:"flex",
  },
  profileImage: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    objectFit: "cover",
    display:"flex",
    border:"2px solid brown",
    marginBottom:"20px",
    
  },
  profileName: {
    fontSize: "20px",
    fontWeight: "bold",
  },
  role: {
    fontSize: "16px",
    color: "#777",
  },
  details: {
    marginTop: "20px",
    textAlign: "left",
    // border:"2px solid",
    display:"flex",
  },
  button: {
    backgroundColor: "#d9534f",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "10px",
    marginRight: "10px",
  },
  noUser: {
    fontSize: "18px",
    color: "#777",
  },
  modalOverlay: {
    position: "fixed",
    top: 30,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    padding: "20px",
    width: "80%", // Adjust this to control the modal width percentage (e.g., 80% of the screen width)
    maxWidth: "600px", // Adjust this to set the maximum width of the modal
    textAlign: "center",
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "none",
    border: "none",
    fontSize: "1.5rem",
    cursor: "pointer",
    color: "#d9534f",
  },
  formGroup: {
    marginBottom: "15px",
    textAlign:"left",
    color:"#d9534f"
  },
  input: {
    width: "100%",
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    color:"black"
  },
  bloodGroup: {
    fontWeight: "bold",
  },
};

export default CurrentUserProfile;
