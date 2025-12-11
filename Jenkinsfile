// Jenkinsfile (FINAL VERSION for Single EC2 Instance)

pipeline {
    agent any 
    
    environment {
        // ID must match the Docker Hub credential ID you created in Jenkins UI.
        DOCKER_HUB_CRED = 'dockerhub-creds-id'           
        
        // Docker Hub username inserted here:
        REPO_NAME = 'sandymass007/emc-app' 
    }

    stages {
        stage('Checkout Code & Build') {
            steps {
                // Building the image locally on the EC2 instance
                sh "docker build -t ${REPO_NAME}:${env.BUILD_NUMBER} ."
            }
        }
        
        stage('Push to Docker Hub') {
            steps {
                // Uploading the image to Docker Hub
                withCredentials([usernamePassword(credentialsId: DOCKER_HUB_CRED, passwordVariable: 'DOCKER_PASSWORD', usernameVariable: 'DOCKER_USER')]) {
                    sh "docker login -u ${DOCKER_USER} -p ${DOCKER_PASSWORD}"
                    sh "docker push ${REPO_NAME}:${env.BUILD_NUMBER}"
                    sh "docker tag ${REPO_NAME}:${env.BUILD_NUMBER} ${REPO_NAME}:latest"
                    sh "docker push ${REPO_NAME}:latest"
                }
            }
        }

        stage('Deploy Locally (Self-Deployment)') {
            steps {
                sh 'echo "Deploying container on the same EC2 instance..."'
                
                // Uses local Docker commands directly on the EC2 machine.
                sh """
                    echo 'Stopping and removing old EMC container...'
                    sudo docker stop emc || true 
                    sudo docker rm emc || true   
                    
                    echo 'Running new container from local image...'
                    # The image is already local after the build stage.
                    sudo docker run -d \
                        --name emc \
                        -p 80:3000 \
                        ${REPO_NAME}:${env.BUILD_NUMBER}
                    echo 'Deployment complete. EMC is live at http://3.7.254.133/'
                """
            }
        }
    }
}
