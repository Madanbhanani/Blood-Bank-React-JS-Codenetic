

import React, { useEffect, useState } from "react";
import "./css/Home.css";
import { NavbarExp } from "./Componets/Componets";
import { db } from "./Firebase";
import { getDocs, collection, addDoc } from "firebase/firestore";

const styles = {
  container: {
    padding: "50px 20px",
    backgroundColor: "#fff",
    textAlign: "center",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    margin: "20px auto",
  },
  title: { fontSize: "2.5rem", color: "#d9534f", fontWeight: "bold", marginBottom: "20px" },
  input: {
    width: "80%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "1rem",
    marginBottom: "10px",
  },
  button: {
    padding: "10px 20px",
    fontSize: "1rem",
    color: "#fff",
    backgroundColor: "#d9534f",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    margin: "10px",
  },
};

function Donorspage() {
  const [donors, setDonors] = useState([]); // Donors list
  const [loading, setLoading] = useState(true);

  // Search filters
  const [searchBloodGroup, setSearchBloodGroup] = useState("");
  const [searchCity, setSearchCity] = useState("");

  // Form fields for adding a new donor
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [city, setCity] = useState("");

  // Fetch donors from Firestore
  const fetchDonors = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Donore"));
      const donorList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDonors(donorList);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching donors:", error);
    }
  };

  useEffect(() => {
    fetchDonors();
  }, []);

  // Submit new donor to Firestore
  const submitDonor = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "Donore"), {
        Name: name,
        Email: email,
        Phone: phone,
        BloodGroup: bloodGroup,
        City: city,
      });
      alert("Donor added successfully!");
      fetchDonors(); // Refresh donor list
      setName("");
      setEmail("");
      setPhone("");
      setBloodGroup("");
      setCity("");
    } catch (error) {
      console.error("Error adding donor:", error);
    }
  };

  // Filter donors based on search criteria
  const filteredDonors = donors.filter((donor) => {
    return (
      (searchBloodGroup === "" || donor.BloodGroup === searchBloodGroup) &&
      (searchCity === "" || donor.City.toLowerCase().includes(searchCity.toLowerCase()))
    );
  });

  return (
    <>
      <NavbarExp />
      <div style={styles.container}>
        <h2 style={styles.title}>Become a Blood Donor</h2>
        <form onSubmit={submitDonor}>
          <input
            type="text"
            placeholder="Your Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="email"
            placeholder="Your Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
            required
          />
          <input
            type="tel"
            placeholder="Your Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={styles.input}
            required
          />
          <select
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
            style={styles.input}
            required
          >
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
          <input
            type="text"
            placeholder="Your City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            style={styles.input}
            required
          />
          <button type="submit" style={styles.button}>
            Join as a Donor
          </button>
        </form>

        {/* Search Section */}
        <h2 style={styles.title}>Find a Donor</h2>
        <div>
          <select
            value={searchBloodGroup}
            onChange={(e) => setSearchBloodGroup(e.target.value)}
            style={styles.input}
          >
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
          <input
            type="text"
            placeholder="Search by City"
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
            style={styles.input}
          />
        </div>

        {/* Donor List */}
        <h2 style={styles.title}>Donor List</h2>
        {loading ? (
          <p>Loading donors...</p>
        ) : filteredDonors.length > 0 ? (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {filteredDonors.map((donor) => (
              <li key={donor.id} style={{ marginBottom: "10px" }}>
                <strong>{donor.Name}</strong> ({donor.BloodGroup}) <br />
                📧 {donor.Email} | 📞 {donor.Phone} | 🏙 {donor.City}
              </li>
            ))}
          </ul>
        ) : (
          <p>No donors found for the selected criteria.</p>
        )}
      </div>
    </>
  );
}

export default Donorspage;
