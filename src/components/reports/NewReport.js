import React, { Fragment, useEffect, useState } from "react";
import "./NewReport.css";
import { useSelector, useDispatch } from "react-redux";
import { clearError, createReport } from "../../actions/ReportsActions";
import { useAlert } from "react-alert";
import Button from "@mui/material/Button";
// import AccountTreeIcon from "@mui/icons-material/AccountTree";
// import DescriptionIcon from "@mui/icons-material/Description";
// import StorageIcon from "@mui/icons-material/Storage";
// import SpellcheckIcon from "@mui/icons-material/Spellcheck";
// import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { NEW_REPORT_RESET } from "../../constants/ReportConstants";
import { useNavigate } from "react-router-dom";

const NewReport = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, success } = useSelector((state) => state.newReport);
  const { isAuthenticated } = useSelector((state) => state.user);

  const [animal, setAnimal] = useState("");
  const [numberOfAnimals, setnumberOfAnimals] = useState(0);
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [aid, setAid] = useState("");
  const [adress, setAdress] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const cities = [
    "north delhi",
    "east delhi",
    "south delhi",
    "west delhi",
    "new delhi",
    "faridabad",
    "gugaon",
    "noida",
  ];
  const states = ["Delhi", "Haryana", "UP", "Punjab", "Rajasthan"];

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError());
    }

    if (success) {
      alert.success("Report Created Successfully");
      navigate("/me/reports");
      dispatch({ type: NEW_REPORT_RESET });
    }

    if (isAuthenticated == false) {
      navigate("/login");
    }
  }, [dispatch, alert, error, navigate, success]);

  const createReportSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("animal", animal);
    myForm.set("numberOfAnimals", numberOfAnimals);
    myForm.set("description", description);
    myForm.set("area", city);
    myForm.set("aid", aid);
    myForm.set("location.adress", adress);
    myForm.set("location.city", city);
    myForm.set("location.state", state);

    images.forEach((image) => {
      myForm.append("images", image);
    });

    dispatch(createReport(myForm));
  };

    const createProductImagesChange = (e) => {
      const files = Array.from(e.target.files);

      setImages([]);
      setImagesPreview([]);

      files.forEach((file) => {
        const reader = new FileReader();

        reader.onload = () => {
          if (reader.readyState === 2) {
            setImagesPreview((old) => [...old, reader.result]);
            setImages((old) => [...old, reader.result]);
          }
        };

        reader.readAsDataURL(file);
      });
    };

  return (
    <Fragment>
      <div className="dashboard">
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={createReportSubmitHandler}
          >
            <h1>Create Report</h1>

            <div>
              {/* <SpellcheckIcon /> */}
              <input
                type="text"
                placeholder="Animal(eg: dog, cow, etc..)"
                required
                value={animal}
                onChange={(e) => setAnimal(e.target.value)}
              />
            </div>
            <div>
              {/* <AttachMoneyIcon /> */}
              <input
                type="text"
                placeholder="Number Of Animals"
                required
                onChange={(e) => setnumberOfAnimals(e.target.value)}
              />
            </div>

            <div>
              {/* <DescriptionIcon /> */}

              <textarea
                placeholder="Report Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            <div>
                {/* <StorageIcon /> */}
                <input
                  type="text"
                  placeholder="address/landmark nearby"
                  value={adress}
                  required
                  onChange={(e) => setAdress(e.target.value)}
                />
            </div>
            <div>
              {/* <AccountTreeIcon /> */}
              <select onChange={(e) => setCity(e.target.value)}>
                <option value="">Choose Area</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              <select onChange={(e) => setState(e.target.value)}>
                <option value="">Choose State</option>
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>

            <div>
              {/* <StorageIcon /> */}
              <input
                type="text"
                placeholder="aid needed"
                value={aid}
                required
                onChange={(e) => setAid(e.target.value)}
              />
            </div>

            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={createProductImagesChange}
                multiple
              />
            </div>

            {/* <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div> */}

            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Create
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NewReport;
