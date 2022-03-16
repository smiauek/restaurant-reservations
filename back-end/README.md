# Restaurant Reservation System Backend

API built following RESTful design principles with PostgreSQL database for Restaurant Reservation System.  
  
Deployed API can be found [here](https://res-res-backend.herokuapp.com/)  

## Tech:
This API is utilizing:
- Node.js
- Express.js
- Knex.js  
- PostgreSQL database
  
## Supported Routes:
- `GET /reservations`  
This route will respond with a list of reservations for tadays date that have status "booked" or "seated".  
- `POST /reservations`  
This route will create new reservation.  
- `GET /reservations/:reservation_id`  
This route will respond with the reservation where `reservation_id === :reservation_id` or return `404` if no matching reservation is found.  
- `PUT /reservations/:reservation_id`  
This route will update the reservation where `reservation_id === :reservation_id` or return `404` if no matching reservation is found.  
- `PUT /reservations/:reservation_id/status`  
This route will update status of the reservation where `reservation_id === :reservation_id` or return `404` if no matching reservation is found.  
- `GET /tables`  
This route will respond with a list of all tables.  
- `POST /tables`  
This route will create new table.  
- `PUT /tables/:table_id/seat`  
This route will assign reservation to a table where `table_id === :table_id` and change status of the reservation to "seated".  
- `DELETE /tables/:table_id/seat`  
This route will remove reservation from a table where `table_id === :table_id` and change status of the reservation to "finished".
  
  
