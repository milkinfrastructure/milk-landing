# Shantanu personal routines

Use this when Shantanu asks to send a book, paper, or PDF to his Kindle, to load or refresh his Xteink X4 SD card, or to decide where a personal file belongs.

## Where his files live

1. Personal projects, including this routines library, belong in the Tigris bucket `shantanu`, ssg project `personal-skills`.
2. On first pull of a new personal project, set `SASTRUGI_BUCKET=shantanu`. ssg records that bucket. Later commands use the recorded bucket. Do not point an existing milk project at `shantanu`, and do not point a personal project at `milk`.
3. Milk Infrastructure work belongs in the bucket `milk`.
4. If `shantanu` is missing or the key cannot write there, stop. Do not fall back to `milk`.
5. Never copy personal objects into `milk`, and never copy `milk` objects into `shantanu`.
6. A reading copy of Milk work docs may sit on the X4 card under `Milk/`. That folder is not a bucket sync.

## Kindle

1. Draft the email and wait for approval unless he explicitly said to send it.
2. Scribe: `shantanusscribe@kindle.com`. Oasis: `shantanusoasis@kindle.com`. Leave the subject blank.
3. Send from his personal email address. It must be a full address already on his Kindle approved personal-document list. The send history records recipients, not the From address.
4. Attach EPUB, PDF, or DOCX. Do not send MOBI. Keep each attachment under 50 MB, and the whole email within Kindle's 50 MB email limit.
5. Recent titles are in his local Kindle send history (date, recipient, filename). Use that history. Do not paste it into this skill, a chat, or a shared bucket.

## Xteink X4 SD card

Firmware is CrossPoint Reader 1.6.5 (October 2026). It reads EPUB, TXT, BMP, and XTC/XTCH. It does not read PDF or MOBI.

Card folders:

- `Books/<Author>/<Title>.epub`
- `Papers/<topic>/`
- `Milk/` for Milk Infrastructure work docs, kept separate from books and papers

The card is FAT32, not exFAT. A 128 GB card works once it is FAT32. Use FAT-safe ASCII names. Do not add a second folder that differs only by case.

Read-only sources:

- T7 Books, including `Backups/iCloud Backup 9_8_23`
- iCloud Books
- `~/Downloads` for physics and AI research PDFs, and for saved Kindle sends
- Mail attachments
- the Calibre library

Skip audiobooks, DRM-locked files, personal paperwork, and anything the X4 cannot read. Do not modify the sources.

Books:

1. Dedupe by file hash, then by normalized title and author. Keep the best EPUB. An original EPUB beats a conversion. Keep a volume, excerpt, or supplement as its own work.
2. Convert books with Calibre `ebook-convert`.

Papers:

1. Dedupe by arXiv id.
2. Plain prose pages: reflow with k2pdfopt, then make an upright 480x800 four-level grayscale XTCH.
3. Pages with equations, tables, or figures: keep the page layout and add enlarged tiles, then convert those to XTCH. Do not run k2pdfopt full reflow on those pages. Full reflow scrambled tables and matrices.
4. If a conversion leaves body text tiny, splits a table, or reads columns out of order, keep the previous file.

Copy:

1. Verify the filesystem first. If verification fails, stop. Do not repair, format, or write. Eject. Ask him before any erase.
2. Copy into the folders above. Leave `update.bin` and `.crosspoint` in place unless he asked to change firmware or reset reading state.
3. Write a manifest on the card with relative path, size, and sha256. No serials and no private catalog in this skill.
4. Check every copied file's size and sha256 against that manifest.
5. Verify the filesystem again. Remove `._*`, `.DS_Store`, `.Spotlight-V100`, `.fseventsd`, and `.Trashes`. Sync, eject, and confirm the volume is gone.
6. With the X4 off, insert the card and boot. Confirm the library shows, open one book and one paper, shut down, and boot again. Positions and the library should still be there.

Recovery, only if he asks or the reader will not boot:

1. Do not flash firmware while loading books. Stay on CrossPoint 1.6.5 unless he asks to change it.
2. The card install file is `update.bin` at the card root. Do not rename an app or OTA binary to `update.bin`.
3. An in-app SD update works only if the current firmware boots far enough to run it.
4. On a locked unit, the unlocker lists CrossPoint, CrossPoint-KO, and CrossInk. A failed update can need A/B rollback or a serial console. Stop and ask him. Do not flash anything else onto a locked reader.

## Rules

- No secrets, card serials, or private file lists in this skill or in chat.
- Generic paths such as `~/Downloads` are fine.
- Ask before sending email, flashing firmware, or erasing a card, unless he already said to do that one thing.
