const rp = require("request-promise");
const cheerio = require("cheerio");
const fs = require("fs");
const download = require("node-image-downloader");


const URL = `https://wall.alphacoders.com/by_collection.php?id=654`;

const options = {
    uri: URL,
    transform: function (body) {
        return cheerio.load(body);
    },
};

(async function crawler() {
    try {
        var $ = await rp(options);
    } catch (error) {
        return error;
    }

    $("img.img-responsive").each((index, image) => {
          var imgsrc = $(image).attr("src") 
          
            download({
                imgs: [
                {
                    uri: imgsrc,
                },
                ],
                dest: "./images",
            })
            .then((info) => {
                console.log("Success");
            })
    });


})();

