$ErrorActionPreference = 'Stop'

$root = (Resolve-Path "$PSScriptRoot/../docs").Path
$map = New-Object 'System.Collections.Generic.Dictionary[string,string]'
$map['â€”'] = '—'
$map['â€“'] = '–'
$map['â€‘'] = '‑'
$map['â€¢'] = '•'
$map['â€˜'] = '‘'
$map['â€™'] = '’'
$map['â€œ'] = '“'
$map['â€�'] = '”'
$map['â€¦'] = '…'
$map['Â·']  = '·'
$map['Â©']  = '©'
$map['Â®']  = '®'
$map['Â ']  = ' '
$map['â†’'] = '→'
# Common emoji sequences
$map['ðŸ¤–'] = '🤖'
$map['ðŸ›¡ï¸'] = '🛡️'
$map['ðŸ”‘'] = '🔑'
$map['ðŸ“Š'] = '📊'

Get-ChildItem -Path $root -Recurse -Filter *.html | ForEach-Object {
  $p = $_.FullName
  $c = Get-Content -Raw -LiteralPath $p
  $orig = $c
  foreach($k in $map.Keys){ $c = $c.Replace($k, $map[$k]) }
  if ($c -ne $orig){
    Set-Content -LiteralPath $p -Value $c -Encoding UTF8
    Write-Host "Fixed mojibake: $($p.Substring($root.Length+1))"
  }
}

Write-Host "Encoding fix pass complete."

