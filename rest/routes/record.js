var express = require("express");
var router = express.Router();
var imblock = require("../services/imblock");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.get("/list", async (req, res) => {
  try {
    var result = await imblock.getAllAssets();
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

router.get("/get", async (req, res, next) => {
  try {
    var result = await imblock.readAsset(req.query.record_id);
    res.send(result);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
});

router.post("/register", async (req, res, next) => {
  try {
    var record = {
      ownerName: `${req.body.owner_name}`,
      email: `${req.body.email}`,
      noShm: `${req.body.no_shm}`,
      provinsi: `${req.body.provinsi}`,
      kabupaten: `${req.body.kabupaten}`,
      kelurahan: `${req.body.kelurahan}`,
      penerbitan: `${req.body.penerbitan}`,
      luas: `${req.body.luas}`,
      certFilename: `${req.body.cert_filename}`,
      certCid: `${req.body.cert_cid}`,
    };

    console.log(record);

    await imblock.createAsset(record);
    res.status(200);
    res.send("OK");
  } catch (error) {
    res.status(400);
    res.send(error);
  }
});

router.post("/delete", async (req, res) => {
  try {
    await imblock.deleteAsset(req.body.record_id);
    res.status(200);
    res.send("OK");
  } catch (error) {
    res.status(400);
    res.send(error);
  }
});

router.get("/exist", async (req, res) => {
  try {
    result = await imblock.isExist(req.query.record_id);
    console.log(`${result}`);
    res.send(result);
  } catch (error) {
    res.send(error);
  }
});

router.post("/update", async (req, res, next) => {
  try {
    var record = {
      recordId: `${req.body.record_id}`,
      ownerName: `${req.body.owner_name}`,
      email: `${req.body.email}`,
      noShm: `${req.body.no_shm}`,
      provinsi: `${req.body.provinsi}`,
      kabupaten: `${req.body.kabupaten}`,
      kelurahan: `${req.body.kelurahan}`,
      penerbitan: `${req.body.penerbitan}`,
      luas: `${req.body.luas}`,
      certFilename: `${req.body.cert_filename}`,
      certCid: `${req.body.cert_cid}`,
    };

    console.log(record);

    await imblock.updateAsset(record);
    res.status(200);
    res.send("OK");
  } catch (error) {
    res.status(400);
    res.send(error);
  }
});

router.get("/search", async (req, res) => {
  try {
    var mode = req.query.mode;
    var result;

    switch (mode) {
      case "email":
        console.log("email mode");
        result = await imblock.readAssetByEmail(req.query.query);
        break;
      case "noshm":
        result = await imblock.readAssetByNoShm(req.query.query);
        break;
      case "owner":
        result = await imblock.readAssetByOwner(req.query.query);
        break;
      default:
        result = await imblock.readAssetByEmail(req.query.query);
        break;
    }
    res.send(result);
  } catch (error) {
    res.status(400);
    res.send(error);
  }
});

module.exports = router;
