const express = require("express");
const multer = require("multer");
const sharp = require("sharp");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = 4000;

const uploadFolder = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadFolder)) fs.mkdirSync(uploadFolder);

const upload = multer({ dest: uploadFolder, limits: { fileSize: 40 * 1024 * 1024 } }); // 40MB

app.use(cors());
app.use("/files", express.static(uploadFolder));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/resize", upload.single("image"), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  const sizes = req.body.sizes
    ? req.body.sizes
        .split(",")
        .map((s) => parseInt(s.trim()))
        .filter((s) => !isNaN(s) && s > 0)
    : [500, 800, 1200];

  if (sizes.length === 0) return res.status(400).json({ error: "No valid sizes provided" });

  const outputs = [];

  try {
    for (const size of sizes) {
      const filename = `${uuidv4()}-${size}.webp`;
      const outputPath = path.join(uploadFolder, filename);

      await sharp(req.file.path)
        .resize({ width: size })
        .webp({ quality: 90, effort: 4, lossless: false })
        .toFile(outputPath);

      outputs.push({
        size,
        url: `http://localhost:${PORT}/files/${filename}`,
      });
    }

    await fs.promises.unlink(req.file.path);

    res.json({ images: outputs });
  } catch (err) {
    console.error("Resize error:", err);
    res.status(500).json({ error: "Failed to process image", details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
