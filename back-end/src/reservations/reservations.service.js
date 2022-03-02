const knex = require("../db/connection");


function list(date) {
    return knex("reservations").where({"reservation_date": date}).orderBy("reservation_time");
  }

function create(newReservation) {
    return knex("reservations").insert(newReservation, "*");
}

module.exports = {
    list,
}