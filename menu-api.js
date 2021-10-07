const express = require("express");
const app = express();
const { menu } = require("./menu");

app
  .get("/", (req, res) => {
    const breakfast = menu.filter((item) => {
      return item.category === "breakfast";
    });
    const lunch = menu.filter((item) => {
      return item.category === "lunch";
    });
    const shakes = menu.filter((item) => {
      return item.category === "shakes";
    });
    // let catSet = new Set(menu.map(item => item.category));
    // console.log([catSet])
    res.json({
      result: { breakfast: breakfast, lunch: lunch, shakes: shakes },
      message: "found",
    });
  })

  .get("/:id", (req, res) => {
    const { id } = req.params;
    const singleItem = menu.find((item) => {
      return item.id === Number(id);
    });
    if (!singleItem) {
      return res.json({ results: [], message: "menu item not found" });
    }
    res.json({ results: [singleItem], message: "found" });
  })

  .get("/api/v1/query", (req, res) => {
    const { search } = req.query;
    //... creates a new nonmutable copy
    //everything in js is  a reference, if we just say elt sortedProducts = products, it wouldnt creaate a copy, it would just make all references point to the original references.
    let sortedMenu = [...menu];
    if (search) {
      sortedMenu = sortedMenu.filter((item) => {
        return item.category.includes(search);
      });
    }
    if (sortedMenu.length < 1) {
      return res.json({ results: [], message: "product not found" });
    }
    res.json({ results: [sortedMenu], message: "found" });
  })

  .get('/api/input', (req, res) => {
    const {input} = req.query;
    console.log(input);

    let menuSort = [...menu];
    if(input === 'ascending' ){
      menuSort.sort((a, b) => a.price - b.price);
      return res.json({results: [menuSort], method: 'found'});
    }
    if(input === 'descending') {
      menuSort.sort((a, b) => b.price - a.price);
      return res.json({results: [menuSort], method: 'found'});
    }
    else{
      res.json({results: [], method: 'unknown request'})
    }
  })

  .listen(3000, () => {
    console.log("server is listening at port 3000");
  });
