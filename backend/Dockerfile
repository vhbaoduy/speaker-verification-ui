FROM python:3.8

RUN mkdir /backend

WORKDIR /backend

COPY requirements.txt .

RUN apt-get update && apt-get install -y ffmpeg

RUN pip install -r requirements.txt

# WORKDIR /backend/downloaded_models

# RUN gdown "https://drive.google.com/file/d/1k2XNHlfa9IgzLbGnvRdrQFufbXc44wex/view?usp=sharing"
# RUN gdown "https://drive.google.com/file/d/1i_1O9ncMU59TKswWSP9FOtLiX_CCijb9/view?usp=sharing"
# RUN gdown "https://drive.google.com/file/d/1wfrPLwIndSJsaGR7PhKtK2bIV4GMqpTY/view?usp=sharing"
# RUN gdown "https://drive.google.com/file/d/1DDTJQ-YNJ5tJ1dtq5ghMR9N0QqhArK3I/view?usp=sharing"

# WORKDIR /backend

COPY . .

CMD ["uvicorn", "main:server_api", "--host", "0.0.0.0", "--port", "8000"]
