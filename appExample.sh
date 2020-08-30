export TERM={your_terminal}
$TERM -x sh -c "cd ./tools && python3 startServer.py" 
sleep 5
$TERM -x sh -c "cd ./tools && python3 antiReload.py" 
sleep 5
$TERM -x sh -c "cd ./app && npm run start"