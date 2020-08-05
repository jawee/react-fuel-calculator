properties([pipelineTriggers([githubPush()])])

  pipeline {
    agent any

      stages {
        /* checkout repo */
        stage('Checkout SCM') {
          steps {
            checkout([
                $class: 'GitSCM',
                branches: [[name: 'master']],
                userRemoteConfigs: [[
                url: 'https://github.com/jawee/react-fuel-calculator.git',
                credentialsId: '',
                ]]
            ])
          }
        }
        stage('Build') {
          steps {
            echo ">> Install dependencies"
            sh "npm install"
            echo ">> Building static files"
            sh "npm run build"
          }
        }
        stage('Deploy') {
          steps {
            sshagent(["linode"]) {
              sh 'rsync -r -e "ssh -o StrictHostKeyChecking=no" "$WORKSPACE/build/" figge@jawee.se:/home/figge/public/fuel.hellracers.se/public_html'
            }
          }
        }
      }
    /* Cleanup workspace */
    post {
      always {
        deleteDir()
      }
    }
  } 
