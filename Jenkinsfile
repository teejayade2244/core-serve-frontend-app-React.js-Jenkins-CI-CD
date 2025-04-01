pipeline {
    agent any
    tools {
        nodejs "Nodejs-22-6-0"
    }
    options {
       disableConcurrentBuilds abortPrevious: true
    }
    environment {
        AWS_REGION = credentials ('AWS-REGION')
        ECR_REPO_NAME = 'core-serve-frontend-app'
        VERSION = "1.0.${BUILD_NUMBER}"
        AWS_ACCOUNT_ID = credentials ('AWS-account-id')
        IMAGE_TAG = "${ECR_REPO_NAME}:${VERSION}"
        DOCKER_IMAGE_NAME = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com/${ECR_REPO_NAME}:${GIT_COMMIT}"
        GITHUB_TOKEN = credentials ('Github account token')
        EC2_HOST = credentials ('AWS-EC2-HOST')
        PORT = credentials ('port-number')
    }
    
    stages {
        stage('clean workspace') {
            steps {
                script {
                    echo "Cleaning workspace.."
                    deleteDir()
                }
            }
        }

        stage('checkout') {
            steps {
               checkout scmGit(branches: [[name: '*/master']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/teejayade2244/core-serve-frontend.git']])
            }
        }

        // Dependencies installation
        stage("Install node-js dependencies") {
            steps {
                script {
                    if (env.BRANCH_NAME.contains("PR-")) {
                        echo "This is a PR branch... Cleaning workspace before npm install"
                        sh 'rm -rf node_modules package-lock.json' // Clean the workspace first
                    }
                }
                 sh "npm install --no-audit"
            }
        }

        // dependencies scanning
        stage("Dependency Check scanning") {
            parallel {
                stage("NPM dependencies audit") {
                    steps {
                        // Run npm audit to check for critical vulnerabilities
                        sh '''
                            npm audit --audit-level=critical
                            echo $?
                        '''
                    }
                }

                // stage("OWASP Dependency Check") { 
                //     steps {
                //         sh 'mkdir -p OWASP-security-reports'
                //         // Run OWASP Dependency Check scan with specific arguments
                //         withCredentials([string(credentialsId: 'NVD-API-KEY', variable: 'NVD_API_KEY')]) {
                //                 dependencyCheck additionalArguments: '''
                //                     --scan "." \
                //                     --out "OWASP-security-reports" \
                //                     --disableYarnAudit \
                //                     --format \'ALL\' \
                //                     --prettyPrint \
                //                     --nvdApiKey '${NVD_API_KEY}' \
                //                 ''', odcInstallation: 'OWAPS-Depend-check'
                //          }
                //         // Publish the Dependency Check report and fail the build if critical issues are found
                //         dependencyCheckPublisher failedTotalCritical: 2, pattern: 'OWASP-security-reports/dependency-check-report.xml', stopBuild: true
                //     }
                // }
            }
        }

        // unit testing
        stage("Unit Testing stage") {
            steps {
                // Run unit tests with npm
                sh 'mkdir -p test-results'
                sh "npm test"
            } 
        }

        // static testing and analysis with SonarQube
        stage("Static Testing and Analysis with SonarQube") {
            environment {
                    SONAR_SCANNER_HOME = tool 'sonarqube-scanner-6.1.0.477'
                }
            steps {
                timeout(time: 5, unit: 'MINUTES') {
                    withSonarQubeEnv('sonarqube-server') {
                        // Run SonarQube scanner with specific parameters
                        sh '''
                            ${SONAR_SCANNER_HOME}/bin/sonar-scanner \
                            -Dsonar.projectKey=Serve-core-frontend \
                            -Dsonar.sources=. \
                        '''
                    }
                }
                // Wait for SonarQube quality gate and fail the pipeline if it's not OK
                waitForQualityGate abortPipeline: true
            }
        }

        // login to ECR
        stage("AWS ECR login") {
              // authenticate with ECR so docker has Docker has permission to push images to AWS ECR
              steps {
                  withCredentials([aws(accessKeyVariable: 'AWS_ACCESS_KEY_ID', credentialsId: 'AWS access and secrete Keys', secretKeyVariable: 'AWS_SECRET_ACCESS_KEY')]) {
                     script {
                        // Get ECR login token and execute Docker login. AWSCLI is already configured with both the secret and access keys on the jankins agent 
                        // this command retrieves a temporary authentication password for AWS ECR, and its passed as a stdin to docker 
                        // this allows docker Logs into your AWS ECR repository using the temporary password.
                        sh '''
                            aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com
                        '''
                     }
                  }
                  
              }
        }

        // Build Docker image
        stage("Docker Build and Tag") {
              steps {
                  script {
                    sh 'docker build -t ${IMAGE_TAG} .'
                    sh 'docker tag ${IMAGE_TAG} ${DOCKER_IMAGE_NAME}'
                  } 
              }
        }


        // scan the image for vulnerabilities before pushing to resgistry
        stage("Trivy Vulnerability scan") {
            steps {
                sh 'mkdir -p Trivy-Image-Reports'
                sh '''
                    trivy image ${DOCKER_IMAGE_NAME} \
                    --severity LOW,MEDIUM \
                    --exit-code 0 \
                    --quiet \
                    --format json -o Trivy-Image-Reports/trivy-image-MEDIUM-results.json 

                    trivy image ${DOCKER_IMAGE_NAME} \
                    --severity CRITICAL \
                    --exit-code 1 \
                    --quiet \
                    --format json -o Trivy-Image-Reports/trivy-image-CRITICAL-results.json 
                '''
            }
            post {
                always {
                    // Convert the json reports to HTML and XML formats
                    sh '''
                        trivy convert \
                            --format template --template "@/usr/local/share/trivy/templates/html.tpl" \
                            --output Trivy-Image-Reports/trivy-image-MEDIUM-results.html Trivy-Image-Reports/trivy-image-MEDIUM-results.json  
                    
                        trivy convert \
                            --format template --template "@/usr/local/share/trivy/templates/html.tpl" \
                            --output Trivy-Image-Reports/trivy-image-CRITICAL-results.html Trivy-Image-Reports/trivy-image-CRITICAL-results.json

                        trivy convert \
                            --format template --template "@/usr/local/share/trivy/templates/junit.tpl" \
                            --output Trivy-Image-Reports/trivy-image-MEDIUM-results.xml Trivy-Image-Reports/trivy-image-MEDIUM-results.json  

                        trivy convert \
                            --format template --template "@/usr/local/share/trivy/templates/junit.tpl" \
                            --output Trivy-Image-Reports/trivy-image-CRITICAL-results.xml Trivy-Image-Reports/trivy-image-CRITICAL-results.json    
                    '''
                }
            }
        }

        // Push image to AWS ECR
        stage("Push to AWS-ECR") {
            steps {
               script {
                    sh '''
                        docker push ${DOCKER_IMAGE_NAME}
                    '''
                }
            }
        }
        
        // CD - Deploy to AWS EC2
        stage("Deploy to AWS EC2") {
            steps {
                script {
                    try {
                        sshagent(['SSH-ACCESS']) {
                            sh '''
                                ssh -o StrictHostKeyChecking=no ${EC2_HOST} '
                                    if docker ps -a | grep -i "${ECR_REPO_NAME}"; then
                                        echo "Container found. Stopping and removing..."
                                        sudo docker stop ${ECR_REPO_NAME} || true
                                        sudo docker rm ${ECR_REPO_NAME} || true
                                    fi
                                    
                                    echo "Pulling new image..."
                                    sudo docker pull ${DOCKER_IMAGE_NAME}
                                    
                                    echo "Starting new container..."
                                    sudo docker run -d \
                                        --name ${ECR_REPO_NAME} \
                                        --restart unless-stopped \
                                        -p ${PORT}:${PORT} \
                                        ${DOCKER_IMAGE_NAME}
                                        
                                    echo "Cleaning up old images..."
                                    sudo docker image prune -f
                                '
                            '''
                        }
                    } catch (Exception e) {
                        error "Deployment failed: ${e.getMessage()}"
                    }
                }
            }
        }
        // Update the image tag in the Kubernetes deployment file
        stage('K8S Update Image Tag') {
            when {
                branch 'PR*' // Trigger this stage only for branches matching 'PR*'
            }
            steps {
                script {
                    // Clone the GitOps repository
                    sh '''
                        git clone -b master https://github.com/teejayade2244/gitOps-approach.git
                    '''

                    // Navigate to the Kubernetes directory
                    dir("gitOps-approach/Kubernetes") {
                        // Replace the Docker image tag in the deployment file
                        sh '''
                            ls -la
                            git checkout -b feature-$BUILD_ID
                            sed -i "s#${AWS_ACCOUNT_ID}.dkr.ecr.eu-west-2.amazonaws.com/core-serve-frontend:.*#${AWS_ACCOUNT_ID}.dkr.ecr.eu-west-2.amazonaws.com/core-serve-frontend:${GIT_COMMIT}#g" deployment.yaml
                            cat deployment.yaml
                        '''
                        withCredentials([aws(accessKeyVariable: 'AWS_ACCESS_KEY_ID', credentialsId: 'AWS access and secrete Keys', secretKeyVariable: 'AWS_SECRET_ACCESS_KEY')]) {
                            script {
                                sh '''
                                    aws ecr get-login-password --region ${AWS_REGION} | docker login --username AWS --password-stdin ${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com
                                '''
                            }
                        }
                        // Commit and push the changes to the feature branch
                        withCredentials([string(credentialsId: 'Github account token', variable: 'GITHUB_TOKEN')]) {
                            sh '''
                                git config --global user.email "temitope224468@gmail.com"
                                git remote set-url origin https://${GITHUB_TOKEN}@github.com/teejayade2244/gitOps-approach
                                git add deployment.yaml
                                git commit -m "Updated docker image to ${GIT_COMMIT}"
                                git push -u origin feature-$BUILD_ID
                                
                            '''
                        }
                    }
                }
            }
        }


        // stage('GitHub - Raise PR') {
        //     when {
        //         branch 'PR*'  // Runs when a feature branch is pushed
        //     }
        //     steps {
        //         script {
        //             try {
        //             // Attempt to create a PR
        //             sh '''
        //                 curl -X POST https://api.github.com/repos/teejayade2244/gitOps-approach/pulls \
        //                 -H "Authorization: Bearer ${GITHUB_TOKEN}" \
        //                 -H "Accept: application/vnd.github.v3+json" \
        //                 -H "Content-Type: application/json" \
        //                 -d '{
        //                     "title": "Updated Docker Image to '"${GIT_COMMIT}"'",
        //                     "body": "Updated Docker Image in deployment manifest",
        //                     "head": "feature-'"${BUILD_ID}"'",
        //                     "base": "master",
        //                     "assignees": ["teejayade2244"]
        //                 }'
        //             '''
        //             } catch (Exception e) {
        //                 // Handle the error
        //                 echo "Failed to create PR: ${e}"
        //                 // Optionally, fail the pipeline or take other actions
        //                 currentBuild.result = 'FAILURE'
        //             }
        //         }
        //     }
        // }
    }
       
    // post actions.
        post {
          always {
              script {
                 if (fileExists("gitOps-approach")) {
                    sh 'rm -rf gitOps-approach'
                 }
              }
         
              // Publish JUnit test results, even if they are empty
              junit allowEmptyResults: true, testResults: '**/test-results/junit.xml, **/dependency-check-junit.xml, **/trivy-image-CRITICAL-results.xml, **/trivy-image-MEDIUM-results.xml'   
              
              // Publish the Dependency Check HTML report
              publishHTML([
                  allowMissing: true, 
                  alwaysLinkToLastBuild: true, 
                  keepAll: true, 
                  reportDir: './OWASP-security-reports', 
                  reportFiles: 'dependency-check-report.html', 
                  reportName: 'Dependency check HTML Report', 
                  reportTitles: '', 
                  useWrapperFileDirectly: true
              ])

              // Publish Trivy HTML reports with correct filenames
              publishHTML([
                  allowMissing: true, 
                  alwaysLinkToLastBuild: true, 
                  keepAll: true, 
                  reportDir: './Trivy-Image-Reports', 
                  reportFiles: 'trivy-image-CRITICAL-results.html', 
                  reportName: 'Trivy Scan Critical Vulnerabilities', 
                  reportTitles: '', 
                  useWrapperFileDirectly: true
              ])

              publishHTML([
                  allowMissing: true, 
                  alwaysLinkToLastBuild: true, 
                  keepAll: true, 
                  reportDir: './Trivy-Image-Reports', 
                  reportFiles: 'trivy-image-MEDIUM-results.html', 
                  reportName: 'Trivy Scan Medium Vulnerabilities', 
                  reportTitles: '', 
                  useWrapperFileDirectly: true
              ])
          }
       }
}
