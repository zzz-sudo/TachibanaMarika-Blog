source "https://rubygems.org"

# GitHub Pages兼容的Jekyll版本
gem "github-pages", group: :jekyll_plugins

# 主题相关
gem "minimal-mistakes-jekyll"

# Jekyll插件
group :jekyll_plugins do
  gem "jekyll-paginate"
  gem "jekyll-sitemap"
  gem "jekyll-gist"
  gem "jekyll-feed"
  gem "jekyll-include-cache"
end

# Windows和JRuby兼容性
platforms :mingw, :x64_mingw, :mswin, :jruby do
  gem "tzinfo", ">= 1"
  gem "tzinfo-data"
end

# 性能提升
gem "wdm", ">= 0.1.0", :platforms => [:mingw, :x64_mingw, :mswin]
gem "http_parser.rb", ">= 0.6.0", :platforms => [:jruby]

# 锁定Jekyll版本以确保兼容性
gem "jekyll", "~> 4.2.0"
