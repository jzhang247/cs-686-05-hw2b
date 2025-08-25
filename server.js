const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, "formData.json");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));




app.post("/api/send-form", (req, res) => {
    let data = [];
    if (fs.existsSync(DATA_FILE)) {
        const fileContent = fs.readFileSync(DATA_FILE, "utf-8");
        try {
            data = JSON.parse(fileContent);
        } catch (err) {
            data = [];
        }
    }

    // Append new entry
    data.push(req.body);

    // Save back to file
    fs.writeFileSync(DATA_FILE, JSON.stringify(data), "utf-8");

    res.json({ success: true, message: "Form submitted successfully" });
});

app.get(/.*/, (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
