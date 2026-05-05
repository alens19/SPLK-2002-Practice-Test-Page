# SPLK-2002-Practice-Test-Page
Vibecoded page | Practica para SPLK  - 2002 Architect Cert

# SPLK-2002 — Architect Certification Drill

> Practice tool for the **Splunk SPLK-2002 Splunk Enterprise Certified Architect** exam.  
> 90 verified questions · 3 study modes · No backend, no login, no cost.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-GitHub%20Pages-orange?style=flat-square)](https://yourusername.github.io/splk-drill)
![Questions](https://img.shields.io/badge/Questions-90-orange?style=flat-square)
![Passing](https://img.shields.io/badge/Passing%20Score-70%25-green?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-blue?style=flat-square)

---

## ✔ Verified Content

All answers were cross-validated against the **ExamTopics community forum** and **Splunk's official documentation**. This is an independent community study resource — not affiliated with or endorsed by Splunk Inc.

---

## 🎯 Study Modes

| Mode | Description |
|------|-------------|
| ⚡ **Quick Drill** | 10 random questions with instant feedback. Best for daily warmup. |
| ◈ **Flashcards** | All 90 questions, flip to reveal answer. Self-paced review. |
| ◉ **Full Exam** | All 90 questions scored with timer. Simulates real exam conditions. |

---

## 📚 Topics Covered

- Indexer clustering (replication factor, search factor, multi-site)
- Search Head Clustering (captain election, deployer, Raft consensus)
- Forwarder management & deployment server
- License management & architecture
- Data pipeline & props.conf / transforms.conf
- KV Store configuration
- Monitoring Console & troubleshooting
- Deployment planning & sizing
- Performance tuning (pipelines, RAID, hardware specs)
- Security configuration

---

## 🚀 Quick Start

No installation needed. Just open `index.html` in a browser — or visit the live hosted version.

```bash
git clone https://github.com/yourusername/splk-drill.git
cd splk-drill
open index.html   # macOS
# or just drag index.html into your browser
```

---

## 📁 Project Structure

```
splk-drill/
├── index.html   # App shell & all screens
├── style.css    # Full design system (dark gradient, Splunk orange)
└── app.js       # Question bank (90 Qs) + quiz/flashcard/results logic
```

No frameworks. No npm. No build step. Pure HTML + CSS + JS — loads instantly on any device.

---

## 🛠 Deploy to GitHub Pages (free, 2 minutes)

1. Fork or clone this repo
2. Go to **Settings → Pages**
3. Set Source → Branch: `main` → Folder: `/ (root)`
4. Save — your URL will be: `https://yourusername.github.io/splk-drill`

---

## ⚠️ Disclaimer

This project is a **community study aid**. The questions reflect material circulating in the Splunk certification community and have been verified for accuracy, but this tool does not guarantee exam success. Splunk®, SPLK-2002, and related marks are trademarks of Splunk Inc. This project has no affiliation with Splunk Inc.

---

## 🤝 Contributing

Found a wrong answer? Have a question to add? Open a PR or an issue — contributions welcome.

1. Edit the `QUESTIONS` array in `app.js`
2. Each question follows this format:

```js
{
  q:       "Question text here",
  opts:    [
    {k:"A", t:"Option text"},
    {k:"B", t:"Option text"},
    {k:"C", t:"Option text"},
    {k:"D", t:"Option text"}
  ],
  ans:     [0],      // 0-based indices of correct answer(s)
  multi:   false,    // true if "select all that apply"
  explain: "Why this answer is correct..."
}
```

---

*Made with ☕ for the Splunk community.*
