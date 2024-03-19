import logging

from sqlmodel import Session

from app.db.db import engine, init_db

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


def init() -> None:
    with Session(engine) as session:
        init_db(session)


def main() -> None:
    logger.info("Creating seed data")
    init()
    logger.info("Seed data created")


if __name__ == "__main__":
    main()
