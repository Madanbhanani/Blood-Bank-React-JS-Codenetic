
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from 'react-router-dom';
import blodlofo  from '../blodlofo.png'; 
import React, { useState, useEffect } from "react";
import { db } from '../Firebase';
import { auth } from '../Firebase';
import { onSnapshot,collection } from 'firebase/firestore';

import doctor1  from '../docotor 1.jpg';
import doctor2  from '../doctor2.png';
import doctor3  from '../image2.jpg';


function NavbarExp(props) {
  const [user, setUser] = useState(null);
  const [FullName, setFullName] = useState(null);


    useEffect(() => {
        const fetchUser = () => {
            const currentUser = auth.currentUser;
            if (currentUser) {
                setUser(currentUser.displayName.charAt(0));
                setFullName(currentUser.displayName);
            } else {
                setUser(null); // No user is signed in
            }
        };

        fetchUser();

      })

  


    return (
      <>
        {['md'].map((expand) => (
          <Navbar  key={expand} expand={expand} 
           className="bg-body-tertiary mb-1" 
              style={{borderBottom:"4px solid brown",position:"fixed",
                zIndex:"1",  width:"100%"}}>
            <Container fluid>
              <Navbar.Brand href="#">
                <img src={blodlofo} alt="" style={{height:"40px"}} />
              </Navbar.Brand>
              <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} 
               />
              <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-${expand}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                placement="end"
              >
                <Offcanvas.Header closeButton style={{textAlign:"center",     
                   backgroundColor:"brown",color:"white"}}>
                  <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                    BLOOD BANK
                  </Offcanvas.Title>
                </Offcanvas.Header >
                <Offcanvas.Body style={{ textAlign:"center"}}>
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                    <Nav.Link to="/Home">
                      <Link to="/Home" style= 
                    {{color:"#d9534f",fontWeight:"bold",
                      textDecoration:"none"}}>Home</Link>
                    </Nav.Link>
                    <Nav.Link href="#action2">
                      <Link to="/About" style= 
                    {{color:"#d9534f",fontWeight:"bold",
                     textDecoration:"none"}}>About</Link>
                    </Nav.Link>
                    <Nav.Link href="#action2">
                      <Link to="/Donors" style= 
                     {{color:"#d9534f",fontWeight:"bold",
                      textDecoration:"none"}}>Donors</Link>
                    </Nav.Link>
                    <Nav.Link href="#action2">
                      <Link to="/Contact" style= 
                     {{color:"#d9534f",fontWeight:"bold",
                      textDecoration:"none"}}>Contact</Link>
                    </Nav.Link>
                  </Nav>
                  <Form className="d-flex">
                  <Button variant="outline-success"
                  title={FullName +" is Working"} style= 
                   {{borderRadius:"50%", margin:"auto"}}>
                    <Link to="/Profile" style= 
                      {{color:"black",fontWeight:"bold",textDecoration:"none"}} 
                       >{user} 
                         </Link>
                    </Button>
                  </Form>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
            </Container>
          </Navbar>
        ))}
      </>
    );
  }


function Footer() {
  return (
    <footer style={styles.footerContainer}>
      <div style={styles.contentWrapper}>
        {/* Blood Bank Info */}
        <div style={styles.section}>
          <h4 style={styles.sectionTitle}>About Us</h4>
          <p style={styles.text}>
            We are dedicated to providing life-saving blood donations to those in 
             need. 
            Connect with us to donate blood and save lives.
          </p>
        </div>

        {/* Quick Links */}
        <div style={styles.section}>
          <h4 style={styles.sectionTitle}>Quick Links</h4>
          <ul style={styles.linkList}>
            <li><Link to="/Home" style={styles.link}>Home</Link></li>
            <li><Link to="/Donors" style={styles.link}>Donate Blood</Link></li>
            <li><Link to="/About" style={styles.link}>About Us</Link></li>
            <li><Link to="/Contact" style={styles.link}>Contact</Link></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div style={styles.section}>
          <h4 style={styles.sectionTitle}>Contact Us</h4>
          <p style={styles.text}><strong>Email:</strong> 
           support@bloodbank.com</p>
          <p style={styles.text}><strong>Phone:</strong> +1 (234) 567-890</p>
          <p style={styles.text}><strong>Address:</strong> 123 Life Saver St, 
           City, Country</p>
        </div>

      </div>

      {/* Footer Bottom */}
      <div style={styles.footerBottom}>
        <p style={styles.footerText}>
          © {new Date().getFullYear()} Blood Bank. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

const styles = {
  footerContainer: {
    backgroundColor: "#d9534f",
    color: "#fff",
    padding: "40px 20px 10px",
    marginTop: "20px",
  },
  contentWrapper: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "30px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  section: {
    textAlign: "left",
  },
  sectionTitle: {
    fontSize: "1.5rem",
    marginBottom: "10px",
    paddingBottom: "5px",
  },
  text: {
    margin: "5px 0",
    fontSize: "1rem",
  },
  linkList: {
    listStyle: "none",
    padding: 0,
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    display: "block",
    margin: "5px 0",
    transition: "color 0.3s",
  },
  socialMedia: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
  },
  socialIcon: {
    fontSize: "1.5rem",
    color: "#fff",
    textDecoration: "none",
    transition: "transform 0.3s",
  },
  socialIconHover: {
    transform: "scale(1.1)",
  },
  footerBottom: {
    textAlign: "center",
    marginTop: "20px",
    borderTop: "1px solid #fff",
    paddingTop: "10px",
  },
  footerText: {
    fontSize: "0.9rem",
  },
};

