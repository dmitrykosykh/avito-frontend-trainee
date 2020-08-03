start:
			npx webpack-dev-server --config webpack.dev.js
	
test:
			npx jest

build:
			npx webpack --config webpack.prod.js

clean:
			rm -rf ./dist

deploy:
			npx gh-pages -d dist