const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

app.post("/authenticate", async (req, res) => {
  const { username } = req.body;

  try {
    const r = await axios.put(
      "https://api.chatengine.io/users/",
      { username: username, secret: username, first_name: username },
      { headers: { "private-key": "827493ed-f0a9-4475-bc73-4e64eaace8c9" } }
    );
    return res.status(r.status).json(r.data);
  } catch (e) {
    if (e.response) {
      // If there is a response object in the error, use it
      return res.status(e.response.status).json(e.response.data);
    } else {
      // If there is no response object, handle the error accordingly
      console.error("Error:", e.message);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
