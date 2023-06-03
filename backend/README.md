# Backend
Build core AI and RESTful API for the system.

## Action
Package is response for receiving data from frontend and processing data with core AI and store in database

## API
Define endpoints of the services with main model related to *users*, and *configuration* of the system.
- *users*: contains the information and features of enrolled user.
- *configs*: contains the configuration of resources such as available models and devices and the threshold of system that can be adjusted.

## Core AI
Build the main flow of the system from data preprocessing to the final decision for authentication. I use a lot of configuration of ECAPA-TDNN model for embedding extraction. It is detailed in:
- ECAPA-TDNN-1024: 14.73M parameters
- ECAPA-TDNN-512: 6.65 parameters
- ECAPA-TDNN-256: 3.84M parameters
- ECAPA-TDNN-128: 2.89M parameters


## Model
Define model for request and error code in server side

## How to install
Install ffmpeg on your machine from [https://ffmpeg.org/download.html](https://ffmpeg.org/download.html). 

Install python enviroment for services
```bash
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
uvicorn main:server_api
```

With default configuartion, the API services will start at [http://localhost:8000](http://localhost:8000), please check documents of api at [http://localhost:8000/docs](http://localhost:8000/docs) to see the detail.

## Reference
ECAPA-TDNN implementation: https://github.com/TaoRuijie/ECAPA-TDNN




