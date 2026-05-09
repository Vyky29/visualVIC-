# Sube este proyecto a: https://github.com/Vyky29/visualVIC-
#
# Cómo ejecutarlo:
# 1) Instala Git: https://git-scm.com/download/win (siguiente, siguiente… y reinicia Cursor/terminal).
# 2) Clic derecho en este archivo -> "Ejecutar con PowerShell"
#    O abre PowerShell, ve a la carpeta del proyecto y ejecuta:  .\scripts\subir-a-github.ps1
#
# La primera vez Git puede pedir inicio de sesión en GitHub (navegador o token).

$RepoRoot = Split-Path -Parent $PSScriptRoot
Set-Location $RepoRoot

$RemoteUrl = "https://github.com/Vyky29/visualVIC-.git"

Write-Host ""
Write-Host "Carpeta del proyecto: $RepoRoot" -ForegroundColor Cyan
Write-Host ""

if (-not (Get-Command git -ErrorAction SilentlyContinue)) {
  Write-Host "ERROR: No encuentro 'git'." -ForegroundColor Red
  Write-Host "Instala Git para Windows y vuelve a intentar:" -ForegroundColor Yellow
  Write-Host "  https://git-scm.com/download/win" -ForegroundColor Yellow
  Write-Host ""
  Read-Host "Pulsa Enter para cerrar"
  exit 1
}

# Nombre y email (solo la primera vez en este PC, solo para esta carpeta)
if (-not (git config --local user.email 2>$null)) {
  Write-Host "Git necesita tu nombre y email (salen en los commits). Usa el mismo email que en GitHub." -ForegroundColor Yellow
  $n = Read-Host "Tu nombre (ej. Vyky)"
  $e = Read-Host "Tu email"
  git config --local user.name $n
  git config --local user.email $e
}

if (-not (Test-Path ".git")) {
  Write-Host "Inicializando repositorio git..." -ForegroundColor Green
  git init
}

Write-Host "Añadiendo archivos..." -ForegroundColor Green
git add .

Write-Host "Creando commit (si no hay nada nuevo, Git lo dirá y seguimos)..." -ForegroundColor Green
git commit -m "Initial commit: PixtoLearn routines"
if ($LASTEXITCODE -ne 0) {
  Write-Host "(Sin cambios nuevos para commitear — normal si ya habías subido antes.)" -ForegroundColor DarkGray
}

git branch -M main 2>$null

$origin = git remote get-url origin 2>$null
if ($LASTEXITCODE -eq 0) {
  Write-Host "Actualizando URL del remoto 'origin'..." -ForegroundColor Green
  git remote set-url origin $RemoteUrl
} else {
  Write-Host "Enlazando con GitHub (origin)..." -ForegroundColor Green
  git remote add origin $RemoteUrl
}

Write-Host ""
Write-Host "Subiendo a GitHub (puede pedir login la primera vez)..." -ForegroundColor Cyan
git push -u origin main

if ($LASTEXITCODE -eq 0) {
  Write-Host ""
  Write-Host "Listo. Abre: https://github.com/Vyky29/visualVIC-" -ForegroundColor Green
} else {
  Write-Host ""
  Write-Host "El push falló. Lo más habitual:" -ForegroundColor Yellow
  Write-Host "  - GitHub pide autenticación: usa un Personal Access Token como contraseña," -ForegroundColor Yellow
  Write-Host "    o instala GitHub Desktop y entra con tu cuenta." -ForegroundColor Yellow
  Write-Host "  - Si el repo en GitHub ya tenía commits (README), avisa y lo arreglamos." -ForegroundColor Yellow
}

Write-Host ""
Read-Host "Pulsa Enter para cerrar"
