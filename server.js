const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());

app.get("/medium-feed", async (req, res) => {
    try {
        const response = await axios.get(
            "https://api.allorigins.win/get?url=" +
            encodeURIComponent("https://medium.com/feed/@ayushhardeniya.profile")
        );

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch Medium RSS feed" });
    }
});

// Set up the default route
app.get("/", (req, res) => {
    res.send("Medium Blog Backend is Running!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
