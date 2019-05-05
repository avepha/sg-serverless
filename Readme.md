serverless create --template aws-nodejs --path serverless-es6

#reinitialize stack
1. remove data bucket from s3
2. remove stack from cloudformation
ref1: https://codetrest.com/ES6-Code-AWS-Lambda

#invoke with queryParameters

```$xslt
serverless invoke local -f {func_name} --path ./test/event/{file.json}
```
