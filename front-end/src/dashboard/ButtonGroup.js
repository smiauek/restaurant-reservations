import React from "react";
import { useHistory } from "react-router-dom";

import { previous, next } from "../utils/date-time";

function ButtonGroup({ date }) {
  const history = useHistory();

  return (
    <>
      <div class="btn-group" role="group" aria-label="Basic example">
        <button
          type="button"
          class="btn btn-secondary"
          onClick={() => history.push(`/dashboard?date=${previous(date)}`)}
        >
          Previous
        </button>
        <button
          type="button"
          class="btn btn-secondary"
          onClick={() => history.push("/dashboard")}
        >
          Today
        </button>
        <button
          type="button"
          class="btn btn-secondary"
          onClick={() => history.push(`/dashboard?date=${next(date)}`)}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default ButtonGroup;
