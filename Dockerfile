# This Dockerfile is used to build the application.
FROM ubuntu:14.04

# Run everything in the production context
ENV NODE_ENV=production

# Install system dependencies
RUN apt-get -y update
RUN apt-get -y install bison build-essential curl flex g++ git libpcre3-dev \
                       libssl-dev zlib1g-dev python

# Compile node from source
WORKDIR /opt/
RUN curl http://nodejs.org/dist/v0.12.2/node-v0.12.2.tar.gz | tar xz
WORKDIR /opt/node-v0.12.2
RUN ./configure
RUN make -j 4
RUN make -j 4 install

# Compile nginx from source
WORKDIR /opt/
RUN curl http://nginx.org/download/nginx-1.7.12.tar.gz | tar xz
WORKDIR /opt/nginx-1.7.12
RUN ./configure --with-http_gzip_static_module
RUN make -j 4
RUN make -j 4 install

# Add source code
WORKDIR /
RUN useradd --create-home --user-group tabular
ADD . /opt/nahiluhmot/tabular-frontend/
RUN chown -R tabular:tabular /opt/nahiluhmot/tabular-frontend/

# Build the app
USER tabular
WORKDIR /opt/nahiluhmot/tabular-frontend/
RUN npm install
RUN npm rebuild
RUN npm run-script clean
RUN npm run-script vendored
RUN npm run-script build

# Start nginx by default
USER root
CMD /usr/local/nginx/sbin/nginx -c /opt/nahiluhmot/tabular-frontend/nginx.conf
