/**
 * List handler for reservation resources
 */
const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundry");

function bodyDataHas(propertyName) {
  return function (req, res, next) {
    const { data = {} } = req.body;
    if (data[propertyName]) {
      return next();
    }
    next({
      status: 400,
      message: `Reservation must include a ${propertyName}`,
    });
  };
}

function peopleIsValidNumber(req, res, next) {
  const {
    data: { people },
  } = req.body;
  if (people <= 0 || !Number.isInteger(people)) {
    return next({
      status: 400,
      message: "people must be an integer greater than 0",
    });
  }
  next();
}

function dateIsValidDate(req, res, next) {
  const {
    data: { reservation_date },
  } = req.body;
  const date_regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
  if (!date_regex.test(reservation_date)) {
    return next({
      status: 400,
      message: "reservation_date must be a valid date",
    });
  }
  next();
}

function timeIsValidTime(req, res, next) {
  const {
    data: { reservation_time },
  } = req.body;
  const time_regex = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/; // /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
  if (!time_regex.test(reservation_time)) {
    // !reservation_time.match(time_regex)
    return next({
      status: 400,
      message: "reservation_time must be a valid time",
    });
  }
  next();
}

function asDateString(date) {
  return `${date.getFullYear().toString(10)}-${(date.getMonth() + 1)
    .toString(10)
    .padStart(2, "0")}-${date.getDate().toString(10).padStart(2, "0")}`;
}

async function list(req, res) {
  let { date } = req.query;

  if (!date) {
    date = asDateString(new Date());
  }

  const data = await service.list(date);
  return res.json({ data });
}

async function create(req, res, next) {
  const {
    data: {
      first_name,
      last_name,
      mobile_number,
      reservation_date,
      reservation_time,
      people,
    } = {},
  } = req.body;

  const newReservation = {
    first_name,
    last_name,
    mobile_number,
    reservation_date,
    reservation_time,
    people,
  };

  const data = await service.create(newReservation);

  res.status(201).json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    bodyDataHas("first_name"),
    bodyDataHas("last_name"),
    bodyDataHas("mobile_number"),
    bodyDataHas("reservation_date"),
    bodyDataHas("reservation_time"),
    bodyDataHas("people"),
    peopleIsValidNumber,
    timeIsValidTime,
    dateIsValidDate,
    asyncErrorBoundary(create),
  ],
};
