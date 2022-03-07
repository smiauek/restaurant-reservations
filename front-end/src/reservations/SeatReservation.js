import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { listTables, updateTable } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import SeatReservationForm from "./SeatReservationForm";

function SeatReservation() {
  let { reservation_id } = useParams();

  const history = useHistory();

  const initialFormState = {
    table_id: "",
    reservation_id,
  };

  const [formData, setFormData] = useState({ ...initialFormState });
  const [tables, setTables] = useState([]);
  const [tablesError, setTablesError] = useState(null);

  useEffect(loadTables, []);

  function loadTables() {
    const abortController = new AbortController();
    setTablesError(null);
    listTables(abortController.signal).then(setTables).catch(setTablesError);
    return () => abortController.abort();
  }

  const handleChange = ({ target }) => {
    let value = target.value;

    setFormData({
      ...formData,
      [target.name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    async function seatReservationAtTable() {
      try {
        await updateTable({ data: formData }, abortController.signal);
        history.push(`/dashboard`);
      } catch (error) {
        setTablesError(error);
      }
    }
    seatReservationAtTable();
    return () => abortController.abort();
  };

  return (
    <>
      <h1>Seat Reservation {reservation_id}</h1>
      <ErrorAlert error={tablesError} />
      <SeatReservationForm
        tables={tables}
        formData={formData}
        handleChange={handleChange}
      />
      <button
        form="seatReservationForm"
        type="submit"
        className="btn btn-primary"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </>
  );
}

export default SeatReservation;
