variable "docker_user" {
  type    = string
    default = "${"secrets.user"}"
}

variable "docker_pass" {
  type    = string
  default = "${"secrets.docker_pass"}"
}

variable "vpc_cidr" {
  type    = string # Specify the element type as string
  default = "10.0.0.0/16"
}
variable "public_cidr" {
  type    = string
  default = "10.0.0.0/17"
}
