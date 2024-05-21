FROM python:latest

WORKDIR /usr/app/server

ENV OAUTHLIB_INSECURE_TRANSPORT="1"
ENV GOOGLE_CLIENT_ID="429504215997-g93u9aonqvuv3dijsdvgths0i9nfltf8.apps.googleusercontent.com"
ENV GOOGLE_CLIENT_SECRET="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"
ENV BASE_API_URL="http://127.0.0.1:3000/api"
ENV TOCKEN_VALID_MIN="15"

RUN pip3 install flask
RUN pip3 install flask-cors
RUN pip3 install requests
RUN pip3 install oauthlib
RUN pip3 install pyOpenSSL
RUN pip3 install Flask-Login

COPY . .

CMD python -m flask --app . run --host=0.0.0.0 --port=6010

EXPOSE 6010