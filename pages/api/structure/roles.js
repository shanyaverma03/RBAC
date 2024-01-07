import axios from "axios";

async function handler(req, res) {
  if (req.method === "GET") {
    try {
      res.status(200).json({
        structureRoles: ["Full access", "No access", "Basic access"],
      });
    } catch (error) {
      res.status(500).json({ message: "Getting roles failed." });
    }
  }
}

export default handler;
