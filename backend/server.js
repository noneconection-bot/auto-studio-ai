const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/generate", (req, res) => {
    const topic = req.body.topic;

    res.json({
        title: "🔥 Best Guide on " + topic,
        description: "This video explains " + topic + " in detail.",
        tags: topic + ", tutorial, AI, youtube",
        script: "Intro: Today we talk about " + topic
    });
});

app.listen(3000, () => {
    console.log("Server running");
});
