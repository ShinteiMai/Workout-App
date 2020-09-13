export TERM=xfce4-terminal
$TERM -x sh -c "cd ./tools && python3 startServer.py" -hold
sleep 5
$TERM -x sh -c "cd ./tools && python3 antiReload.py" -hold
sleep 5
$TERM -x sh -c "cd ./app && npm run start" -hold
