# eth-oxford
Repo for ETH oxford

## Tech Stack 
Smart contract written in solidity and front end written in Reactjs, using ethers.js for interacting with the on-chain contract

## How to run 
- Clone the repo 
```bash
cd client
```
- Replace the ETHERSCAN_API_KEY in constants.js with your own API key (this is sued to fetch gas price, not necessarily needed for normal working of the app, might see some errors if not provided. The existing one in the project will deleted)
- cd into client (to bring the front end up on lcoalhost)
- run the following command
```bash
npm i 
```
 and then 

 ```bash
 npm run dev
 ```

- You should see front end come up on  http://localhost:5173/ (unless otherwise specificed)
- Intereact with the app, and have fun!

## Smart contracts
The public repo for smart contracts are here:
https://github.com/0xKubko/eth-oxford

## Images from the app Front-end
Landing Page
![Landing Page](./client/public/landingPage.png)

Staking Page
![Staking Page](./client/public/stakerPage.png)

## Quick-Demo 
[Watch the Video](./client/public/recording2.mp4)

## Debug Tips 
- Run 'npm outdated' to check for outdated dependencies, and update them with 'npm update'.
- Ensure ETHERSCAN API key is repalaced (not necessarily needed, absence might result in basic errors and empty transaction cost on staker page)
- Use React DevTools or other browser developer tools to examine the component hierarchy and inspect component state.
- Search for similar issues on the project's GitHub repository or relevant online forums.

