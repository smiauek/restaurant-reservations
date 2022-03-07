import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import ErrorAlert from "../layout/ErrorAlert";
import TableForm from "./TableForm";
import { createTable } from "../utils/api";

function NewTable() {
  const history = useHistory();

  const initialFormState = {
    table_name: "",
    capacity: "",
  };

  const [formData, setFormData] = useState({ ...initialFormState });
  const [tablesError, setTablesError] = useState(null);

  const handleChange = ({ target }) => {
    let value = target.value;
    if (target.name === "capacity") {
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
    async function addTable() {
      try {
        await createTable({ data: formData }, abortController.signal);
        history.push(`/dashboard`);
      } catch (error) {
        setTablesError(error);
      }
    }
    addTable();
    return () => abortController.abort();
  };

  return (
    <>
      <h1>Create Table</h1>
      <ErrorAlert error={tablesError} />
      <TableForm formData={formData} handleChange={handleChange} />
      <button className="btn btn-secondary mr-2" onClick={history.goBack}>
        Cancel
      </button>
      <button
        form="tableForm"
        type="submit"
        className="btn btn-primary"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </>
  );
}

export default NewTable;
