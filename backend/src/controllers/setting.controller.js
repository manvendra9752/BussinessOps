const Setting = require("../models/setting.model");

exports.getSettings = async (req, res) => {
  let settings = await Setting.findOne();

  if (!settings) {
    settings = await Setting.create({});
  }

  res.json({
    success: true,
    data: settings,
  });
};

exports.updateSettings = async (req, res) => {
  let settings = await Setting.findOne();

  if (!settings) {
    settings = await Setting.create({});
  }

  settings = await Setting.findByIdAndUpdate(settings._id, req.body, {
    new: true,
  });

  res.json({
    success: true,
    data: settings,
  });
};
