import React from "react";

function SearchForm({ formData, handleChange }) {
  return (
    <>
      <form id="searchForm">
        <div className="form-row">
          <div className="col">
            <label className="form-label" htmlFor="mobile_number">
              Mobile Number
            </label>
            <input
              id="mobile_number"
              name="mobile_number"
              type="tel"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              className="form-control"
              placeholder="Enter a customer's phone number"
              required
              onChange={handleChange}
              value={formData.mobile_number}
            />
          </div>
        </div>
      </form>
    </>
  );
}

export default SearchForm;
