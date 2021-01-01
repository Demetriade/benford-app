resource "aws_api_gateway_rest_api" "benford_api" {
  name        = "Benford API Lambda"
  description = "Use Benford's law to determine whether or not an image is real"
}

# -- Deployment -- #

resource "aws_api_gateway_deployment" "benford_api_production_deployment" {
  depends_on = [aws_api_gateway_integration.benford_api_lambda_integration]
  rest_api_id = aws_api_gateway_rest_api.benford_api.id
  stage_name  = "production"

  lifecycle {
    create_before_destroy = true
  }
}

# -- Endpoints -- #

resource "aws_api_gateway_resource" "benford_api_lambda_resource" {
  rest_api_id = aws_api_gateway_rest_api.benford_api.id
  parent_id   = aws_api_gateway_rest_api.benford_api.root_resource_id
  path_part   = "image"
}

resource "aws_api_gateway_method" "benford_api_lambda_method" {
  rest_api_id   = aws_api_gateway_rest_api.benford_api.id
  resource_id   = aws_api_gateway_resource.benford_api_lambda_resource.id
  http_method   = "POST"
  authorization = "NONE"

  request_validator_id = aws_api_gateway_request_validator.validate_parameters.id
  request_models = {
    "application/json" = aws_api_gateway_model.image_model.name
  }
}

resource "aws_api_gateway_model" "image_model" {
  rest_api_id = aws_api_gateway_rest_api.benford_api.id
  name = "ImageModel"
  content_type = "application/json"

  schema = <<EOF
    {
      "$schema": "http://json-schema.org/draft-04/schema#",
      "title": "ImageModel",
      "type": "object",
      "properties": {
          "uploadedImage": {
              "type": "string"
          }
      },
      "required": ["uploadedImage"]
    }
EOF
}

# -- Validators -- #

resource "aws_api_gateway_request_validator" "validate_parameters" {
  name        = "validate_parameters"
  rest_api_id = aws_api_gateway_rest_api.benford_api.id

  validate_request_parameters = false
  validate_request_body       = true
}

# -- Integrations -- #

resource "aws_api_gateway_integration" "benford_api_lambda_integration" {
  rest_api_id = aws_api_gateway_rest_api.benford_api.id
  resource_id = aws_api_gateway_resource.benford_api_lambda_resource.id
  http_method = aws_api_gateway_method.benford_api_lambda_method.http_method

  content_handling        = "CONVERT_TO_TEXT"
  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = aws_lambda_function.benford_api.invoke_arn
}