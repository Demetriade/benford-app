resource "aws_ecr_repository" "benford_api" {
  name = "benford-api"

  image_scanning_configuration {
    scan_on_push = false
  }
}

resource "aws_ssm_parameter" "ecr_repo_url" {
  name  = "benford-ecr-repo-url"
  type  = "String"
  value = aws_ecr_repository.benford_api.repository_url
}
