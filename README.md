
# Fauna Finder

## Overview
Fauna Finder is an innovative mobile application aimed at enhancing the wildlife tourism experience in Australia. By leveraging image recognition and conversational AI, the app allows users to identify and learn about local fauna in real-time. This project is a multifaceted solution that combines machine learning, computer vision, and software development to provide a sustainable and impactful tool for both tourists and the environment.

## Components
The project is divided into several submodules, each focusing on a specific aspect of the application:

- **Mobile App**: A React Native application providing the user interface for image capture and interaction with the AI.
- **Image Classification**: A module using TensorFlow to identify wildlife from user-uploaded images.
- **Conversational AI**: A Large Language Model providing real-time information and interaction to users.
- **Backend**: Node.js with Express.js backend handling API requests, data management, and integration.
- **Analytic Dashboard**: A React-based web application for monitoring application performance and user engagement.


### Prerequisites
- Docker
- [Git LFS](https://git-lfs.com/)
- AWS account with S3 bucket (for storing images)
- Gmail account (for the mail server)

## Configuration
Before building and running the Fauna Finder application, you need to configure the environment variables for the mail server and AWS S3 bucket.

Update these variables in `.env`.

#### For the mail server:

- `MAIL_USERNAME`: Your Gmail email address.
- `MAIL_PASSWORD`: Your Gmail password or an app-specific password if you have 2FA enabled.
- `MAIL_FROM`: The email address that will be used as the sender for outgoing emails.
- `MAIL_FROM_NAME`: The name that will be displayed as the sender for outgoing emails.


#### For AWS S3 bucket:

- `AWS_ACCESS_KEY_ID`: Your AWS access key ID.
- `AWS_SECRET_ACCESS_KEY`: Your AWS secret access key.
- `AWS_DEFAULT_REGION`: The AWS region where your S3 bucket is located.
- `S3_BUCKET_NAME`: The name of your S3 bucket.


## Installation

Clone the Fauna Finder repository along with its submodules:
```sh
git clone --recursive https://github.com/bikramk1337/faunafinder.git
```
Navigate to the project directory:
```sh 
cd FaunaFinder
```
Fetch the LFS files:
```sh
git lfs pull
```

To build and run the Fauna Finder application, use the provided build.sh script. The script takes an argument to specify the environment: dev for development, prod for production, or infra for infrastructure.

### Dev Environment

```sh
sh build.sh dev
```
This will use the docker-compose.dev.yml file to build and start the necessary services, including the database (PostgreSQL), backend (FastAPI), frontend (React), and the LLM (ollama). The services will be configured with the specified environment variables, volumes, and network settings.

### Production Infrastructure Setup
To set up the infrastructure components, run the following command:

```sh
sh build.sh infra
```
This will use the docker-compose.infra.yml file to start the Traefik reverse proxy and Portainer service. Traefik will be configured with HTTP and HTTPS entrypoints, certificate resolvers, and will discover and route traffic to the backend and frontend services based on the configured labels. Portainer will provide a web-based management interface for the Docker environment.

### For Prod Environment

```sh
sh build.sh prod
```

This will use the docker-compose.prod.yml file to build and start the services with production-specific configurations. The backend and frontend services will be configured with labels for Traefik routing based on domain names. Traefik will act as a reverse proxy and handle HTTPS traffic with automatic SSL/TLS certificate management using Let's Encrypt.

## Usage
### Dev
Api Swagger Doc URL: http://0.0.0.0:8888/docs/

Api Redoc URL: http://0.0.0.0:8888/redoc/

Frontend: http://localhost:3000/

### Prod
Api Swagger Doc URL: https://api.odinsvault.xyz/docs/

Api Redoc URL: https://api.odinsvault.xyz/redoc/

Frontend: https://ff.odinsvault.xyz/

credentials:

```username: admin@mail.com```

```password: superuser```
### Branching Strategy
- **Main**: Stable and deployable versions of the application.
- **Dev**: Integration branch for features before they are tested and moved to Main.
- **ff_feature_name**: Feature-specific branches to be merged back into Dev branch.

### Commit Messages 
Please follow [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) 
The commit message should be structured as follows:

```sh 
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

## Acknowledgements
This project is developed as a part of the capstone project:

CSIT998 Professional Capstone Project

Autumn 2024

University of Wollongong

Supervisor: Dr. Thanh Le Hoang
## Contributors
- Bikram Karki
- Birendra Chaulagain
- Prabhat Mandal
- Resha Adhikari
- Tsering Yangchen Lama