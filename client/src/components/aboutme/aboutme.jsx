import { Link } from "react-router-dom";
import "./aboutme.css";

const About = () => {
  return (
    <div className="about-general">
      <div className="about-container">
        <div className="about-text">
          <button
            className="about-button"
            onClick={() => window.history.back()}
          >
            BACK
          </button>
        </div>
        <div className="about-content">
          <div>
            <h1>ABOUT ME</h1>
            <p>
              Hi, I'm <span>Giovanni Cespedes</span>, a 20-year-old excited to
              present my final project for graduation from SoyHenry.
            </p>
            <p>
              I've used various technologies to create a captivating web
              experience, including HTML for content structure and CSS for
              responsive design.
            </p>
            <p>
              I've added interactivity using JavaScript, enhancing user
              experiences, and harnessed libraries like React for reusable
              components and efficient state management.
            </p>
            <p>
              I've also employed tools like Express.js to build a robust API for
              handling user data and integrated external data through Axios. In
              short, this project combines HTML, CSS, and JavaScript skills with
              modern tech like React, Express.js, and Axios.
            </p>
            <p>
              Feel free to connect with me on{" "}
              <a
                href="https://www.linkedin.com/in/giovannicespedes/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>{" "}
              to learn more! Thanks for your time, and I hope you enjoy
              exploring my project!
            </p>
          </div>
        </div>
        <div className="about-image">
          <img
            src="https://media.licdn.com/dms/image/C4E03AQF9g5FLLLviuw/profile-displayphoto-shrink_800_800/0/1667863811619?e=1696464000&v=beta&t=P6G8Mmo4ZNkX-EBI0s1GYZos6RZ808YypiJ3J3L018w"
            alt="me"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
