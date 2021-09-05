import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { update } from "../actions/userActions";
import { useDispatch } from "react-redux";
import { Button } from "react-bootstrap";

export default function EditUser(props) {
  console.log("props-----===>>>>>", props);
  const [isChecked, setIsChecked] = useState(true);
  const [show, setShow] = useState(props.show);
  const [showBox, setShowBox] = useState(false);
  const [searchTerm, setSearchTerm] = useState(props.dataEdit.college);
  const [collegeList, setCollegeList] = useState([]);

  const [name, setName] = useState(props.dataEdit.name);
  const [address, setAddress] = useState(props.dataEdit.address);
  const [startDate, setStartDate] = useState(props.dataEdit.birthDate);
  const [gender, setGender] = useState(props.dataEdit.gender);
  const [hobbies, setHobbies] = useState(props.dataEdit.hobbies);
  const [otherHobby, setOtherHobby] = useState(props.dataEdit.otherHobby);

  const dispatch = useDispatch();

  // submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    if (otherHobby) {
      hobbies.push(otherHobby);
    }
    const userData = {
      userId: props.dataEdit.userId,
      name: name,
      address: address,
      birthDate: startDate,
      gender: gender,
      college: searchTerm,
      hobbies: hobbies,
    };

    console.log("userData----->", userData);

    dispatch(update(userData));
    setShow(false);
    window.location.reload(false);
  };

  // collect hobbies
  const selectedHobbies = useCallback(
    (e) => {
      console.log("e------------hobby--->", e);
      if (!hobbies.includes(e)) {
        hobbies.push(e);
      } else {
        const index = hobbies.indexOf(e);
        if (index > -1) {
          hobbies.splice(index, 1);
        }
      }
      console.log("hobbies", hobbies);
      setHobbies(hobbies);
    },
    [hobbies]
  );

  const selectedOtherHobby = (e) => {
    setOtherHobby(e);
  };

  const getCollegeNames = async (searchTerm) => {
    if (searchTerm && searchTerm.length > 1) {
      const response = await axios.get(
        `http://universities.hipolabs.com/search?name=${searchTerm}`
      );

      console.log("response", response);
      setCollegeList(response.data);
    }
  };

  useEffect(() => {
    getCollegeNames();
  }, []);

  const handleChange = (e, type) => {
    console.log("e---->", e.target.value);
    if (type === "college") {
      setSearchTerm(e.target.value);
      getCollegeNames(searchTerm);
    } else if (type === "name") {
      setName(e.target.value);
    } else if (type === "address") {
      setAddress(e.target.value);
    } else if (type === "gender") {
      setGender(e.target.value);
    }
  };

  const handleSelectedCollege = (name) => {
    console.log("name", name);
    setSearchTerm(name);
    setCollegeList([]);
  };

  // set date
  const selectDateHandler = (d) => {
    setStartDate(d);
  };

  const handleClickOther = () => {
    setShowBox(true);
  };

  return (
    <>
      <div className="row">
        <Modal show={show}>
          <Modal.Header closeButton={true}></Modal.Header>
          <Modal.Body>
            <form className="form" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name">Name</label>
                <input
                  type="name"
                  id="name"
                  placeholder="Enter Name"
                  required
                  value={name}
                  onChange={(e) => handleChange(e, "name")}
                />
              </div>
              <div>
                <label htmlFor="birthdate">Birth Date</label>
                <DatePicker
                  dateFormat="yyyy/MM/dd"
                  value={startDate}
                  onChange={selectDateHandler}
                  todayButton={"Today"}
                />
              </div>
              <div>
                <label htmlFor="address">Address</label>
                <input
                  type="address"
                  id="address"
                  placeholder="Enter Address"
                  required
                  value={address}
                  onChange={(e) => handleChange(e, "address")}
                />
              </div>
              <div>
                <label htmlFor="gender">Gender</label>
                <select
                  type="select"
                  id="gender"
                  placeholder="Enter Gender"
                  value={gender}
                  required
                  onChange={(e) => handleChange(e, "gender")}
                >
                  <option value="" hidden>
                    -SELECT-
                  </option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div>
                <label htmlFor="college">College</label>
                <input
                  type="text"
                  id="college"
                  value={searchTerm}
                  placeholder="search min 3 characters"
                  required
                  onChange={(e) => handleChange(e, "college")}
                />
              </div>
              <div>
                <div>
                  {searchTerm &&
                    searchTerm.length > 0 &&
                    collegeList.length > 0 && (
                      <div>
                        {collegeList.map((data, i) => (
                          <div
                            key={i}
                            onClick={() => handleSelectedCollege(data.name)}
                            onKeyPress={(e) => {
                              handleSelectedCollege(data.name);
                            }}
                          >
                            <div>{data.name}</div>
                          </div>
                        ))}
                      </div>
                    )}
                </div>
              </div>
              <div>
                <label htmlFor="hobbies">Hobbies</label>
                <div className="row">
                  <div>
                    <input
                      type="checkbox"
                      id="reading"
                      value="Reading"
                      name="reading"
                      checked={hobbies.includes("Reading") ? true : false}
                      onChange={(e) => selectedHobbies(e.target.value)}
                      onClick={() => setIsChecked(!isChecked)}
                    />
                    <label htmlFor="reading">Reading</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      id="gaming"
                      value="Gaming"
                      name="gaming"
                      checked={hobbies.includes("Gaming") ? true : false}
                      onChange={(e) => selectedHobbies(e.target.value)}
                      onClick={() => setIsChecked(!isChecked)}
                    />
                    <label htmlFor="gaming">Gaming</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      id="travelling"
                      value="Travelling"
                      name="travelling"
                      checked={hobbies.includes("Travelling") ? true : false}
                      onChange={(e) => selectedHobbies(e.target.value)}
                      onClick={() => setIsChecked(!isChecked)}
                    />
                    <label htmlFor="travelling">Travelling</label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      id="drawing"
                      value="Drawing"
                      name="drawing"
                      checked={hobbies.includes("Drawing") ? true : false}
                      onChange={(e) => selectedHobbies(e.target.value)}
                      onClick={() => setIsChecked(!isChecked)}
                    />
                    <label htmlFor="drawing">Drawing</label>
                  </div>

                  <div>
                    <input
                      type="checkbox"
                      id="others"
                      value="Others"
                      name="others"
                      checked={hobbies.includes("Others") ? true : false}
                      onChange={(e) => selectedHobbies(e.target.value)}
                      onClick={() => setIsChecked(!isChecked)}
                    />
                    <label htmlFor="others">Others</label>
                  </div>
                  {otherHobby && (
                    <div>
                      <textarea
                        placeholder="Enter your hobby here"
                        value={otherHobby}
                        onChange={(e) => selectedOtherHobby(e.target.value)}
                        onClick={() => setIsChecked(!isChecked)}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label />
                <Button className="primary" type="submit">
                  {" "}
                  Save
                </Button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}
