# ssg skill test — pixel mascot logos

Fresh agent, no prior Milk context. Workspace is the Milk landing repo. All new files are under `ssg-skill-test/`. No existing file was edited. No `ssg send`. Slack, Linear, and the `milk` bucket were not modified.

Date: 2026-10-17. CLI after bootstrap: `sastrugi 2.2`.

## Scoreboard

| Step | Result |
| --- | --- |
| 1. Bootstrap from `s3://milk/onboard/agent/bootstrap-agent.sh` and install `ssg` | **Pass, after one workaround.** The script itself exited 0. |
| 2. `ssg pull milk-skills`, list skills, read `pixel-mascot-avatar.md` | **Pass.** |
| 3. New animal mascot, full PNG plus 64px and 32px | **Pass.** |
| 4. Milk carton Slack logo, full / 512 / 132 / 32, plus contact sheet | **Pass.** First carton generation violated the skill's "no text" rule and was regenerated. |
| 5. Commit images and this report. Do not merge, send, or touch Slack / Linear / the bucket | **Pass.** |

## Main friction

1. `s3://milk/onboard/agent/bootstrap-agent.sh` is not a URL. Nothing in the task or the script header says the endpoint is `https://t3.storage.dev`, the SigV4 region is `auto`, or that curl `--aws-sigv4` is the client. That curl line lives in `milk-onboard/README.md`, which you can only read after a successful bootstrap.
2. A fresh shell does not have `ssg` on `PATH` after the script exits. The script appends the export to `~/.bashrc` and `~/.zshrc`, which a non-interactive agent shell does not reload.
3. The image tool returns a 1024×1024 JPEG of anti-aliased "pixel-looking" art. The skill never says to reduce it to a real pixel grid, so a naive 32px resize is mush. Pillow was not installed.
4. Neither the skill nor the `milk` bucket contains the existing carton. The only carton file found was this repo's `milk-carton.png`. The first generation copied the word MILK off that reference.

## Step 1 — Bootstrap

### What was already true

Injected secret **names** (values never printed): `SASTRUGI_ACCESS_KEY_ID`, `SASTRUGI_SECRET_ACCESS_KEY`, `LINEAR_API_KEY`.

Both Sastrugi variables were set and non-empty. `LINEAR_API_KEY` was set, so the script's optional `ssg milk status` ran. `curl` was 8.5.0 (the script requires `>= 7.75` for `--aws-sigv4`). `python3` and `git` were present. `aws` was not installed. Pillow was not installed.

### Commands and failures

Unsigned GET, no credentials, to confirm the object existed:

```
GET https://t3.storage.dev/milk/onboard/agent/bootstrap-agent.sh
GET https://milk.t3.storage.dev/onboard/agent/bootstrap-agent.sh
GET https://fly.storage.tigris.dev/milk/onboard/agent/bootstrap-agent.sh
GET https://milk.fly.storage.tigris.dev/onboard/agent/bootstrap-agent.sh
```

All four returned HTTP 403 from `Tigris OS`, body:

```xml
<Error><Code>AccessDenied</Code><Message>Access Denied.</Message>
<Key>onboard/agent/bootstrap-agent.sh</Key><BucketName>milk</BucketName></Error>
```

That is an auth failure, not a missing object. A fresh agent that treats 403 as "bad key" will stop here even when the key is valid and only the signature is missing.

### Workaround

Signed a path-style GET with the injected `SASTRUGI_*` values as SigV4 credentials, region `auto`, host `t3.storage.dev`:

```
GET https://t3.storage.dev/milk/onboard/agent/bootstrap-agent.sh
```

HTTP 200, 2271 bytes, `content-type: binary/octet-stream`. Saved outside the repo and executed:

```
curl --version
bash bootstrap-agent.sh
```

`EXIT=0`.

