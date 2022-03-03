import React from "react";

function ReservationsTable({ reservations }) {
  return (
    <>
      <table class="table">
        <thead class="thead-light">
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
          {reservations.map((reservation) => (
            <tr>
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
