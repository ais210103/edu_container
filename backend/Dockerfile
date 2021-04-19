FROM ubuntu:18.04
ENV PYTHONUNBUFFERED 1
ENV PYTHONIOENCODING utf-8
ENV LANG C.UTF-8
RUN mkdir /backend
WORKDIR /backend
ADD requirements.txt /backend/
RUN apt-get update -y
RUN apt-get upgrade -y
RUN apt-get install -y python3 python3-pip git
RUN pip3 install --upgrade pip
RUN pip3 install -r requirements.txt

COPY . .

WORKDIR /backend

CMD ["python3","-m", "openapi_server"]
