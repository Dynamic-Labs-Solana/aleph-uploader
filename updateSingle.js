import { solana } from 'aleph-sdk-ts/accounts/index.js';
import { aggregate } from 'aleph-sdk-ts';
import { ItemType } from "aleph-sdk-ts/messages/message.js"

import keypair from '/Users/rubenschaller/OceanGuardians/Key/alephKP.json' assert {type: 'json'};
const account = solana.ImportAccountFromPrivateKey(Uint8Array.from(keypair));

const run = async() => {
    const key = "OceanGuardianOfficial1209";
              
    const dynamicAttributes = await aggregate.Get({
        address: account.address,
        keys: [key],
    });  

    console.log(dynamicAttributes[key]);

    dynamicAttributes[key].Wave = "Large";

    console.log(dynamicAttributes[key]);

    const res = aggregate.Publish({
        account: account,
        key,
        content: dynamicAttributes[key],
        channel: "OceanGuardiansNFT",
        storageEngine: ItemType.storage,
        inlineRequested: true,
        APIServer: "https://api2.aleph.im",
    });

    console.log(res);
}

await run();
