import React from "react";

function ReservationsTable({ reservations }) {
  return (
    <>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Time</th>
            <th scope="col">First</th>
            <th scope="col">Last</th>
            <th scope="col">People</th>
            <th scope="col">Mobile</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation, index) => (
            <tr key={index} >
              <th scope="row">{reservation.reservation_id}</th>
              <td>{reservation.reservation_time}</td>
              <td>{reservation.first_name}</td>
              <td>{reservation.last_name}</td>
              <td>{reservation.people}</td>
              <td>{reservation.mobile_number}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default ReservationsTable;
