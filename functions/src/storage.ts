// 1. npm i @google-cloud/storage
// 2. npm i fs-extra
// 3. npm i -D @types/fs-extra
// 4. npm i sharp

import * as functions from 'firebase-functions';

import * as admin from 'firebase-admin';

import * as Storage from '@google-cloud/storage';

import { tmpdir } from 'os';

import { join, dirname } from 'path';

import * as sharp from 'sharp';

const gcs = new Storage.Storage();

export const resizeAvatar = functions.storage
  .object()
  .onFinalize(async (object: any) => {
    const bucket = gcs.bucket(object.bucket);
    const filePath = object.name;
    const fileName = filePath?.split('/').pop();
    const tmpFilePath = join(tmpdir(), object.name);

    const avatarFileName = 'avatar_' + fileName;
    const tmpAvatarPath = join(tmpdir(), avatarFileName);

    if (fileName.includes('avatar_')) {
      console.log('exiting function');
      return false;
    }

    await bucket.file(filePath).download({
      destination: tmpFilePath,
    });

    await sharp(tmpFilePath).resize(100, 100).toFile(tmpAvatarPath);

    return bucket.upload(tmpAvatarPath, {
      destination: join(dirname(filePath), avatarFileName),
    });
  });