function BloodGroupCount() {
  const [bloodGroupCounts, setBloodGroupCounts] = useState({
    "A+": 0,
    "A-": 0,
    "B+": 0,
    "B-": 0,
    "O+": 0,
    "O-": 0,
    "AB+": 0,
    "AB-": 0,
  });
  const [loading, setLoading] = useState(true);

  const fetchBloodGroupCounts = () => {
    const unsubscribe = onSnapshot(collection(db, "Dolore"), (querySnapshot) => {
      const counts = {
        "A+": 0,
        "A-": 0,
        "B+": 0,
        "B-": 0,
        "O+": 0,
        "O-": 0,
        "AB+": 0,
        "AB-": 0,
      };

      querySnapshot.forEach((doc) => {
        const donor = doc.data();
        if (donor.UserBloodGroup && counts[donor.UserBloodGroup] !== undefined) {
          counts[donor.UserBloodGroup] += 1;
        }
      });

      setBloodGroupCounts(counts);
      setLoading(false);
    });

    return unsubscribe; // Return the unsubscribe function
  };

  useEffect(() => {
    const unsubscribe = fetchBloodGroupCounts();

    return () => {
      unsubscribe(); // Clean up the listener
    };
  }, []);

  return (
    <section
      style={{
        padding: "40px 20px",
        margin: "0 auto",
        textAlign: "center",
        backgroundColor: "#f8f8f8",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <p style={{ color: "#555" }}>
        The number of registered donors for each blood group is displayed below.
      </p>
      <br />
      {loading ? (
        <p style={{ color: "#888" }}>Loading blood group counts...</p>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          {Object.keys(bloodGroupCounts).map((group) => (
            <div
              key={group}
              style={{
                backgroundColor: "#fff",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                textAlign: "center",
                width: "130px",
                fontSize: "18px",
              }}
            >
              <h4 style={{ color: "#d9534f" }}>{group}</h4>
              <p>{bloodGroupCounts[group]}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}



const DoctorsTeam = () => {
  const doctors = [
    {
      name: "Dr. Sarah Johnson",
      specialty: "Hematologist",
      image: doctor1,
      socialLinks: ["logo-facebook", "logo-twitter", "logo-instagram"],
    },
    {
      name: "Dr. David Lee",
      specialty: "Oncologist",
      image: doctor2,
      socialLinks: ["logo-linkedin", "logo-facebook", "logo-twitter"],
    },
    {
      name: "Dr. Emily Carter",
      specialty: "General Practitioner",
      image: doctor3,
      socialLinks: ["logo-instagram", "logo-facebook", "logo-twitter"],
    },
  ];

  return (
    <div className="doctors-team">
      <h1>Meet Our Doctors</h1>
      <div className="team-container">
        {doctors.map((doctor, index) => (
          <div className="doctor-card" key={index}>
            <img src={doctor.image} alt={doctor.name} className="doctor-image" />
            <h3>{doctor.name}</h3>
            <h4>{doctor.specialty}</h4>
            <div className="social-icons">
              {doctor.socialLinks.map((icon, idx) => (
                <ion-icon key={idx} name={icon}></ion-icon>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


  
  export  {DoctorsTeam,NavbarExp,Footer,BloodGroupCount};