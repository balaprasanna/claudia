# claudia

1. Setup AWS keys
```

```

2. Install `claudia` npm package globally
```
npm install -g claudia
```

3. Install dependencies
```
npm install aws-sdk claudia-api-builder -S
```

4. Create Dynamo tables using this
```
aws dynamodb create-table --table-name malls \
  --attribute-definitions AttributeName=mallid,AttributeType=S \
  --key-schema AttributeName=mallid,KeyType=HASH \
  --provisioned-throughput ReadCapacityUnits=1,WriteCapacityUnits=1 \
  --region us-east-2 \
  --query TableDescription.TableArn --output text
```

Reference of regions
- [aws-availability-zones](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html)o

*INFO* This might give u some errors.

5. Prepare aws dynamo policy inforamation
    - create `policies` folder
    - create `access-dynamodb.json` and put the following contents inside.
        ```
        {
            "Version": "2018-07-11",
            "Statement": [
            {
                "Action": [
                "dynamodb:DeleteItem",
                "dynamodb:GetItem",
                "dynamodb:PutItem",
                "dynamodb:Scan"
                ],
                "Effect": "Allow",
                "Resource": "*"
            }
            ]
        }
        ```

6. Its time to deploy the api
``` 
claudia create --region us-east-2 --api-module index --policies policy
```


7. Expected Output:
```
Balas-MacBook-Air:claudia std-user01$ claudia create --region us-east-2 --api-module index --policies policies
packaging files npm pack /Users/std-user01/Projects/live/claudia
npm notice 
npm notice 📦  claudia-serverless-api-endpoints@1.0.0
npm notice === Tarball Contents === 
npm notice 609B  package.json                 
npm notice 692B  index.js                     
npm notice 4.2kB README.md                    
npm notice 223B  policies/access-dynamodb.json
npm notice === Tarball Details === 
npm notice name:          claudia-serverless-api-endpoints          
npm notice version:       1.0.0                                     
npm notice filename:      claudia-serverless-api-endpoints-1.0.0.tgz
npm notice package size:  2.3 kB                                    
npm notice unpacked size: 5.7 kB                                    
npm notice shasum:        ****  
npm notice integrity:     sha***
npm notice total files:   4                                         
packaging files npm install -q --no-audit --production
zipping package
saving configuration
{
  "lambda": {
    "role": "claudia-serverless-api-endpoints-executor",
    "name": "claudia-serverless-api-endpoints",
    "region": "us-east-2"
  },
  "api": {
    "id": "dsr8equtdl",
    "module": "index",
    "url": "https://<SOMEURL>.execute-api.us-east-2.amazonaws.com/latest"
  }
}

```

NOW U CAN NAVIGATE TO THIS URL TO TEST YOUR API ENDPOINT
- "url": "https://<SOMEURL>.execute-api.us-east-2.amazonaws.com/latest"


```
curl -H "Content-Type: application/json" -X POST -d '{"mallId":"123", "name":"clementi-mall"}' https://dsr8equtdl.execute-api.us-east-2.amazonaws.com/latest/malls
```


Now once claudia.json is created. You can update your api by running `claudia update`


#### Few erros:
1. Insufficient permission errors
```
packaging files npm pack /Users/std-user01/Projects/live/claudia
npm notice 
npm notice 📦  claudia-serverless-api-endpoints@1.0.0
npm notice === Tarball Contents === 
npm notice 609B  package.json               
npm notice 692B  index.js                   
npm notice 1.3kB README.md                  
npm notice 276B  policy/dynamodb-policy.json
npm notice === Tarball Details === 
npm notice name:          claudia-serverless-api-endpoints          
npm notice version:       1.0.0                                     
npm notice filename:      claudia-serverless-api-endpoints-1.0.0.tgz
npm notice package size:  1.5 kB                                    
npm notice unpacked size: 2.9 kB                                    
npm notice shasum:        *** 
npm notice integrity:     ****
npm notice total files:   4                                         
packaging files npm install -q --no-audit --production
initialising IAM role   iam.createRole  RoleName=claudia-serverless-api-endpoints-executor
{ AccessDenied: User:arn:aws:iam::<ID>:user/<USERNAME> is not authorized to perform: iam:CreateRole on resource: arn:aws:iam::669778119289:role/claudia-serverless-api-endpoint
s-executor
    at Request.extractError (/usr/local/lib/node_modules/claudia/node_modules/aws-sdk/lib/protocol/query.js:47:29)
    at Request.callListeners (/usr/local/lib/node_modules/claudia/node_modules/aws-sdk/lib/sequential_executor.js:105:20)
    at Request.emit (/usr/local/lib/node_modules/claudia/node_modules/aws-sdk/lib/sequential_executor.js:77:10)
    at Request.emit (/usr/local/lib/node_modules/claudia/node_modules/aws-sdk/lib/request.js:683:14)
    at Request.transition (/usr/local/lib/node_modules/claudia/node_modules/aws-sdk/lib/request.js:22:10)
    at AcceptorStateMachine.runTo (/usr/local/lib/node_modules/claudia/node_modules/aws-sdk/lib/state_machine.js:14:12)
    at /usr/local/lib/node_modules/claudia/node_modules/aws-sdk/lib/state_machine.js:26:10
    at Request.<anonymous> (/usr/local/lib/node_modules/claudia/node_modules/aws-sdk/lib/request.js:38:9)
    at Request.<anonymous> (/usr/local/lib/node_modules/claudia/node_modules/aws-sdk/lib/request.js:685:12)
    at Request.callListeners (/usr/local/lib/node_modules/claudia/node_modules/aws-sdk/lib/sequential_executor.js:115:18)
  message: 'User: arn:aws:iam::<ID>:user/<USERNAME> is not authorized to perform: iam:CreateRole on resource: arn:aws:iam::669778119289:role/claudia-serverless-api-endpoints-executor',
  code: 'AccessDenied',
  time: 2018-07-11T13:17:42.521Z,
  requestId: 'cad2e2a4-850c-11e8-bc4a-e96a850ff866',
  statusCode: 403,
  retryable: false,
  retryDelay: 36.95665004976165 }
```


