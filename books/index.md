---
layout: archive
title: "Books and nerdy stuff"
date:
modified:
excerpt:
image:
  feature: feature_images/books-resized.jpg
ads: false
share: false
---
<div class="tiles">
{% for post in site.categories.books %}
  {% include post-grid.html %}
{% endfor %}
</div><!-- /.tiles -->
