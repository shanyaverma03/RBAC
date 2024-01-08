async function handler(req, res) {
  if (req.method === "GET") {
    try {
      res.status(200).json({
        entityRoles: ["No access", "Full access"],
      });
    } catch (error) {
      res.status(500).json({ message: "Getting roles failed." });
    }
  }
}

export default handler;