The script then did what it says: wrote `~/sastrugi/identity/keys/tigris_shared.env` (mode 0600) and, because `LINEAR_API_KEY` was set, `linear.env`. Those files stayed in `$HOME`. They were not copied into this repo. It downloaded `onboard/abhinav/abhinav-onboard.zip`, installed the launcher at `~/.local/bin/ssg`, pulled `sastrugi`, `munitions`, `milk-skills`, and `milk-onboard`, and printed `sastrugi 2.2`.

`ssg milk resolve munitions` printed `https://linear.app/milkinfra/issue/MIL-206`.

`ssg milk status` (read-only) printed drift and exited 0. Nothing was written to Linear:

```
munitions: drift; 1 folders without tickets, 0 tickets without folders, 12 outdated file lists, 0 other changes, map update needed
  missing ticket munitions/b-targets/datasets
milk-skills: drift; 0 folders without tickets, 0 tickets without folders, 1 outdated file lists, 0 other changes
  file list milk-skills
milk-onboard: drift; ... file list milk-onboard
sastrugi: drift; ... file list sastrugi
```

### Fixes for the bootstrap

Put this exact fetch in the first comment of `bootstrap-agent.sh`, and in whatever prompt sends an agent to the bucket. Do not make the agent discover it from `milk-onboard` after the fact.

```sh
curl -fsS --aws-sigv4 "aws:amz:auto:s3" \
  --user "${SASTRUGI_ACCESS_KEY_ID}:${SASTRUGI_SECRET_ACCESS_KEY}" \
  -o /tmp/bootstrap-agent.sh \
  https://t3.storage.dev/milk/onboard/agent/bootstrap-agent.sh
bash /tmp/bootstrap-agent.sh
export PATH="$HOME/.local/bin:$PATH"
```

Also state, in that same header:

- Endpoint `https://t3.storage.dev`, region `auto`, bucket `milk`, path-style. `s3://milk/...` is not runnable. An unsigned GET returns 403 AccessDenied, which means "sign the request," not "the key is wrong."
- Required secret names are `SASTRUGI_ACCESS_KEY_ID` and `SASTRUGI_SECRET_ACCESS_KEY`. `LINEAR_API_KEY` is optional and only used by `ssg milk status` / `ssg milk link`. The AWS CLI is not required and is not present on a fresh cloud VM.
- The script updates `~/.bashrc` and `~/.zshrc`, but the current non-interactive shell still needs `export PATH="$HOME/.local/bin:$PATH"`. Print that line at the end.
- `ssg milk status` is read-only and may report drift. A test agent should not "fix" it.

## Step 2 — `ssg pull milk-skills`

```
export PATH="$HOME/.local/bin:$PATH"
ssg pull milk-skills
```

Exit 0. Stdout empty. Stderr:

```
sastrugi: up to date or local saves are ahead
```

The bootstrap had already pulled it, so this is "already current." The wording also covers "local saves are ahead," which was not the case. Split those messages.

Skills received (only these two files; no images, no `SKILL.md` directory):

- `pixel-mascot-avatar.md`
- `self-register-email-and-slack.md`

`ssg help` worked and did not call Linear. It documents `pull`, `sync`, `send`, `save`, and `milk status`. There is no command to list raw bucket keys, so finding a mascot asset meant a separate signed `ListObjectsV2`.

Read-only list of `s3://milk/` top-level prefixes: `_test/`, `identity/`, `munitions/`, `objects/`, `onboard/`, `p/`. Under `p/`: `milk-onboard/`, `milk-skills/`, `munitions/`, `sastrugi/`. Prefix searches for `carton`, `mascot`, `logo`, `pixel`, `milk-carton`, `avatar`, and `png` returned no keys. The carton is not a named object in the bucket.

## Step 3 and 4 — follow `pixel-mascot-avatar.md`

The skill's required prompt (filled in, not rewritten) is:

