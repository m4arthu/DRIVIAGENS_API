import db from "../database/database.connection.js";

export async function createTravelDB(passengerId, flightId) {
    const query = `/* SQL */
         INSERT INTO travels (passengerId,flightId) VALUES ($1,$2);
        `;
    await db.query(query, [passengerId, flightId]);
    return null;
}

export async function findTravelsDB() {
        return db.query(`
        SELECT CONCAT(firstname,' ', lastname) as passenger,
        COUNT(travels.passengerid) as travels
        FROM passengers
        LEFT JOIN travels ON passengers.id = travels.passengerid
        GROUP BY passengers.id
        ORDER BY TRAVELS DESC
       `)   
}

export async function validTravelRequestDB(passengerId, flightId) {
    const query = `/* SQL */
         SELECT CASE
            WHEN EXISTS (
                SELECT *
                FROM passengers
                WHERE id = $1
            ) AND EXISTS (
                SELECT *
                FROM flights
                WHERE id = $2
            )
            THEN 'true'
            ELSE 'false'
        END;
        `;
    const isValid = await db.query(query, [passengerId, flightId]);
    return isValid.rows[0].case == "false" ? false : true;
}