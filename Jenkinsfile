pipeline {
    agent any

    triggers {
        // Poll SCM mỗi 5 phút
        pollSCM('H/5 * * * *')
    }

    environment {
        PORT = '4000'  // Không cần secret
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/vathcodes/server-cofood.git'
            }
        }

        stage('Build & Deploy Docker Compose') {
            steps {
                // Lấy secret từ Jenkins Credentials
                withCredentials([
                    string(credentialsId: 'MONGODB_URI', variable: 'MONGODB_URI'),
                    string(credentialsId: 'JWT_SECRET', variable: 'JWT_SECRET'),
                    string(credentialsId: 'STRIPE_SECRET_KEY', variable: 'STRIPE_SECRET_KEY')
                ]) {
                    sh '''
                    # Tạo file .env tạm thời trong workspace
                    echo "PORT=$PORT" > .env
                    echo "MONGODB_URI=$MONGODB_URI" >> .env
                    echo "JWT_SECRET=$JWT_SECRET" >> .env
                    echo "STRIPE_SECRET_KEY=$STRIPE_SECRET_KEY" >> .env

                    # Build và deploy Docker Compose
                    docker-compose down
                    docker-compose up --build -d
                    '''
                }
            }
        }
    }

    post {
        always {
            // Xóa file .env sau deploy để tránh leak
            sh 'rm -f .env'
        }
    }
}
