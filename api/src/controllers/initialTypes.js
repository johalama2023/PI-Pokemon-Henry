const { Type } = require("../db");
const axios = require("axios");

const initialTypes = async () => {
    const typesApi = await axios.get("https://pokeapi.co/api/v2/type/");
    await Promise.all(
      typesApi.data.results.map(async (type) => {
        await Type.findOrCreate({
          where: {
            name: type.name,
            url: type.url,
          },
        });
      })
    );  
};

module.exports = initialTypes