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
  const date_regex = /\d{4}-\d{2}-\d{2}/g; // /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/
  if (!date_regex.test(reservation_date)) {
    return next({
      status: 400,
      message: "reservation_date must be a valid date",
    });
  }
  if (reservation_date < asDateString(new Date())) {
    return next({
      status: 400,
      message:
        "reservation_date can not be in the past, please pick a future date",
    });
  }
  let tempDate = reservation_date.split("-");

  if (new Date(tempDate[0], tempDate[1] - 1, tempDate[2]).getDay() == 2) {
    return next({
      status: 400,
      message: "We're closed on Tuesdays, please pick a different day",
    });
  }
  next();
}

function timeIsValidTime(req, res, next) {
  const {
    data: { reservation_time },
  } = req.body;
  const time_regex = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/;
  if (!time_regex.test(reservation_time)) {
    return next({
      status: 400,
      message: "reservation_time must be a valid time",
    });
  }
  const open = "10:30";
  const close = "21:30";
  if (reservation_time < open || reservation_time > close) {
    return next({
      status: 400,
      message: "reservation_time must be between 10:30 AM and 9:30 PM",
    });
  }
  const currentTime = `${String(new Date().getHours()).padStart(
    2,
    "0"
  )}:${String(new Date().getMinutes())}`;

  if (reservation_time <= currentTime) {
    return next({
      status: 400,
      message: "reservation_time must be in the future",
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
