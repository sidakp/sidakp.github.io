# sidakp.github.io

Personal website of Sidak Plaha — MEng Aerospace Engineering at Queen Mary University of London.

Built with [Jekyll](https://jekyllrb.com/) and hosted on GitHub Pages at <https://sidakp.github.io>.

## Editing content

All site content lives in YAML files under `_data/` so you don't have to touch any HTML to update the site:

- `_data/education.yml` — degrees and academic highlights
- `_data/experience.yml` — work experience entries
- `_data/projects.yml` — research and personal projects
- `_data/skills.yml` — grouped skill lists

To replace the downloadable CV, drop a new PDF at `assets/cv/Sidak-Plaha-CV.pdf` (keeping the filename the same).

## Run locally

Requires Ruby 3.x and Bundler.

```bash
bundle install
bundle exec jekyll serve
```

Then open <http://localhost:4000>.

## Deploy

Push to the `main` branch of `sidakp/sidakp.github.io` — GitHub Pages rebuilds automatically.
