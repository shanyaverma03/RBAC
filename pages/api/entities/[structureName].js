import axios from "axios";

async function handler(req, res) {
  const structureName = req.query.structureName;
  if (req.method === "GET") {
    try {
      const response = await axios.get(
        `http://localhost:8000/${structureName}`
      );
      const entityCountries = response.data;
      res.status(200).json({
        entityCountries,
      });
    } catch (error) {
      res.status(500).json({ message: "Getting structures failed." });
    }
  }
}

export default handler;
