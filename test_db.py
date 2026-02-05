from sqlalchemy import create_engine, text

DATABASE_URL = "postgresql://postgres:htpmsakbth@localhost:5432/devflow"

try:
    engine = create_engine(DATABASE_URL)
    with engine.connect() as connection:
        result = connection.execute(text("SELECT version();"))
        print("✅ Connected to PostgreSQL!")
        print("Version:", result.fetchone()[0])
except Exception as e:
    print("❌ Connection failed!")
    print("Error:", e)