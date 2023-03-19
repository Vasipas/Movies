# Start Project

#### `yarn`, `yarn dev`

# Create Docker Image

#### `docker build -t <your_super_account>/movies .`

# Run Docker Container

#### `docker run --name movies -p 3000:3000 -e API_URL=http://localhost:8000/api/v1 your_super_account/movies`

Where API_URL by default is equal http://localhost:8000/api/v1 and can be changed

# Start With Backend

#### `docker run -d --name movies_app -p 3000:3000 -e API_URL=http://localhost:8000/api/v1 pasichnykvv/movies`

#### `docker run -p 8000:8000 webbylabhub/movies`
