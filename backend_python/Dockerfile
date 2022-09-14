FROM python:3.8-alpine3.16

RUN apk add --no-cache tini && mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . .
RUN apk add g++ jpeg-dev zlib-dev libjpeg make
RUN pip3 install --upgrade setuptools
RUN pip3 install -r requirements.txt

# EXPOSE 8773

ENTRYPOINT [ "python" ]
CMD ["app.py" ]

# CMD [ "python" , "./app.py" ]
# CMD ["flask", "run", "-h", "0.0.0.0", "-p", "5000"]

