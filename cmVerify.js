import fs from "fs"
import path from "path";
import json from "big-json";
import axios from "axios"; 
import _ from "lodash";

const readStream = fs.createReadStream('./devnet-devnet.json');
const parseStream = json.createParseStream();

const nfts = [];

parseStream.on('data', function(nft) {
    for (let index = 0; index < 2222; index++) {
        nfts.push(nft.items[index].link)
    }
});

async function run() {
    console.log(nfts);
    await Promise.all(
        _.map(nfts, async (link) => {
            const metadata = (await axios.get(link)).data;
            if (!metadata.animation_url.includes("https://arweave.net/")) {
                console.log(link);
                
            }
            // console.log(metadata.animation_url);
        })
    )
}

setTimeout(() => {
    run();
}, 1000)



readStream.pipe(parseStream);
