# questions-service
docker run -d -p 80:3000 -e "CONNECTIONSTRING=mongodb://18.220.146.67:27017/atelier" --rm api:loader


// RUN API
docker run -d -p 80:3000 -e "CONNECTIONSTRING=mongodb://18.220.146.67:27017/atelier" --name apiMain api:main

// RUN REDIS
docker run -d -v ~/questions-service/server:/usr/local/etc/redis --name myredis -p 6379:6379 --rm redis redis-server /usr/local/etc/redis/redis.conf