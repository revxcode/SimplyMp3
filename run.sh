#!/bin/bash
clear
xterm -e "cd frontend; bun run dev" &
xterm -e "cd backend; bun run dev" &
echo "(ctrl+c) to exit both program"
wait
