### Introduction
This repository contains a simple node js API for LeadIQ Coding challenge.
It includes following endpoints
- Create transactions
- Get transactions based on transaction type
- Get transactions sum based on transaction id

### App setup (Normal)
**Pre-requisites**
- [Node](https://nodejs.org/en/download/)

**Run the app**
- Clone this repo
- Copy the `.env.sample` and rename it to `.env`
- Configure the env variables in `.env` file
- Run the app using `npm run local`

### Running as Docker
**Pre-requisites**
- [Docker](https://www.docker.com/docker-mac)

**Run the app**
- Clone this repo
- Copy the `.env.sample` and rename it to `.env`
- Configure the env variables in `.env` file
- Run the app using following commands
```
$ docker build -t li-node .
$ docker run -it -p 5000:5000 --env-file=.env --name=li_node li-node
```

NOTE: Here I've used PORT variable as 5000

### Example executions for app
```
➜  leadiq-simple-api-nodejs-app git:(master) ✗ curl -X PUT -H 'Content-type: application/json' -d '{"amount": 5000, "type":"cars"}' http://localhost:5000/transactionservice/transaction/10
{"status":200,"message":"Success","result":"ok"}%

➜  leadiq-simple-api-nodejs-app git:(master) ✗ curl -X PUT -H 'Content-type: application/json' -d '{"amount": 10000, "type":"shopping", "parent_id": 10}' http://localhost:5000/transactionservice/transaction/11
{"status":200,"message":"Success","result":"ok"}%

➜  leadiq-simple-api-nodejs-app git:(master) ✗ curl http://localhost:5000/transactionservice/types/cars
{"status":200,"message":"Success","result":["10"]}%

➜  leadiq-simple-api-nodejs-app git:(master) ✗ curl http://localhost:5000/transactionservice/sum/10
{"status":200,"message":"Success","result":{"sum":15000}}%

➜  leadiq-simple-api-nodejs-app git:(master) ✗ curl http://localhost:5000/transactionservice/sum/11
{"status":200,"message":"Success","result":{"sum":10000}}%
```

### Unit testing
Test can be executed as
`$ npm run test`

**Test sample**
```
➜  leadiq-simple-api-nodejs-app git:(master) ✗ npm run test

> leadiq-simple-api-nodejs-app@1.0.0 test /Users/swami/Documents/my-code-lab/leadiq-simple-api-nodejs-app
> gulp test

[18:02:32] Using gulpfile ~/Documents/my-code-lab/leadiq-simple-api-nodejs-app/gulpfile.js
[18:02:32] Starting 'test'...


restify listening at http://[::]:5000
  Create Transaction
2017-11-27T10:02:32.894Z 'PUT' '/transactionservice/transaction/10'
    ✓ should return a 200 response for successful transaction creation

  Get Transaction By Type
2017-11-27T10:02:32.908Z 'PUT' '/transactionservice/transaction/50'
    ✓ should create transaction for bus
2017-11-27T10:02:32.916Z 'GET' '/transactionservice/types/bus'
    ✓ should return transaction object for given transaction type: bus
2017-11-27T10:02:32.920Z 'GET' '/transactionservice/types/bike'
    ✓ should return 404 for given transaction type: bike

  Get Transaction By Type
2017-11-27T10:02:32.923Z 'PUT' '/transactionservice/transaction/100'
    ✓ should create transaction for grocery
2017-11-27T10:02:32.925Z 'PUT' '/transactionservice/transaction/101'
    ✓ should create transaction for milk
2017-11-27T10:02:32.928Z 'GET' '/transactionservice/sum/100'
    ✓ should return transaction sum for given transaction id: 100
2017-11-27T10:02:32.930Z 'GET' '/transactionservice/sum/101'
    ✓ should return transaction sum for given transaction id: 101

  Health Check
2017-11-27T10:02:32.934Z 'GET' '/health'
    ✓ should return a 200 response


  9 passing (66ms)

[18:02:32] Finished 'test' after 565 ms
```

### Linter
The Lint check be performed by below command
`$ npm run lint`
