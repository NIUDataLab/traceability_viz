@echo off
cd "C:\Users\purav\Desktop\Research\gitgraph\server"
start /b start.bat
npm start

@echo off
cd "C:\Users\purav\Desktop\Research\gitgraph\server"

echo Checking and installing required Python libraries...
python -m pip install --upgrade pip
pip install -r requirements.txt

echo Checking and installing required Node.js libraries...
call npm install

echo Starting servers...
cd server
start /b flask --app graph run --debug
npm start




