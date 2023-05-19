import { initializeApp, cert } from 'firebase-admin/app';
import { getStorage } from 'firebase-admin/storage';
import { DownloadResponse } from '@google-cloud/storage';

const config = {
  projectId: "demo-signed-urls",
  credential: cert(require('../key.json')),
  storageBucket: "demo-signed-urls.appspot.com",
};

process.env["FIREBASE_STORAGE_EMULATOR_HOST"] = "127.0.0.1:9199"

const app = initializeApp(config);
const storage = getStorage(app);

(async function() {
  try {
    const bucket = storage.bucket()
    const f: DownloadResponse = await bucket.file("c").download()
    console.log(f[0].toString("utf-8"))
    // The emulator doesn't support this.
    // await bucket.getSignedUrl({ expires: 604800 } as GetBucketSignedUrlConfig)
  } catch (e) {
    console.log(`ERROR: ${e}`);
  }
})()