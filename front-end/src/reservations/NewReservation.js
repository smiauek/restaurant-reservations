import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ReservationForm from "./ReservationForm";
import ErrorAlert from "../layout/ErrorAlert";
import { createReservation } from "../utils/api";

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
  const [reservationsError, setReservationsError] = useState(null);

  const handleChange = ({ target }) => {
    let value = target.value;
    if (target.name === "people") {
      value = Number(value);
    }
    setFormData({
      ...formData,
      [target.name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    async function addReservation() {
      try {
        await createReservation({ data: formData }, abortController.signal);
        history.push(`/dashboard?date=${formData.reservation_date}`);
      } catch (error) {
        setReservationsError(error);
      }
    }
    addReservation();
    return () => abortController.abort();
  };

  return (
    <>
      <h1>Create Reservation</h1>
      <ErrorAlert error={reservationsError} />
      <ReservationForm formData={formData} handleChange={handleChange} />
      <button className="btn btn-secondary mr-2" onClick={history.goBack}>
        Cancel
      </button>
      <button
        form="reservationForm"
        type="submit"
        className="btn btn-primary"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </>
  );
}

export default NewReservation;