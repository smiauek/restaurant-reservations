import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ReservationForm from "./ReservationForm";

function NewReservation() {
  const history = useHistory();

  const initialFormState = {
    first_name: "",
    last_name: "",
    mobile_number: "",
    reservation_date: "",
    reservation_time: "",
    people: "",
  };

  const [formData, setFormData] = useState({ ...initialFormState });

  const handleChange = ({ target }) => {
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  return (
    <>
      <h1>Create Reservation</h1>
      <ReservationForm formData={formData} handleChange={handleChange} />
      <button className="btn btn-secondary mr-2" onClick={history.goBack}>
        Cancel
      </button>
      <button form="reservationForm" type="submit" className="btn btn-primary">
        Submit
      </button>
    </>
  );
}

export default NewReservation;
