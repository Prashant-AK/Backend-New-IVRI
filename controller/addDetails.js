const express = require("express");
const Problem = require("../models/problem");
const Species = require("../models/species");
const ProblemDetail = require("../models/problemdetail");
const SaveProblem = require("../models/saveProblem");
const router = express.Router();

router.post("/addproblem", (req, res) => {
  console.log(req.body);
  //   const {problem,problemDetails} ={...req.body};
  const problem1 = new Problem(req.body);

  problem1
    .save()
    .then((result) => {
      res.json({ problem: result });
      console.log(req.user);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/addspecies", (req, res) => {
  const species = req.body.species;
  const id = req.body.id;
  const species1 = new Species({ species, problems: id });

  species1
    .save()
    .then((result) => {
      res.json({ problem: result });
      console.log(id);
      console.log(req.user);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/problemDetail", (req, res) => {
  const problemDetail = req.body;
  const problemDetail1 = new ProblemDetail(problemDetail);

  problemDetail1
    .save()
    .then((result) => {
      res.json({ problem: result });
      console.log(req.user)
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/saveProblem", async (req, res) => {
  const { species, problems, problemdetail } = { ...req.body };
  console.log(species, problems, problemdetail);
  const saveProblem = new SaveProblem({ species, problems, problemdetail });
  // await saveProblem(species, problems, problemdetail)
  saveProblem
    .save()
    .then((result) => {
      res.json({ saveProblem: result });
    })
    .catch((err) => console.log(err));
});

module.exports = router;