# Playwright installation, either creates a new project or adds playwright in existing project
npm init playwright@latest

# command to run the tests
npx playwright tests

# command to view the report
npx playwright show-report

# update playwright

npm install -D @playwright/test@latest
npx playwright install --with-deps

npx playwright --version