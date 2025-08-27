$ErrorActionPreference = 'Stop'

$root = (Resolve-Path "$PSScriptRoot/../docs").Path
$enc1252 = [System.Text.Encoding]::GetEncoding(1252)
$utf8    = [System.Text.Encoding]::UTF8

Get-ChildItem -Path $root -Recurse -Filter *.html | ForEach-Object {
  $p = $_.FullName
  $c = Get-Content -Raw -LiteralPath $p
  $bytes = $enc1252.GetBytes($c)
  $fixed = $utf8.GetString($bytes)
  if ($fixed -ne $c) {
    Set-Content -LiteralPath $p -Value $fixed -Encoding UTF8
    Write-Host "Repaired UTF-8 mojibake: $($p.Substring($root.Length+1))"
  }
}

Write-Host "UTF-8 repair complete."

