Project Name: Core Serve Frontend Website
A modern frontend application built with React.js, containerized with Docker, and deployed using CI/CD and GitOps best practices.

📌 Table of Contents
- [🌟 Features](#-features)
- [🔧 Installation](#-installation)
- [📂 Project Structure](#-project-structure)
- [🚀 Running the Project](#-running-the-project)
- [🐳 Docker Setup](#-docker-setup)
- [📦 CI/CD Pipeline](#-cicd-pipeline)
- [🚀 Deployment with ArgoCD Helm & Kubernetes](#-deployment-with-helm--kubernetes)
- Infrastructure as Code (IaC) with Terraform
- [📜 License](#-license)
- [👨‍💻 Author](#-author)
  
## 🌟 Features
✅ Modern UI built with
- **React.js**
- **Redux Toolkit with Redux Persist**
- **Tailwind CSS**
- **Material UI**
- **Axios for API calls**
- **Jest for testing**
- **Fully responsive design**
- **User Authentication**
- **Password Management (Forgot/Change Password)**
- **Batch Registration System**
- **Responsive Design**
- **User Dashboard**
- **Profile Management**
  
✅ Automated CI/CD using **Jenkins**  
✅ Containerized using **Docker**  
✅ Kubernetes deployment with **Helm and ArgoCD**  
✅ Security scanning with **Trivy, OWAPS, ZAP & SonarQube**  
✅ Deployed to **AWS**  

## 🔧 Installation

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

### **2️⃣ Install Dependencies**
```sh
npm install  # or yarn install
```

## 📂 Project Structure
```
/your-repo
│── /public          # Static assets
│── /src             # Source code
│── /tests           # Test cases
│── .github/workflows # CI/CD pipeline
│── Jenkinsfile      # Jenkins pipeline configuration
│── Dockerfile       # Docker container setup
│── helm-chart/      # Helm configuration for Kubernetes
│── README.md        # Documentation
│── package.json     # Project metadata
```

## 🐳 Docker Setup
To containerize the application:
```sh
docker build -t my-frontend-app .
```
## To test the if the application is succesfully running in the container
```sh
docker run -p 3000:3000 my-frontend-app
```
Now, open **http://localhost:3000**.

## 📦 CI/CD Pipeline
### **Proposed CI/CD Pipeline strategy with PR Integration**
1️⃣ Continuous Integration (CI)
Checkout Code – Fetch latest feature branch code.
Install Dependencies – Install required packages.
Security Scans – OWASP Dependency Check (Generates HTML/XML reports).
Run Unit Tests – Jest test suites.
Static Code Analysis – SonarQube.
Build Artifacts – Build and create Docker image.
Container Security Scan – Trivy for LOW/MEDIUM/CRITICAL vulnerabilities (Generates HTML & XML reports).
Upload Build Reports to AWS S3 – Store scan and test reports for analysis.
Deploy to Dev Testing Environment – EC2 for Integration testing.
If CI passes, a PR will be raised.

2️⃣ Pull Request Process
PR is raised for review.

3️⃣ Post-Merge Continuous Deployment pipeline (CD) ang GitOps
Manifest Repo – Dedicated repository for Kubernetes manifests.
PR Branch – Create a new branch for updating image tags.
Clone Manifest Repo and Update K8S Image Tag – Update Kubernetes deployment with the latest image.
Raise PR on the Manifest Repo using GitHub API – Automate PR creation for Kubernetes manifests.
PR is reviewed and merged to Main Branch in Manifest Repo – Ensures controlled deployment updates.
ArgoCD Deployment – ArgoCD syncs changes from the manifest repo.
Deploy to AWS EKS Staging Environment – Application is deployed to the staging cluster.
DAST (Dynamic Application Security Testing) – Perform security testing on the running application using OWASP ZAP.
Final Approval Step – Manual production approval.
Deploy to Production!!!

