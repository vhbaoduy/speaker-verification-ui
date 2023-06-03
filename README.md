# Voice authentication

![Voice-authen-framework](/images/voice-authen.png)
Build voice authentication system with backend (using PyTorch, FastAPI and MongoDB) and frontend (using basic React).

## Technical overview

### Backend
- Build *speaker verification* as Core AI of system by using *Pytorch* and some libraries for speech processing.
- Build Web application API as services with *FastAPI* and *MongoDB* database.

### Frontend
Build basic Web UI with *React* to use services from backend.

## How to Install

### Prerequisite
- [Docker](https://www.docker.com/), if build with docker (current version only support run on CPU)
- [Git](https://git-scm.com/)
- [CUDA](https://developer.nvidia.com/cuda-downloads) if you want to use GPU
- [Conda](https://docs.conda.io/en/latest/miniconda.html), [Node](https://nodejs.org/en) and [FFmpeg](https://ffmpeg.org/download.html) for manual build

### Installation
1. From `root` directory, clone the source code from the repository
```bash
git clone https://github.com/vhbaoduy/voice-authentication.git
cd voice-authentication
```

### Build with docker
In current version, the system run only on CPU in current version (not support GPU).
1. Build docker container for application
```
docker-compose build
```

*Note*: The process may take more than 30 minutes (depending on your network speed) to install packages.


2. Start docker compose
```
docker-compose up -d
```

To track the process:
```
docker logs -f <container name>
```

### Manual Build
1. Backend

Install python enviroment for services
```bash
cd ./backend
conda create --name your_name_env python=3.8
conda activate your_name_env
pip install -r requirements.txt
```

Run **MongoDB** with Docker and ensure database run on your machine.
```
docker pull mongo
docker run --name mongodb -p 27017:27017 -d mongo
```
Currently, to connect with MongoDB through host: localhost and port: 27017

Start services with FASTAPI
```
uvicorn main:server_api --host localhost --port 8000
```
Web API run on [http://localhost:8000](localhost:8000) default. Visit [http://localhost:8000/docs](localhost:8000/docs) to see implemented API.

2. Frontend

Install dependencies, and build. I use Node version 18.6 to build the basic UI.
```bash
cd ./frontend
npm i
npm run build
```
Start Web UI with:
```
npm start
```
WebUI run on [http://localhost:3000](localhost:3000) default.

## Usage
The current version only run on localhost to deploy model with basic UI.
1. Setting
![Setting](/images/setting.png)

In the Setting tab, you can configure the resources from the backend (your machine) such as:
- Device: CPU or available GPU (only support for manual build) (default: CPU).
- Model: models to extract feature from backend (default: ECAPA-TDNN-256)
- Threshold: is used for feature matching in backend (default: 0.5). The value is in range (0,1).

Notes: If you change the model configuration, all users in database will be deleted to ensure the consistency of user's features.

2. Enrollment
![Enrollment](/images/enrollment.png)
In the enrollment phase, you must record your voice or upload your files from your machine into system and submit it with unique username. All users who enrolled the system will be show on the right of screen, you can delete as you manage the list of users.

Notes: I recommend record least 3 audio from user and the length of each audio is more than 3 seconds. It ensures the system to capture the feature of user.

The process time for enrollment depend on the current resources such as: model, device and the number of enrollment files.


3. Authentication
![Authentication](/images/authentication.png)

As enrollment phase, the user must record or upload audio file to login to system, but in authentication phase the use need to upload a file to authenticate.

After that, the result will be shown on the screen with **reject** or **accept** and similarity score between the user and database.

You can see the detail of installation and usage by [video](https://youtu.be/rNwi1iydyrc).

The current performance of sytem depends on the following conditions:
- The quality of audio (noise, echo, etc).
- The length of audio to capture user's features.
- The context when recording audio from users.

## Reference
ECAPA-TDNN model for feature extraction
```
@inproceedings{desplanques2020ecapa,
  title={{ECAPA-TDNN: Emphasized Channel Attention, propagation and aggregation in TDNN based speaker verification}},
  author={Desplanques, Brecht and Thienpondt, Jenthe and Demuynck, Kris},
  booktitle={Interspeech 2020},
  pages={3830--3834},
  year={2020}
}
```