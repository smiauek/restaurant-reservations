import React, { useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import { listReservations } from "../utils/api";
import SearchForm from "./SearchForm";
import ReservationsTable from "../dashboard/ReservationsTable";

function Search() {
  const initialFormState = {
    mobile_number: "",
  };

  const [foundReservations, setFoundReservations] = useState([]);
  const [formData, setFormData] = useState({ ...initialFormState });
  const [foundReservationsError, setFoundReservationsError] = useState(null);
  const [displayResults, setDisplayResults] = useState(false);

  const handleChange = ({ target }) => {
    let value = Number(target.value);

    setFormData({
      ...formData,
      [target.name]: value,
    });
  };

  const handleFind = (event) => {
    event.preventDefault();
    const abortController = new AbortController();
    async function findReservations() {
      try {
        const { mobile_number } = formData;
        const data = await listReservations(
          { mobile_number },
          abortController.signal
        );
        setFoundReservations([...data]);
      } catch (error) {
        setFoundReservationsError(error);
      }
    }
    findReservations();
    setDisplayResults(true);
    return () => abortController.abort();
  };

  return (
    <>
      {displayResults ? (
        <div className="row">
          <h1>Found Resevations</h1>
          <div>
            <button
              type="button"
              className="btn btn-primary ml-3 mt-2"
              onClick={() => {
                setFoundReservations([]);
                setFormData({ ...initialFormState });
                setDisplayResults(false);
              }}
            >
              New Search
            </button>
          </div>
        </div>
      ) : (
        <h1>Search</h1>
      )}
      <ErrorAlert error={foundReservationsError} />
      {displayResults ? (
        <ReservationsTable reservations={foundReservations} />
      ) : (
        <div className="row">
          <div className="col">
            <SearchForm formData={formData} handleChange={handleChange} />
          </div>
          <div className="col">
            <p className="form-label pb-3"></p>
            <button
              form="searchForm"
              type="submit"
              className="btn btn-primary"
              onClick={handleFind}
            >
              Find
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Search;
