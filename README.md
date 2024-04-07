
# Fauna Finder

## Overview
Fauna Finder is an innovative mobile application aimed at enhancing the wildlife tourism experience in Australia. By leveraging image recognition and conversational AI, the app allows users to identify and learn about local fauna in real-time. This project is a multifaceted solution that combines machine learning, computer vision, and software development to provide a sustainable and impactful tool for both tourists and the environment.

## Components
The project is divided into several submodules, each focusing on a specific aspect of the application:

- **FF-ImageDS**: repo to create Image Dataset.
- **Mobile App**: A React Native application providing the user interface for image capture and interaction with the AI.
- **Image Classification**: A module using TensorFlow to identify wildlife from user-uploaded images.
- **Conversational AI**: A Large Language Model providing real-time information and interaction to users.
- **Backend**: Node.js with Express.js backend handling API requests, data management, and integration.
- **Analytic Dashboard**: A React-based web application for monitoring application performance and user engagement.

## Getting Started
To get started with the Fauna Finder project, you need to clone this base repository as well as its submodules:

```bash
git clone --recursive https://github.com/bikramk1337/faunafinder.git
```

### Prerequisites
- Docker

## Installation
Just run the build script
### For Dev Environment

```sh
sh build.sh dev
```

### For Prod Environment

```sh
sh build.sh prod
```
   

## Usage




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


## Testing


## Deployment


## License


## Acknowledgements


## Contributors


## Additional Resources
