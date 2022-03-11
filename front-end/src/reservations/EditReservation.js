import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readReservation, updateReservation } from "../utils/api";
import ReservationForm from "./ReservationForm";
import ErrorAlert from "../layout/ErrorAlert";

function EditReservation() {
  let { reservation_id } = useParams();

  const history = useHistory();

  const [formData, setFormData] = useState({});
  const [editError, setEditError] = useState(null);

  useEffect(loadReservation, [reservation_id]);

  function loadReservation() {
    const abortController = new AbortController();
    setEditError(null);
    readReservation({ reservation_id }, abortController.signal)
      .then(setFormData)
      .catch(setEditError);
    return () => abortController.abort();
  }

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
    async function edit() {
      try {
        await updateReservation({ data: formData }, abortController.signal);
        history.push(`/dashboard?date=${formData.reservation_date}`);
      } catch (error) {
        setEditError(error);
      }
    }
    edit();
    return () => abortController.abort();
  };

  return (
    <>
      <h1>Edit Reservation</h1>
      <ErrorAlert error={editError} />
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

export default EditReservation;
