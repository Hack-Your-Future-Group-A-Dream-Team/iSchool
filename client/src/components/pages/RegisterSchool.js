import React, { useState } from "react";
import { Form, Row, Col } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Select from "react-select";
import "react-toastify/dist/ReactToastify.css";
import Label from "../Label";
import Input from "../Input";
import "./RegisterSchool.css";
import IButton from "../IButton";
import { useHistory } from "react-router";
import Geocode from "react-geocode";
Geocode.setLanguage("en");
Geocode.setRegion("be");
Geocode.setApiKey("AIzaSyAddwFzEu83xzv_3kQjwLOrK3d35bmiOKg");

const RegisterSchool = () => {
  const [school, setSchool] = useState({
    name: "",
    address: {
      building: "",
      street: "",
      city: "",
      postcode: "",
    },
    email: "",
    phone: "",
    description: "",
    network: "",
    website: "",
    fieldsOfStudy: [],
    languageClasses: false,
    isPrivate: false,
  });

  const [coordinates, setCoordinates] = useState({});
  const [googleAddress, setGoogleAddress] = useState("");

  const history = useHistory();
  const onInputChange = (e) => {
    setSchool({ ...school, [e.target.name]: e.target.value });
  };

  const onAddressChange = (e) => {
    const address = { ...school.address, [e.target.name]: e.target.value };
    setSchool({ ...school, address });
    const googleAddress = `${address.building} ${address.street} ${address.city}  ${address.postcode}`;
    setGoogleAddress(googleAddress);
    Geocode.fromAddress(googleAddress).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        const coordinates = [lng, lat];
        setCoordinates(coordinates);
      },
      (error) => {
        console.error(error);
      }
    );
  };

  const onNetworkChange = (e) => {
    setSchool({ ...school, network: e.value });
  };

  const onFieldsChange = (e) => {
    const fields = e.map((field) => field.value);
    setSchool({ ...school, fieldsOfStudy: [...fields] });
  };

  const onLangChange = (e) => {
    setSchool({ ...school, languageClasses: e.target.checked });
  };

  const onIsPrivateChange = (e) => {
    setSchool({ ...school, isPrivate: e.target.checked });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formIsValid()) {
      const {
        name,
        address,
        email,
        phone,
        description,
        network,
        website,
        fieldsOfStudy,
        languageClasses,
        isPrivate,
      } = school;
      axios
        .post("/schools", {
          name,
          adress: address,
          adress_str: googleAddress,
          email,
          phone,
          description,
          network,
          website,
          areas: [...fieldsOfStudy],
          languageClasses,
          types: isPrivate ? "Private" : "Public",
          location: {
            type: "Point",
            coordinates,
          },
        })
        .then((res) => {
          console.log(res.data);
          toast.success("School was successfully registered");
        })
        .then(() =>
          setTimeout(() => {
            history.push("/");
          }, 5000)
        )
        .catch((err) => {
          console.log(err);
          toast.error("Something went wrong. Please try again.");
        });
    } else {
      toast.error("Please fill all fields");
    }
  };

  const handleCancel = () => {
    history.goBack();
  };

  const formIsValid = () => {
    let result = true;
    for (const key in school) {
      if (key === "fieldsOfStudy") {
        if (school[key].length === 0) {
          result = false;
          return result;
        }
      } else if (key === "address") {
        for (const addressField in school.address) {
          if (school.address[addressField].length === 0) {
            result = false;
            return result;
          }
        }
      } else {
        if (school[key].length < 3) {
          result = false;
          return result;
        }
      }
    }
    return result;
  };
  const networkOptions = [
    { value: "GO Network", label: "GO Network" },
    { value: "Catholic Network", label: "Catholic Network" },
    { value: "Municipality Schools", label: "Municipality Schools" },
    { value: "Private schools", label: "Private schools" },
  ];

  const fieldsOptions = [
    { value: "General", label: "General" },
    { value: "Technical", label: "Technical" },
    { value: "Vocational", label: "Vocational" },
    { value: "Art Secondary Education", label: "Art Secondary Education" },
  ];

  const selectStyles = {
    container: (provided) => ({
      ...provided,
      height: 25.33,
      border: "1px solid #8B8B8B",
      borderRadius: "0%",
      boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    }),
    option: (provided) => ({
      ...provided,
      fontFamily: "Ubuntu",
      fontSize: "1rem",
      lineHeight: 1,
    }),
    control: (provided) => ({
      ...provided,
      minHeight: "unset",
      padding: "0 2px 1px 2px",
      height: 23,
      border: "none",
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: "1px 2px",
      height: 30,
    }),
    placeholder: () => ({
      fontFamily: "Ubuntu",
      fontSize: "1rem",
      lineHeight: 1,
      marginBottom: 5,
    }),
    indicatorsContainer: () => ({
      display: "flex",
      alignItems: "center",
      width: "unset",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      padding: 0,
    }),
    clearIndicator: (provided) => ({
      ...provided,
      padding: 0,
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 2,
      backgroundOpacity: 1,
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "#000051",
      height: 19,
      marginTop: -7,
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "#ffffff",
      fontFamily: "Ubuntu",
      fontSize: 13,
      padding: 0,
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: "#ffffff",
    }),
  };

  return (
    <div className="add-school">
      <ToastContainer />

      <Form
        className="d-flex flex-column justify-content-around"
        onSubmit={handleSubmit}
      >
        <Row className="justify-content-md-center">
          <h2 className="add-school-title">Register A School</h2>
        </Row>
        <Form.Group
          as={Row}
          className="d-flex justify-content-center"
          controlId="name"
        >
          <Col sm="4">
            <Label label="School Name" />
          </Col>
          <Col sm="8">
            <Input
              type="text"
              name="name"
              value={school.name}
              onChange={onInputChange}
            />
          </Col>
        </Form.Group>{" "}
        <Form.Group
          as={Row}
          className="d-flex justify-content-center"
          controlId="address"
        >
          <Col sm="12" className="d-flex justify-content-left">
            <Label label="School Address:" />
          </Col>
        </Form.Group>{" "}
        <Form.Group
          as={Row}
          className="d-flex justify-content-center"
          controlId="street"
        >
          <Col sm="4">
            <Label label="Street" />
          </Col>
          <Col sm="8">
            <Input
              type="text"
              name="street"
              value={school.address.street}
              onChange={onAddressChange}
            />
          </Col>
        </Form.Group>{" "}
        <Form.Group
          as={Row}
          className="d-flex justify-content-center"
          controlId="building"
        >
          <Col xs="3" sm="4">
            <Label label="Number" />
          </Col>
          <Col xs="2" sm="3">
            <Input
              type="text"
              name="building"
              value={school.address.building}
              onChange={onAddressChange}
            />
          </Col>
          <Col xs="4" sm="2">
            <Label label="Postcode" />
          </Col>
          <Col xs="3" sm="3">
            <Input
              type="text"
              name="postcode"
              value={school.address.postcode}
              onChange={onAddressChange}
            />
          </Col>
        </Form.Group>{" "}
        <Form.Group
          as={Row}
          className="d-flex justify-content-center"
          controlId="city"
        >
          <Col sm="4">
            <Label label="City" />
          </Col>
          <Col sm="8">
            <Input
              type="text"
              name="city"
              value={school.address.city}
              onChange={onAddressChange}
            />
          </Col>
        </Form.Group>{" "}
        <Form.Group
          as={Row}
          className="d-flex justify-content-center"
          controlId="email"
        >
          <Col sm="4">
            <Label label="Email" />
          </Col>
          <Col sm="8">
            <Input
              type="email"
              name="email"
              value={school.email}
              onChange={onInputChange}
            />
          </Col>
        </Form.Group>{" "}
        <Form.Group
          as={Row}
          className="d-flex justify-content-center"
          controlId="phone"
        >
          <Col sm="4">
            <Label label="Phone" />
          </Col>
          <Col sm="8">
            <Input
              type="text"
              name="phone"
              value={school.phone}
              onChange={onInputChange}
            />
          </Col>
        </Form.Group>{" "}
        <Form.Group
          as={Row}
          className="d-flex justify-content-center"
          controlId="website"
        >
          <Col sm="4">
            <Label label="Web Site" />
          </Col>
          <Col sm="8">
            <Input
              type="text"
              name="website"
              value={school.website}
              onChange={onInputChange}
            />
          </Col>
        </Form.Group>{" "}
        <Form.Group
          as={Row}
          className="d-flex justify-content-center"
          controlId="description"
        >
          <Col sm="4">
            <Label label="School Description" />
          </Col>
          <Col sm="8">
            <Input
              type="text"
              name="description"
              value={school.description}
              onChange={onInputChange}
            />
          </Col>
        </Form.Group>{" "}
        <Form.Group
          as={Row}
          className="d-flex justify-content-center"
          controlId="network"
        >
          <Col sm="4">
            <Label label="School Network" />
          </Col>
          <Col sm="8">
            <Select
              onChange={onNetworkChange}
              options={networkOptions}
              styles={selectStyles}
            />
          </Col>
        </Form.Group>
        <Form.Group
          as={Row}
          className="d-flex justify-content-center"
          controlId="languageClasses"
        >
          <Col sm="4">
            <Label label="Fields Of Study" />
          </Col>
          <Col sm="8">
            <Select
              onChange={onFieldsChange}
              options={fieldsOptions}
              isMulti={true}
              styles={selectStyles}
            />
          </Col>
        </Form.Group>
        <Form.Group
          as={Row}
          className="d-flex justify-content-center"
          controlId="languageClasses"
        >
          <Col xs="4">
            <Label label="Language Classes" />
          </Col>
          <Col xs="2">
            <Form.Check
              className="i-register-check"
              name="languageClasses"
              onChange={onLangChange}
            />
          </Col>
          <Col xs="4">
            <Label label="Private School" />
          </Col>
          <Col xs="2">
            <Form.Check
              className="i-register-check"
              name="isPrivate"
              onChange={onIsPrivateChange}
            />
          </Col>
        </Form.Group>
        <div className="register-button-group">
          <IButton type="submit" label="Add School" />
          <IButton color="secondary" onClick={handleCancel} label="Cancel" />
        </div>
      </Form>
    </div>
  );
};

export default RegisterSchool;
