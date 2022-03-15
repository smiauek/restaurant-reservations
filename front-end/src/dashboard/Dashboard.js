import React, { useEffect, useState } from "react";
import {
  listReservations,
  listTables,
  finishReservation,
  cancelReservation,
} from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ReservationsTable from "./ReservationsTable";
import ButtonGroup from "./ButtonGroup";
import TablesTable from "./TablesTable";

function Dashboard({ date }) {
  const [reservations, setReservations] = useState([]);
  const [tables, setTables] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);
  const [tablesError, setTablesError] = useState(null);

  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);
    setTablesError(null);
    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    listTables(abortController.signal).then(setTables).catch(setTablesError);
    return () => abortController.abort();
  }

  const handleFinish = (table_id) => {
    const abortController = new AbortController();
    async function freeTable() {
      try {
        await finishReservation(table_id, abortController.signal);
      } catch (error) {
        setTablesError(error);
      }
    }
    freeTable().then(loadDashboard);
    return () => abortController.abort();
  };

  const handleCancel = (reservation_id) => {
    const abortController = new AbortController();
    async function cancel() {
      try {
        await cancelReservation(reservation_id, abortController.signal);
      } catch (error) {
        setReservationsError(error);
      }
    }
    cancel().then(loadDashboard);
    return () => abortController.abort();
  };

  return (
    <main>
      <h1>Dashboard</h1>
      <ErrorAlert error={reservationsError} />
      <ErrorAlert error={tablesError} />

      <div className="row">
        <div className="col-lg-8">
          <div className=" mb-3">
            <h4 className="mb-0">Reservations for {date}</h4>
          </div>
          <ButtonGroup date={date} />
          <ReservationsTable
            reservations={reservations}
            handleCancel={handleCancel}
          />
        </div>
        <div className="col-lg-4">
          <div className=" mb-3">
            <h4 className="mb-0">Tables</h4>
          </div>
          <TablesTable tables={tables} handleFinish={handleFinish} />
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
