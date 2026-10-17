---
title: AutoQA
category: web
summary: "A Quarkus system that drives a real browser through a multi-role LLM pipeline over the Model Context Protocol. Describe a web test in plain English and the agent figures out the rest."
type: academic
role: Capstone project
client: Inetum
tags: [Java, Quarkus, LLMs, MCP, Chrome DevTools MCP, Groq, Gemini]
features: [Plain-English Test Goals, Multi-role LLM Pipeline, Live Debug Dashboard, Benchmark Harness]
cover: ../../assets/projects/autoqa/cover.webp
video: /projects/autoqa/reel.mp4
videoPoster: ../../assets/projects/autoqa/poster.webp
previewClip: /projects/autoqa/reel.mp4
gallery:
  - ../../assets/projects/autoqa/screenshot-1.webp
  - ../../assets/projects/autoqa/screenshot-2.webp
  - ../../assets/projects/autoqa/screenshot-3.webp
  - ../../assets/projects/autoqa/screenshot-4.webp
  - ../../assets/projects/autoqa/screenshot-5.webp
  - ../../assets/projects/autoqa/screenshot-6.webp
  - ../../assets/projects/autoqa/screenshot-7.webp
galleryAlt:
  - "Big Planner: the goal turned into a 7-step plan (navigate, fill the signup form, create account, log in, search, extract) with I like this plan, Keep planning and I want to change something buttons"
  - "Executor mid-run: steps ticked off on the left while the agent's Chrome window shows the test shop dashboard saying Hello, John Doe"
  - "Executor done: 7 steps in 34.8s, every step checked, with per-step overview and the console log"
  - "The multi-role pipeline: BigPlanner makes the plan, then the executor loops through UID Resolver, Verifier and Extractor, all sharing one Chrome session"
  - "Architecture: debug-dashboard spawns mcp-runner, which calls the LLM provider (Groq / Gemini) and drives chrome-devtools-mcp + Chrome; both import shared-models"
  - "RQ3 chart: multi-role versus ReAct passes per scenario, out of 7 models. Multi-role matches or beats ReAct on every form-based scenario"
  - "Five questions, five findings: effectiveness, failures, architecture, model-to-role and reproducibility"
draft: false
---
Web tests written with Selenium, Cypress or Playwright need an explicit selector for every step, so
when a page changes, every related test breaks. About 30% of QA team time goes to maintaining
existing tests rather than finding new defects (2024 Uplevel study).

AutoQA asks a different question: what if you could describe the goal in plain English, and the
agent figured out the rest? Instead of `page.locator('#login-btn').click()`, you write *"Log in with
the test account and verify the dashboard loads."* AutoQA plans the steps, runs them in a real
Chrome browser over the Model Context Protocol, and reports a pass or fail for each step, a
per-attempt LLM trace, a DOM snapshot per attempt, a full structured log and a final verdict.

This was my capstone project, hosted by Inetum: *Multi-Role LLM Orchestration for Automated Web
Test Execution — Design and Evaluation.*

## How it works

- **BigPlanner** breaks the goal into atomic steps. It's called once at the start.
- **The executor** then loops through the plan. For each step, the **UID Resolver** maps it to the
  right element on the page, an MCP action runs it in the browser, the **Verifier** confirms the
  page reacted correctly, and the **Extractor** pulls out structured data on extract steps.
- All LLM calls and MCP tool calls share the same Chrome browser session.
- Each role has its own prompt, and the provider is configurable, so the same test can run with a
  different model per role.

## Three iterations

- **Initial pilot:** a Python prototype, then a C#/.NET port, that generated a full Playwright script
  from the goal in one go. It worked end to end, but couldn't recover when a selector broke and had
  no per-step verification.
- **Quarkus migration with MCP:** a rewrite in Java/Quarkus with the multi-role pipeline, the Model
  Context Protocol in place of custom browser glue, and a provider abstraction.
- **Observability and evaluation:** a debug dashboard with a live view of every LLM call, plan,
  attempt, snapshot, UID resolution and verification; a YAML-driven benchmark harness; and the
  empirical study.

## Results

160 benchmark runs across 7 free-tier LLMs, answering five research questions:

- **Effectiveness:** openai/gpt-oss-120b was the strongest model — the only one that completed every
  cell of the matrix without infrastructure errors.
- **Failures:** 7 distinct failure classes specific to LLM-driven web testing, from rate limits and
  token overflow to the LLM picking the wrong element.
- **Architecture:** the multi-role pipeline matches or beats a single-LLM ReAct baseline on every
  form-based scenario, and extraction scenarios were only satisfied by the multi-role pipeline.
- **Model-to-role:** a surprising negative result — mixing models per role lost to using one model
  everywhere on every form-fill scenario, because the small UID Resolver couldn't produce the JSON
  the pipeline needs.
- **Reproducibility:** at temperature zero, 5 of 6 plans passed every one of 5 runs.

The video shows AutoQA running a signup, login and product-search scenario end to end against a
local test shop, with the dashboard showing each step as it happens.
