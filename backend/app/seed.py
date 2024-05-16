import logging
import csv
from sqlmodel import Session, select
from app.db.db import engine, init_db
from app.db.fauna import Fauna

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def init() -> None:
    with Session(engine) as session:
        init_db(session)

def populate_fauna(file_path: str) -> None:
    with Session(engine) as session:
        with open(file_path, 'r') as file:
            csv_reader = csv.DictReader(file)
            for row in csv_reader:
                label = row['label']

                # Check if the label already exists in the database
                existing_fauna = session.exec(
                    select(Fauna).where(Fauna.label == label)
                ).first()
                if existing_fauna:
                    print(f"Skipping fauna with label: {label}. Already exists in the database.")
                    continue

                fauna = Fauna(
                    label=label,
                    common_name=row['common_name'],
                    other_names=row['other_names'],
                    description=row['description'],
                    scientific_name=row['scientific_name'],
                    class_name=row['class_name'],
                    order=row['order'],
                    family=row['family'],
                    size=row['size'],
                    habitat=row['habitat'],
                    diet=row['diet'],
                    breeding=row['breeding'],
                    geographic_range=row['geographic_range'],
                    other_info=row['other_info']
                )
                session.add(fauna)
        session.commit()

def main() -> None:
    logger.info("Creating seed data")
    init()
    
    logger.info("Populating Fauna table from CSV")
    populate_fauna('app/assets/csv/fauna.csv')
    
    logger.info("Seed data created")

if __name__ == "__main__":
    main()