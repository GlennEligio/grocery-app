# Grocery Bill App

## POS, and User/Inventory Management for Grocery Store Cashier usage

# Technologies uses
## Backend
- Spring Boot
- Spring Cloud
## Frontend
- React
- HTML, CSS, JS

# Front end service
- **grocery-bill-app** for User Interface (port 3000)

# Backend Services
- **User Service** for User management
- **Item Service** for Item management
- **Grocery Bill** Service for Grocery Bill management
- **Config Service** for providing configuration properties
- **Gateway Service** for providing entry point to the microservice
- **Discovery Service** for service discovery

# Creating Docker images of the Services
- Frontend
  - Go in the root directory of React frontend
  - **docker build -f Dockerfile.prod -t shuntjg/gba-frontend:0.0.1.PROD .**
- Backend services
  - Go in the root directory of each Spring Boot app
  - **mvnw spring-boot:build-image**


# Running the app in K8s Cluster
- Go inside k8s yaml folder
- **kubectl apply -f filename.yml**
- Replace filename to the files inside
- ex: **kubectl apply -f frontend.yml**
- Check if all pods are ready **kubectl get pods**

# TODO:
- Create ingress controller to expose the services in Cluster inside of them being a LoadBalancer
