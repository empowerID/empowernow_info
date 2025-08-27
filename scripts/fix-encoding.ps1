$ErrorActionPreference = 'Stop'

$root = (Resolve-Path "$PSScriptRoot/../docs").Path
$map = @{
  'â€”' = '—';
  'â€“' = '–';
  'â€‘' = '‑';
  'â€¢' = '•';
  'â€˜' = '‘';
  'â€™' = '’';
  'â€œ' = '“';
  'â€�' = '”';
  'â€¦' = '…';
  'Â·'  = '·';
  'Â©'  = '©';
  'Â®'  = '®';
  'Â '  = ' ';
  'â†’' = '→';
  'â€”' = '—';
  'â€“' = '–';
  # Common emoji sequences
  'ðŸ¤–' = '🤖';
  'ðŸ›¡ï¸' = '🛡️';
  'ðŸ”‘' = '🔑';
  'ðŸ“Š' = '📊';
}

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

