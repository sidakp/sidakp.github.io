---
layout: project
title: J2 Debris Removal — Sidak Plaha
description: Independent research — passive orbital plane alignment for a debris chaser via Earth's J2 perturbation.
order: 2
number: "02"
short_title: J2 Research
title_html: "Active space-debris removal via <em>J2 drift</em>."
card_title: "Active space-debris removal via <em>J2</em> drift"
card_desc: "Independent research — a Python simulation using Earth's oblateness to align a chaser with debris, reducing ΔV by 86% compared to impulsive manoeuvres."
list_title: "<em>J2</em> debris removal"
list_desc: "Independent research on passive orbital-plane alignment for a debris chaser — 86% ΔV reduction vs. impulsive baseline."
tags_line: "Python · Orbital Mechanics"
years: "2025 — Present"
lead: "An independent research project: exploit Earth's oblateness to passively walk a chaser spacecraft's orbital plane onto a debris target — cutting the rendezvous fuel cost by an order of magnitude."
meta:
  - label: Role
    value: Independent researcher
  - label: Collaborators
    value: Multi-researcher ADR mission
  - label: Dates
    value: "Sept 2025 — Present"
  - label: Stack
    value: "Python · Orbital Mechanics · Git"
next:
  label: "Next project · 03 / 04"
  url: "/projects/academic/"
  title_html: "Mercedes F1 <em>camshaft bearings</em> &amp; aerofoil testing"
permalink: /projects/j2-debris/
---

<div style="aspect-ratio:1/1; max-width:640px; margin:3rem auto; position:relative;">
  <svg viewBox="0 0 600 600" style="width:100%; height:100%; display:block;">
    <rect x="10" y="10" width="580" height="580" fill="none" stroke="var(--rule)"/>
    <g stroke="var(--rule)" stroke-width="0.5">
      <line x1="10" y1="300" x2="590" y2="300" stroke-dasharray="2 4"/>
      <line x1="300" y1="10" x2="300" y2="590" stroke-dasharray="2 4"/>
    </g>
    <circle cx="300" cy="300" r="80" fill="var(--paper-2)" stroke="var(--ink)"/>
    <ellipse cx="300" cy="300" rx="80" ry="30" fill="none" stroke="var(--ink-3)" stroke-width="0.5" stroke-dasharray="2 3"/>
    <text x="300" y="305" text-anchor="middle" class="diagram-label" style="font-size:10px">EARTH · J2</text>
    <ellipse cx="300" cy="300" rx="240" ry="120" fill="none" stroke="var(--ink)" stroke-width="1.2" transform="rotate(-30 300 300)"/>
    <ellipse cx="300" cy="300" rx="240" ry="120" fill="none" stroke="var(--ink)" stroke-width="0.5" opacity="0.4" transform="rotate(-15 300 300)"/>
    <ellipse cx="300" cy="300" rx="240" ry="120" fill="none" stroke="var(--ink)" stroke-width="0.5" opacity="0.25" transform="rotate(0 300 300)"/>
    <ellipse cx="300" cy="300" rx="240" ry="120" fill="none" stroke="var(--accent)" stroke-width="1.4" stroke-dasharray="4 3" transform="rotate(25 300 300)"/>
    <g fill="var(--accent-ink)" stroke="var(--accent-ink)" stroke-width="0.5">
      <path d="M 420 150 Q 460 180 470 220" fill="none" stroke-width="1"/>
      <polygon points="466,215 475,225 470,230"/>
    </g>
    <text x="480" y="215" class="diagram-label" fill="var(--accent-ink)">Ω̇ DRIFT</text>
    <text x="300" y="40" text-anchor="middle" class="diagram-label">ASCENDING NODE</text>
    <text x="300" y="575" text-anchor="middle" class="diagram-label">Δi · Δa · Δe</text>
    <text x="30" y="300" class="diagram-label" transform="rotate(-90 30 300)">EQUATORIAL PLANE</text>
    <text x="495" y="400" class="diagram-label">CHASER (t₀ → t₁ → t₂)</text>
    <text x="90" y="450" class="diagram-label" fill="var(--accent-ink)">DEBRIS TARGET</text>
  </svg>
  <div class="mono" style="text-align:center; margin-top:0.5rem">FIG. 02 — PLANE-WALKING VIA SECULAR RAAN DRIFT</div>
