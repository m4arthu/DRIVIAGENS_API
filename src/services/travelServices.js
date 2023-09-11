import { createTravelDB, findTravelsDB, validTravelRequestDB } from "../repository/travels.repository.js";

async function getTravels(name) {
    let travels 
    if (name) {
        travels = await findTravelsDB(name) 
    } else {
        travels =  await findTravelsDB()
    }
    if (travels.length > 10) {
        throw { type: "TooManyResults", message: "Too many results" }
    }

    return travels.rows
}

async function registerTravel(passengerId, flightId) {
    const isValidTravel = await validTravelRequestDB(passengerId, flightId);
    if (!isValidTravel) throw { type: "NotFoundError", message: `This travel cant happen!` };
    const travel = await createTravelDB(passengerId, flightId);
    return travel;
}

const TravelService = { registerTravel, getTravels }

export default TravelService;