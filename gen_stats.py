"""Generates stats.svg from live GitHub API data — self-computed, no widget farm."""
import json
import os
import time
import urllib.request

USER = "AkashPriyadarshii"
HDRS = {"Accept": "application/vnd.github+json", "User-Agent": USER}
if os.environ.get("GITHUB_TOKEN"):
    HDRS["Authorization"] = f"Bearer {os.environ['GITHUB_TOKEN']}"

def get(url, tries=3):
    last = None
    for i in range(tries):
        try:
            req = urllib.request.Request(url, headers=HDRS)
            with urllib.request.urlopen(req, timeout=30) as r:
                return json.load(r)
        except Exception as e:  # transient API/network blips shouldn't kill the daily run
            last = e
            time.sleep(5 * (i + 1))
    raise last

def paged(url):
    out, page = [], 1
    while True:
        batch = get(f"{url}?per_page=100&page={page}")
        if not batch:
            return out
        out += batch
        page += 1

profile = get(f"https://api.github.com/users/{USER}")
repos = paged(f"https://api.github.com/users/{USER}/repos")
stars = sum(r["stargazers_count"] for r in repos)
downloads = 0
for r in repos:
    time.sleep(0.2)  # throttle to prevent secondary rate limiting
    for rel in paged(f"https://api.github.com/repos/{r['full_name']}/releases"):
        for a in rel.get("assets", []):
            downloads += a.get("download_count", 0)

def fmt(n):
    return f"{n:,}"

BLOCKS = [
    ("STARS ACROSS REPOS", fmt(stars)),
    ("PUBLIC REPOS", fmt(len(repos))),
    ("FOLLOWERS", fmt(profile["followers"])),
    ("RELEASE DOWNLOADS", fmt(downloads)),
]

# transparent bg, mid-tone palette readable on light + dark (same scheme as streak card)
X, W, H = 40, 720, 140
cells = ""
block_width = (W - 2 * X) // len(BLOCKS)
for i, (label, value) in enumerate(BLOCKS):
    cx = X + i * block_width + (block_width // 2)
    cells += (
        f'<text x="{cx}" y="78" text-anchor="middle" font-family="Segoe UI,sans-serif" font-size="30" '
        f'font-weight="700" fill="#a78bfa">{value}</text>\n'
        f'<text x="{cx}" y="102" text-anchor="middle" font-family="Segoe UI,sans-serif" font-size="11" '
        f'letter-spacing="1.5" fill="#73738a">{label}</text>\n'
    )

svg = (
    f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}">\n'
    f'{cells}</svg>\n'
)
assert stars >= 0 and len(repos) > 0, "implausible data"  # validate BEFORE writing the file
with open("stats.svg", "w") as f:
    f.write(svg)

print(f"stars={stars} repos={len(repos)} followers={profile['followers']} downloads={downloads}")
