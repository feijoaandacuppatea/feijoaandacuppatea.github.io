---
layout: archive
title: "DIY and crafty things"
date:
modified:
excerpt:
image:
  feature: feature_images/leaf-resized.jpg
ads: false
share: false
---
<div class="tiles">
{% for post in site.categories.crafts %}
  {% include post-grid.html %}
{% endfor %}
</div><!-- /.tiles -->
