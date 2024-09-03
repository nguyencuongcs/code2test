# RUN redis simple types only
- docker compose -f docker-compose-redis.yaml up -d
- docker compose -f docker-compose-redis.yaml down

# RUN redis stack with advanced types (JSON,...)
- docker compose -f docker-compose-redis-stack.yaml up -d
- docker compose -f docker-compose-redis-stack.yaml down