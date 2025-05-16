import React from "react";
import "../css/sectionCSS/Contact.css";
import avatar from '../assets/avatar/avatarContact.png';
import profileImg from '../assets/profilePhoto.jpg';
const Contact = () => {
  return (
    <div className="contact_container">
      <div className="custom-shape-divider-bottom-1747196479">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M1200 0L0 0 892.25 114.72 1200 0z"
            className="shape-fill"
          ></path>
        </svg>
      </div>

      <div className="contact_image">
        <div className="image_box">
          <img src={avatar} alt="Contact Avatar" />
        </div>
      </div>

      <div className="contact_form contact_card">
        <div className="getInTouch">
          <h2 className="text-xl font-bold text-amber-500">Get in Touch</h2>
          <p>
            "Great ideas begin with a conversation. Whether you're looking to build, collaborate, or just say hello — I'm always open to meaningful connections."
          </p>
        </div>

        <div className="profile_section">
          <img src={profileImg} alt="Mini Avatar" className="mini_avatar" />
          <h3 className="name">Saikat Bera</h3>
          <p className="location">📍 Kolkata , garia , sreenagar west  , 700094</p>
          <p className="email">📧 berasaikat731@gmail.com</p>
          <p className="phone">📞 +91 8509904168</p>
          <button onClick={() => window.location.href = "mailto:berasaikat731@gmail.com"}>
            Hire me
          </button>

        </div>
      </div>
    </div>
  );
};

export default Contact;
