import React from "react";

function ReservationsTable({ tables }) {
  return (
    <>
      <table className="table">
        <thead className="thead-light">
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Capacity</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {tables.map((table, index) => (
            <tr key={index}>
              <th scope="row">{table.table_id}</th>
              <td>{table.table_name}</td>
              <td>{table.capacity}</td>
              <td>{table.reservation_id === null ? "Free" : "Occupied"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default ReservationsTable;
