# questions-service
This package contains a RESTful API that manages the data from a 'Questions and Answers' section of an e-commerce website.



## Starting the API
1. Start an instance of mongoDB
	- If you have mongoDB installed locally you shouldn't need to do anything.  If you get a connection error make sure mongo is running.
	- USING DOCKER: `docker run -d -p 27017:27017 mongo`
		- This creates an instance of mongodb running on localhost:27017
2. From the root directory run the command: `docker-compose up`

  ## QnA API Routes


docker run -d -v ~/questions-service/server:/usr/local/etc/redis --name myredis -p 6379:6379 --rm redis redis-server /usr/local/etc/redis/redis.conf