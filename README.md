# questions-service
This package contains a RESTful API that manages the data from a 'Questions and Answers' section of an e-commerce website.



## Starting the API
1. Start an instance of mongoDB
	- If you have mongoDB installed locally you shouldn't need to do anything.  If you get a connection error make sure mongo is running.
	- USING DOCKER: `docker run -d -p 27017:27017 mongo`
		- This creates an instance of mongodb running on localhost:27017
2. From the server/ directory you can start the server by running the command: `npm start`
	- If you start the server using this method it will be looking for a mongo database running on the localhost at port 27017.  If you are trying to connect to a remote database you can try running the server with docker and pass in an environment variable to change the connection.
- USING DOCKER
	- From the server/ directory run: `docker build -t qna_api .`
	- After the image is built use the command: `docker run -d -p 3000:3000 -e "CONNECTIONSTRING=mongodb://localhost:27017/atelier" qna_api`
	- This will build a container that will run the server on port 3000.
	- If you you don't have mongo running as `localhost:27017` then change the value of the "CONNECTIONSTRING" environment variable to correctly connect to your instance of mongodb.

  ## QnA API Routes