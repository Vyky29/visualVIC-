# Uso: .\scripts\push-main.ps1 -Message "mensaje del commit"
# Luego en Vercel: ultimo deployment o Redeploy.

param(
  [string]$Message = "chore: update"
)

Set-Location (Split-Path $PSScriptRoot -Parent)
git restore tsconfig.tsbuildinfo 2>$null
git add -A
git status -sb
git commit -m $Message 2>$null
if ($LASTEXITCODE -ne 0) {
  Write-Host "Nothing to commit (ok)."
}
git push origin main
Write-Host "Listo: push a origin/main. Revisa Vercel -> ultimo deployment."
