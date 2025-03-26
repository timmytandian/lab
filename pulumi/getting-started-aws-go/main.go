package main

import (
	"fmt"
	"github.com/pulumi/pulumi-aws/sdk/v6/go/aws/s3"
	"github.com/pulumi/pulumi/sdk/v3/go/pulumi"
)

func main() {
	pulumi.Run(func(ctx *pulumi.Context) error {
		// Create an AWS resource (S3 Bucket)
		bucket, err := s3.NewBucketV2(ctx, "pulumi-getting-started", nil)
		if err != nil {
			return err
		}

        // Make the bucket to be accessible publicly by setting up the ownership
		ownershipControls, err := s3.NewBucketOwnershipControls(ctx, "ownership-controls", &s3.BucketOwnershipControlsArgs{
		    Bucket: bucket.ID(),
		    Rule: &s3.BucketOwnershipControlsRuleArgs{
		        ObjectOwnership: pulumi.String("ObjectWriter"),
		    },
		})
		if err != nil {
		    return err
		}

		// Make the bucket to be accessible publicly by setting the BlockPublicAcl to be false
		publicAccessBlock, err := s3.NewBucketPublicAccessBlock(ctx, "public-access-block", &s3.BucketPublicAccessBlockArgs{
		    Bucket:          bucket.ID(),
		    BlockPublicAcls: pulumi.Bool(false),
		})
		if err != nil {
		    return err
		}
		
		// Configure the bucket to make index.html as the home page of website.
		website, err := s3.NewBucketWebsiteConfigurationV2(ctx, "website", &s3.BucketWebsiteConfigurationV2Args{
	    	Bucket: bucket.ID(),
	    	IndexDocument: &s3.BucketWebsiteConfigurationV2IndexDocumentArgs{
	        	Suffix: pulumi.String("index.html"),
	    	},
		})
		if err != nil {
			return err
		}

		// Create index.html as bucket object, setting up public-read.
		_, err = s3.NewBucketObject(ctx, "index.html", &s3.BucketObjectArgs{
		    Bucket:      bucket.ID(),
		    Source:      pulumi.NewFileAsset("index.html"),
		    ContentType: pulumi.String("text/html"),
		    Acl:         pulumi.String("public-read"),
		}, pulumi.DependsOn([]pulumi.Resource{
					publicAccessBlock,
					ownershipControls,
					website,
		}))
		if err != nil {
		    return err
		}

		// Export the name of the bucket and the bucket endpoint
		ctx.Export("bucketName", bucket.ID())
		ctx.Export("bucketEndpoint", website.WebsiteEndpoint.ApplyT(func(websiteEndpoint string) (string, error) {
		    return fmt.Sprintf("http://%v", websiteEndpoint), nil
		}).(pulumi.StringOutput))
		return nil
	})
}
