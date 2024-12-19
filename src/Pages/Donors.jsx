import React, { useEffect, useState } from "react";
import { db } from "./Firebase"; // Firebase configuration file
import { getDocs, collection } from "firebase/firestore";
import { NavbarExp,Footer } from "./Componets/Componets";

function AllDonors() {
  const [donors, setDonors] = useState([]);
  const [filteredDonors, setFilteredDonors] = useState([]);
  const [bloodGroup, setBloodGroup] = useState("");
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchDonors = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Dolore"));
      const donorList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDonors(donorList);
      setFilteredDonors(donorList);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching donors:", error);
    }
  };

  useEffect(() => {
    fetchDonors();
  }, []);

  const filterDonors = () => {
    let filtered = donors;
    if (bloodGroup) {
      filtered = filtered.filter(
        (donor) =>
          donor.UserBloodGroup &&
          donor.UserBloodGroup.toLowerCase() === bloodGroup.toLowerCase()
      );
    }
    if (city) {
      filtered = filtered.filter(
        (donor) =>
          donor.UserCity &&
          donor.UserCity.toLowerCase().includes(city.toLowerCase())
      );
    }
    setFilteredDonors(filtered);
  };

  return (
    <>
      <NavbarExp /> 
    
      <section className="donors-container">
        <div className="Donors_Searching">
          <h2 className="donors-title">
          <span className="highlight">Find</span> Life-Saving Donors
        </h2>

        <div className="donors-filters">
          <select
            value={bloodGroup}
            onChange={(e) => setBloodGroup(e.target.value)}
            className="input-field"
          >
            <option value="">Select Blood Group</option>
            {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Enter City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="input-field"
          />
          <button onClick={filterDonors} className="action-button">
            Search
          </button>
        </div>
          </div>

        {loading ? (
          <p className="loading-text">Fetching donors...</p>
        ) : filteredDonors.length > 0 ? (
          <ul className="donor-list">
            {filteredDonors.map((donor) => (
              <li key={donor.id} className="donor-card">
                <p>
                  <strong>Name:</strong> {donor.UserName || "N/A"}
                </p>
                <p>
                  <strong>Email:</strong> {donor.UserEmail || "N/A"}
                </p>
                <p>
                  <strong>Blood Group:</strong> {donor.UserBloodGroup || "N/A"}
                </p>
                <p>
                  <strong>City:</strong> {donor.UserCity || "N/A"}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-results-text">No donors found. Try another search.</p>
        )}
      </section>
      <Footer />
    </>
  );
}

export default AllDonors;