> A pixel-art app icon in a 16-bit Metal Slug / SNK arcade sprite style: a bold, chunky &lt;SUBJECT&gt; head mascot facing forward, with an expressive face. Clean limited color palette, crisp large pixels, strong readable silhouette that works at very small sizes. Simple solid or subtle-gradient background (dark navy or a brand color). Optional tiny pixel &lt;ACCENT&gt; accent. Centered, high contrast, chunky black pixel outline. No text.

Subjects used:

- Animal: axolotl head. Accent: pink external gills. Friendlier end of the skill's tip ("big round warm eyes").
- Milk: a new carton head based on `milk-carton.png` in this repo (pink `#ed2d6c`, teal `#00a092`). Pushed further toward Metal Slug as the task asked: thicker outline, chunkier pixels, angled brows, small smirk.

The skill's step 3 says to show the image and offer one tweak round. This run was non-interactive and the task already specified the tweaks, so those were applied in the prompt instead of waiting. Step 4 says to upload to Slack profile settings. That was not done. The task forbids Slack changes, and the companion skill says never to post through the owner session.

### What the skill does not say, and what broke

- "Ask what the mascot should be" has no branch for "the task already named it."
- "Optional tiny pixel &lt;ACCENT&gt; accent" is redundant and easy to misread.
- No brand hex values, and no path to the carton. The reference had to come from the landing repo, not the skill or the bucket.
- "No text" was not enough. The first carton generation, given `milk-carton.png` as a reference, drew a MILK label and a barcode. A second generation with an explicit blank face, no letters, and a thicker outline came back clean. The skill should say: if the reference contains lettering, say "blank face, no letters, no label, no barcode" or the model copies the word.
- The generator saved `filename: ...png` as a 1024×1024 JPEG. The skill should require PNG and a real pixel grid: box-filter to 64×64, quantize to at most 16 colors, dither off, one background color, then nearest-neighbor only. Check the 32×32 frame and regenerate if the eyes or the silhouette disappear.
- It does not name avatar sizes. 132 is not an integer multiple of 64. Stretching with nearest-neighbor makes 2px and 3px blocks. The 132px files are the 64px sprite nearest-scaled to 128 and centered on a 132 canvas (2px of the same background). Pixels stay even.
- Step 4 should say the local PNGs are the result unless the user explicitly asks to upload, and that upload belongs to the bot's own Slack session. A test stops before `ssg send`.

### Workaround for the pixels

Installed Pillow with `pip3 install --user pillow`. Each master is a 64×64 median-cut quantize (dither off) of the generated JPEG, with the background flood-filled to the corner color. Exports are nearest-neighbor. Axolotl master: 11 colors, background `(0, 19, 62)`. Carton master: 13 colors, background `(12, 18, 42)`.

Full size is 1024, which is the generator's canvas and an exact 16× nearest scale of the 64px grid, so the chunky pixels survive when the file is viewed large.

Checked by eye at 64, 32, and 132 (nearest zooms) and on the contact sheet:

- Axolotl at 32px still has both eyes, the smile, the gills, and the black outline.
- Carton at 32px still reads as a gable-top carton with a face, pink roof, and teal drop. The tiny smirk is the first thing to go, which is expected at 32.

## Files

| File | Pixels |
| --- | --- |
| `logos/axolotl-full.png` | 1024 |
| `logos/axolotl-512.png` | 512 |
| `logos/axolotl-132.png` | 132 |
| `logos/axolotl-64.png` | 64 |
| `logos/axolotl-32.png` | 32 |
| `logos/milk-carton-full.png` | 1024 |
| `logos/milk-carton-512.png` | 512 |
| `logos/milk-carton-132.png` | 132 |
| `logos/milk-carton-64.png` | 64 |
| `logos/milk-carton-32.png` | 32 |
| `logos/contact-sheet.png` | 2148×2128, both logos at 1024, 512, 132, 64, and 32 |

512 and 64 of the other mascot are included so the sheet can show both at every size. The task's required set is full/64/32 for the axolotl and full/512/132/32 for the carton.

Same PNGs are copied to the run artifacts directory.
