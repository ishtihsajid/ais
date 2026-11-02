# Fresh Ceramics website: rules for the coding agent

Read `docs/BUILD_PLAN.md` completely before doing anything. It is the source of truth. If this file and the plan disagree, the plan wins.

## Project

A custom coded website for Fresh Ceramics, a Bangladeshi tile brand. Stack: Next.js, Payload CMS with SQLite, Tailwind, GSAP with ScrollTrigger, Lenis. It runs on the owner's laptop and is backed up to a private GitHub repository. The Group's IT team will host it later.

The home page is an immersive scroll narrative called the Journey. Everything else is the Catalogue. Both share one admin panel at `/admin`.

## Operating rules

1. Work in the phases of section 13 of the plan, in order. Do not start a phase before the previous gate passes.
2. At the end of each phase save screenshots (1440x900 and 390x844) and a recorded Journey scroll video in `docs/checkpoints/phaseN/`.
3. Never invent facts. Use only the facts register in section 3 of the plan or content from the CMS. When a fact is missing, write `[OWNER TO SUPPLY: detail]` and add it to `docs/OPEN_ITEMS.md`.
6. Do not hand pin Payload or Next.js. Use `npx create-payload-app`, choose SQLite, read the installation page of the version installed, and check the Node version against it.
7. No paid service, no account creation, no external CDN, no external font service, no analytics. The only external request allowed at runtime is map tiles.
8. Commit often with clear messages. Never commit `media/`, `data/`, `assets/inbox/` or `.env`.
9. Every routine action for the owner must be one double click or one short command, and every error message must say in plain words what to do next.

## Design rules

1. Never use flat black. The darkest backgrounds are `--ember` and `--stone`.
2. Never avoid the brand colours: red, deep grey, grey. Do not use competitor hues as flat colour fields.
3. Follow the logo rules: the header logo sits on a solid red plate with the white logo, and the logo never sits on moving imagery.
4. Every scroll beat has an arrive, a hold and a depart. Do not skip the holds.
5. Square corners everywhere.

## Copy rules

1. No em dashes in any copy. No hype adjectives. No rhyming or mirrored sentence pairs.
2. Every English string accepts an optional Bengali translation and falls back to English.
3. Claims such as sales leadership are stored in the `Claims` collection with an as of date. Do not hard code them.
4. Do not use any item in section 3.8 of the plan.

## Done means

A phase is done only when its gate in section 13 passes and `npm run check` is green. Report what passed, what failed and what you assumed, in plain sentences.
