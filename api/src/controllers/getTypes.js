const { Type } = require("../db");
const axios = require("axios");

const getTypes = async (req, res) => {
  try {
    const types = await Type.findAll();
    // if (types.length === 0) {
    //   const typesApi = await axios.get("https://pokeapi.co/api/v2/type/");
    //   await Promise.all(
    //     typesApi.data.results.map(async (type) => {
    //       await Type.findOrCreate({
    //         where: {
    //           name: type.name,
    //           url: type.url,
    //         },
    //       });
    //     })
    //   );
    //   const updatedTypes = await Type.findAll();
    //   res.json(updatedTypes);
    // } else {
      res.json(types);
  } catch (error) {
    res.status(404).json({ message: "Types not found" });
  }
};

module.exports = getTypes;
