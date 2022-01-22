// Load the required clients and packages
import { CognitoIdentityClient } from '@aws-sdk/client-cognito-identity';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-provider-cognito-identity';
import {
  S3Client,
  PutObjectCommand,
  ListObjectsCommand,
  DeleteObjectCommand,
  DeleteObjectsCommand,
} from '@aws-sdk/client-s3';

// Set the AWS Region
const REGION = 'us-east-2'; //REGION
const BucketName = 'airbnbclonelistingpictures';

// Initialize the Amazon Cognito credentials provider
const s3 = new S3Client({
  region: REGION,
  credentials: fromCognitoIdentityPool({
    client: new CognitoIdentityClient({ region: REGION }),
    identityPoolId: 'us-east-2:d7249ebb-1088-4139-9123-2de220ea4959', // IDENTITY_POOL_ID
  }),
});

// Create an album in the bucket
const createAlbum = async (albumName) => {
  albumName = albumName.trim();
  if (!albumName) {
    return alert('Album names must contain at least one non-space character.');
  }
  if (albumName.indexOf('/') !== -1) {
    return alert('Album names cannot contain slashes.');
  }
  var albumKey = encodeURIComponent(albumName);
  try {
    const key = albumKey + '/';
    const params = { Bucket: BucketName, Key: key };
    const data = await s3.send(new PutObjectCommand(params));
    alert('Successfully created album.');
    // viewAlbum(albumName);
    return data;
  } catch (err) {
    return alert('There was an error creating your album: ' + err.message);
  }
};

module.exports = {
  createAlbum: createAlbum,
};
