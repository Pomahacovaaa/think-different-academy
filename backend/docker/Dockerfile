FROM python:3.12-slim

WORKDIR /app

RUN groupadd -r tda_user && useradd -r -g tda_user tda_user

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY --chown=tda_user:tda_user . .

ENV PORT=3001
EXPOSE 3001

USER tda_user
ENTRYPOINT ["sh", "start.sh"]