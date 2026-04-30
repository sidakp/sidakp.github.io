---
layout: default
title: Sidak Plaha
description: MEng Aerospace Engineering student at Queen Mary University of London — composites, CFD/FEA, and orbital mechanics.
---

<!-- HERO -->
<section class="hero">
  <div class="wrap hero__grid">
    <div>
      <p class="eyebrow reveal"><span class="dot"></span>MEng Aerospace · Queen Mary, London</p>
      <h1 class="hero__title reveal delay-1">
        Things that <em>fly</em><br>
        and <em>orbit</em>.
      </h1>
      <p class="lead reveal delay-2">
        I'm Sidak — a fourth-year aerospace engineering student designing
        carbon-fibre bodywork for Formula Student and researching fuel-efficient
        orbital transfers for active space-debris removal.
      </p>
      <div class="hero__meta reveal delay-3">
        <div><span>Based</span><span>London, UK</span></div>
        <div><span>Current</span><span>Senior Composites, QMFS</span></div>
        <div><span>Research</span><span>J2 Precession Transfers</span></div>
      </div>
    </div>
    <div class="hero__diagram reveal delay-2">
      <div class="diagram-title">FIG. 01 — J2 DIFFERENTIAL PRECESSION</div>
      <svg viewBox="0 0 520 520" aria-hidden="true" id="orbitSvg">
        <defs>
          <radialGradient id="earth" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="var(--paper-2)"/>
            <stop offset="100%" stop-color="var(--paper-3)"/>
          </radialGradient>
        </defs>
        <g stroke="var(--rule)" stroke-width="0.5" fill="none" opacity="0.6">
          <line x1="260" y1="40" x2="260" y2="480"/>
          <line x1="40" y1="260" x2="480" y2="260"/>
          <circle cx="260" cy="260" r="60" stroke-dasharray="2 4"/>
          <circle cx="260" cy="260" r="220" stroke-dasharray="2 4"/>
        </g>
        <circle cx="260" cy="260" r="55" fill="url(#earth)" stroke="var(--ink)" stroke-width="1"/>
        <text x="260" y="264" text-anchor="middle" class="diagram-label" style="font-size:10px">EARTH</text>
        <ellipse cx="260" cy="260" rx="180" ry="90" fill="none" stroke="var(--ink)" stroke-width="1" transform="rotate(-18 260 260)"/>
        <ellipse cx="260" cy="260" rx="180" ry="90" fill="none" stroke="var(--accent)" stroke-width="1.25" stroke-dasharray="3 3" transform="rotate(22 260 260)"/>
        <g stroke="var(--ink-3)" stroke-width="0.5" fill="none">
          <line x1="260" y1="260" x2="420" y2="160"/>
          <line x1="260" y1="260" x2="140" y2="380"/>
        </g>
        <text x="425" y="155" class="diagram-label">CHASER</text>
        <text x="95" y="395" class="diagram-label" fill="var(--accent-ink)">DEBRIS</text>
        <circle id="sat1" r="4" fill="var(--ink)"/>
        <circle id="sat2" r="4" fill="var(--accent)"/>
        <text x="260" y="30" text-anchor="middle" class="diagram-label">ASCENDING NODE</text>
        <text x="260" y="500" text-anchor="middle" class="diagram-label">Δλ = −86% ΔV</text>
      </svg>
      <div class="diagram-caption">
        <span>RAAN drift · Δλ</span>
        <span>LIVE</span>
      </div>
    </div>
  </div>
</section>

<!-- MARQUEE STRIP -->
<div class="strip" aria-hidden="true">
  <div class="strip__track">
    <span>Composites · Resin Infusion · CFD · FEA · Orbital Mechanics · Python · Carbon Fibre · ANSYS · Formula Student · J2 Precession · CES EduPack · CAD · Wind Tunnel</span>
    <span>Composites · Resin Infusion · CFD · FEA · Orbital Mechanics · Python · Carbon Fibre · ANSYS · Formula Student · J2 Precession · CES EduPack · CAD · Wind Tunnel</span>
  </div>
</div>

<!-- INTRO -->
<section class="intro">
  <div class="wrap intro__grid">
    <div class="mono reveal">§ 01 — PROFILE</div>
    <div>
      <p class="reveal delay-1">I work at the intersection of <em>material intuition</em> and <em>orbital maths</em>.</p>
      <p class="lead reveal delay-2" style="font-family:var(--f-body); font-size:1.15rem; color:var(--ink-2); margin-top:2rem;">
        My Formula Student bodywork dropped the car's mass by 18% and
        secured sponsored resin from Gurit. In parallel I'm developing a Python
        simulation that uses Earth's oblateness to cut debris-chaser fuel cost
        by 86%. I like problems where a small physical insight reshapes the
        whole engineering budget.
      </p>
    </div>
  </div>
</section>

<!-- SELECTED WORK -->
<section class="work wrap">
  <div class="work__head reveal">
    <h2>Selected <em>work</em>.</h2>
    <div class="mono">§ 02 — 2023 / 2026</div>
  </div>

  <div class="work__list">
    {% assign ordered = site.projects | sort: "order" %}
    {% for p in ordered %}
    <a class="work__item reveal{% if forloop.index0 > 0 %} delay-{{ forloop.index0 }}{% endif %}" href="{{ p.url | relative_url }}">
      <div class="work__num">{{ p.number }} /</div>
      <div>
        <h3 class="work__title">{{ p.card_title }}</h3>
        <p class="work__desc">{{ p.card_desc }}</p>
      </div>
      <div class="work__tag">{{ p.tags_line }}</div>
      <div class="work__year">{{ p.years }}</div>
      <div class="work__arrow">→</div>
    </a>
    {% endfor %}
  </div>
</section>

<!-- NOW -->
<section class="now">
  <div class="wrap now__grid">
    <div class="reveal">
      <div class="now__head"><span class="pulse"></span>Currently</div>
      <p class="now__big">Simulating <em>differential node drift</em> for a multi-target debris chaser — refining ΔV budgets against realistic J2 secular rates.</p>
      <div class="now__meta">Python + poliastro · sidakp/j2-adr</div>
    </div>
    <div class="reveal delay-1">
      <div class="now__head">Next</div>
      <p class="now__big">Handing over the Formula Student <em>CBOM</em> &amp; mentoring the next composites cohort for Silverstone 2026.</p>
      <div class="now__meta">QMFS · Silverstone — Jul 2026</div>
    </div>
  </div>
</section>

<!-- CAPABILITIES -->
<section class="caps wrap">
  <div class="caps__head reveal">
    <div class="mono" style="margin-bottom:0.8rem">§ 03 — Capabilities</div>
    <h2 style="font-family:var(--f-display); font-size:clamp(2rem,4vw,3rem); margin:0; font-weight:400; letter-spacing:-0.01em;">
      A toolkit somewhere between <em class="italic-accent">workshop floor</em> and <em class="italic-accent">orbital sim</em>.
    </h2>
  </div>
  <div class="caps__grid">
    {% for group in site.data.skills %}
    <div class="caps__cell reveal{% if forloop.index0 > 0 %} delay-{{ forloop.index0 }}{% endif %}">
      <div class="num">/ {{ forloop.index | prepend: '0' | slice: -2, 2 }}</div>
      <h3>{{ group.group }}</h3>
      <ul>
        {% for item in group.items %}<li>{{ item }}</li>{% endfor %}
      </ul>
    </div>
    {% endfor %}
  </div>
</section>
