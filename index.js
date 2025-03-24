const express = require("express");
const cors = require("cors");
const axios = require("axios");
const xml2js = require("xml2js");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // Enable CORS

const MEDIUM_RSS_URL = "https://medium.com/feed/@ayushhardeniya.profile"; 

app.get("/", (req, res) => {
    res.send("Server is running. Use /medium-feed to get blogs.");
});

// Route to fetch Medium RSS Feed
app.get("/medium-feed", async (req, res) => {
    try {
        const response = await axios.get(MEDIUM_RSS_URL);
        const parser = new xml2js.Parser({ explicitArray: false });

        parser.parseString(response.data, (err, result) => {
            if (err) {
                return res.status(500).json({ error: "Error parsing XML" });
            }
            const posts = result.rss.channel.item || [];
            res.json(posts);
        });
    } catch (error) {
        res.status(500).json({ error: "Error fetching Medium feed" });
    }
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
