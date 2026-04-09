---
layout: default
title: Sidak Plaha
description: MEng Aerospace Engineering student at Queen Mary University of London — composites, CFD/FEA, and orbital mechanics.
---

<!-- HERO -->
<section class="hero">
  <div class="container hero__inner">
    <p class="hero__eyebrow">Aerospace Engineering · Queen Mary University of London</p>
    <h1 class="hero__title">Hi, I'm Sidak Plaha.</h1>
    <p class="hero__lead">
      MEng student building things that fly and orbit — from carbon-fibre Formula
      Student bodywork to fuel-efficient orbital transfers for active space debris
      removal.
    </p>
    <div class="hero__actions">
      <a class="btn btn--primary" href="{{ '/assets/cv/Sidak-Plaha-CV.pdf' | relative_url }}" download>
        Download CV
      </a>
      <a class="btn btn--ghost" href="mailto:{{ site.email }}">Get in touch</a>
    </div>
  </div>
</section>

<!-- ABOUT -->
<section id="about" class="section">
  <div class="container">
    <h2 class="section__title">About</h2>
    <div class="prose">
      <p>
        I'm an MEng (Hons) Aerospace Engineering student at Queen Mary University
        of London with hands-on experience in composites manufacturing, CFD/FEA,
        and orbital mechanics. I'm currently the Senior Composites Design
        Engineer for QMUL Formula Student, where I led the design and manufacture
        of the team's carbon-fibre aerodynamic bodywork.
      </p>
      <p>
        Outside the team I run an independent research project on active space
        debris removal using J2 differential precession, and I tutor 11+, GCSE,
        A-Level, and IB students in maths and science.
      </p>
    </div>
  </div>
</section>

<!-- EDUCATION -->
<section id="education" class="section section--alt">
  <div class="container">
    <h2 class="section__title">Education</h2>
    <div class="cards">
      {% for edu in site.data.education %}
      <article class="card">
        <header class="card__header">
          <h3 class="card__title">{{ edu.institution }}</h3>
          <span class="card__meta">{{ edu.start }} – {{ edu.end }}</span>
        </header>
        <p class="card__subtitle">{{ edu.degree }} · {{ edu.location }}</p>
        {% if edu.grade %}<p class="card__grade">{{ edu.grade }}</p>{% endif %}
        {% if edu.highlights %}
        <ul class="card__list">
          {% for h in edu.highlights %}<li>{{ h }}</li>{% endfor %}
        </ul>
        {% endif %}
      </article>
      {% endfor %}
    </div>
  </div>
</section>

<!-- EXPERIENCE -->
<section id="experience" class="section">
  <div class="container">
    <h2 class="section__title">Experience</h2>
    <div class="cards">
      {% for job in site.data.experience %}
      <article class="card">
        <header class="card__header">
          <h3 class="card__title">{{ job.role }}</h3>
          <span class="card__meta">{{ job.start }} – {{ job.end }}</span>
        </header>
        <p class="card__subtitle">{{ job.organisation }} · {{ job.location }}</p>
        {% if job.tags %}
        <p class="card__tags">
          {% for t in job.tags %}<span class="tag">{{ t }}</span>{% endfor %}
        </p>
        {% endif %}
        {% if job.highlights %}
        <ul class="card__list">
          {% for h in job.highlights %}<li>{{ h }}</li>{% endfor %}
        </ul>
        {% endif %}
      </article>
      {% endfor %}
    </div>
  </div>
</section>

<!-- PROJECTS -->
<section id="projects" class="section section--alt">
  <div class="container">
    <h2 class="section__title">Projects &amp; Research</h2>
    <div class="cards">
      {% for project in site.data.projects %}
      <article class="card">
        <header class="card__header">
          <h3 class="card__title">{{ project.title }}</h3>
          <span class="card__meta">{{ project.start }} – {{ project.end }}</span>
        </header>
        <p class="card__subtitle">{{ project.type }}</p>
        {% if project.tags %}
        <p class="card__tags">
          {% for t in project.tags %}<span class="tag">{{ t }}</span>{% endfor %}
        </p>
        {% endif %}
        <p class="card__body">{{ project.description }}</p>
        {% if project.link %}
        <p>
          <a class="card__link" href="{{ project.link }}" target="_blank" rel="noopener">
            {{ project.link_label | default: "View project" }} &rarr;
          </a>
        </p>
        {% endif %}
      </article>
      {% endfor %}
    </div>
  </div>
</section>

<!-- SKILLS -->
<section id="skills" class="section">
  <div class="container">
    <h2 class="section__title">Skills</h2>
    <div class="skills">
      {% for group in site.data.skills %}
      <div class="skills__group">
        <h3 class="skills__heading">{{ group.group }}</h3>
        <ul class="skills__list">
          {% for item in group.items %}<li class="tag tag--lg">{{ item }}</li>{% endfor %}
        </ul>
      </div>
      {% endfor %}
    </div>
  </div>
</section>
