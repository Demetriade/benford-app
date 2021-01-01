# Benford-App

Benford-App is a Python API and a web page testing Benford's law.

## Local installation

```bash
git clone https://github.com/Demetriade/benford-app.git

cd api
py -m venv my_env
.\my_env\Scripts\activate # for windows
source venv/bin/activate  # for linux
pip install -r requirements.txt

cd ../frontend
npm install
```

## Local execution (API)

```bash
cd api
.\my_env\Scripts\activate
python api.py
```

## Local execution (frontend)

```bash
cd frontend
npm start
```

## Login to ECR

`aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin aws_account_id.dkr.ecr.us-east-1.amazonaws.com`

/mnt/c/Users/CADem/Desktop/benford-app/api /mnt/c/Users/CADem/Desktop/benford-app/terraform