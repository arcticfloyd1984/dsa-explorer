const Web3 = require('web3');
const axios = require('axios')
const DSA = require('dsa-sdk');
const providerUrl = 'https://mainnet.infura.io/v3/8d6142b291c84deba374beb2bf83834f';
const web3 = new Web3(new Web3.providers.HttpProvider(providerUrl));

const PRIVATE_KEY = process.env.PRIVATE_KEY_1;
const publicAddress = '0xc180F90Ff4bc68E9Af90a5F933eE08dee3d50C99'


const dsa = new DSA({
  web3: web3,
  mode: "node",
  privateKey: PRIVATE_KEY
});


// Main function call to get data
async function mainDataRetrivalFunction(id) {
  let defiAddress;
  dsa.getAuthById(id) // the DSA ID
    .then(data => {
      defiAddress = data[0];
    })
    .catch(error => {
      console.log(error);
    })

   // await getCompoundData(defiAddress); 
   // await getMakerDAOData(defiAddress);
   // await getAaveData(defiAddress);
   // await getOasisData(defiAddress);
   // await getKyberData(defiAddress);
   // await getCurveData(defiAddress);
   // await getDyDxData(defiAddress);
   // await getOnceInchData(defiAddress);
}

// Function to get compound data
async function getCompoundData(address) {
  const compoundTokensPositionData = await dsa.compound.getPosition(address, 'tokens');
  const compoundCTokensPositionData = await dsa.compound.getPosition(address, 'ctokens');
  const compoundAddressesPositionData = await dsa.compound.getPosition(address, 'address');
  const compoundCAddressesPositionData = await dsa.compound.getPosition(address, 'caddress');

  const compoundData = {
    tokenData: compoundTokensPositionData,
    cTokenData: compoundCTokensPositionData,
    addressData: compoundAddressesPositionData,
    cAddressData: compoundCAddressesPositionData
  }
  console.log(compoundData);
}

// Function to get MakerDao data
async function getMakerDAOData(address) {
  const makerDAOVaultsData = await dsa.maker.getVaults(address);
  const makerDAOCollateralData = await dsa.maker.getCollateralInfo();
  const makerDAODaiPositionData = await dsa.maker.getDaiPosition(address);
  const makerDAODaiRate = await dsa.maker.getDaiRate();

  const makerDAOData = {
    vaultsData: makerDAOVaultsData,
    collateralData: makerDAOCollateralData,
    daiPositionData: makerDAODaiPositionData,
    daiRateData: makerDAODaiRate
  }
  console.log(makerDAOData);
}


// Function to get Aave data 
async function getAaveData(address) {
  const aaveTokensPositionData = await dsa.aave.getPosition(address, 'token');
  const aaveAddressPositionData = await dsa.aave.getPosition(address, 'address');
  const aaveCAddressPositionData = await dsa.aave.getPosition(address, 'caddress');

  const aaveData = {
    tokenData: aaveTokensPositionData,
    addressData: aaveAddressPositionData,
    cAddressData: aaveCAddressPositionData
  }
  console.log(aaveData);
}

// Function to get Oasis Data
async function getOasisData(address) {
  let buyToken;
  let sellToken;
  let sellAmt;
  let slippage;
  const oasisBuyAmountData = await dsa.oasis.getBuyAmount(buyToken, sellToken, sellAmt, slippage);
  const oasisSellAmountData = await dsa.oasis.getSellAmount(buyToken, sellToken, buyAmt, slippage);

  const oasisData = {
    buyAmountData: oasisBuyAmountData,
    sellAmountData: oasisSellAmountData
  }
  console.log(oasisData);
}

// Function to get Kyber Data
async function getKyberData(address) {
  let buyToken;
  let sellToken;
  let sellAmt;
  let slippage;
  const kyberBuyAmountData = await dsa.kyber.getBuyAmount(buyToken, sellToken, sellAmt, slippage);

  const kyberData = {
    buyAmountData: kyberBuyAmountData
  }

  console.log(kyberData);

}

// Function to get Curve Data
async function getCurveData(address) {
  let buyToken;
  let sellToken;
  let sellAmt;
  let slippage;
  let amount;
  const curvePositionData = await dsa.curve.getPosition(address);
  const curveBuyAmountData = await dsa.curve.getBuyAmount(buyToken, sellToken, sellAmt, slippage);
  const curveDepositAmountData = await dsa.curve.getDepositAmount(token, amount, slippage);
  const curveWithdrawAmountData = await dsa.curve.getWithdrawAmount(token, amount, slippage);

  const curveData = {
    positionData: curvePositionData,
    buyAmountData: curveBuyAmountData,
    depositAmountData: curveDepositAmountData,
    withdrawAmountData: curveWithdrawAmountData
  }

  console.log(curveData);
}

// Function to get DyDx Data
async function getDyDxData(address) {
  const dydxTokenPositionData = await dsa.dydx.getPosition(address, 'token');
  const dydxAddressPositionData = await dsa.dydx.getPosition(address, 'address');
  const dydxMarketPositionData = await dsa.dydx.getPosition(address, 'market');

  const dydxData = {
    tokenPositionData: dydxTokenPositionData,
    addressPositionData: dydxAddressPositionData,
    marketPositionData: dydxMarketPositionData
  }

  console.log(dydxData);

}

// Function to get OneInch Data
async function getOneInchData(address) {
  const oneInchBuyAmountData = await dsa.oneInch.getBuyAmount(buyToken, sellToken, sellAmt, slippage, distribution, disableDexes);

  const oneInchData = {
    buyAmountData: oneInchBuyAmountData
  }

  console.log(oneInchData);
}




mainDataRetrivalFunction(4);










