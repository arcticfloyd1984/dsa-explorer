const Web3 = require('web3');
const providerUrl = 'https://mainnet.infura.io/v3/8d6142b291c84deba374beb2bf83834f';
const web3 = new Web3(new Web3.providers.HttpProvider(providerUrl));

const axios = require('axios');

const address = '0x1680935F9897eBD25940D2E92eF32fE5eF8Bdd31';
const apiKey = '3HF1NNI1K18H4KPEIVFQTJ6VBB9KGCPTN5'

async function getEtherScanData() {
    let response = await axios.get(`http://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&sort=asc&apikey=${apiKey}`);
    const txResponse = response.data.result[0];
    const txHash = txResponse.hash;
    const nonce = txResponse.nonce;
    const from = txResponse.from;
    const to = txResponse.to;
    const txResult = {
    	txHash: txHash,
    	nonce: nonce,
    	from: from,
    	to: to
    }
    console.log(txResult);
}

getEtherScanData();



// Response:
// {
//   blockNumber: '10334047',
//   timeStamp: '1593076401',
//   hash: '0x1c69bd3583014fe59bf14e84d4af3d9e5c76d0cb7763628c50c0002a323cfbef',
//   nonce: '100',
//   blockHash: '0xfcbb02d9733b9689ea4b28c61def491182ad0f3d01ed2c884cb8f1426a25ff17',
//   transactionIndex: '61',
//   from: '0xb95acf2273d0713f4a97e0b613458d26b3cfb2ed',
//   to: '0x1680935f9897ebd25940d2e92ef32fe5ef8bdd31',
//   value: '300000000000000000',
//   gas: '21000',
//   gasPrice: '34100000233',
//   isError: '0',
//   txreceipt_status: '1',
//   input: '0x',
//   contractAddress: '',
//   cumulativeGasUsed: '2527906',
//   gasUsed: '21000',
//   confirmations: '180012'
// }
