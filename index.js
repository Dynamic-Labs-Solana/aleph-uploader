import { solana } from 'aleph-sdk-ts/accounts/index.js';
import { aggregate } from 'aleph-sdk-ts';
import { ItemType } from "aleph-sdk-ts/messages/message.js"
import _ from 'lodash';

import fs from "fs"
import path from "path";
import json from "big-json"; 

const readStream = fs.createReadStream('./dynamicAttributes.json');
const parseStream = json.createParseStream();

import keypair from '/Users/rubenschaller/OceanGuardians/Key/alephKP.json' assert {type: 'json'};
const account = solana.ImportAccountFromPrivateKey(Uint8Array.from(keypair));
 
parseStream.on('data', function(nft) {
    // 100 is possible at a time
    for (let index = 2100; index < 2222; index++) {
        const key = nft[index].name.replace(' #', 'Official');
              
        const dynamicAttributes = nft[index].dynamic_attributes;  

        const dynamicLayers = {};

        dynamicAttributes.forEach(a => {
            const traitType = a.trait_type;
            dynamicLayers[traitType] = a.value;             
        });
    
        const res = aggregate.Publish({
            account: account,
            key,
            content: dynamicLayers,
            channel: "OceanGuardiansNFT",
            storageEngine: ItemType.storage,
            inlineRequested: true,
            APIServer: "https://api2.aleph.im",
        });
    }
});
 
readStream.pipe(parseStream);
