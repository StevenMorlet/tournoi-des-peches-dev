import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';

export const s3Client = new S3Client({
  region: 'eu-west-3',
  endpoint: process.env.MINIO_ENDPOINT,
  credentials: {
    accessKeyId: process.env.MINIO_ACCESS_KEY!,
    secretAccessKey: process.env.MINIO_SECRET_KEY!,
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

export async function deleteObject(key: string) {
  const command = new DeleteObjectCommand({
    Bucket: 'avatars',
    Key: key,
  });
  await s3Client.send(command);
}
