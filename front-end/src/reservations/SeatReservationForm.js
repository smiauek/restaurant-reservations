import React from "react";

function SeatReservationForm({ tables, formData, handleChange }) {
  return (
    <>
      <form id="seatReservationForm">
        <div className="form-row">
          <div className="col-3">
            <label className="form-label" htmlFor="table_id">
              Select table for reservation
            </label>
            <select
              id="table_id"
              name="table_id"
              className="custom-select mb-3"
              onChange={handleChange}
              value={formData.table_id}
            >
              <option defaultValue>Open tables</option>
              {tables.map((table, index) =>
                table.reservation_id === null ? (
                  <option key={index} value={table.table_id}>
                    {table.table_name} - {table.capacity}
                  </option>
                ) : (
                  <></>
                )
              )}
            </select>
          </div>
        </div>
      </form>
    </>
  );
}

export default SeatReservationForm;
