import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

export const s3Client = new S3Client({
  region: 'eu-west-3',
  endpoint: 'http://localhost:9000',
  credentials: {
    accessKeyId: 'admin',
    secretAccessKey: 'password',
  },
  forcePathStyle: true,
});

export async function putObject(key: string, body: Buffer, contentType: string) {
  const command = new PutObjectCommand({
    Bucket: 'avatars',
    Key: key,
    Body: body,
    ContentType: contentType,
    ACL: 'public-read',
  });

  await s3Client.send(command);
}
