import axios from "axios";

async function handler(req, res) {
  if (req.method === "GET") {
    try {
      res.status(200).json({
        users: [
          {
            user: "Ben Stockton",
            email: "ben@dealsplus.io",
            organisation: "Dealsplus",
          },
          {
            user: "Sai Padala",
            email: "sai@dealsplus.io",
            organisation: "Dealsplus",
          },
          {
            user: "Matt Wallis",
            email: "matt@dealsplus.io",
            organisation: "Phoneix",
          },
          {
            user: "Dummy User",
            email: "dummy@dealsplus.io",
            organisation: "Phoneix",
          },
        ],
      });
    } catch (error) {
      res.status(500).json({ message: "Getting users failed." });
    }
  }
}

export default handler;
