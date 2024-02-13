provider "aws" {
  region = "us-east-1" # Set your desired AWS region
}

resource "aws_vpc" "main" {
  cidr_block           = var.vpc_cidr
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

resource "aws_subnet" "public_sub" {
  vpc_id                  = aws_vpc.main.id
  count                   = var.availability_zone_count
  cidr_block              = "10.0.0.0/24"
  availability_zone       = "us-east-1a"
  map_public_ip_on_launch = true

  tags = {
    Name = "mediaverse-tf-pub-sn-${count.index + 1}"
  }
}


resource "aws_security_group" "web_sc_group" {
  name        = "example-security-group"
  description = "Example security group with inbound rules"
  vpc_id      = aws_vpc.main.id

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    description = "Allow SSH traffic"
  }

  ingress {
    from_port   = 80
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    description = "Allow SSH traffic"
  }


  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    description = "Allow custom TCP traffic on port 3000"
  }
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = -1
    cidr_blocks = ["0.0.0.0/0"]
    description = "Allow custom TCP traffic on port 3000"
  }
}

resource "aws_route_table" "public_rt" {
  vpc_id = aws_vpc.main.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.example.id
  }
}
resource "aws_route_table_association" "rt_asc" {
  subnet_id      = aws_subnet.public_sub[0].id
  route_table_id = aws_route_table.public_rt.id
}

resource "aws_instance" "MediaVerse_instance" {
  ami                    = "ami-0c7217cdde317cfec" # Replace with your desired AMI ID
  instance_type          = "t2.micro"
  subnet_id              = aws_subnet.public_sub[0].id          # Assuming you want the first subnet
  vpc_security_group_ids = [aws_security_group.web_sc_group.id] # Corrected line  key_name = "mediaverse-tf-key" # Replace with your EC2 key pair name
  key_name               = "mediaverse-tf-key"
  # Replace with your EC2 key pair name
  user_data = <<-EOF
              #!/bin/bash
              sudo -i
              sudo apt-get update -y
              sudo apt-get install -y docker.io
              sudo systemctl start docker
              sudo docker run -d -p 3000:3000 ${"SECRET.DOCKER_P3"}
              EOF

  tags = {
    Name = "my-project-3-instance"
  }
}

resource "aws_internet_gateway" "example" {
  vpc_id = aws_vpc.main.id
}