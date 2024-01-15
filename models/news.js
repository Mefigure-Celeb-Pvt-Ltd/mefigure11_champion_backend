const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema(
  {
    newsId: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase: true,
      },

    title: {
      type: String,
      trim: true,
      required: true,
    },

    details: {
      type: String,
      required: true,
    },

    date: {
      type: Date,
      required: true,
      default:""
    },

    image: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const News = mongoose.model("News", newsSchema);
module.exports = News;
