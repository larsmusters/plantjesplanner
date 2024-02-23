run:
	cd frontend && npm run dev & bg && cd ..


eod: 
	lsof -i :5173 | awk 'NR>1 {print $$2}' | xargs kill

install:
	cd backend && poetry install --no-root

gen:
	cd backend && python3 -m spritegen