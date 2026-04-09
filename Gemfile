source "https://rubygems.org"

# Use the github-pages gem so the local build matches what GitHub Pages runs.
# This pins jekyll, kramdown, and all supported plugins to the same versions
# GitHub uses to build your site.
gem "github-pages", group: :jekyll_plugins

# Plugins (already bundled with github-pages, listed for clarity)
group :jekyll_plugins do
  gem "jekyll-feed"
  gem "jekyll-seo-tag"
end

# Windows / JRuby compatibility — harmless on macOS
gem "tzinfo-data", platforms: [:mingw, :mswin, :x64_mingw, :jruby]
gem "wdm", "~> 0.1.1", platforms: [:mingw, :mswin, :x64_mingw]

# Lock http_parser.rb for JRuby
gem "http_parser.rb", "~> 0.6.0", platforms: [:jruby]
