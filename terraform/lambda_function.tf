resource "aws_lambda_function" "benford_api" {
  function_name = "benford-api"
  handler       = "api.image_receiver"
  runtime       = "python3.8"

  filename         = "${abspath(path.module)}/../.builds/benford_api.zip"
  source_code_hash = filebase64sha256("${abspath(path.module)}/../.builds/benford_api.zip")

  role = aws_iam_role.benford_api_role.arn
}

data "aws_iam_policy_document" "benford_api_lambda_assume_role_policy" {
  statement {
    sid = "AllowLambdaAssumeRole"

    effect  = "Allow"
    actions = ["sts:AssumeRole"]

    principals {
      type        = "Service"
      identifiers = ["lambda.amazonaws.com"]
    }
  }
}

resource "aws_iam_role" "benford_api_role" {
  name = "benford_api_role"
  path = "/service-role/"

  assume_role_policy = data.aws_iam_policy_document.benford_api_lambda_assume_role_policy.json
}

data "aws_iam_policy_document" "benford_api_role_policy_document" {
  statement {
    sid = "CreateLogGroups"

    effect    = "Allow"
    actions   = ["logs:CreateLogGroup"]
    resources = ["arn:aws:logs:us-east-1:852095860220:*"]
  }

  statement {
    sid = "PutLogs"

    effect = "Allow"
    actions = [
      "logs:CreateLogStream",
      "logs:PutLogEvents"
    ]
    resources = ["arn:aws:logs:us-east-1:852095860220:log-group:/aws/lambda/benford-api:*"]
  }
}

resource "aws_iam_role_policy" "benford_api_role_policy" {
  role   = aws_iam_role.benford_api_role.id
  policy = data.aws_iam_policy_document.benford_api_role_policy_document.json
}

resource "aws_lambda_permission" "allow_api_gateway_benford_api_lambda" {
  statement_id  = "AllowExecutionFromAPIGateway"
  action        = "lambda:InvokeFunction"
  function_name = aws_lambda_function.benford_api.function_name
  principal     = "apigateway.amazonaws.com"
}
