const Web3 = require('web3')
const HDWalletProvider = require('truffle-hdwallet-provider');

async function handleClick() {  
  var mnemonic = "repeat cargo weapon age wrestle chaos keep panic gallery wrestle alert elephant";
  const provider = new HDWalletProvider(mnemonic, "https://rinkeby.infura.io/v3/7848e86fefda49de8a0dfc59bbea7e11",
  );
  const web3 = new Web3(provider);
  console.log(web3.version);

  let contractABI = window.web3.eth.contract([{"constant":false,"inputs":[{"name":"_vaccineID","type":"uint256"},{"name":"_temperature","type":"int256"},{"name":"_long","type":"int256"},{"name":"_lat","type":"int256"}],"name":"addDetails","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_vaccineID","type":"uint256"},{"indexed":false,"name":"timestamp","type":"uint256"},{"indexed":false,"name":"temperature","type":"int256"},{"indexed":false,"name":"long","type":"int256"},{"indexed":false,"name":"lat","type":"int256"}],"name":"NewDetails","type":"event"}]);
  let contractAddr = '0x8e824e179bddc6d31a519194255b1a0918068850';
  let contractInstance = contractABI.at(contractAddr);
  
  const {NewDetails} = contractInstance;
   NewDetails({}, { fromBlock: 2750778, toBlock: 2750820 })
				.get((error, eventResult) => {
          for(let i=0; i<eventResult.length; i++) {
            let k = [eventResult[i].args._vaccineId.toNumber(), eventResult[i].args.timestamp.toNumber(),eventResult[i].args.temperature.toNumber(),eventResult[i].args.lang.toNumber(),eventResult[i].args.lat.toNumber()];
            console.log(k);
          }
          console.log(JSON.stringify(eventResult));
        })
}
