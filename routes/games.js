const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/home", async (req, res) => {
  try {
    const { date, page, page_size, search, platforms, genres, search_precise } =
      req.query;
    console.log(search);
    let filters = "";
    if (search) {
      filters += "&search=" + new RegExp(search, "i");
    }
    if (genres) {
      filters += "&genres=" + genres;
    }
    if (search_precise) {
      filters += "&search_precise=" + true;
    }
    if (platforms) {
      filters += "&platforms=" + platforms;
    }
    if (date) {
      filters += "&date=" + date;
    }
    if (page) {
      filters += "&page=" + page;
    }
    if (page_size) {
      filters += "&page_size=" + page_size;
    }

    console.log(filters);
    const response = await axios.get(
      `https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}${filters}`
    );
    response.data.searchFor = search;
    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/infos_list", async (req, res) => {
  try {
    const platformsList = await axios.get(
      `https://api.rawg.io/api/platforms?key=${process.env.RAWG_API_KEY}`
    );
    const genresList = await axios.get(
      `https://api.rawg.io/api/genres?key=${process.env.RAWG_API_KEY}`
    );

    const data = {
      platforms: platformsList.data.results,
      genres: genresList.data.results,
    };
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
module.exports = router;
