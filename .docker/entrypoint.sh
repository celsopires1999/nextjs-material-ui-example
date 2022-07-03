#!/bin/sh

if [ ! -f ".env" ]; then
	cp .env.example .env
fi

npm install

tail -f /dev/null

# npm run dev
