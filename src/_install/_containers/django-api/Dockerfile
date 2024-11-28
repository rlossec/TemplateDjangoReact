FROM python:3.8-slim

WORKDIR /usr/src/app

# set environment variables
#Prevents Python from writing pyc files to disc
ENV PYTHONDONTWRITEBYTECODE 1
#prevents Python from buffering stdout and stderr
ENV PYTHONUNBUFFERED 1

# Copy the current directory contents into the container at /app
COPY requirements.txt ./

# Install any needed packages specified in requirements.txt
RUN pip  install --trusted-host pypi.python.org -r requirements.txt

# Install psycopg2
RUN apt-get update -y --fix-missing && \
    apt-get install -y python3-dev libpq-dev gcc apt-utils && \
    apt-get install -y postgresql postgresql-contrib && \
    apt-get install -y gnupg && \
    apt-get install -y nano || exit 1

# copy entrypoint.sh
ADD entrypoint.sh /tmp/entrypoint.sh

# give permissions
RUN chmod +x /tmp/entrypoint.sh

# run entrypoint.sh
ENTRYPOINT ["/tmp/entrypoint.sh"]
CMD ["run"]

# Expose port
EXPOSE 3200

CMD exec gunicorn server_rest.wsgi:application --bind 0.0.0.0:3200 --workers 3
