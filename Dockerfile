FROM python:3.9-slim

WORKDIR /usr/src/app

COPY . .

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 80

ENV FLASK_APP=your_app.py

CMD ["flask", "run", "--host=0.0.0.0"]
