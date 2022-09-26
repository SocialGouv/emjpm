const Client = require("ssh2-sftp-client");

class SFTPClient {
  constructor() {
    this.client = new Client();
  }

  async connect(options) {
    console.log(`Connecting to ${options.host}:${options.port}`);
    try {
      await this.client.connect(options);
    } catch (err) {
      console.log("Failed to connect:", err);
    }
  }

  async disconnect() {
    await this.client.end();
  }

  async uploadFile(content, remoteFile) {
    console.log(`Uploading  to ${remoteFile} ...`);
    try {
      // return this.client.put(localFile, remoteFile);
      return this.client.put(Buffer.from(content, "utf-8"), remoteFile);
    } catch (err) {
      console.error("Uploading failed:", err);
    }
  }
}

module.exports = SFTPClient;
