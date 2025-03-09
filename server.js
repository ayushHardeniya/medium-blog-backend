const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { XMLParser } = require("fast-xml-parser");

const app = express();
app.use(cors()); // Enable CORS

const MEDIUM_FEED_URL = "https://medium.com/feed/@ayushhardeniya.profile"; // Replace with your Medium profile RSS feed

app.get("/medium-feed", async (req, res) => {
    try {
        const response = await axios.get(MEDIUM_FEED_URL, { headers: { "Accept": "application/rss+xml" } });
        const parser = new XMLParser();
        const json = parser.parse(response.data);

        const posts = json.rss.channel.item.map(item => ({
            title: item.title,
            description: item.description,
            link: item.link
        }));

        res.json(posts);
    } catch (error) {
        console.error("Error fetching Medium feed:", error);
        res.status(500).json({ error: "Failed to fetch Medium blog feed" });
    }
});

// Start server (for local testing, Vercel will handle deployment)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

module.exports = app; // Required for Vercel
