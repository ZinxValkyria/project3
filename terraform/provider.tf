# terraform {
#   backend "s3" {
#     bucket         = "s3backendstate"
#     dynamodb_table = "state-lock"
#     key            = "global/mystatefile/terraform.tfstate"
#     region         = "us-east-1"
#     encrypt        = true
#   }
# }