</div>

<div class="project-section">
  <div class="project-body__grid">
    <div class="mono reveal">§ Thesis</div>
    <div class="reveal delay-1">
      <h2>The <em>physics</em>.</h2>
      <p>Earth is not a sphere. Its equatorial bulge — captured in the <em class="ink">J₂</em> coefficient — torques every satellite's orbital plane at a rate that depends on altitude and inclination. Most missions fight this drift. I'm using it.</p>
      <p>By picking a chaser altitude where its right-ascension-of-the-ascending-node drifts at a <em class="ink">different rate</em> from a target debris object, the two planes naturally close on each other. Given time, the chaser can be delivered to the debris plane for almost zero propellant — a cold rendezvous paid for in patience instead of ΔV.</p>
    </div>
  </div>
</div>

<div class="stats reveal">
  <div class="stats__cell"><span class="n">−86%</span><span class="l">ΔV vs. impulsive plane change</span></div>
  <div class="stats__cell"><span class="n">J₂</span><span class="l">Secular precession exploited passively</span></div>
  <div class="stats__cell"><span class="n">Py</span><span class="l">Full simulation pipeline in Python</span></div>
</div>

<div class="project-section">
  <div class="project-body__grid">
    <div class="mono reveal">§ Build</div>
    <div class="reveal delay-1">
      <h2>What I'm <em>building</em>.</h2>
      <p>A Python simulation that takes a debris catalogue and a chaser bus definition, then searches for parking orbits whose J2-induced RAAN rate aligns the chaser with each target within a mission horizon. It costs every trajectory in ΔV budget, time-to-rendezvous, and station-keeping propellant.</p>
      <p>The work is my contribution to a broader multi-researcher active-debris-removal study — I own the plane-walking transfer strategy, other collaborators handle capture mechanisms and reentry disposal.</p>
    </div>
  </div>

  <div class="gallery">
    <div class="gallery__item reveal"><div class="corners"></div><span>RAAN drift vs. altitude</span></div>
    <div class="gallery__item reveal delay-1"><div class="corners"></div><span>ΔV budget comparison</span></div>
    <div class="gallery__item reveal delay-2"><div class="corners"></div><span>Multi-target routing tree</span></div>
    <div class="gallery__item reveal delay-3"><div class="corners"></div><span>Debris catalogue subset</span></div>
  </div>
</div>

<p class="pull reveal">Fuel is <em>always</em> the problem. If you can trade propellant for patience, the mission economics invert — and a fleet of small chasers starts to make sense.</p>

<div class="project-section">
  <div class="project-body__grid">
    <div class="mono reveal">§ Status</div>
    <div class="reveal delay-1">
      <h2>Where it's at.</h2>
      <table class="spec">
        <tr><th>Simulation</th><td>ΔV &amp; time-to-rendezvous estimator operational</td></tr>
        <tr><th>Validation</th><td>Benchmarked against impulsive Hohmann + plane-change baselines</td></tr>
        <tr><th>Current result</th><td>86% ΔV reduction vs. impulsive manoeuvre on benchmark case</td></tr>
        <tr><th>Next</th><td>Multi-target routing &amp; station-keeping penalty</td></tr>
        <tr><th>Repo</th><td><a href="https://github.com/sidakp/j2-adr" target="_blank" rel="noopener" style="border-bottom:1px solid var(--ink-3)">sidakp/j2-adr ↗</a></td></tr>
      </table>
    </div>
  </div>
</div>
