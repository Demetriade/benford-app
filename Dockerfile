FROM public.ecr.aws/lambda/python:3.8

COPY requirements.txt ./
COPY api/api_lambda.py ./
COPY api/venv/lib/python3.8/site-packages/ ./

RUN yum install -y libjpeg-devel \
    && pip install -r requirements.txt

CMD ["api_lambda.image_receiver"]