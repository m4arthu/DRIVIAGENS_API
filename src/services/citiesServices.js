import { cityExistsDB, createCityDB } from "../repository/cities.repository.js";

async function createCity(name){
    const hasAlreadyACityNamed = await cityExistsDB(name);
    if (hasAlreadyACityNamed.length > 0) throw { type: "ConflictError", message: `There is alread a city named ${name}.` };
    await createCityDB(name);

}

const CityService = {createCity}

export default CityService;