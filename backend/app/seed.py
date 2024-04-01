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
                image_label = int(row['image_label']) if row['image_label'] else None

                # Check if the image_label already exists in the database
                existing_fauna = session.exec(
                    select(Fauna).where(Fauna.image_label == image_label)
                ).first()
                if existing_fauna:
                    print(f"Skipping fauna with image_label: {image_label}. Already exists in the database.")
                    continue
                
                fauna = Fauna(
                    image_label=image_label,
                    common_name=row['common_name'] if row['common_name'] else None,
                    description=row['description'] if row['description'] else None,
                    scientific_name=row['scientific_name'] if row['scientific_name'] else None,
                    family=row['family'] if row['family'] else None,
                    fauna_class=row['fauna_class'] if row['fauna_class'] else None,
                    fauna_infra_class=row['fauna_infra_class'] if row['fauna_infra_class'] else None,
                    conservation_status=row['conservation_status'] if row['conservation_status'] else None,
                    habitat=row['habitat'] if row['habitat'] else None,
                    diet=row['diet'] if row['diet'] else None,
                    lifespan=int(row['lifespan']) if row['lifespan'] else None,
                    geographic_range=row['geographic_range'] if row['geographic_range'] else None,
                    fun_fact=row['fun_fact'] if row['fun_fact'] else None
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