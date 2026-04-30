---
layout: default
title: Work — Sidak Plaha
description: Selected projects — composites, orbital mechanics, academic research, tutoring.
permalink: /work/
---

<section class="index-head wrap">
  <p class="eyebrow reveal"><span class="dot"></span>Four projects · 2022 — 2026</p>
  <h1 class="reveal delay-1">A decade in, a <em>practice</em> forming.</h1>
  <p class="lead reveal delay-2">
    Composites, orbital mechanics, academic research, and the tutoring
    practice that runs quietly in parallel. Pick one.
  </p>
</section>

<section class="wrap">
  <div class="p-list">
    {% assign ordered = site.projects | sort: "order" %}
    {% for p in ordered %}
    <a class="p-row reveal{% if forloop.index0 > 0 %} delay-{{ forloop.index0 }}{% endif %}" href="{{ p.url | relative_url }}">
      <div class="p-num">{{ p.number }} / {{ ordered.size | prepend: '0' | slice: -2, 2 }}</div>
      <div>
        <h3 class="p-title">{{ p.list_title }}</h3>
        <div class="p-tags">{{ p.tags_line }}</div>
      </div>
      <div class="p-desc">{{ p.list_desc }}</div>
      <div class="p-year">{{ p.years | upcase }}</div>
      <div class="p-arrow">→</div>
    </a>
    {% endfor %}
  </div>
</section>
