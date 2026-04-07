const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Url = require("./models/url");
const crypto = require("crypto");
const QRCode = require("qrcode");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/url_shortner")
    .then(() => { console.log("DB Connected"); })
    .catch((err) => { console.log("DB Not Connected:", err); });

// Helper function to generate short code
const generateShortCode = () => {
    return crypto.randomBytes(4).toString("hex");
};

// Helper function to generate QR code
const generateQRCode = async (text) => {
    try {
        const qrCode = await QRCode.toDataURL(text);
        return qrCode;
    } catch (err) {
        console.error("Error generating QR code:", err);
        return null;
    }
};

// Routes

// POST - Create shortened URL
app.post("/shorten", async (req, res) => {
    try {
        const { longUrl } = req.body;

        if (!longUrl) {
            return res.status(400).json({ message: "Long URL is required" });
        }

        // Check if URL already exists
        let url = await Url.findOne({ orignalUrl: longUrl });
        if (url) {
            return res.status(200).json(url);
        }

        // Generate unique short code
        let shortCode;
        let existingUrl;
        do {
            shortCode = generateShortCode();
            existingUrl = await Url.findOne({ shortCode });
        } while (existingUrl);

        // Generate QR code for the short URL
        const shortUrl = `http://localhost:3000/${shortCode}`;
        const qrCode = await generateQRCode(shortUrl);

        // Create new URL document
        url = new Url({
            orignalUrl: longUrl,
            shortCode: shortCode,
            qrCode: qrCode
        });

        await url.save();
        res.status(201).json(url);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error creating short URL" });
    }
});

// GET - Retrieve all URLs
app.get("/urls", async (req, res) => {
    try {
        const urls = await Url.find().sort({ createdAt: -1 });
        res.status(200).json(urls);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching URLs" });
    }
});

// GET - Redirect to original URL
app.get("/:shortCode", async (req, res) => {
    try {
        const { shortCode } = req.params;

        const url = await Url.findOne({ shortCode });
        if (!url) {
            return res.status(404).json({ message: "Short URL not found" });
        }

        // Increment visit count
        url.count += 1;
        await url.save();

        // Redirect to original URL
        res.redirect(url.orignalUrl);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error retrieving URL" });
    }
});

// DELETE - Delete a shortened URL
app.delete("/urls/:urlId", async (req, res) => {
    try {
        const { urlId } = req.params;

        const url = await Url.findByIdAndDelete(urlId);
        if (!url) {
            return res.status(404).json({ message: "URL not found" });
        }

        res.status(200).json({ message: "URL deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error deleting URL" });
    }
});

// POST - Track QR code view
app.post("/qr/track", async (req, res) => {
    try {
        const { shortCode, action } = req.body;

        if (!shortCode || !action) {
            return res.status(400).json({ message: "ShortCode and action are required" });
        }

        const url = await Url.findOne({ shortCode });
        if (!url) {
            return res.status(404).json({ message: "URL not found" });
        }

        // Update counters based on action
        if (action === 'view') url.qrScans += 1;
        else if (action === 'download') url.qrDownloads += 1;
        else if (action === 'copy') url.qrCopies += 1;
        else if (action === 'scan') url.qrScans += 1;

        // Add to history
        url.qrScanHistory.push({
            timestamp: new Date(),
            action: action,
            ipAddress: req.ip,
            userAgent: req.get('User-Agent')
        });

        await url.save();
        res.status(200).json({ message: "QR action tracked successfully", url });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error tracking QR action" });
    }
});

// GET - Get QR analytics for a short URL
app.get("/qr/analytics/:shortCode", async (req, res) => {
    try {
        const { shortCode } = req.params;

        const url = await Url.findOne({ shortCode });
        if (!url) {
            return res.status(404).json({ message: "URL not found" });
        }

        res.status(200).json({
            shortCode,
            qrScans: url.qrScans,
            qrDownloads: url.qrDownloads,
            qrCopies: url.qrCopies,
            totalInteractions: url.qrScans + url.qrDownloads + url.qrCopies,
            recentActivity: url.qrScanHistory.slice(-10).reverse()
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching QR analytics" });
    }
});

// GET - Get QR code for a short URL
app.get("/qr/:shortCode", async (req, res) => {
    try {
        const { shortCode } = req.params;

        const url = await Url.findOne({ shortCode });
        if (!url) {
            return res.status(404).json({ message: "URL not found" });
        }

        // Track QR access
        url.qrScans += 1;
        url.qrScanHistory.push({
            timestamp: new Date(),
            action: 'scan',
            ipAddress: req.ip,
            userAgent: req.get('User-Agent')
        });
        await url.save();

        res.status(200).json({
            shortCode,
            qrCode: url.qrCode,
            shortUrl: `http://localhost:3000/${shortCode}`
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching QR code" });
    }
});

const port = 3000;
app.listen(port, () => {
    console.log("Server running at port: localhost:" + port);
});
