# Pulumi Getting Started (AWS+Go)
This directory contains the code I used to get started with Pulumi.
This minimalist code deploys a simple static website to AWS S3.

## Requirement
To reproduce this we need these applications in our local system.
1. Pulumi CLI ([how to install](https://www.pulumi.com/docs/iac/download-install/))
2. Go Runtime ([how to install](https://go.dev/doc/install))
3. Optional but recommended, AWS CLI ([how to install](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html))

## Procedure
The procedure below is the simplified version of the tutorial we can follow in this [documentation](https://www.pulumi.com/docs/iac/get-started/aws/).

### 1. Clone or download this folder
First step is to have the files in this directory ready.

### 2. Configure Pulumi to access AWS account. 
We can either use the AWS access key ID/secret, or use AWS profile to let Pulumi manage resources in our AWS account.
  ```shell
  # either using AWS access key ID and secret
  export AWS_ACCESS_KEY_ID="<YOUR_ACCESS_KEY_ID>"
  export AWS_SECRET_ACCESS_KEY="<YOUR_SECRET_ACCESS_KEY>"

  # or use AWS Profile (if the AWS CLI has been installed)
  export AWS_PROFILE="<YOUR_PROFILE_NAME>"
  ```
### 3. Login and deploy
From this project directory run this command to login to Pulumi Cloud.
```shell
pulumi login
```

Then, deploy the program by running this command.
```shell
pulumi up
```

### 4. Clean up
To clean up the resources we created, we can run this command.
```shell
pulumi destroy
```

Optionally, we can delete the pulumi stack as well by executing `pulumi stack rm`.
