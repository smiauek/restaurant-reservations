import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { listTables } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import SeatReservationForm from "./SeatReservationForm";

function SeatReservation() {
  let { reservation_id } = useParams();

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

  return (
    <>
      <h1>Seat Reservation</h1>
      <ErrorAlert error={tablesError} />
      <SeatReservationForm
        tables={tables}
        formData={formData}
        handleChange={handleChange}
      />
    </>
  );
}

export default SeatReservation;
