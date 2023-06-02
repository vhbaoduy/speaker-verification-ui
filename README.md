# Voice authentication
Build voice authentication system with backend (using PyTorch, FastAPI and MongoDB) and frontend (using basic React).

## Technical overiew

### Backend
- Build *speaker verification* as Core AI of system by using *Pytorch* and some libraries for speech processing.
- Build Web application API as services with *FastAPI* and *MongoDB*.

### Frontend
Build basic Web UI with *React* to use services from backend.

## How to Install

### Prerequisite
- [Docker](https://www.docker.com/)
- [Git](https://git-scm.com/)
- [CUDA](https://developer.nvidia.com/cuda-downloads) if you want to use GPU

### Installation
1. From `root` directory, clone the source code from the repository
```bash
git clone ...
```
2. Build docker container for application
```
cd ...
docker-compose build
```

*Note*: The process may take more than 30 minutes (depending on your network speed).


3. Start docker compose
```
docker-compose up -d
```

To track the process:
```
docker logs -f ...b
```
## Usage section