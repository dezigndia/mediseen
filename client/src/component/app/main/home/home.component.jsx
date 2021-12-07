import React, { useEffect, useState } from "react";
import "./home.styles.scss";

import clsx from "clsx";

import {
  HOSPITAL,
  DOCTOR,
  PATHOLOGY,
  PHARMACY,
  AMBULANCE,
} from "../categories";
import { useDispatch, useSelector } from "react-redux";
import fetchCall from "../../../../fetchCall/fetchCall";
import { addUser } from "../../../../store/user/userAction";
//icons
import { IconButton, makeStyles, Button } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import ApartmentIcon from "@material-ui/icons/Apartment";
import Battery20Icon from "@material-ui/icons/Battery20";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { MdLocationOn } from "react-icons/md";
import { IconContext } from "react-icons";

//images
//import BackgroundImage from '../../../../assets/images/background.png';

const useStyles = makeStyles((theme) => ({
  colorWhite: {
    color: "White",
  },
  large: {
    transform: "scale(1.3)",
  },
  blueColor: {
    color: "#2BBEC8",
    textDecoration: "bold",
    fontSize: ".8em",
  },
}));

const IconButtonContainer = ({
  icon,
  caption,
  onClick,
  hideInSmallScreen,
  count,
}) => {
  return (
    <div
      className={`iconButton ${hideInSmallScreen ? "hiddenIconButton" : null}`}
    >
      <div className="iconContainer">
        <IconButton onClick={onClick}>{icon}</IconButton>
      </div>
      <p className="caption">{caption}</p>
      <div className="iconTabNotification">{count}</div>
    </div>
  );
};

const ButtonContainer = ({ label, onClick }) => {
  const classes = useStyles();
  return (
    <div className="buttonContainer" onClick={onClick}>
      <IconButton className={classes.blueColor}>
        <ExitToAppIcon />
      </IconButton>
      <Button className={classes.blueColor}>{label}</Button>
    </div>
  );
};

const Home = ({ history, match }) => {
  const [count, setCount] = useState({
    hospital: 0,
    doctor: 0,
    pharmacy: 0,
    pathology: 0,
  });

  const city = useSelector((state) => state.location.city);
  let token = useSelector((state) => state.token.token);
  const dispatch = useDispatch();

  token = token
    ? token
    : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eXBlIjoidXNlciIsInBob3RvcyI6W10sIl9pZCI6IjYwM2YzOTg1NTFkOTQ1MzFmMTEzMzM0YSIsImRlZmF1bHQiOltdLCJwaG9uZSI6Iis5MTg5MTA3MTkxNDciLCJhZGRyZXNzIjpbXSwiY3JlYXRlZEF0IjoiMjAyMS0wMy0wM1QwNzoyMzo0OS42NDhaIiwidXBkYXRlZEF0IjoiMjAyMS0wMy0wM1QwNzoyMzo0OS42NDhaIiwiX192IjowLCJpYXQiOjE2MTUxMTcwODB9.gg2XoDzt9twPmWZ1esrrNaiMhdTRdLiMTuoqcrvzgGo";

  useEffect(() => {
    const fetchCount = async () => {
      const data = await fetchCall(`business/count?city=${city}`, "GET");

      setCount(data.data.payload);
      console.log(data);
    };

    if (city) {
      fetchCount();
    }
  }, [city]);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const res = await fetchCall("user/get/info", "GET", token);

        console.log(res, "user");

        dispatch(addUser(res.data.payload));
      } catch (e) {
        console.log(e);
      }
    };

    getUserInfo();
  }, []);

  const classes = useStyles();

  const gotoPage = (page) => {
    history.push(`${match.url}/${page}/`);
  };

  console.log(count);

  return (
    <div
      className="home" /*style={{ background: `transparent url(${BackgroundImage}) 0% 0% repeat padding-box`, backgroundSize: 'contain' }}*/
    >
      <div className="iconTab">
        <IconButtonContainer
          icon={
            <PersonIcon
              fontSize="large"
              className={clsx([classes.colorWhite, classes.large])}
            />
          }
          caption="Doctor"
          onClick={() => {
            gotoPage(`search/${DOCTOR}`);
          }}
          count={count && count.doctor}
        />
        <IconButtonContainer
          icon={
            <ApartmentIcon
              fontSize="large"
              className={clsx([classes.colorWhite, classes.large])}
            />
          }
          caption="Pharmacy"
          onClick={() => {
            gotoPage(`search/${PHARMACY}`);
          }}
          count={count && count.pharmacy}
        />
        <IconButtonContainer
          icon={
            <PersonIcon
              fontSize="large"
              className={clsx([classes.colorWhite, classes.large])}
            />
          }
          caption="Hospital"
          onClick={() => {
            gotoPage(`search/${HOSPITAL}`);
          }}
          count={count && count.hospital}
        />
        <IconButtonContainer
          icon={
            <Battery20Icon
              fontSize="large"
              className={clsx([classes.colorWhite, classes.large])}
            />
          }
          caption="Pathology"
          onClick={() => {
            gotoPage(`search/${PATHOLOGY}`);
          }}
          count={count && count.pathology}
        />
        <IconButtonContainer
          icon={
            <Battery20Icon
              fontSize="large"
              className={clsx([classes.colorWhite, classes.large])}
            />
          }
          caption="Ambulance"
          onClick={() => {
            gotoPage(`search/${AMBULANCE}`);
          }}
          hideInSmallScreen
        />
        <IconButtonContainer
          icon={
            <Battery20Icon
              fontSize="large"
              className={clsx([classes.colorWhite, classes.large])}
            />
          }
          caption="Pathology"
          onClick={() => {
            gotoPage("search/pathology");
          }}
          hideInSmallScreen
        />
      </div>

      {/* <div className="signInTab">
        <div className="signInButtonContainer">
          <IconContext.Provider value={{ className: "signInButtonIcon" }}>
            <MdLocationOn />
          </IconContext.Provider>
          <Button type="button">Sign IN</Button>
        </div>
      </div> */}

      <div className="buttonTab">
        <ButtonContainer label="Book Appointment / Order" />
        <ButtonContainer
          label="Upload Prescription"
          onClick={() => {
            gotoPage("uploadPrescription");
          }}
        />
        <ButtonContainer label="Reorder or Reappointment" />
        <ButtonContainer label="Setup Your Business Website" />
        <div className="appLogo">appLogo</div>
      </div>
    </div>
  );
};

export default Home;
