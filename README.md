# FuelEd

### Prerequisites:
Redis

### How to setup Redis with Docker:  
```
$ docker pull redis

$ docker run --name redis -p 6379:6379 -d redis
```

### Update .env:  
REDIS_HOST=redis://localhost:6379
