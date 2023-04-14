import express from "express";
import cors from "cors";
const port = 8080;
const app = express();

// Using cors with access to client at PORT 3000
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// This route queries for a comprehension level in a given timespan for
// a given class size.
app.get("/comprehension-level", async (req, res) => {
  try {
    const { timespan, sessionId, classSize } = req.query;

    if (!timespan || !classSize || !sessionId) {
      throw new Error(
        "Missing timespan (number), classSize (number), and/or sessionId (number)."
      );
    }

    const compLevel = await getComprehensionLevel(
      Number(timespan),
      Number(sessionId),
      Number(classSize)
    );

    if (compLevel === -1) {
      throw new Error("Inadequate number of responses for reliable analysis.");
    } else {
      res.status(200).json({ comprehensionLevel: compLevel });
    }
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// Listening on PORT 8080
app.listen(port, () => console.log(`Server started on port ${port}`));
