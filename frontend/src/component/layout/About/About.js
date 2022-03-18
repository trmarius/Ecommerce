import React from "react";
import "./about.css";
import { Button, Typography, Avatar } from "@material-ui/core";
import YouTubeIcon from "@material-ui/icons/YouTube";
import InstagramIcon from "@material-ui/icons/Instagram";
import FacebookIcon from "@material-ui/icons/Facebook";
const About = () => {
  const visitInstagram = () => {
    window.location = "https://instagram.com/";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">Despre Noi</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "15vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://res.cloudinary.com/benayun/image/upload/v1646825961/products/kv0tvmkha32iabsbpfjc.png"
              alt="About Image"
            />
            <Typography>NOOVA GLASSES</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visiteaza Instagram
            </Button>
            <span>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
              pulvinar et est ut iaculis. Cras et interdum mauris, et accumsan
              felis. Ut.
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Social Media</Typography>
            <div className="aboutSectionContainer2-links">
              <a href="https://facebook.com/" target="blank">
                <FacebookIcon className="facebookSvgIcon" />
              </a>
              <a href="https://instagram.com/" target="blank">
                <InstagramIcon className="instagramSvgIcon" />
              </a>
              <a href="https://www.youtube.com/" target="blank">
                <YouTubeIcon className="youtubeSvgIcon" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
