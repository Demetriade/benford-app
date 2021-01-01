terraform {
  backend "remote" {
    hostname     = "app.terraform.io"
    organization = "ca-demetriade"

    workspaces {
      name = "benford"
    }
  }
}