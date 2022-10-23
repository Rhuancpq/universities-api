# Universities API

This is a simple API that returns a list of universities in the world.

## Local usage

First of all, you need to build the docker images:

```bash
docker-compose build
```

Then, you can run the API:

```bash
docker-compose up
```

## Population script usage

The population script is a simple script that populates the database with the universities from the external API. If you want to run it solo, you can do it with the following command:

```bash
docker-compose run --rm population
```

## Production usage

This application is a cloud native application, so it can be deployed in any cloud provider. The only requirement is that the cloud provider supports Docker and some Container Orchestration.

The production usage is a bit more complex. First of all, you need to build the images and
push them to one of your docker registries. Can be used for this task a CI/CD tool like Jenkins, Gitlab CI or GitHub Actions.

After that, you need to use some kind of orchestration tool to deploy this application on your cloud provider. If you want to use AWS, you can use AWS ECS or AWS Fargate. If you want to use GCP, you can use GKE or Cloud Run. If you want to use Azure, you can use Azure Container Instances or Azure Kubernetes Service.

In case of running this application directly on a virtualized machine, you can use **docker-compose** or **docker swarm mode** to deploy it.

Also, you need to pass the following environment variables to the two containers:

- `MONGODB_URI`: The URI of the MongoDB database, for population container you need to embed the credentials in the URI.
- `MONGODB_USER`: The user of the MongoDB database.
- `MONGODB_PASSWORD`: The password of the MongoDB user.

Notes:

It's recommended to use a MongoDB database that is not exposed to the internet. If you want to use a MongoDB database that is exposed to the internet, you need to use a VPN or a proxy to access it.

Also, password passing is not recommended. It's recommended to use a secret manager to store and secure the password.
