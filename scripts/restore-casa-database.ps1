$ErrorActionPreference = 'Stop'

$psql = Get-Command psql -ErrorAction SilentlyContinue
if (-not $psql) {
    $installedPsql = Join-Path ${env:ProgramFiles} 'PostgreSQL\16\bin\psql.exe'
    if (Test-Path $installedPsql) {
        $psql = Get-Item $installedPsql
    }
}

if (-not $psql) {
    throw 'No se encontró psql. Instala PostgreSQL Client y añade su carpeta bin al PATH.'
}

$dump = Join-Path $PSScriptRoot '..\sql\copia_supabase.sql'
if (-not (Test-Path $dump)) {
    throw "No se encontró el dump SQL: $dump"
}

Write-Host 'Se va a restaurar sql/copia_supabase.sql en supabase_restore.'
Write-Host 'Si PostgreSQL solicita contraseña, introdúcela para el usuario lisardo.'

& $psql.Source `
    --host localhost `
    --port 5432 `
    --username lisardo `
    --dbname supabase_restore `
    --file $dump

if ($LASTEXITCODE -ne 0) {
    throw "La restauración ha fallado con código $LASTEXITCODE."
}

Write-Host 'Restauración completada.'
