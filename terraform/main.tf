provider "aws" {
  region = "us-east-1" # Set your desired AWS region
}

resource "aws_vpc" "main" {
  cidr_block           = var.cidr
  enable_dns_hostnames = true

  tags = {
    Name = "Mediaverse-tf-vpc"
  }
}

data "aws_availability_zones" "available" {}

variable "availability_zone_count" {
  type    = number
  default = 1
}
resource "aws_subnet" "public" {
  vpc_id                  = aws_vpc.main.id
  count                   = var.availability_zone_count
  cidr_block              = "10.0.0.0/24"
  availability_zone       = data.aws_availability_zones.available.names[count.index]
  map_public_ip_on_launch = true

  tags = {
    Name = "mediaverse-tf-pub-sn-${count.index + 1}"
  }
}

resource "aws_instance" "MediaVerse_instance" {
  ami           = "ami-0a3c3a20c09d6f377" # Replace with your desired AMI ID
  instance_type = "t2.micro"
  subnet_id     = aws_subnet.public[0].id # Assuming you want the first subnet

  key_name = "mediaverse-tf-key" # Replace with your EC2 key pair name

  user_data = <<-EOF
              #!/bin/bash
              sudo apt-get update -y
              sudo amazon-linux-extras install docker
              sudo service docker start
              sudo usermod -a -G docker ec2-user
              sudo docker login ${var.docker_user} -p ${var.docker_pass}
              sudo docker run -d -p 3000:3000 zinx666/mediaverse:latest
              EOF

  tags = {
    Name = "example-instance"
  }
}
