const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

router.get("/:category", async (req, res) => {
  try {
    const category = req.params.category;
    const limit = parseInt(req.query.limit);
    const page = parseInt(req.query.page);

    const dataFromServer = await fetch(
      `https://pixabay.com/api/?key=25540812-faf2b76d586c1787d2dd02736&q=${category}`
    );

    const imgs = await dataFromServer.json();
    // start index page - in url check the page and * limit query
    const startIndex = (page - 1) * limit;
    // last index
    const lastIndex = page * limit;

    const imgsResults = {};
    // adding property totalImgs to see array length (number of imgs)
    imgsResults.totalImgs = imgs.hits.length;
    // check how much pages by take all imgs / limit in URL
    imgsResults.countPage = Math.ceil(imgs.hits.length / limit);

    if (lastIndex < imgs.hits.length) {
      // check if there is more pages if yes , you can get the next one
      imgsResults.nextPage = {
        page: page + 1,
      };
    }

    if (startIndex > 0) {
      // check if there is prev page , if yes you can go back page
      imgsResults.prevPage = {
        page: page - 1,
      };
    }

    // get the imgs from the page that in url by the page
    imgsResults.ourResults = imgs.hits.slice(startIndex, lastIndex);

    res.status(200).json(imgsResults);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get("/byid/:category", async (req, res) => {
  try {
    const category = req.params.category;
    const limit = parseInt(req.query.limit);
    const page = parseInt(req.query.page);

    const dataFromServer = await fetch(
      `https://pixabay.com/api/?key=25540812-faf2b76d586c1787d2dd02736&q=${category}`
    );

    const imgs = await dataFromServer.json();
    const startIndex = (page - 1) * limit;
    const lastIndex = page * limit;

    const imgsResults = {};
    imgsResults.totalImgs = imgs.hits.length;
    imgsResults.countPage = Math.ceil(imgs.hits.length / limit);

    if (lastIndex < imgs.hits.length) {
      imgsResults.nextPage = {
        page: page + 1,
      };
    }

    if (startIndex > 0) {
      imgsResults.prevPage = {
        page: page - 1,
      };
    }

    // sort by id number from the lowest to highest
    imgsResults.ourResults = imgs.hits
      .slice(startIndex, lastIndex)
      .sort((a, b) => a.id - b.id);

    res.status(200).json(imgsResults);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get("/bydate/:category", async (req, res) => {
  try {
    const category = req.params.category;
    const limit = parseInt(req.query.limit);
    const page = parseInt(req.query.page);

    const dataFromServer = await fetch(
      `https://pixabay.com/api/?key=25540812-faf2b76d586c1787d2dd02736&q=${category}`
    );

    const imgs = await dataFromServer.json();
    const startIndex = (page - 1) * limit;
    const lastIndex = page * limit;

    const imgsResults = {};
    imgsResults.totalImgs = imgs.hits.length;
    imgsResults.countPage = Math.ceil(imgs.hits.length / limit);

    if (lastIndex < imgs.hits.length) {
      imgsResults.nextPage = {
        page: page + 1,
      };
    }

    if (startIndex > 0) {
      imgsResults.prevPage = {
        page: page - 1,
      };
    }

    // sory by date of the images
    imgsResults.ourResults = imgs.hits
      .slice(startIndex, lastIndex)
      .sort((a, b) => {
        const aDate = new Date(a.previewURL.slice(30, 40)).getTime();
        const bDate = new Date(b.previewURL.slice(30, 40)).getTime();
        return aDate - bDate;
      });

    res.status(200).json(imgsResults);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
