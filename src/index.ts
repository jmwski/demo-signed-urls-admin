import { initializeApp, cert } from 'firebase-admin/app';
import { getStorage } from 'firebase-admin/storage';
// import { GetSignedUrlConfig, GetSignedUrlResponse} from '@google-cloud/storage';

const config = {
  projectId: "demo-signed-urls",
  credential: cert(require("../key.json"))
};

process.env["FIREBASE_STORAGE_EMULATOR_HOST"] = "127.0.0.1:9199"

const app = initializeApp(config);
const storage = getStorage(app);

(async function() {
  try {
    await storage.bucket("demo-signed-urls.appspot.com").file("c").getMetadata()
    // The emulator doesn't support this.
    // const expires = new Date()
    // expires.setTime(expires.getTime() + (1 * 60 * 60 * 1000))
    // const url: GetSignedUrlResponse = await storage.bucket("demo-signed-urls.appspot.com").file("c").getSignedUrl({ action: "read", expires } as GetSignedUrlConfig)
    // console.log(url[0])
  } catch (e) {
    console.log(`ERROR: ${e}`);
  }
})()