start cmd /c "timeout /t 3 & start http://www.google.co.jp"
node %~dp0app %COMPLEX_PROXY_PARAMS%
pause
