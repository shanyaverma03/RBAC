import axios from "axios";

async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const response = await axios.get("http://localhost:8000/structures");
      res.status(200).json({ structures: response.data });
    } catch (error) {
      res.status(500).json({ message: "Getting structures failed." });
    }
  }
}

export default handler;
