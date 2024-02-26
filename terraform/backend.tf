
# # terraform {
# #   backend "s3" {
# #     bucket = "project-3-bucket"
# #     key    = "terraform.tfstate"
# #     region = "us-east-1"
# #   }
# # }

# resource "aws_s3_bucket" "my_bucket" {
#   bucket = "s3backendstate"

#   # server_side_encryption_configuration {
#   #   rule {
#   #     apply_server_side_encryption_by_default {
#   #       sse_algorithm = "AES256"
#   #     }
#   #   }
#   # }

#   lifecycle {
#     prevent_destroy = true
#   }

# }

# resource "aws_dynamodb_table" "statelock" {
#   name         = "state-lock"
#   billing_mode = "PAY_PER_REQUEST"
#   hash_key     = "LockID"

#   attribute {
#     name = "LockID"
#     type = "S"
#   }
#   lifecycle {
#     prevent_destroy = true
#   }

# }