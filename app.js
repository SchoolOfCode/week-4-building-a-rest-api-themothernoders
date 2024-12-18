import express from "express";
const app = express();
const PORT = 3000;

import {
  getQuotes,
  getQuoteByID,
  addQuote,
  editQuote,
  deleteQuote,
} from "./quote.js";

app.use(express.json());

app.get("/", function (req, res) {
  res.send("Welcome to the inspirational quotes API");
});

app.get("/quotes", async function (req, res) {
  const quotes = await getQuotes();
  res.json(quotes);
});

app.get("/quotes/:id", async function (req, res) {
  const id = req.params.id;
  const quote = await getQuoteByID(id);
  res.json(quote);
});

app.post("/quotes", async function (req, res) {
  const quoteText = req.body.quoteText;
  const author = req.body.author;
  // const { quoteText, author } = req.body;
  const quote = await addQuote(quoteText, author);
  res.json(quote);
});

app.patch("/quotes/:id", async function (req, res) {
  const id = req.params.id;
  const quoteText = req.body.quoteText;
  const quote = await editQuote(id, quoteText);
  res.json(quote);
});

app.delete("/quotes/:id", async function (req, res) {
  const id = req.params.id;
  const quote = await deleteQuote(id);
  res.json(quote);
});

app.listen(PORT, function () {
  console.log(`Server is now listening on http://localhost:${PORT}`);
});
