const express = require("express");
const axios = require("axios");
const cors = require("cors");
const { parseStringPromise } = require("xml2js");

const app = express();
app.use(cors());

const MEDIUM_RSS_URL = "https://medium.com/feed/@ayushhardeniya.profile";

app.get("/medium-feed", async (req, res) => {
    try {
        const response = await axios.get(MEDIUM_RSS_URL);
        const jsonData = await parseStringPromise(response.data);
        res.json(jsonData.rss.channel[0].item);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch Medium RSS feed" });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
