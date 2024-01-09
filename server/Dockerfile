FROM python:latest

WORKDIR /usr/app/server

RUN pip3 install flask
RUN pip3 install flask-cors

COPY . .

CMD python -m flask --app . run --host=0.0.0.0 --port=6010

EXPOSE 6010