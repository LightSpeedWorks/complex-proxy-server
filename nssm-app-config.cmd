@set X_SVC="X Complex Proxy Server"
@set X_APP=node %~dp0app %COMPLEX_PROXY_PARAMS%
@set X_NSSM=%~dp0nssm32
@if "%PROCESSOR_ARCHITECTURE%" == "AMD64" set X_NSSM=%~dp0nssm64
