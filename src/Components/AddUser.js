import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { nanoid } from "nanoid";
import { useHistory } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { details } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";

export default function AddUser(props) {
  console.log("props-----===>>>>>", props);

  const [showModalUpdate, setShowModalUpdate] = useState(false);
  const [show, setShow] = useState(props.show);
  const [showBox, setShowBox] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [collegeList, setCollegeList] = useState([]);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [gender, setGender] = useState("");
  const [hobbies, setHobbies] = useState([]);
  const [otherHobby, setOtherHobby] = useState("");

  const today = new Date();

  const dispatch = useDispatch();

  let history = useHistory();
  const userDetails = useSelector((state) => state.userDetails);
  const { userDetailsV3 } = userDetails;

  // submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("hobbies-------------->>>>>>>>", hobbies);
    console.log("otherHobby-------------->>>>>>>>", otherHobby);
    hobbies.push(otherHobby);
    // console.log("userID ---> ", userId);
    const userId = nanoid();
    const userData = {
      userId: userId,
      name: name,
      address: address,
      birthDate: moment(startDate).format("YYYY-MM-DD"),
      gender: gender,
      college: searchTerm,
      hobbies: hobbies,
      otherHobby: otherHobby,
      createdDate: Date.now(),
    };

    console.log("userData----->", userData);

    dispatch(details(userData));
    // history.push("/");
    setShow(false);
    window.location.reload(false);
  };

  // redirect to homepage

  useEffect(() => {
    if (userDetailsV3) {
      history.push("/");
    }
  }, [history, userDetailsV3]);

  // collect hobbies
  const selectedHobbies = (e) => {
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
  };

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

  const handleChange = (e) => {
    console.log("e---->", e.target.value);
    setSearchTerm(e.target.value);
    getCollegeNames(searchTerm);
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
  const handleUpdate = () => {
    setShowModalUpdate(!showModalUpdate);
  };

  // const handleClose = () => setShow(false);
  const handleShow = () => setShow(!show);

  // console.log("Show value --->", show);

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
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="birthdate">Birth Date</label>
                <DatePicker
                  dateFormat="yyyy/MM/dd"
                  selected={startDate}
                  onChange={selectDateHandler}
                  todayButton={"Today"}
                  maxDate={today}
                  required
                />
              </div>
              <div>
                <label htmlFor="address">Address</label>
                <input
                  type="address"
                  id="address"
                  placeholder="Enter Address"
                  required
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="gender">Gender</label>
                <select
                  type="select"
                  id="gender"
                  placeholder="Enter Gender"
                  required
                  onChange={(e) => setGender(e.target.value)}
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
                  onChange={handleChange}
                />
              </div>
              <div>
                <div>
                  {searchTerm.length > 0 && collegeList.length > 0 && (
                    <div className="search-result-box">
                      {collegeList.map((data, i) => (
                        <div
                          key={i}
                          onClick={() => handleSelectedCollege(data.name)}
                          onKeyPress={(e) => {
                            handleSelectedCollege(data.name);
                          }}
                        >
                          <div className="search-result-title">{data.name}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label htmlFor="college">Hobbies</label>
                <div className="row">
                  <div>
                    <input
                      type="checkbox"
                      id="reading"
                      value="Reading"
                      name="reading"
                      onChange={(e) => selectedHobbies(e.target.value)}
                    />
                    <label htmlFor="reading" className="left-padding">
                      Reading
                    </label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      id="gaming"
                      value="Gaming"
                      name="gaming"
                      onChange={(e) => selectedHobbies(e.target.value)}
                    />
                    <label htmlFor="gaming" className="left-padding">
                      Gaming
                    </label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      id="travelling"
                      value="Travelling"
                      name="travelling"
                      onChange={(e) => selectedHobbies(e.target.value)}
                    />
                    <label htmlFor="travelling" className="left-padding">
                      Travelling
                    </label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      id="drawing"
                      value="Drawing"
                      name="drawing"
                      onChange={(e) => selectedHobbies(e.target.value)}
                    />
                    <label htmlFor="drawing" className="left-padding">
                      Drawing
                    </label>
                  </div>

                  <div>
                    <input
                      type="checkbox"
                      id="others"
                      value="Others"
                      name="others"
                      onChange={(e) => selectedHobbies(e.target.value)}
                      onClick={handleClickOther}
                    />
                    <label htmlFor="others" className="left-padding">
                      Others
                    </label>
                  </div>
                  {showBox && (
                    <div>
                      <textarea
                        placeholder="Enter your hobby here"
                        // value=
                        onChange={(e) => selectedOtherHobby(e.target.value)}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label />
                <Button className="primary" type="submit">
                  {" "}
                  Submit
                </Button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}
