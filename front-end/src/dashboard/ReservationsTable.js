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
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reservations.length !== 0 ? (
            reservations.map((reservation, index) => (
              <tr key={index}>
                <th scope="row">{reservation.reservation_id}</th>
                <td>{reservation.reservation_time}</td>
                <td>{reservation.first_name}</td>
                <td>{reservation.last_name}</td>
                <td>{reservation.people}</td>
                <td>{reservation.mobile_number}</td>
                <td>
                  <a
                    className="btn btn-success"
                    href={`/reservations/${reservation.reservation_id}/seat`}
                    role="button"
                  >
                    Seat
                  </a>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No reservations for this date</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
}

export default ReservationsTable;