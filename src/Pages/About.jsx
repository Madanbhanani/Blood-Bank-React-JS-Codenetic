import React from "react";
import { NavbarExp,Footer } from "./Componets/Componets";


const About= () => {
  return (
    <>
    <NavbarExp />
    <div style={styles.container}>
      <h2 style={styles.title}>About Us</h2>
      <p style={styles.paragraph}>
        At <strong>[Blood Bank Name]</strong>, our mission is to save lives by ensuring that safe and high-quality blood is available for those in need. We are a dedicated team of professionals and volunteers working together to provide essential blood supplies to hospitals, clinics, and healthcare centers. Our aim is to help patients recover from surgery, trauma, and medical treatments by ensuring a steady and reliable source of blood donations.
      </p>
      
      <h3 style={styles.subTitle}>Our Mission</h3>
      <p style={styles.paragraph}>
        Our goal is to bridge the gap between the increasing demand for blood and the availability of voluntary donors. We strive to provide accessible, safe, and adequate blood supply while promoting the spirit of community giving. Every blood donation we receive has the potential to save lives, and we believe that together, we can create a future where no patient is deprived of the blood they need.
      </p>
      
      <h3 style={styles.subTitle}>Why Donate Blood?</h3>
      <p style={styles.paragraph}>
        Blood is essential for life-saving treatments such as surgeries, cancer treatments, accident recovery, and managing chronic diseases. A single donation can save multiple lives, making blood donation one of the most selfless acts a person can do. We invite you to donate regularly and be part of a life-saving effort that impacts countless individuals.
      </p>

      <h3 style={styles.subTitle}>What We Do</h3>
      <ul style={styles.list}>
        <li style={styles.listItem}>Blood Donation Drives: We organize blood donation drives at various locations including hospitals, schools, and public events to make it easier for donors to give.</li>
        <li style={styles.listItem}>Safety Standards: Every donation is screened and tested for safety to ensure that it is free from diseases and safe for transfusion.</li>
        <li style={styles.listItem}>Emergency Blood Services: We provide critical blood supplies for emergencies, surgeries, and ongoing medical treatments, ensuring no patient has to wait for blood.</li>
        <li style={styles.listItem}>Education & Awareness: We actively engage with the community to raise awareness about the importance of blood donation, and how you can get involved in saving lives.</li>
      </ul>

      <h3 style={styles.subTitle}>How You Can Help</h3>
      <ul style={styles.list}>
        <li style={styles.listItem}>Donate Blood: Your donation can help save lives. We encourage you to donate regularly, as the need for blood is constant.</li>
        <li style={styles.listItem}>Volunteer with Us: Join our team of volunteers who help organize blood drives and assist with our day-to-day operations.</li>
        <li style={styles.listItem}>Spread the Word: Help us expand our reach by sharing the importance of blood donation with your friends, family, and community.</li>
      </ul>

      <h3 style={styles.subTitle}>Together, We Save Lives</h3>
      <p style={styles.paragraph}>
        We believe in the power of community. Whether you donate blood, volunteer your time, or support us in any other way, you’re making a direct impact on the lives of people who depend on our services. At <strong>[Blood Bank Name]</strong>, we are more than just a blood bank – we are a life-saving force in the community.
      </p>
    </div>

    <Footer />
    </>
  );
};

const styles = {
  container: {
    padding: "100px 40px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    marginBottom: "20px",
    margin: "0 auto",
  },
  title: {
    fontSize: "2.5rem",
    color: "#d9534f",
    textAlign: "center",
    marginBottom: "20px",
  },
  subTitle: {
    fontSize: "1.8rem",
    color: "#333",
    marginBottom: "10px",
    fontWeight: "bold",
  },
  paragraph: {
    fontSize: "1rem",
    lineHeight: "1.6",
    color: "#555",
    marginBottom: "15px",
  },
  list: {
    listStyleType: "disc",
    paddingLeft: "20px",
  },
  listItem: {
    fontSize: "1rem",
    lineHeight: "1.6",
    color: "#555",
    marginBottom: "8px",
  },
};

export default About;
