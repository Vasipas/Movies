# Start Project

#### `yarn`, `yarn dev`

# Create Docker Image

#### `docker build -t <your_super_account>/movies .`

# Start Paroject

#### `docker run --name movies -p 3000:3000 -e API_URL=http://localhost:8000/api/v1 your_super_account/movies`
Where API_URL by default is equal http://localhost:8000/api/v1 and can be changed

# Start using backend

#### `docker network create my_network`
#### `docker run -d --name movies_app -p 3000:80 -e API_URL=https://movies_api:8000/api/v1 -t pasichnykvv/movies --network my_network pasichnykvv/movies`
#### `docker run -d --name movies_api -p 8000:8000 webbylabhub/movies --network my_network webbylabhub/movies`
