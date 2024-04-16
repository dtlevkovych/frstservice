FROM python:latest

WORKDIR /usr/app/server

RUN pip3 install flask
RUN pip3 install flask-cors
RUN pip3 install requests
RUN pip3 install oauthlib
RUN pip3 install pyOpenSSL
RUN pip3 install Flask-Login

COPY . .

CMD python -m flask --app . run --host=0.0.0.0 --port=6010

EXPOSE 6010