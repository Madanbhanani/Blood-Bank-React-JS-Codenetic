import React from "react";
import "./css/Home.css";
import Image  from "./istockphoto-1403182301-612x612.jpg";
import { NavbarExp,Footer,BloodGroupCount } from "./Componets/Componets"; 
import { useEffect,useState } from "react";
import { db } from "./Firebase";
import { getDocs,collection,getDoc,addDoc,doc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import  Image2  from "./img2.jpg";
import { auth } from "./Firebase";
import Accordion from 'react-bootstrap/Accordion';

const styles = {
  textContainer: {
    flex: 1,
    marginRight: "20px",
  },
  // title: {
  //   fontSize: "2.5rem",
  //   fontWeight: "bold",
  //   color: "#d9534f",
  //   marginBottom: "20px",
  // },
  // description: {
  //   fontSize: "1.2rem",
  //   color: "#555",
  //   lineHeight: "1.6",
  //   marginBottom: "20px",
  // },
  // button: {
  //   padding: "10px 20px",
  //   fontSize: "1rem",
  //   color: "#fff",
  //   backgroundColor: "#d9534f",
  //   border: "none",
  //   borderRadius: "5px",
  //   cursor: "pointer",
  //   transition: "background-color 0.3s",
  // },
  // imageContainer: {
  //   flex: 1,
  //   textAlign: "center",
  // },
  // image: {
  //   maxWidth: "100%",
  //   borderRadius: "10px",
  // },



//  ______________________
container: {
    padding: "50px 20px",
    backgroundColor: "#fff",
    textAlign: "center",
    borderRadius: "10px",
    margin: "20px auto",
  },
  title: {
    fontSize: "2.5rem",
    color: "#d9534f",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  title2: {
    fontSize: "2rem",
    color: "#d9534f",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  description: {
    fontSize: "1.2rem",
    color: "#555",
    lineHeight: "1.6",
    marginBottom: "30px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "15px",
  },
  input: {
    width: "80%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    fontSize: "1rem",
  },
  button: {
    padding: "10px 20px",
    fontSize: "1rem",
    color: "#fff",
    backgroundColor: "#d9534f",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  buttonHover: {
    backgroundColor: "#c9302c",
  },
  image: {
    maxWidth: "100%",
    borderRadius: "10px",
    margin: "20px 0",
  },
};

function Home() {
    // const [users, setUsers] = useState([]); // State to store users
    const [loading, setLoading] = useState(true); // State to track loading

    const [Donors,setDonors]=useState()
    const [blood,setBlood]=useState()
    const [DonorEmails,setDonorEmails]=useState()

    const [users, setUsers] = useState([]); // Store all users
    const [usersid, setUsersid] = useState([]); // Store all users
    const [names, setNames] = useState(""); // Array of names
    const [emails, setEmails] = useState(); // Array of emails
    const [phones, setPhones] = useState(""); // Array of phone numbers
    const [URL, setURL] = useState(); // Array of blood groups
    const [cities, setCities] = useState(""); // Array of cities

    const fetchUsers = async () => {
      // Ensure the user is authenticated before proceeding
      onAuthStateChanged(auth, async (user) => {
          if (user) {
              const uid = user.uid;
              setUsersid(uid); // Set the user ID
              setNames(user.displayName);
              setEmails(user.email);
  
              // Fetch user data from the "users" collection
              const userDoc = await getDoc(doc(db, "users", uid)); // Use 
              if (userDoc.exists()) {
                  console.log(`${userDoc.data().UEmail} => 
                     ${userDoc.data().UCity}`);
                  setURL(userDoc.data().photoURL);
                  setCities(userDoc.data().UCity);
                  setPhones(userDoc.data().UPhone);
              }
              // Fetch all donor emails from the "Dolore" collection
              const donorSnapshot = await getDocs(collection(db, "Dolore"));
              const emailList = [];
              donorSnapshot.forEach((doc) => {
                  console.log(`${doc.data().UserEmail} => ${doc.data().UCity}`);
                  setDonorEmails(doc.data().UserEmail); // Accumulate emails in 
                  //  the array
              });
              // setDonorEmails(emailList); // Store the accumulated emails in 
          }
      });
  };
   
  console.log(DonorEmails,emails);
  // Fetch users on component mount
   useEffect(() => {
    fetchUsers();
  }, []);

   console.log(DonorEmails)
  const SubmitDonore = async (e) => {
    
    e.preventDefault();
    if(DonorEmails === emails){
       alert("Already")
    }
     else{
      const docRef = await addDoc(collection(db, "Dolore"), {
        UserName:names,
        UserEmail: emails,
        UserPhone: phones,
        UserCity: cities,
        UserBloodGroup:blood,
        URL:URL
      });      
  }     
    }
      
      console.log(phones)

  return (
    <>
      <NavbarExp/>
      <div className="heroContainer">
        <div style={styles.textContainer} className="textContainer_heroes"> 
          <br />
          <h1 style={styles.title} className="heroTitle">Wellcome To Blood Bank, 
            Save 
             Lives</h1>
          <p style={styles.description} className="heroDescription">
            Every drop counts! Join us in our mission to provide life-saving 
             blood to those in need. By donating, you can make a difference and 
              be someone's hero today.
          </p>
          <button style={styles.button} className="heroButton">Learn 
             More</button>
        </div>
        <div style={styles.imageContainer} className="imageContainer_Heroes">
          <img
            src={Image} // Replace with an actual URL
            alt="Blood donation"
            style={styles.image}
            className="heroImage"
          />
        </div>
      </div>

    <div className="heroContainer Heroe2" >
        <div style={styles.textContainer} 
        className="textContainer_heroes imageContainer_2"> 
        <img
            src={Image2} 
            alt="Blood donation"
            style={styles.image}
            className="heroImage"
          />
        </div>

    <div style={styles.imageContainer} className="imageContainer_Heroes">
        <div style={styles.container}>
      <h2 style={styles.title2}>Become a Blood Donor</h2>
      <p style={styles.description}>
        Make a life-saving impact by joining our community of blood donors.
        Sign up today to help those in need and be a hero in someone's life.
      </p>
        <form style={styles.form} >
        <select style={styles.input} name="group" value={blood} required 
         onChange={(e)=> setBlood(e.target.value)}>
          <option value="A+"  name="group" >A+</option>
          <option value="A-"  name="group">A-</option>
          <option value="B+"  name="group">B+</option>
          <option value="B-"  name="group">B-</option>
          <option value="O+"  name="group">O+</option>
          <option value="O-"  name="group">O-</option>
          <option value="AB+" name="group">AB+</option>
          <option value="AB-" name="group">AB-</option>
        </select>
        <button type="submit" onClick={SubmitDonore} style={styles.button}>
          Join as a Donor
        </button>
        <div>
        </div>
      </form>
      </div>  
      </div>
    </div>


    <section className="QuAboutSect" style={{width:"95%" 
     ,justifyContent:"center",margin:"auto", 
        padding:"50px 10px", borderRadius:"10px"}}>
    <Accordion defaultActiveKey="0" flush style= 
     {{width:"98%",justifyContent:"center",margin:"auto",}}>
      <Accordion.Item eventKey="0" style={{ borderRadius:"5px", 
          marginBottom:"10px"}}>
        <Accordion.Header><h3>Why Donate Blood?</h3></Accordion.Header>
        <Accordion.Body>
        Our goal is to bridge the gap between the increasing demand for blood and 
         the availability of voluntary donors. We strive to provide accessible, 
          safe, and adequate blood supply while promoting the spirit of community 
           giving. Every blood donation we receive has the potential to save 
            lives, and we believe that together, we can create a future where no 
             patient is deprived of the blood they need.
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1" style={{borderRadius:"5px", 
          marginBottom:"10px"}}>
        <Accordion.Header><h3>Our Mission</h3></Accordion.Header>
        <Accordion.Body>
        Blood is essential for life-saving treatments such as surgeries, cancer 
         treatments, accident recovery, and managing chronic diseases. A single 
          donation can save multiple lives, making blood donation one of the most 
           selfless acts a person can do. We invite you to donate regularly and 
            be part of a life-saving effort that impacts countless individuals.
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>

    </section>
    <br /> <br />
    <section> <br />
      <div className="allDonors">
       All Blood Groups 
      </div>
      
    </section>

     <BloodGroupCount/>
    <Footer/>
    </>
  );
}

export default Home;
