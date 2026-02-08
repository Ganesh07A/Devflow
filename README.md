# 🚀 DevFlow - AI-Powered Code Review Assistant

> Automated code review and developer productivity platform powered by Claude AI

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Python](https://img.shields.io/badge/python-3.11+-blue.svg)
![FastAPI](https://img.shields.io/badge/FastAPI-0.104+-green.svg)

DevFlow is an intelligent code review assistant that automatically analyzes pull requests, identifies bugs and security vulnerabilities, and provides actionable suggestions - all powered by Claude AI.

---

## ✨ Features

- **🤖 AI Code Review** - Automatic code analysis using Claude Sonnet 4
- **🔒 Security Scanning** - Detects SQL injection, XSS, exposed secrets
- **🐛 Bug Detection** - Identifies potential bugs and edge cases
- **⚡ Performance Analysis** - Spots inefficient code patterns
- **📊 Quality Scoring** - Rates code quality on a 1-10 scale
- **💬 GitHub Integration** - Posts reviews directly as PR comments
- **📈 Analytics Dashboard** - Track code quality trends over time
- **🗄️ PostgreSQL Database** - Stores all reviews and analytics

---

## 🛠️ Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - Database ORM
- **PostgreSQL** - Primary database
- **Anthropic Claude API** - AI code analysis
- **GitHub API** - Repository integration

### Frontend (Coming Soon)
- **React** - UI framework
- **Tailwind CSS** - Styling
- **Recharts** - Analytics visualizations

### Infrastructure
- **ngrok** - Local development tunneling
- **Railway/Render** - Deployment (planned)

---

## 📋 Prerequisites

Before you begin, ensure you have:

- **Python 3.11+** installed
- **PostgreSQL 15+** installed and running
- **GitHub account** with a repository for testing
- **Anthropic API key** ([Get one here](https://console.anthropic.com/))
- **GitHub Personal Access Token** ([Create one here](https://github.com/settings/tokens))

---

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/devflow.git
cd devflow/backend
```

### 2. Set Up Virtual Environment

```bash
# Create virtual environment
python -m venv venv

# Activate (Windows)
venv\Scripts\activate

# Activate (Mac/Linux)
source venv/bin/activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

If `requirements.txt` doesn't exist, install manually:

```bash
pip install fastapi uvicorn httpx python-dotenv pydantic-settings sqlalchemy psycopg2-binary anthropic
```

### 4. Set Up PostgreSQL Database

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE devflow;

# Exit
\q
```

### 5. Configure Environment Variables

Create `.env` file in the `backend/` directory:

```bash
# Database
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/devflow

# GitHub
GITHUB_TOKEN=ghp_your_github_token_here
WEBHOOK_SECRET=your_random_secret_string

# Anthropic AI
ANTHROPIC_API_KEY=sk-ant-api03-your_key_here
```

**Important:** Replace the placeholder values with your actual credentials!

### 6. Initialize Database

```bash
python migrate.py
```

Expected output:
```
Database tables created successfully!
```

### 7. Run the Server

```bash
uvicorn app.main:app --reload
```

Visit: http://localhost:8000

You should see:
```json
{
  "message": "DevFlow API Running",
  "status": "healthy"
}
```

---

## 🔧 GitHub Webhook Setup

### 1. Install ngrok (for local development)

Download from: https://ngrok.com/download

### 2. Start ngrok Tunnel

```bash
ngrok http 8000
```

Copy the `https://` URL (e.g., `https://abc123.ngrok-free.app`)

### 3. Configure GitHub Webhook

1. Go to your repository → **Settings** → **Webhooks** → **Add webhook**

2. Fill in:
   - **Payload URL:** `https://YOUR-NGROK-URL.ngrok-free.app/webhook/github`
   - **Content type:** `application/json`
   - **Secret:** Same as `WEBHOOK_SECRET` in your `.env`
   - **Events:** Select "Pull requests"

3. Click **Add webhook**

### 4. Test It!

Create a pull request in your repository. DevFlow will automatically:
- Analyze the code changes
- Post a review comment
- Save results to database

---

## 📖 Usage

### Creating a Pull Request for Review

```bash
# Create a new branch
git checkout -b feature/test-review

# Make some changes
echo "console.log('test')" >> test.js
git add .
git commit -m "Add test file"
git push origin feature/test-review
```

Open a PR on GitHub → DevFlow will comment with AI review within 30 seconds!

### Example AI Review Comment

```markdown
## 🤖 DevFlow AI Code Review

**Summary:** Code changes look good with minor suggestions for improvement.

**Quality Score:** 8/10

### ⚠️ High Priority Issues

- **Security**: Potential SQL injection vulnerability on line 47
  - *Suggestion:* Use parameterized queries instead of string concatenation

### 💡 Suggestions

- Consider adding error handling for edge cases
- Variable naming could be more descriptive

---
*Powered by DevFlow | AI Code Review Assistant*
```

---

## 📁 Project Structure

```
devflow/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py           # FastAPI application
│   │   ├── config.py         # Configuration & settings
│   │   ├── database.py       # Database connection
│   │   ├── models.py         # SQLAlchemy models
│   │   ├── webhooks.py       # GitHub webhook handler
│   │   ├── github.py         # GitHub API integration
│   │   ├── ai.py             # Claude AI integration
│   │   └── review.py         # Review processing logic
│   ├── .env                  # Environment variables (not in git)
│   ├── migrate.py            # Database migration script
│   └── requirements.txt      # Python dependencies
│
├── frontend/                 # React app (coming soon)
└── README.md                # This file
```

---

## 🗄️ Database Schema

### Tables

**repositories**
- Stores tracked GitHub repositories

**pull_requests**
- Stores PR metadata and diffs

**code_reviews**
- Stores AI analysis results

### Entity Relationship

```
repositories (1) ──── (many) pull_requests
pull_requests (1) ──── (many) code_reviews
```

---

## 🔑 API Endpoints

### Health Check
```
GET /
GET /health
```

### Webhook
```
POST /webhook/github
```
Receives GitHub webhook events for pull requests.

---

## 🧪 Testing

### Test Webhook Locally

```bash
curl -X POST http://localhost:8000/webhook/github
```

### Test Database Connection

```python
# test_db.py
from sqlalchemy import create_engine, text

DATABASE_URL = "postgresql://postgres:password@localhost:5432/devflow"
engine = create_engine(DATABASE_URL)

with engine.connect() as connection:
    result = connection.execute(text("SELECT version();"))
    print("✅ Connected!", result.fetchone()[0])
```

---

## 🐛 Troubleshooting

### Issue: "Database connection failed"

**Solution:**
- Verify PostgreSQL is running: `pg_ctl status`
- Check DATABASE_URL in `.env`
- Ensure database `devflow` exists

### Issue: "403 Forbidden" on webhook

**Solution:**
- Verify WEBHOOK_SECRET matches in GitHub and `.env`
- Check signature verification in `webhooks.py`

### Issue: "Invalid API key" (Anthropic)

**Solution:**
- Verify API key starts with `sk-ant-api03-`
- Check for extra spaces in `.env`
- Ensure you have credits remaining

### Issue: ngrok URL changed

**Solution:**
- ngrok free tier gives new URL on restart
- Update GitHub webhook URL
- Or sign up for static domain

---

## 🚧 Roadmap

### Week 2 (Current)
- [x] GitHub webhook integration
- [x] Database setup
- [ ] AI code review engine
- [ ] Post reviews as comments

### Week 3-4 (Planned)
- [ ] Documentation generator
- [ ] Tech debt tracker
- [ ] React dashboard

### Week 5-8 (Future)
- [ ] Developer analytics
- [ ] Multi-repository support
- [ ] Team collaboration features
- [ ] Customizable review rules

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Your Name**
- GitHub: [@Ganesh07A](https://github.com/Ganesh07A)
- LinkedIn: [Your LinkedIn](https://linkedin.com/in/yourprofile)

---

## 🙏 Acknowledgments

- [Anthropic](https://www.anthropic.com/) for Claude AI API
- [FastAPI](https://fastapi.tiangolo.com/) for the excellent framework
- [GitHub](https://github.com/) for webhook infrastructure

---

## 📧 Support

If you have questions or need help:
- Open an [issue](https://github.com/Ganesh07A/devflow/issues)
- Email: worrk.ganeshsuvarnakar@gmail.com

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

Made with ❤️ by Ganesh

</div>