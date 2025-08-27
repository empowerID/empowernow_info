$ErrorActionPreference = 'Stop'

$docsRoot = (Resolve-Path "$PSScriptRoot/../docs").Path

Get-ChildItem -Path $docsRoot -Recurse -Filter *.html | ForEach-Object {
  $filePath = $_.FullName
  $relPath = (Split-Path -Parent $filePath).Substring($docsRoot.Length)
  $relPath = $relPath.TrimStart('\','/')
  $segments = @()
  if ($relPath.Length -gt 0) {
    $segments = $relPath -split '[\\/]'
  }
  $depth = ($segments | Where-Object { $_ -ne '' }).Count
  $prefix = ''
  if ($depth -gt 0) { $prefix = ('../' * $depth) }

  $c = Get-Content -Raw -LiteralPath $filePath

  # css link
  $c = $c.Replace('href="/docs/css/','href="' + $prefix + 'css/')
  # internal doc links
  $c = $c.Replace('href="/docs/','href="' + $prefix)
  $c = $c.Replace('src="/docs/','src="' + $prefix)
  # public assets
  $c = $c.Replace('href="/public/','href="' + $prefix + 'public/')
  $c = $c.Replace('src="/public/','src="' + $prefix + 'public/')

  # ensure pages-fix is included with correct prefix (optional safety)
  if ($c -notmatch 'js/pages-fix.js') {
    $scriptTag = '    <script src="' + $prefix + 'js/pages-fix.js"></script>'
    $c = $c.Replace('</body>', $scriptTag + '</body>')
  }

  Set-Content -LiteralPath $filePath -Value $c -Encoding UTF8
  Write-Host "Updated: $($filePath.Substring($docsRoot.Length+1)) with prefix '$prefix'"
}

Write-Host "Relativization complete."

