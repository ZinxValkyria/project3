provider "aws" {
  region = "us-west-1"  # Change this to your desired AWS region
}

resource "aws_instance" "nodejs_app" {
  ami           = "ami-08f8df6a79f2d569d"  # Specify a suitable AMI for your region
  instance_type = "t2.micro"              # Specify an instance type

  key_name      = ""    # Change this to your EC2 key pair name

  user_data = <<-EOF
              #!/bin/bash
              sudo apt-get update
              sudo apt-get install -y nodejs npm
              git clone https://github.com/ZinxValkyria/MediaVerse /home/ubuntu/app
              cd /home/ubuntu/app
              npm install
              npm start
              EOF

  tags = {
    Name = "nodejs-app-instance"
  }
}

resource "aws_security_group" "nodejs_app_sg" {
  name        = "nodejs-app-sg"
  description = "Security group for the Node.js application"

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
