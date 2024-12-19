import React, { useState, useEffect } from "react";
import { auth, db } from "../Firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import unkownImage from "../blodlofo.png";
import { FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaTint, FaEdit } from "react-icons/fa";

function DonorProfile() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        username: "",
        mobile: "",
        age: "",
        status: "",
        city: "",
    });
console.log(userData)
    // Fetch Current User Data
    useEffect(() => {
        
        const fetchUserData = async () => {
            try {
                const currentUser = auth.currentUser;
                if (currentUser) {
                const docRef = doc(db, "users/"+"apGoHP3I4YcTYmhwdiewStVQnE72");
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        const data = docSnap.data();

                        console.log(data)
                        setUserData(data);
                        setFormData({
                            username: data.username || "",
                            mobile: data.mobile || "",
                            age: data.age || "",
                            status: data.status || "",
                            city: data.city || "",
                        });
                    } else {
                        setError("No user data found.");
                    }
                } else {
                    setError("User not logged in.");
                }
            } catch (err) {
                console.error("Error fetching data:", err);
                setError("Failed to fetch user data.");
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    // Handle Form Input Changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));
    };

    // Save Updated Data to Firestore
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const currentUser = auth.currentUser;
            if (currentUser) {
                const docRef = doc(db, "users", currentUser.uid);
                await setDoc(docRef, formData, { merge: true });
                setUserData(formData);
                alert("Profile updated successfully!");
                setShowModal(false);
            } else {
                alert("User not logged in.");
            }
        } catch (err) {
            console.error("Error updating data:", err);
            alert("Failed to update profile. Please try again.");
        }
    };

    return (
        <>
            <div className="min-h-screen flex flex-col items-center py-8 px-4 md:px-8">
                <div className="bg-white shadow-2xl rounded-lg p-8 w-full max-w-5xl">
                    <h2 className="text-4xl font-extrabold text-red-600 text-center mb-6">
                        Donor Profile
                    </h2>
                    <p className="text-gray-600 text-center text-sm mb-8">
                        * Required Information
                    </p>

                    {loading ? (
                        <p className="text-center text-gray-500">Loading user data...</p>
                    ) : error ? (
                        <p className="text-center text-red-500">{error}</p>
                    ) : (
                        userData && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Profile Picture */}
                                <div className="flex flex-col items-center">
                                    <div className="relative w-36 h-36 border-4 border-gray-300 rounded-full overflow-hidden shadow-lg">
                                        <img
                                            src={userData.imgURL || unkownImage}
                                            alt="Profile"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <h3 className="mt-4 text-lg font-semibold text-gray-700">
                                        Profile Picture
                                    </h3>
                                </div>

                                {/* User Details */}
                                <div className="grid grid-cols-2 gap-6">
                                    {[
                                        {
                                            label: "Username",
                                            value: userData.username,
                                            icon: <FaUser className="text-red-500 text-xl" />,
                                        },
                                        {
                                            label: "Age",
                                            value: userData.age,
                                            icon: <FaTint className="text-red-500 text-xl" />,
                                        },
                                        {
                                            label: "Phone",
                                            value: userData.mobile,
                                            icon: <FaPhone className="text-red-500 text-xl" />,
                                        },
                                        {
                                            label: "Email",
                                            value: userData.email,
                                            icon: <FaEnvelope className="text-red-500 text-xl" />,
                                        },
                                        {
                                            label: "Status",
                                            value: userData.status,
                                            icon: <FaTint className="text-red-500 text-xl" />,
                                        },
                                        {
                                            label: "City",
                                            value: userData.city,
                                            icon: <FaMapMarkerAlt className="text-red-500 text-xl" />,
                                        },
                                    ].map((field, idx) => (
                                        <div key={idx} className="flex items-center space-x-4">
                                            {field.icon}
                                            <div>
                                                <label className="block text-sm font-bold text-gray-700 mb-1">
                                                    {field.label} *
                                                </label>
                                                <h2 className="text-gray-800 font-medium">
                                                    {field.value || "Not Provided"}
                                                </h2>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )
                    )}

                    {/* Edit Profile Button */}
                    <div className="mt-8">
                        <button
                            type="button"
                            className="flex justify-center items-center gap-4 w-full bg-red-500 text-white text-lg py-3 rounded-lg shadow-md hover:bg-red-600 transition duration-200"
                            onClick={() => setShowModal(true)}
                        >
                            <FaEdit style={{ marginTop: "-0.23rem", fontSize: "1.4rem" }} />
                            Edit Profile
                        </button>
                    </div>
                </div>
            </div>

            {/* Edit Profile Modal */}
            {showModal && (
                <div className="z-50 fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-4xl relative">
                        <button
                            className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-2xl"
                            onClick={() => setShowModal(false)}
                        >
                            &times;
                        </button>

                        <h2 className="text-3xl font-bold text-red-600 mb-6">Edit Profile</h2>
                        <p className="text-gray-600 text-center text-sm mb-8">
                            Update your personal information
                        </p>
                        {/* Form Content */}
                        <form onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[
                                    { name: "username", label: "Username" },
                                    { name: "mobile", label: "Phone Number", type: "number" },
                                    { name: "age", label: "Age", type: "number" },
                                    { name: "status", label: "Status" },
                                    { name: "city", label: "City" },
                                ].map((field) => (
                                    <div key={field.name}>
                                        <label className="block text-sm font-bold text-gray-700 mb-2">
                                            {field.label}
                                        </label>
                                        <input
                                            type={field.type || "text"}
                                            name={field.name}
                                            className="focus:border-red-600 outline-none w-full border rounded-lg px-4 py-2"
                                            value={formData[field.name]}
                                            onChange={handleChange}
                                        />
                                    </div>
                                ))}
                            </div>

                            <div className="mt-8">
                                <button
                                    type="submit"
                                    className="w-full bg-red-500 text-white text-lg py-3 rounded-lg shadow-md hover:bg-red-600 transition"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}

export default DonorProfile;
