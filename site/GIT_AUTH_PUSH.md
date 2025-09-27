# Git auth & push for EmpowerNow repos (Windows)

This is the canonical routine we use for `empowernow_info` (Astro www) and `empowernow_docs` (Docusaurus docs).

## Preferred: SSH keys (no prompts)

1) Generate key and start agent

```powershell
ssh-keygen -t ed25519 -C "<your-email>"
Start-Service ssh-agent
ssh-add $env:USERPROFILE\.ssh\id_ed25519
```

2) Add the public key to GitHub

```powershell
Get-Content $env:USERPROFILE\.ssh\id_ed25519.pub
```

Copy the output → GitHub → Settings → SSH and GPG keys → New SSH key.

3) Point repo remotes to SSH

```powershell
# From within the repo directory
# empowernow_info
cd C:\source\repos\empowernow_info
git remote set-url origin git@github.com:empowerID/empowernow_info.git

# empowernow_docs
cd C:\source\repos\empowernow_docs
git remote set-url origin git@github.com:empowerID/empowernow_docs.git
```

4) Test and push

```powershell
ssh -T git@github.com
# Expect: "Hi <user>! You've successfully authenticated..."

# Example workflow (empowernow_info)
cd C:\source\repos\empowernow_info\site
npm run build
cd ..
git add -A
git commit -m "site: concise change summary"
git push
```

## Alternative: HTTPS + Personal Access Token (PAT)

1) Create a PAT with repo scope (fine‑grained or classic). Grant repo access.

2) Point remote to HTTPS

```powershell
# empowernow_info
cd C:\source\repos\empowernow_info
git remote set-url origin https://github.com/empowerID/empowernow_info.git

# empowernow_docs
cd C:\source\repos\empowernow_docs
git remote set-url origin https://github.com/empowerID/empowernow_docs.git
```

3) Push; when prompted use your username and the PAT as password.
Windows Git Credential Manager will cache it.

## Repo‑specific build/publish commands

- empowernow_info (Astro marketing site)

```powershell
cd C:\source\repos\empowernow_info\site
npm ci
npm run build
cd ..
git add -A
git commit -m "www: <change summary>"
git push
```

Output goes to `C:\source\repos\empowernow_info\docs\` for GitHub Pages.

- empowernow_docs (Docusaurus docs)

```powershell
cd C:\source\repos\empowernow_docs
npm ci
npm run build
# (If using GH Pages via Actions, just commit and push)
git add -A
git commit -m "docs: <change summary>"
git push
```

## Useful diagnostics

```powershell
git remote -v                 # verify current remote
ssh -vT git@github.com        # see which key is used
Get-Service ssh-agent         # ensure agent is running
ssh-add -l                    # list loaded keys
```

## Common fixes

- Permission denied (publickey): start ssh-agent, add key, ensure the correct public key is in GitHub.
- Push uses old URL: run `git remote -v`, then `git remote set-url origin <ssh-or-https-url>`.
- Want an interactive helper: `gh auth login` (choose SSH or HTTPS).
