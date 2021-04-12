# Atelier Microservice Project

## RESTful API For 'Questions and Answers' On E-Commerce Site
<div style="text-align: center">
<img src="./readmeFiles/techStack.png" alt="Tech Stack: Node.js, Express, MongoDB, Docker, NGINX" height="75">
</div>
<!-- !["Tech Stack: Node.js, Express, MongoDB, Docker, NGINX"](./readmeFiles/techStack.png) -->
For this project I was given a set of CSV files containing millions of records for the 'Questions and Answers' section of an e-commerce website.  The goal was to produce a scalable API that had to serve pre-existing legacy front end code with 8 different endpoints. The minimum requirements where to serve 200 clients per second with <50ms average response times, though after initial deployment and load testing I was able to achieve 850 clients per second by horizontally scaling my service. This was all deployed using only AWS EC2 t2.micros.

The data I was provided with were three CSV files, each containing millions of records, for the questions, answers and answer photos. Because of how the data is nested I decided that using mongoDB with it's flexible document structure would allow me to best optimize for user queries. I implemented the server using node.js and express and used Docker for easy deployment. Lastly when it came to scaling horizontally I implemented a load balancer using NGINX


## Table of Contents

[Requirements](#requirements)

[Technologies Used](#technologies-used)

[Installation](#installation)

[API Routes](#api-routes)

[System Architecture](#system-architecture)

[Load Testing](#load-testing)


## Requirements
Ensure the following modules are installed before running `npm install`
- Node v14.15.0 or higher
- mongoDB v4.4.1 or higher
> Alternatively project can be run using Docker

## Technologies Used

### Backend
- Node.js
- Express
- mongoDB
- Docker
- NGINX

### Testing
- Jest
- Loader.io

## Installation
1. Start an instance of mongoDB
	- If you have mongoDB installed locally you shouldn't need to do anything.  If you get a connection error make sure mongo is running.
	- USING DOCKER
		```
		docker run -d -p 27017:27017 mongo
		```
		> This creates an instance of mongoDB running on localhost:27017
2. From the `server/` directory start the server by running:
	```
	npm start
	```
	- USING DOCKER
		- From the `server/` directory run: 
			```
			docker build -t qna_api .
			```
		- After the image is built use the command:
			```
			docker run -d -p 3000:3000 -e "CONNECTIONSTRING=mongodb://localhost:27017/atelier" qna_api
			```
		- This will build a container that will run the server on port 3000.
		> If mongo is not running at `localhost:27017` then change the value of the "CONNECTIONSTRING" environment variable to connect to the appropriate location

3. The api will now be accessible on http://localhost:3000

## API Routes

## System Architecture

## Load Testing
