const express = require("express");
const request = require("request");
const cheerio = require("cheerio");
const download = require("node-image-downloader");
const { response } = require("express");

const app = express();

app.get("/download", (req, res) => {
    var url = `https://wall.alphacoders.com/by_collection.php?id=654`;

    request(url, (error, response, html) => {
        if (!error) {
            var $ = cheerio.load(html)

            $("img.img-responsive").each((index, image) => {
                  var imgsrc = $(image).attr("src") 

                  download({
                    imgs: [
                      {
                        uri: imgsrc,
                      },
                    ],
                    dest: "./images",
                } )
                .then((info) => {
                    console.log("Success");
                    return res.json({
                        message: "Download image successfully!"
                    })
                })
            })
             
    }
})
});

