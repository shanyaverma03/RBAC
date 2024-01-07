import axios from "axios";

async function handler(req, res) {
  if (req.method === "GET") {
    try {
      res.status(200).json({
        structures: [
          "Phoenix",
          "Jupiter",
          "Saturn",
          "Pyramid",
          "Nile",
          "Mercury",
          "Ocean",
        ],
      });
    } catch (error) {
      res.status(500).json({ message: "Getting structures failed." });
    }
  }
}

export default handler;
