# Publishes reading notes from the Obsidian vault to the website.
#
# Reads every <slug>.md in the vault's "reading list\reading notes" folder
# (files starting with "_" are skipped), parses dated entries of the form
#
#   ## YYYY-MM-DD [HH:MM] [| pp. X-Y]
#   free-form thoughts (paragraphs, *em*, **strong**)
#
# and writes notes\<slug>.json in the repo, newest entry first. Each book
# page's notes.js then renders its own JSON as a "Reading log" section.
#
# Usage: powershell -File tools\publish-notes.ps1   (then review + commit)

$ErrorActionPreference = 'Stop'

$vaultNotes = "D:\Users\Sidak's PC\Documents\Sidak\reading list\reading notes"
$repoRoot   = Split-Path -Parent $PSScriptRoot
$outDir     = Join-Path $repoRoot 'notes'

if (-not (Test-Path $vaultNotes)) { throw "Vault notes folder not found: $vaultNotes" }
if (-not (Test-Path $outDir)) { New-Item -ItemType Directory $outDir | Out-Null }

function Convert-Inline([string]$text) {
    # escape HTML, then the two supported inline marks
    $t = $text -replace '&', '&amp;' -replace '<', '&lt;' -replace '>', '&gt;'
    $t = [regex]::Replace($t, '\*\*(.+?)\*\*', '<strong>$1</strong>')
    $t = [regex]::Replace($t, '\*(.+?)\*', '<em>$1</em>')
    return $t
}

$headerRx = [regex]'^##\s+(\d{4}-\d{2}-\d{2})(?:\s+(\d{1,2}:\d{2}))?(?:\s*\|\s*(.+?))?\s*$'
$published = @()

Get-ChildItem -Path $vaultNotes -Filter '*.md' | Where-Object { $_.Name -notlike '_*' } | ForEach-Object {
    $slug = $_.BaseName
    $entries = @()
    $current = $null

    foreach ($line in (Get-Content -LiteralPath $_.FullName -Encoding UTF8)) {
        $m = $headerRx.Match($line)
        if ($m.Success) {
            if ($current) { $entries += $current }
            $current = [ordered]@{
                date  = $m.Groups[1].Value
                time  = $(if ($m.Groups[2].Success) { $m.Groups[2].Value } else { $null })
                pages = $(if ($m.Groups[3].Success) { $m.Groups[3].Value.Trim() } else { $null })
                lines = New-Object System.Collections.Generic.List[string]
            }
        } elseif ($current) {
            $current.lines.Add($line)
        }
    }
    if ($current) { $entries += $current }

    $out = foreach ($e in $entries) {
        # blank-line-separated paragraphs -> <p> blocks
        $paras = ((($e.lines -join "`n").Trim()) -split "`n\s*`n") |
            Where-Object { $_.Trim() } |
            ForEach-Object { '<p>' + (Convert-Inline ($_.Trim() -replace "`n", ' ')) + '</p>' }
        [ordered]@{
            date  = $e.date
            time  = $e.time
            pages = $e.pages
            html  = ($paras -join '')
        }
    }

    # newest first
    $out = @($out | Sort-Object { $_.date + ' ' + $(if ($_.time) { $_.time } else { '00:00' }) } -Descending)

    $json = if ($out.Count -eq 0) { '[]' } else { ConvertTo-Json @($out) -Depth 4 }
    $dest = Join-Path $outDir ($slug + '.json')
    [IO.File]::WriteAllText($dest, $json, (New-Object System.Text.UTF8Encoding $false))
    $published += "$slug -> notes\$slug.json ($($out.Count) entries)"
}

if ($published.Count -eq 0) {
    Write-Output "No note files found in $vaultNotes"
} else {
    $published | ForEach-Object { Write-Output $_ }
}
