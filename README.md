# GrantMan ![Build Satus](https://travis-ci.com/gavinhenderson/AC31007-Team2.svg?token=zGHzssRv4pwPdCHDq9fz&branch=master)
GrantMan is a grant management system designed to be help digitise the process of trying to get your research grant approved by all the appropriate parties.

Our website can be found at [grant.mhi.io](https://grant.mhi.io)

## Prerequisites
In order to host this locally you must have:
* NodeJS
* MongoDB

To install the node packages require for this project simply clone the repo then run `npm install` from the root of the project. This will ensure you get all of the dependencies.

## Unit Testing
We used Mocha as our unit testing framework for the server. The tests can be found in the `test` directory.

To run the tests (assuming you have the prerequisites) run `npm test` from the root directory.

Every commit that is made to the project is then run on our travis testing environment. You can see the history of our travis builds [here](https://travis-ci.com/gavinhenderson/AC31007-Team2).

## Continuous Deployment
Our website is hosted on our own Digital Ocean server to allow us to have more control over our deployment. After travis runs (and passes test) it then sends our changes to the live server.
